<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/client/supabase'
import ArticleContent from '@/components/article/ArticleContent.vue'
import ArticleSidebarType from '@/components/article/ArticleSidebarType.vue'
import ArticleSidebarRecent from '@/components/article/ArticleSidebarRecent.vue'
import ArticleSideBarKeywords from '@/components/article/ArticleSideBarKeywords.vue'
import ArticleComments from '@/components/article/ArticleComments.vue'
import ArticleNavigation from '@/components/article/ArticleNavigation.vue'
import Loader from '@/components/Loader.vue'

const route = useRoute()
const router = useRouter()

const article = ref({})
const relatedArticles = ref([])
const recentArticles = ref([])
const isLoading = ref(true)
const randomArticles = ref([])

const fetchArticle = async () => {
  isLoading.value = true

  try {
    const rawTitle = route.params.title
    const title = rawTitle.replace(/-/g, ' ')

    const { data, error } = await supabase
      .from('ashley_articles')
      .select()
      .ilike('title', title)
      .single()

    if (error) throw error
    article.value = data

    if (data?.type) {
      await fetchRelatedArticles(data.type, data.id)
    }

  } catch (error) {
    console.error('Error fetching article:', error)
    router.push('/')
  } finally {
    isLoading.value = false
  }
}

const fetchRelatedArticles = async (type, excludeId) => {
  try {
    const { data, error } = await supabase
      .from('ashley_articles')
      .select('*')
      .eq('type', type)
      .neq('id', excludeId)
      .order('published_date', { ascending: false })
      .limit(3)

    const { data: recentData } = await supabase
      .from('ashley_articles')
      .select('*')
      .order('published_date', { ascending: false })
      .limit(5)

    if (error) throw error
    relatedArticles.value = data || []
    recentArticles.value = recentData || []

    if (relatedArticles.value.length >= 2) {
      const shuffled = [...relatedArticles.value].sort(() => 0.5 - Math.random())
      randomArticles.value = shuffled.slice(0, 2)
    } else {
      randomArticles.value = [...relatedArticles.value]
    }

  } catch (error) {
    console.error('Error fetching related articles:', error)
  }
}

const navigateToArticle = (article) => {
  const titleSlug = article.title
    .toLowerCase().replace(/\s+/g, '-')

  router.push(`/article/${titleSlug}`)
}

onMounted(() => {
  fetchArticle()
})

watch(() => route.params.title, () => {
  fetchArticle()
})
</script>

<template>
  <div>
    <Loader v-if="isLoading" />

    <div v-else class="article-layout">
      <div class="left-bar">
        <ArticleNavigation :article="article" :random-articles="randomArticles" @navigate="navigateToArticle" />
        <ArticleContent :article="article" @back="router.go(-1)" />
        <ArticleNavigation style="margin-top: 50px;" :article="article" :random-articles="randomArticles" @navigate="navigateToArticle" />
        <ArticleComments :article="article" :type="article.type" />
      </div>

      <div class="divider"></div>

      <div class="sidebar">
        <ArticleSidebarType :articles="relatedArticles" :type="article.type" @navigate="navigateToArticle" />
        <ArticleSidebarRecent :articles="recentArticles" @navigate="navigateToArticle" />
        <ArticleSideBarKeywords />
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  max-width: 30%;
}

@media(max-width: 768px) {
  .sidebar {
    max-width: 100%;
  }
}

.left-bar {
  width: 100%;
}

.article-layout {
  display: flex;
  max-width: 1250px;
  margin: 1rem auto;
  padding: 0 1.5rem;
  gap: 0;
}

.divider {
  width: 1px;
  background: var(--secondary);
  margin: 0 1.5rem;
}

@media (max-width: 768px) {
  .article-layout {
    flex-direction: column;
  }

  .divider {
    width: 100%;
    height: 1px;
    margin: 2rem 0;
    background: linear-gradient(to right,
        transparent,
        rgba(255, 255, 255, 0.2),
        transparent);
  }
}
</style>