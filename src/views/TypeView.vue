<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/client/supabase'
import Loader from '../components/Loader.vue'

const route = useRoute()
const router = useRouter()

const articles = ref([])
const selectedType = ref(decodeURIComponent(route.params.type || 'all'))
const sortDirection = ref('desc')
const isLoading = ref(true)
const currentPage = ref(1)
const itemsPerPage = 9

const types = computed(() => {
  const allTypes = articles.value.map(article => article.type)
  return ['all', ...new Set(allTypes)].filter(Boolean)
})

const filteredArticles = computed(() => {
  let result = [...articles.value]

  if (selectedType.value !== 'all') {
    result = result.filter(article => article.type === selectedType.value)
  }

  result.sort((a, b) => {
    const dateA = new Date(a.published_date)
    const dateB = new Date(b.published_date)
    return sortDirection.value === 'asc' ? dateA - dateB : dateB - dateA
  })

  return result
})

const paginatedArticles = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredArticles.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredArticles.value.length / itemsPerPage)
})

const fetchArticles = async () => {
  isLoading.value = true
  try {
    const typeToFetch = selectedType.value === 'all' ? null : selectedType.value

    let query = supabase
      .from('ashley_articles')
      .select('*')
      .order('published_date', { ascending: sortDirection.value === 'asc' })

    if (typeToFetch) {
      query = query.eq('type', typeToFetch)
    }

    const { data, error } = await query

    if (error) throw error
    articles.value = data || []
    isLoading.value = false

  } catch (error) {
    console.error('Error fetching articles:', error)
    articles.value = []
  } finally {
  }
}

const navigateToArticle = (article) => {
  const titleSlug = article.title.toLowerCase().replace(/\s+/g, '-')
  router.push(`/article/${titleSlug}`)
}

const toggleSortDirection = () => {
  sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  currentPage.value = 1
  fetchArticles()
}

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  if (!route.params.type) {
    selectedType.value = 'all'
  }
  fetchArticles()
})

const newArticleIds = computed(() => {
  const sorted = [...articles.value].sort((a, b) => new Date(b.published_date) - new Date(a.published_date));
  return sorted.slice(0, 3).map(a => a.id);
});

watch(
  () => route.params.type,
  (newType) => {
    if (newType) {
      selectedType.value = decodeURIComponent(newType)
      currentPage.value = 1
      fetchArticles()
    } else {
      selectedType.value = 'all'
      fetchArticles()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="baby-blog-container">
    <!-- <Loader v-if="isLoading" /> -->

    <div class="blog-content">
      <header class="blog-header">
        <h1 class="blog-title">Giveaway News & Updates</h1>
        <p class="blog-subtitle">
          Catch the latest updates, tips, and announcements from our giveaways
        </p>

        <div class="divider">
          <div class="divider-line"></div>
          <div class="divider-icon">🎯</div>
          <div class="divider-line"></div>
        </div>
      </header>

      <div class="blog-controls">
        <div class="sort-control">
          <button class="sort-button" @click="toggleSortDirection">
            <span class="button-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                stroke-linecap="round">
                <path d="M3 7h18M6 12h12M9 17h6" />
              </svg>
            </span>
            <span class="button-text">
              {{ sortDirection === 'asc' ? 'Oldest First' : 'Newest First' }}
            </span>
          </button>
        </div>
      </div>

      <div class="articles-grid">
        <article v-for="(article, index) in paginatedArticles" :key="article.id" class="article-card"
          @click="navigateToArticle(article)">
          <div class="card-image-container">
            <img :src="article.image" :alt="article.title" class="card-image">
            <div class="image-overlay"></div>
            <span class="category-badge">{{ article.type }}</span>

            <span v-if="index < 3" class="status-badge popular">
              POPULAR
            </span>
            <span v-if="newArticleIds.includes(article.id)" class="status-badge new">
              NEW
            </span>
          </div>

          <div class="card-content">
            <div class="article-meta">
              <span class="meta-date">
                {{ new Date(article.published_date).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                }) }}
              </span>
              <span class="meta-separator">•</span>
              <span class="meta-reading-time">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M12 6v6l4 2" stroke-linecap="round" />
                </svg>
                {{ article.reading_time }} read
              </span>
            </div>

            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-excerpt">{{ article.summary }}</p>

            <div class="article-author">
              <img :src="article.avatar || '/default-avatar.jpg'" :alt="article.author" class="author-avatar">
              <span class="author-name">{{ article.author }}</span>
            </div>
          </div>

          <div class="card-hover-effect"></div>
        </article>
      </div>

      <div class="pagination" v-if="totalPages > 1">
        <button class="pagination-button prev" :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button v-for="page in totalPages" :key="page" class="pagination-button"
          :class="{ active: page === currentPage }" @click="changePage(page)">
          {{ page }}
        </button>

        <button class="pagination-button next" :disabled="currentPage === totalPages"
          @click="changePage(currentPage + 1)">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.baby-blog-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-title {
  font-size: 2.5rem;
  color: #2E2E48;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.blog-subtitle {
  font-size: 1.1rem;
  color: #A3A3C2;
  max-width: 700px;
  margin: 0 auto 2rem;
  line-height: 1.6;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1.5rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, transparent, #FF6B95, transparent);
}

.divider-icon {
  font-size: 1.5rem;
  color: #FF6B95;
}

.blog-controls {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
}

.sort-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #F0F2F6;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-size: 0.9rem;
  color: #2E2E48;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.sort-button:hover {
  background: #FF6B95;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 107, 149, 0.2);
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.article-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  position: relative;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.card-image-container {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.article-card:hover .card-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
}

.category-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: #FF6B95;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  z-index: 2;
}

.status-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
}

.status-badge.popular {
  background: #FFC107;
  color: #2E2E48;
}

.status-badge.new {
  top: auto;
  bottom: 1rem;
  background: #4CAF50;
  color: white;
}

.card-content {
  padding: 1.5rem;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: #A3A3C2;
  margin-bottom: 0.75rem;
}

.meta-separator {
  opacity: 0.5;
}

.meta-reading-time {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.article-title {
  font-size: 1.25rem;
  color: #2E2E48;
  margin-bottom: 1rem;
  line-height: 1.4;
}

.article-excerpt {
  color: #555;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-author {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-size: 0.9rem;
  font-weight: 500;
  color: #2E2E48;
}

.card-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 107, 149, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.article-card:hover .card-hover-effect {
  opacity: 1;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
}

.pagination-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #F0F2F6;
  background: white;
  border-radius: 8px;
  color: #2E2E48;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-button:hover:not(:disabled) {
  background: #FF6B95;
  color: white;
  border-color: #FF6B95;
}

.pagination-button.active {
  background: #FF6B95;
  color: white;
  border-color: #FF6B95;
  font-weight: 600;
}

.pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .blog-title {
    font-size: 2rem;
  }

  .blog-subtitle {
    font-size: 1rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .baby-blog-container {
    padding: 1.5rem 1rem;
  }

  .blog-title {
    font-size: 1.75rem;
  }

  .pagination {
    gap: 0.25rem;
  }

  .pagination-button {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
}
</style>