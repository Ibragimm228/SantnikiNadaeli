<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/client/supabase'
import { formatDate } from '@/utils/formatDate'
import { useRouter } from 'vue-router'

const router = useRouter()

const randomArticles = ref([])

const fetchRandomArticles = async () => {
  try {
    const { data, error } = await supabase
      .from('ashley_articles')
      .select('*')
      .limit(3)

    if (error) throw error

    randomArticles.value = data
  } catch (error) {
    console.error('Ошибка при получении случайных статей:', error)
  }
}

onMounted(() => {
  fetchRandomArticles()
})

const navigateToArticle = (freebie) => {
  const titleSlug = freebie.title.toLowerCase().replace(/\s+/g, '-')
  router.push(`/article/${titleSlug}`)
}
</script>

<template>
  <section style="margin-bottom: 50px;" class="featured-freebies">
    <h3 class="section-title">⭐ Featured Freebies This Week</h3>
    <div class="freebies-list">
      <div v-for="(freebie, index) in randomArticles" :key="freebie.id" class="freebie-item">
        <div class="freebie-number">{{ index + 1 }}</div>
        <div class="freebie-content">
          <h4>{{ freebie.title }}</h4>
          <p>{{ freebie.summary }}</p>
          <div class="freebie-meta">
            <span class="category">{{ freebie.type }}</span>
            <span class="expiration">{{ formatDate(freebie.published_date) }}</span>
          </div>
        </div>
        <button @click="navigateToArticle(freebie)" class="freebie-button">Read →</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.freebies-list {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.freebie-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  transition: all 0.3s ease;
}

.freebie-item:last-child {
  border-bottom: none;
}

.freebie-item:hover {
  background: #f9f9f9;
  transform: translateX(5px);
}

.freebie-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: #FF6B95;
  margin-right: 1.5rem;
  min-width: 30px;
}

.category {
  background: #2563eb;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
}

.expiration {
  color: #888;
}

.freebie-content {
  flex: 1;
}

.freebie-content h4 {
  margin: 0 0 0.5rem 0;
  color: #333;
}

.freebie-content p {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.freebie-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.8rem;
}

.freebie-button {
  background: none;
  border: none;
  color: #2563eb;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.freebie-button:hover {
  text-decoration: underline;
}
</style>