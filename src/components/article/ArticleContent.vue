<script setup>
import { formatDate } from '@/utils/formatDate'

const props = defineProps({
  article: {
    type: Object,
    required: true
  }
})

const customMarkdown = (content) => {
  if (!content) return ""

  return content
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="font-size: 30px; font-weight: 700;">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
    .replace(/<img>(.*?)<\/img>/g, '<img src="$1" style="width: 70%; height: 100 %" loading="lazy" class="article-image-content" />')
    .split('\n')
    .map(line => line.trim() === '' ? '<br/>' : `<p>${line}</p>`)
    .join('')
}

defineEmits(['back'])
</script>

<template>
  <div class="article-content-wrapper">
    <div class="article-view">
      <div class="article-header">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <div class="author-info">
            <img :src="article.avatar || 'https://via.placeholder.com/50'" :alt="article.author" class="avatar">
            <div>
              <p class="author-name">{{ article.author }}</p>
              <p class="publish-date">{{ formatDate(article.published_date) }}</p>
            </div>
          </div>
          <div class="reading-time">
            <i class="fas fa-clock"></i> {{ article.reading_time }}
          </div>
        </div>
      </div>

      <div class="article-image" v-if="article.image">
        <img :src="article.image" :alt="article.title">
      </div>

      <div class="article-content" v-html="customMarkdown(article.content)"></div>
    </div>
  </div>
</template>

<style scoped>
.article-content-wrapper {
  max-width: 800px;
  margin: 3rem auto;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
}

.article-content {
  line-height: 1.8;
  font-size: 20px;
}

.article-view h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: var(--dark);
}

.article-title {
  font-size: 2rem;
  margin: 2rem 0 1rem;
  color: var(--primary);
}

.article-subtitle {
  font-size: 1.5rem;
  margin: 1.5rem 0 1rem;
  color: var(--primary-dark);
}

.article-heading {
  font-size: 1.25rem;
  margin-top: 1.25rem;
  color: var(--secondary);
}

.article-paragraph {
  line-height: 1.8;
  font-size: 20px;
  color: var(--dark);
  margin-bottom: 1.25rem;
}

.article-link {
  color: var(--primary);
  text-decoration: underline;
  transition: 0.3s ease;
}

.article-link:hover {
  color: var(--primary-dark);
}

.article-image img {
  max-width: 100%;
  width: 100%;
}

.article-image-content {
  display: block;
  margin: 2rem auto;
  max-width: 100%;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.highlight-text {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--accent);
}

.italic-text {
  font-style: italic;
  color: var(--gray);
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.author-name {
  font-weight: 600;
  font-size: 1rem;
  color: var(--dark);
}

.publish-date {
  font-size: 0.875rem;
  color: var(--gray);
}

.reading-time {
  font-size: 0.875rem;
  color: var(--gray);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>