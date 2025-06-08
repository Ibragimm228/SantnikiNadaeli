<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/client/supabase'
import { formatDate } from '@/utils/formatDate'
import { useRouter } from 'vue-router'

const router = useRouter()
const newestArticles = ref([])

const fetchNewestArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('ashley_articles')
      .select('*')
      .order('published_date', { ascending: false })
      .limit(3)

    if (error) throw error

    newestArticles.value = data
  } catch (error) {
    console.error('Ошибка при получении новых статей:', error)
  }
}

onMounted(() => {
  fetchNewestArticles()
})

const navigateToArticle = (freebie) => {
  const titleSlug = freebie.title.toLowerCase().replace(/\s+/g, '-')
  router.push(`/article/${titleSlug}`)
}
</script>


<template>
  <div class="sidebar-widget">
    <h4>📅 Latest News</h4>
    <ul class="events-list">
      <li v-for="article in newestArticles" :key="article.id" @click="navigateToArticle(article)"
        style="cursor: pointer">
        <strong>{{ article.title }}</strong>
        <p>{{ formatDate(article.published_date) }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.events-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.events-list li {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed #eee;
}

.events-list li:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.events-list p {
  margin: 0.3rem 0 0 0;
  font-size: 0.9rem;
  color: #666;
}
</style>