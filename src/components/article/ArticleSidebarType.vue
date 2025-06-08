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
  <div class="latest-updates-wrapper">
    <div class="latest-card">
      <div class="latest-header">
        <h3 class="latest-title">
          <i class="fas fa-bolt icon-accent"></i>
          Latest Updates
        </h3>
      </div>

      <ul class="latest-list">
        <li class="latest-item" v-for="article in articles.slice(0, 5)" :key="article.id"
          @click="$emit('navigate', article)">
          <div class="latest-inner">
            <img class="latest-thumb" :src="article.image || '/placeholder-news.jpg'" :alt="article.title"
              loading="lazy" />
            <div class="latest-info">
              <span class="latest-type">{{ article.type }}</span>
              <h4 class="latest-article-title">{{ article.title }}</h4>
              <div class="latest-meta">
                <span class="time">
                  <i class="far fa-clock"></i> {{ article.reading_time }}
                </span>
                <i class="fas fa-chevron-right chevron-icon"></i>
              </div>
            </div>
          </div>
        </li>
      </ul>

      <div class="no-articles" v-if="articles.length === 0">
        <i class="far fa-newspaper"></i>
        <p>No recent articles yet</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.latest-updates-wrapper {
  margin-top: 2rem;
}

.latest-card {
  background-color: #fff;
  border-radius: 1rem;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
  padding: 2rem;
}

.latest-header {
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.latest-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon-accent {
  color: var(--accent, #f59e0b);
}

.latest-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.latest-item {
  margin-bottom: 1.25rem;
  transition: background 0.2s ease, transform 0.2s ease;
  border-radius: 0.75rem;
  cursor: pointer;
}

.latest-inner {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 0.75rem;
  background-color: #fafafa;
  transition: box-shadow 0.3s, border-color 0.3s, background-color 0.3s;
}

.latest-item:hover .latest-inner {
  background-color: #fff;
  border-color: var(--accent-light, #fde68a);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.latest-thumb {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.latest-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.latest-type {
  font-size: 0.75rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.latest-article-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.latest-meta {
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #6b7280;
  gap: 0.5rem;
}

.chevron-icon {
  color: #d1d5db;
  transition: transform 0.3s;
}

.latest-item:hover .chevron-icon {
  transform: translateX(4px);
}

.no-articles {
  margin-top: 2rem;
  text-align: center;
  color: #999;
  font-style: italic;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>