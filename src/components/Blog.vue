<script setup>
import { ref, onMounted } from 'vue'
import { formatDate } from '@/utils/formatDate.js'
import { useRouter } from 'vue-router'
import { supabase } from '@/client/supabase'

const articles = ref([])
const router = useRouter()
const isLoading = ref(true)

const fetchArticles = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('ashley_articles')
      .select('*')
      .order('published_date', { ascending: false })

    if (error) throw error
    articles.value = data
    isLoading.value = false
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
}

const navigateToArticle = (article) => {
  const titleSlug = article.title.toLowerCase().replace(/\s+/g, '-')
  router.push(`/article/${titleSlug}`)
}

const routeToLatest = () => {
  router.push('/latest')
}

onMounted(() => {
  fetchArticles()
})
</script>
<template>
  <main class="blog-main">
    <!-- HERO SECTION -->
    <section class="blog-hero">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">📚</span>
          <span class="badge-text">KNOWLEDGE BASE</span>
        </div>
        <h1 class="hero-title">Latest Articles & Insights</h1>
        <p class="hero-subtitle">Advanced plumbing solutions • Technical guides • Industry updates</p>
      </div>
    </section>
<!-- LOADING STATE -->
<div v-if="isLoading" class="loading-section">
  <div class="loading-container">
    <div class="quantum-loader">
      <div class="loader-ring"></div>
      <div class="loader-core">
        <div class="loader-pulse"></div>
      </div>
    </div>
    <p class="loading-text">Scanning knowledge database...</p>
    <div class="loading-bars">
      <div class="bar" v-for="i in 5" :key="i" :style="{ animationDelay: `${i * 0.1}s` }"></div>
    </div>
  </div>
</div>

<!-- ARTICLES SECTION -->
<section v-else class="articles-section">
  <div class="section-container">
    <!-- SECTION HEADER -->
    <div class="section-header">
      <h2 class="section-title">📅 Recent Publications</h2>
      <span class="section-tag">LATEST UPDATES</span>
      <div class="section-line"></div>
    </div>

    <!-- ARTICLES GRID -->
    <div class="cyber-grid">
      <article 
        v-for="article in articles" 
        @click="navigateToArticle(article)" 
        :key="article.id" 
        class="cyber-card"
      >
        <!-- CARD GLOW EFFECT -->
        <div class="card-glow"></div>
        
        <!-- IMAGE SECTION -->
        <div class="card-image" v-if="article.image_url">
          <img :src="article.image_url" :alt="article.title">
          <div class="image-overlay">
            <div class="overlay-pattern"></div>
          </div>
        </div>
        
        <!-- NO IMAGE PLACEHOLDER -->
        <div v-else class="card-placeholder">
          <div class="placeholder-pattern"></div>
          <span class="placeholder-icon">📄</span>
        </div>

        <!-- CARD CONTENT -->
        <div class="card-content">
          <!-- HEADER -->
          <div class="card-header">
            <h3 class="card-title">{{ article.title }}</h3>
            <div class="title-glow"></div>
          </div>

          <!-- META INFO -->
          <div class="card-meta">
            <div class="meta-item">
              <span class="meta-label">AUTHOR</span>
              <span class="meta-value">{{ article.author }}</span>
            </div>
            <div class="meta-divider"></div>
            <div class="meta-item">
              <span class="meta-label">DATE</span>
              <span class="meta-value">{{ formatDate(article.published_date) }}</span>
            </div>
          </div>

          <!-- SUMMARY -->
          <div class="card-summary">
            <p>{{ article.summary }}</p>
          </div>

          <!-- ACTION BUTTON -->
          <button class="quantum-read-btn">
            <div class="btn-core"></div>
            <div class="btn-rings"></div>
            <span class="btn-text">
              <span class="btn-icon">🔍</span>
              Read Article
            </span>
            <div class="btn-arrow">→</div>
          </button>
        </div>

        <!-- CARD BORDER -->
        <div class="card-border"></div>
      </article>
    </div>

    <!-- VIEW ALL SECTION -->
    <div class="view-all-section">
      <button @click="routeToLatest" class="quantum-view-all">
        <div class="quantum-bg"></div>
        <div class="quantum-rings">
          <div class="ring ring-1"></div>
          <div class="ring ring-2"></div>
          <div class="ring ring-3"></div>
        </div>
        <div class="quantum-content">
          <span class="quantum-icon">🚀</span>
          <span class="quantum-text">VIEW ALL ARTICLES</span>
          <span class="quantum-count">{{ articles.length }}+</span>
        </div>
      </button>
    </div>
  </div>
