<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/client/supabase'
const allTypes = ref([])

const fetchAllTypes = async () => {
  try {
    const { data, error } = await supabase
      .from('ashley_articles')
      .select('type')
      .not('type', 'is', null)

    if (error) throw error

    const uniqueTypes = [...new Set(data.map(item => item.type))]
    allTypes.value = uniqueTypes
  } catch (error) {
    console.error('Error fetching all types:', error)
  }
}

onMounted(() => {
  fetchAllTypes()
})

</script>

<template>
  <div v-if="allTypes.length" class="keywords card">
    <h3 class="recent-title">
      <i class="fa fa-tag tag-icon"></i>
      Keywords
    </h3>
    <ul class="keyword-list">
      <li v-for="type in allTypes" :key="type">
        <router-link :to="`/type/${type}`" class="keyword-link">
          {{ type }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.keywords {
  padding: 1.5rem;
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
}

.recent-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #333;
}

.tag-icon {
  color: var(--accent, #4f46e5);
}

.keyword-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
  margin: 0;
}

.keyword-link {
  display: inline-block;
  padding: 0.5rem 0.9rem;
  font-size: 0.875rem;
  font-weight: 500;
  background-color: #f3f4f6;
  color: #333;
  border-radius: 999px;
  text-decoration: none;
  transition: all 0.25s ease-in-out;
}

.keyword-link:hover {
  background-color: var(--accent-light, #e0e7ff);
  color: var(--accent-dark, #3730a3);
}
</style>