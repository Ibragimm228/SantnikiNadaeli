<script setup>
import { formatDate } from '@/utils/formatDate'

defineProps({
  articles: {
    type: Array,
    default: () => []
  }
})

defineEmits(['navigate'])
</script>

<template>
  <div class="recent-articles-wrapper">
    <div class="recent-articles card">
      <h3 class="recent-title">
        <i class="fas fa-clock-rotate-left clock-icon"></i>
        Recent Updates
      </h3>

      <div class="articles-grid">
        <div class="recent-article" v-for="article in articles.slice(0, 5)" :key="article.id"
          @click="$emit('navigate', article)">
          <div class="recent-article-image" v-if="article.image">
            <img :src="article.image" :alt="article.title">
          </div>
          <div class="recent-article-content">
            <h4 class="article-title">{{ article.title }}</h4>
            <div class="recent-meta">
              <span class="date">{{ formatDate(article.published_date) }}</span>
              <span class="dot">•</span>
              <span class="time">{{ article.reading_time }}</span>
            </div>
            <p class="recent-excerpt">{{ article.summary?.substring(0, 100) }}...</p>
          </div>
        </div>
      </div>

      <div class="no-articles" v-if="articles.length === 0">
        No recent articles yet
      </div>
    </div>
  </div>
</template>


<style scoped>
.recent-articles-wrapper {
  margin-top: 2rem;
}

.recent-articles.card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.recent-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #111;
}

.clock-icon {
  color: var(--accent, #4f46e5);
}

.articles-grid {
  display: grid;
  gap: 1.25rem;
}

.recent-article {
  display: flex;
  gap: 1rem;
  cursor: pointer;
  border: 1px solid #eee;
  border-radius: 0.75rem;
  padding: 1rem;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
  background-color: #fafafa;
}

.recent-article:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  border-color: var(--accent-light, #e0e7ff);
  background-color: #fff;
}

.recent-article-image img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.recent-article-content {
  flex: 1;
}

.article-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: #1f2937;
}

.recent-meta {
  font-size: 0.75rem;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.5rem;
}

.recent-excerpt {
  font-size: 0.875rem;
  color: #374151;
}

.no-articles {
  text-align: center;
  color: #999;
  font-style: italic;
  margin-top: 1rem;
}
</style>