</section>
  </main>
</template>
<style scoped>
/* MAIN CONTAINER */
.blog-main {
  min-height: 100vh;
  background: #0a0a0f;
  color: #e4e4e7;
  position: relative;
}

/* HERO SECTION */
.blog-hero {
  position: relative;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
  overflow: hidden;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 50px;
  margin-bottom: 3rem; /* Увеличил отступ */
  position: relative;
  top: -1rem; /* Поднял выше */
}

.badge-icon {
  font-size: 1.2rem;
}

.badge-text {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #6366f1;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #e4e4e7, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #a1a1aa;
  margin: 0;
  letter-spacing: 0.05em;
}

/* LOADING SECTION */
.loading-section {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.loading-container {
  text-align: center;
}

.quantum-loader {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
}

.loader-ring {
  position: absolute;
  inset: 0;
  border: 3px solid rgba(99, 102, 241, 0.3);
  border-top: 3px solid #6366f1;
  border-radius: 50%;
  animation: quantum-spin 2s linear infinite;
}

.loader-core {
  position: absolute;
  inset: 20px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-pulse {
  width: 30px;
  height: 30px;
  background: white;
  border-radius: 50%;
  animation: pulse-glow 1.5s ease-in-out infinite;
}

@keyframes quantum-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.5; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.loading-text {
  font-size: 1.2rem;
  color: #6366f1;
  font-weight: 600;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
}

.loading-bars {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.bar {
  width: 4px;
  height: 20px;
  background: linear-gradient(to top, #6366f1, #8b5cf6);
  border-radius: 2px;
  animation: bar-dance 1.2s ease-in-out infinite;
}

@keyframes bar-dance {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(2); }
}

/* ARTICLES SECTION */
.articles-section {
  padding: 5rem 0;
  position: relative;
}

.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.section-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #6366f1;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  color: #e4e4e7;
}

.section-line {
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, transparent, #6366f1, transparent);
  margin: 0 auto;
}

/* CYBER GRID */
.cyber-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 2.5rem;
  margin-bottom: 4rem;
}

/* CYBER CARD */
.cyber-card {
  position: relative;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
  transform-style: preserve-3d;
}

.cyber-card:hover {
  transform: translateY(-12px) rotateX(5deg);
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 
    0 25px 50px rgba(99, 102, 241, 0.15),
    0 0 0 1px rgba(99, 102, 241, 0.2);
}

.card-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6, #6366f1);
  border-radius: 24px;
  opacity: 0;
  filter: blur(10px);
  transition: opacity 0.4s ease;
  z-index: -1;
}

.cyber-card:hover .card-glow {
  opacity: 0.6;
}

/* CARD IMAGE */
.card-image {
  position: relative;
  height: 280px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.cyber-card:hover .card-image img {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1));
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cyber-card:hover .image-overlay {
  opacity: 1;
}

.overlay-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.05) 10px, rgba(255, 255, 255, 0.05) 20px);
}

/* PLACEHOLDER */
.card-placeholder {
  height: 280px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.placeholder-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(99, 102, 241, 0.1) 20px, rgba(99, 102, 241, 0.1) 40px);
}

.placeholder-icon {
  font-size: 3rem;
  opacity: 0.7;
  z-index: 2;
}

/* CARD CONTENT */
.card-content {
  padding: 2rem;
  position: relative;
}

.card-header {
  position: relative;
  margin-bottom: 1.5rem;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e4e4e7;
  margin: 0;
  line-height: 1.4;
  transition: color 0.3s ease;
  position: relative;
  z-index: 2;
}

.cyber-card:hover .card-title {
  color: #6366f1;
}

.title-glow {
  position: absolute;
  inset: -5px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border-radius: 8px;
  opacity: 0;
  filter: blur(15px);
  transition: opacity 0.3s ease;
  z-index: 1;
}

