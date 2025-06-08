<script setup>
import { ref, watch } from 'vue'
import { supabase } from '@/client/supabase'

const searchQuery = ref('')
const searchResults = ref([])
const isSearchFocused = ref(false)
const isLoading = ref(false)
const showResults = ref(false)

const popularSearches = [
  'The best brands that regularly hold giveaways for parents',
  '5 mistakes that prevent you from winning in contests'
]

watch(searchQuery, (newVal) => {
  if (newVal.trim()) {
    performSearch()
  } else {
    searchResults.value = []
  }
})

const performSearch = async () => {
  const query = searchQuery.value.trim()
  if (!query) {
    searchResults.value = []
    return
  }

  isLoading.value = true
  showResults.value = true

  try {
    const { data, error } = await supabase
      .from('ashley_articles')
      .select('id, title')
      .ilike('title', `%${query}%`)

    if (error) throw error

    searchResults.value = data
  } catch (error) {
    console.error('Error searching articles:', error)
    searchResults.value = []
  } finally {
    isLoading.value = false
  }
}

const handleFocus = () => {
  isSearchFocused.value = true
  if (searchQuery.value) {
    showResults.value = true
  }
}

const handleBlur = () => {
  setTimeout(() => {
    isSearchFocused.value = false
    showResults.value = false
  }, 200)
}
</script>

<template>
  <div style="display: flex; flex-direction: column; justify-content: center;">
    <div class="search-container">
      <div class="search-bar">
        <input type="text" v-model="searchQuery" placeholder="Search for freebies..." @focus="handleFocus"
          @blur="handleBlur" />
        <button class="search-button">
          <span class="search-icon">🔍</span>
        </button>
      </div>

      <div v-if="(isSearchFocused || showResults) && searchQuery" class="search-results">
        <div v-if="isLoading" class="result-item">Loading...</div>

        <ul v-else-if="searchResults.length">
          <li v-for="result in searchResults" :key="result.id" class="result-item">
            <router-link :to="`/article/${result.title.toLowerCase().replace(/\s+/g, '-')}`">
              {{ result.title }}
            </router-link>
          </li>
        </ul>

        <div v-else class="result-item">No results found</div>
      </div>
    </div>

    <div class="popular-searches">
      <span>Popular: </span>
      <a v-for="(search, index) in popularSearches" :key="index" href="#" @click.prevent="searchQuery = search">
        {{ search }}
      </a>
    </div>
  </div>
</template>


<style scoped>
.search-container {
  flex: 1;
}

.search-bar {
  display: flex;
  border: 2px solid #2563eb;
  border-radius: 30px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 10px rgba(37, 99, 235, 0.2);
}

.search-bar input {
  flex: 1;
  border: none;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  outline: none;
}

.search-button {
  background: linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%);
  color: white;
  border: none;
  padding: 0 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  font-size: 1.2rem;
}

.popular-searches {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.7rem;
  margin-top: 0.3rem;
  color: #666;
}

.popular-searches a {
  color: #FF6B95;
  text-decoration: none;
}

.popular-searches a:hover {
  text-decoration: underline;
}

.search-results {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  margin-top: 0.3rem;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.result-item {
  padding: 0.5rem 1rem;
}

.result-item a {
  color: #333;
  text-decoration: none;
}

.result-item:hover {
  background-color: #f9f9f9;
}
</style>