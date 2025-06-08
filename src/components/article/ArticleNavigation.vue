<script setup>
import { formatDate } from '@/utils/formatDate'

const props = defineProps({
  article: Object,
  randomArticles: Array
})

const formatTitleToSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/\s+/g, '-')

}
</script>

<template>
  <div class="article-navigation">
    <router-link v-if="randomArticles[0]" :to="`/article/${formatTitleToSlug(randomArticles[0].title)}`"
      class="nav-card prev-article">
      <img v-if="randomArticles[0].image" :src="randomArticles[0].image" :alt="randomArticles[0].title"
        class="nav-image" />
      <div class="nav-content">
        <span class="nav-label">
          <i class="fas fa-arrow-left"></i>
          Preview
        </span>
        <h3 class="nav-title">{{ randomArticles[0].title }}</h3>
        <p class="nav-date">{{ formatDate(randomArticles[0].published_date) }}</p>
      </div>
    </router-link>

    <router-link v-if="randomArticles[1]" :to="`/article/${formatTitleToSlug(randomArticles[1].title)}`"
      class="nav-card next-article">
      <img v-if="randomArticles[1].image" :src="randomArticles[1].image" :alt="randomArticles[1].title"
        class="nav-image" />
      <div class="nav-content">
        <span class="nav-label">
          Next
          <i class="fas fa-arrow-right"></i>
        </span>
        <h3 class="nav-title">{{ randomArticles[1].title }}</h3>
        <p class="nav-date">{{ formatDate(randomArticles[1].published_date) }}</p>
      </div>
    </router-link>
  </div>
</template>


<style scoped>
.article-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 3rem;
}

.nav-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nav-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.nav-image {
  width: 100px;
  height: 100%;
  object-fit: cover;
}

.nav-content {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  flex: 1;
}

.nav-label {
  font-size: 0.85rem;
  color: #777;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.nav-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #333;
  line-height: 1.4;
}

.nav-date {
  font-size: 0.8rem;
  color: #aaa;
}
</style>