.cyber-card:hover .title-glow {
  opacity: 0.3;
}

/* META INFO */
.card-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 12px;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #6366f1;
}

.meta-value {
  font-size: 0.9rem;
  font-weight: 600;
  color: #e4e4e7;
}

.meta-divider {
  width: 1px;
  height: 30px;
  background: linear-gradient(to bottom, transparent, #6366f1, transparent);
}

/* SUMMARY */
.card-summary {
  margin-bottom: 2rem;
}

.card-summary p {
  color: #a1a1aa;
  line-height: 1.7;
  margin: 0;
  font-size: 1rem;
}

/* QUANTUM READ BUTTON */
.quantum-read-btn {
  position: relative;
  width: 100%;
  height: 60px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
}

.btn-core {
  position: absolute;
  inset: 0;
  background: rgba(99, 102, 241, 0.1);
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.cyber-card:hover .btn-core {
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
  box-shadow: 
    0 0 20px rgba(99, 102, 241, 0.3),
    inset 0 0 20px rgba(99, 102, 241, 0.1);
}

.btn-rings {
  position: absolute;
  inset: -2px;
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.btn-rings::before,
.btn-rings::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid #6366f1;
  border-radius: 16px;
  animation: ring-pulse 2s infinite;
}

.btn-rings::after {
  animation-delay: 1s;
}

.cyber-card:hover .btn-rings {
  opacity: 1;
}

@keyframes ring-pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.05); opacity: 0; }
}

.btn-text {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e4e4e7;
  font-weight: 600;
  font-size: 1rem;
  position: relative;
  z-index: 2;
  transition: color 0.3s ease;
}

.cyber-card:hover .btn-text {
  color: #6366f1;
}

.btn-icon {
  font-size: 1.2rem;
}

.btn-arrow {
  color: #6366f1;
  font-size: 1.2rem;
  font-weight: 700;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

.cyber-card:hover .btn-arrow {
  transform: translateX(5px);
}

/* CARD BORDER */
.card-border {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 2px;
  background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.5), transparent);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cyber-card:hover .card-border {
  opacity: 1;
}

/* VIEW ALL SECTION */
.view-all-section {
  display: flex;
  justify-content: center;
  margin-top: 4rem;
}

.quantum-view-all {
  position: relative;
  width: 300px;
  height: 100px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.quantum-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 20px;
  transition: all 0.4s ease;
}

.quantum-view-all:hover .quantum-bg {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  border-color: #6366f1;
  box-shadow: 
    0 10px 40px rgba(99, 102, 241, 0.2),
    0 0 0 1px rgba(99, 102, 241, 0.1);
}

.quantum-rings {
  position: absolute;
  inset: -10px;
}

.ring {
  position: absolute;
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 20px;
  animation: quantum-ring 8s linear infinite;
}

.ring-1 { inset: 0; animation-duration: 8s; }
.ring-2 { inset: 5px; animation-duration: 12s; animation-direction: reverse; }
.ring-3 { inset: 10px; animation-duration: 16s; }

@keyframes quantum-ring {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.quantum-content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  z-index: 2;
}

.quantum-icon {
  font-size: 1.5rem;
}

.quantum-text {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #e4e4e7;
  transition: color 0.3s ease;
}

.quantum-view-all:hover .quantum-text {
  color: #6366f1;
}

.quantum-count {
  font-size: 0.8rem;
  color: #6366f1;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .cyber-grid {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2.8rem;
  }
}

@media (max-width: 768px) {
  .cyber-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .hero-title {
    font-size: 2.2rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .card-image,
  .card-placeholder {
    height: 220px;
  }
  
  .quantum-view-all {
    width: 250px;
    height: 80px;
  }
  
  .quantum-text {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .section-container {
    padding: 0 1rem;
  }
  
  .hero-content {
    padding: 0 1rem;
  }
  
  .card-meta {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }
  
  .meta-divider {
    width: 50px;
    height: 1px;
  }
  
  .card-title {
    font-size: 1.3rem;
  }
  
  .quantum-loader {
    width: 80px;
    height: 80px;
  }
}
</style>