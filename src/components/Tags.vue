<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/client/supabase'

const allTypes = ref([])

const popularTags = [
  { count: 95 },
  { count: 42 },
  { count: 76 },
  { count: 88 },
  { count: 53 }
]

const fetchAllTypes = async () => {
  try {
    const { data, error } = await supabase
      .from('ashley_articles')
      .select('type')
      .not('type', 'is', null)

    if (error) throw error

    const uniqueTypes = [...new Set(data.map(item => item.type))]

    allTypes.value = uniqueTypes.map((type, index) => ({
      name: type,
      count: popularTags[index]?.count || 10
    }))
  } catch (error) {
    console.error('Error fetching all types:', error)
  }
}

onMounted(() => {
  fetchAllTypes()
})
</script>

<template>
  <div class="sidebar-widget">
    <h4>🔍 Popular Tags</h4>
    <div class="tags-cloud">
      <router-link v-for="tag in allTypes" :key="tag.name" :to="`/type/${tag.name}`" class="tag"
        :style="{ fontSize: `${0.8 + tag.count / 50}rem` }">
        #{{ tag.name }}
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.sidebar-widget {
  margin-top: 70px;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tags-cloud .tag {
  background: #f0f0f0;
  color: #FF6B95;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.tags-cloud .tag:hover {
  background: #FF6B95;
  color: white;
  transform: scale(1.05);
}
</style>