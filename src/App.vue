<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { formatDate } from '@/utils/formatDate.js'
import { supabase } from '@/client/supabase'

const route = useRoute()
const router = useRouter()
const isMenuOpen = ref(false)
const showScrollButton = ref(false)
const activeSection = ref(0)
const mousePosition = ref({ x: 0, y: 0 })
const currentTestimonial = ref(0)
const articles = ref([]) // Динамические статьи из Supabase
const isLoading = ref(true)

// Проверяем, находимся ли на главной странице
const isHomePage = computed(() => route.path === '/' || route.path === '/home')

const menuItems = [
  { name: 'Home', link: '/', icon: '01' },
  { name: 'Services', link: '/services', icon: '02' },
  { name: 'About', link: '/about', icon: '03' },
  { name: 'Blog', link: '/blog', icon: '04' },
  { name: 'Contact', link: '/contact', icon: '05' }
]

const testimonials = [
  {
    id: 1,
    name: "Michael Schmidt",
    role: "Outdoor Enthusiast",
    content: "Der beste Rucksack, den ich je hatte! Die Qualität ist außergewöhnlich und das Design ist perfekt für lange Wanderungen. Sehr empfehlenswert!",
    rating: 5,
    avatar: "MS",
    image: "/images/comment-avatar-1.jpg"
  },
  {
    id: 2,
    name: "Anna Weber",
    role: "Travel Blogger",
    content: "Fantastischer Service und hochwertige Rucksäcke! Die Beratung war ausgezeichnet und ich habe den perfekten Reiserucksack gefunden.",
    rating: 5,
    avatar: "AW",
    image: "/images/comment-avatar-2.jpg"
  },
  {
    id: 3,
    name: "Thomas Müller",
    role: "Sports Trainer",
    content: "Robuste Sportrucksäcke mit durchdachten Features. Die Qualität überzeugt auf ganzer Linie. Perfekt für Training und Wettkämpfe.",
    rating: 5,
    avatar: "TM",
    image: "/images/comment-avatar-3.jpg"
  }
]

// Функции для работы со статьями (из Blog.vue)
const fetchArticles = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('ashley_articles')
      .select('*')
      .order('published_date', { ascending: false })
      .limit(3) // Ограничиваем до 3 статей на главной

    if (error) throw error
    articles.value = data
    isLoading.value = false
  } catch (error) {
    console.error('Error fetching articles:', error)
    isLoading.value = false
  }
}

const navigateToArticle = (article) => {
  const titleSlug = article.title.toLowerCase().replace(/\s+/g, '-')
  router.push(`/article/${titleSlug}`)
}

const routeToLatest = () => {
  router.push('/blog')
}

// Навигационные функции для кнопок
const navigateToServices = () => {
  router.push('/services')
}

const navigateToContact = () => {
  router.push('/contact')
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  if (isMenuOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 500
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleMouseMove = (e) => {
  mousePosition.value = { x: e.clientX, y: e.clientY }
}

const nextTestimonial = () => {
  currentTestimonial.value = (currentTestimonial.value + 1) % testimonials.length
}

const prevTestimonial = () => {
  currentTestimonial.value = currentTestimonial.value === 0 ? testimonials.length - 1 : currentTestimonial.value - 1
}

// Функция для обработки ошибки загрузки изображения
const handleImageError = (event) => {
  // Скрываем изображение и показываем fallback с инициалами
  event.target.style.display = 'none'
  const fallback = event.target.nextElementSibling
  if (fallback && fallback.classList.contains('avatar-fallback')) {
    fallback.style.display = 'flex'
  }
}

const spotlightStyle = computed(() => ({
  background: `radial-gradient(600px at ${mousePosition.value.x}px ${mousePosition.value.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`
}))

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('mousemove', handleMouseMove)
  
  // Загружаем статьи при монтировании компонента
  fetchArticles()
  
  // Auto-rotate testimonials
  setInterval(() => {
    nextTestimonial()
  }, 5000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="app-container">
    <div class="spotlight" :style="spotlightStyle"></div>
    
    <header class="futuristic-header">
      <div class="header-grid">
        <div class="brand-section">
          <router-link to="/" class="brand">
            <div class="brand-symbol">
              <div class="hexagon">
                <span class="brand-initial">R</span>
              </div>
            </div>
            <div class="brand-info">
              <h1 class="brand-name">RUCKSACK</h1>
              <div class="brand-tagline">KAUFEN PREMIUM</div>
            </div>
          </router-link>
        </div>

        <div class="header-actions">
          <button class="emergency-button" @click="navigateToContact">
            <span class="emergency-pulse"></span>
            <span>BERATUNG</span>
          </button>
          
          <button class="menu-trigger" @click="toggleMenu">
            <div class="menu-icon" :class="{ active: isMenuOpen }">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>

      <div class="header-border"></div>
    </header>

    <!-- КОНТЕНТ ГЛАВНОЙ СТРАНИЦЫ - ПОКАЗЫВАЕТСЯ ТОЛЬКО НА ГЛАВНОЙ -->
    <template v-if="isHomePage">
      <!-- HERO SECTION WITH ACTION BUTTONS -->
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">Rucksack kaufen – Online Vergleich – Was ist wichtig</h1>
          <p class="hero-subtitle">Premium Qualität • Professionelle Beratung • Beste Preise</p>
          
          <div class="hero-actions">
            <button class="cyber-button primary" @click="navigateToServices">
              <div class="button-glow"></div>
              <div class="button-content">
                <span class="button-icon">📅</span>
                <span class="button-text">Beratung buchen</span>
                <div class="button-particles"></div>
              </div>
            </button>
            
            <button class="cyber-button emergency" @click="navigateToContact">
              <div class="button-glow emergency-glow"></div>
              <div class="button-content">
                <span class="button-icon">🚨</span>
                <span class="button-text">Sofort-Beratung</span>
                <div class="emergency-indicator"></div>
              </div>
            </button>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS SECTION -->
      <section class="testimonials-section">
        <div class="section-container">
          <div class="section-header">
            <h2 class="section-title">Was unsere Kunden sagen</h2>
            <span class="section-tag">KUNDENBEWERTUNGEN</span>
            <div class="section-line"></div>
          </div>

          <div class="testimonials-carousel">
            <div class="testimonial-track" :style="{ transform: `translateX(-${currentTestimonial * 100}%)` }">
              <div 
                v-for="testimonial in testimonials" 
                :key="testimonial.id"
                class="testimonial-card"
              >
                <div class="testimonial-content">
                  <div class="quote-mark">"</div>
                  <p class="testimonial-text">{{ testimonial.content }}</p>
                  
                  <div class="testimonial-footer">
                    <div class="client-info">
                      <div class="client-avatar">
                        <!-- ОСНОВНОЕ ИЗОБРАЖЕНИЕ -->
                        <img 
                          :src="testimonial.image" 
                          :alt="testimonial.name"
                          class="avatar-image"
                          @error="handleImageError"
                        >
                        <!-- FALLBACK С ИНИЦИАЛАМИ -->
                        <div class="avatar-fallback">
                          <span>{{ testimonial.avatar }}</span>
                        </div>
                      </div>
                      <div class="client-details">
                        <h4 class="client-name">{{ testimonial.name }}</h4>
                        <p class="client-role">{{ testimonial.role }}</p>
                      </div>
                    </div>
                    
                    <div class="rating">
                      <span v-for="star in testimonial.rating" :key="star" class="star">★</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="carousel-controls">
              <button @click="prevTestimonial" class="carousel-btn prev">←</button>
              <div class="carousel-indicators">
                <button 
                  v-for="(_, index) in testimonials" 
                  :key="index"
                  @click="currentTestimonial = index"
                  class="indicator"
                  :class="{ active: currentTestimonial === index }"
                ></button>
              </div>
              <button @click="nextTestimonial" class="carousel-btn next">→</button>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA SECTION -->
      <section class="cta-section">
        <div class="cta-container">
          <div class="cta-content">
            <div class="cta-header">
              <h2 class="cta-title">Brauchen Sie einen Rucksack?</h2>
              <p class="cta-subtitle">Wir helfen Ihnen bei der Auswahl des perfekten Rucksacks</p>
            </div>
            
            <div class="cta-stats">
              <div class="stat-item">
                <span class="stat-number">500+</span>
                <span class="stat-label">RUCKSÄCKE</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">24/7</span>
                <span class="stat-label">BERATUNG</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">100%</span>
                <span class="stat-label">ZUFRIEDENHEIT</span>
              </div>
            </div>
            
            <div class="cta-actions">
              <button class="quantum-button call" @click="navigateToContact">
                <div class="quantum-core"></div>
                <div class="quantum-rings"></div>
                <span class="quantum-text">
                  <span class="quantum-icon">📞</span>
                  Anrufen
                </span>
              </button>
              
              <button class="quantum-button contact" @click="navigateToContact">
                <div class="quantum-core"></div>
                <div class="quantum-rings"></div>
                <span class="quantum-text">
                  <span class="quantum-icon">💬</span>
                  Kontakt
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- LATEST POSTS SECTION - РЕАЛЬНЫЕ ДАННЫЕ ИЗ SUPABASE -->
      <section class="latest-posts">
        <div class="section-container">
          <div class="latest-posts-header">
            <span class="header-icon">📅</span>
            <h3 class="section-title">Neueste Beiträge</h3>
          </div>
          
          <!-- LOADING STATE -->
          <div v-if="isLoading" class="loading-state">
            <div class="loading-spinner">
              <div class="spinner-ring"></div>
              <div class="spinner-core"></div>
            </div>
            <p class="loading-text">Lade neueste Beiträge...</p>
          </div>
          
          <!-- ARTICLES GRID -->
          <div v-else-if="articles.length > 0" class="blog-grid">
            <article 
              v-for="article in articles" 
              @click="navigateToArticle(article)" 
              :key="article.id" 
              class="blog-post"
            >
              <div class="post-image" v-if="article.image_url">
                <img :src="article.image_url" :alt="article.title">
              </div>
              <div class="post-header">
                <h4>{{ article.title }}</h4>
                <div class="post-meta">
                  <span class="author">von {{ article.author }}</span>
                  <span class="date">{{ formatDate(article.published_date) }}</span>
                </div>
              </div>
              <div class="post-content">
                <p>{{ article.summary }}</p>
              </div>
              <button class="read-more">Mehr lesen →</button>
            </article>
          </div>
          
          <!-- VIEW ALL BUTTON -->
          <div v-if="!isLoading && articles.length > 0" class="view-all-container">
            <button @click="routeToLatest" class="view-all-button">
              <span class="view-all-text">ALLE ANZEIGEN</span>
              <span class="view-all-arrow">→</span>
            </button>
          </div>
          
          <!-- NO ARTICLES STATE -->
          <div v-else-if="!isLoading && articles.length === 0" class="no-articles">
            <p class="no-articles-text">Keine Artikel gefunden</p>
          </div>
        </div>
      </section>
    </template>

    <!-- ROUTER VIEW - ПОКАЗЫВАЕТ КОНТЕНТ ДРУГИХ СТРАНИЦ -->
    <main class="router-content" :class="{ 'is-home': isHomePage }">
      <RouterView />
    </main>

    <footer class="cyber-footer">
      <div class="footer-grid">
        <div class="footer-column">
          <div class="column-header">
            <span class="column-icon">◆</span>
            <h3>KONTAKT</h3>
          </div>
          <div class="column-content">
            <div class="data-row">
              <span class="data-label">ADR</span>
              <span class="data-value">Musterstraße 123</span>
            </div>
            <div class="data-row">
              <span class="data-label">TEL</span>
              <span class="data-value">(123) 456-7890</span>
            </div>
            <div class="data-row">
              <span class="data-label">WEB</span>
              <span class="data-value">info@rucksack-kaufen.de</span>
            </div>
          </div>
        </div>

        <div class="footer-column">
          <div class="column-header">
            <span class="column-icon">◆</span>
            <h3>NAVIGATION</h3>
          </div>
          <div class="column-content">
            <router-link to="/" class="operation-link">Home</router-link>
            <router-link to="/services" class="operation-link">Services</router-link>
            <router-link to="/about" class="operation-link">About</router-link>
            <router-link to="/blog" class="operation-link">Blog</router-link>
            <router-link to="/contact" class="operation-link">Contact</router-link>
          </div>
        </div>

        <div class="footer-column">
          <div class="column-header">
            <span class="column-icon">◆</span>
            <h3>SERVICE</h3>
          </div>
          <div class="column-content">
            <div class="status-item">
              <span class="status-indicator online"></span>
              <span>Shop Online</span>
            </div>
            <div class="status-item">
              <span class="status-indicator online"></span>
              <span>24/7 Beratung Aktiv</span>
            </div>
            <div class="status-item">
              <span class="status-indicator online"></span>
              <span>Kostenloser Versand</span>
            </div>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-pattern"></div>
        <div class="footer-info">
          <span class="copyright">© {{ new Date().getFullYear() }} RUCKSACK KAUFEN</span>
          <span class="separator">|</span>
          <router-link to="/privacy-policy" class="footer-link">DATENSCHUTZ</router-link>
          <span class="separator">|</span>
          <router-link to="/terms" class="footer-link">AGB</router-link>
        </div>
      </div>
    </footer>

    <transition name="menu-slide">
      <div class="fullscreen-menu" v-if="isMenuOpen">
        <div class="menu-background"></div>
        <nav class="menu-content">
          <div class="menu-items">
            <router-link 
              v-for="(item, index) in menuItems" 
              :key="item.name"
              :to="item.link" 
              @click="toggleMenu"
              class="menu-item"
              :class="{ active: route.path === item.link }"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              <span class="item-index">{{ item.icon }}</span>
              <span class="item-name">{{ item.name }}</span>
              <span class="item-arrow">→</span>
            </router-link>
          </div>
          <div class="menu-footer">
            <div class="contact-info">
              <div class="info-item">
                <span class="info-label">24/7 HOTLINE</span>
                <span class="info-value">(123) 456-7890</span>
              </div>
              <div class="info-item">
                <span class="info-label">BERATUNG</span>
                <span class="info-value">KOSTENLOS</span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </transition>

    <button v-if="showScrollButton" @click="scrollToTop" class="quantum-scroll">
      <div class="scroll-ring"></div>
      <div class="scroll-core">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M7 14L12 9L17 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </button>
  </div>
</template>

<style scoped>
/* ВСЕ ОСНОВНЫЕ СТИЛИ */
.router-content {
  min-height: 50vh;
  position: relative;
}

.router-content.is-home {
  display: none;
}

.menu-item.active {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
}

/* НОВЫЕ СТИЛИ ДЛЯ АВАТАРОК С ИЗОБРАЖЕНИЯМИ */
.client-avatar {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(99, 102, 241, 0.3);
  transition: all 0.3s ease;
}

.client-avatar:hover {
  border-color: #6366f1;
  box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
  display: block;
}

.client-avatar:hover .avatar-image {
  transform: scale(1.1);
}

.avatar-fallback {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: none; /* Изначально скрыто */
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 1.2rem;
}

/* СТИЛИ ДЛЯ ДИНАМИЧЕСКОЙ СЕКЦИИ LATEST POSTS */
.latest-posts {
  background: linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.02));
  position: relative;
}

.latest-posts .section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 5rem 2rem;
}

.latest-posts-header {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
}

.header-icon {
  font-size: 2.5rem;
  line-height: 1;
}

.latest-posts-header .section-title {
  margin: 0;
}

.latest-posts .section-title {
  font-size: 2.5rem;
  font-weight: 900;
  text-align: center;
  background: linear-gradient(135deg, #e4e4e7, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.blog-post {
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
}

.blog-post:hover {
  transform: translateY(-8px);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 
    0 20px 40px rgba(99, 102, 241, 0.1),
    0 0 0 1px rgba(99, 102, 241, 0.1);
}

.post-image {
  position: relative;
  height: 250px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-post:hover .post-image img {
  transform: scale(1.05);
}

.post-header {
  padding: 2rem 2rem 1rem 2rem;
}

.post-header h4 {
  margin: 0 0 1rem 0;
  font-size: 1.4rem;
  font-weight: 700;
  color: #e4e4e7;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.blog-post:hover .post-header h4 {
  color: #6366f1;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  font-size: 0.85rem;
  color: #a1a1aa;
}

.author {
  color: #6366f1;
  font-weight: 600;
}

.date {
  color: #a1a1aa;
}

.post-content {
  padding: 0 2rem 1rem 2rem;
}

.post-content p {
  color: #a1a1aa;
  line-height: 1.6;
  margin: 0;
}

.read-more {
  margin: 1rem 2rem 2rem 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  color: #6366f1;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.read-more::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50px;
}

.blog-post:hover .read-more::before {
  opacity: 0.1;
}

.blog-post:hover .read-more {
  border-color: #6366f1;
  color: white;
  transform: translateX(5px);
}

/* VIEW ALL BUTTON */
.view-all-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.view-all-button {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: rgba(99, 102, 241, 0.1);
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 50px;
  color: #6366f1;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.view-all-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 50px;
}

.view-all-button:hover::before {
  opacity: 0.1;
}

.view-all-button:hover {
  border-color: #6366f1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
}

.view-all-text,
.view-all-arrow {
  position: relative;
  z-index: 1;
}

.view-all-arrow {
  transition: transform 0.3s ease;
}

.view-all-button:hover .view-all-arrow {
  transform: translateX(5px);
}

/* LOADING STATE */
.loading-state {
  text-align: center;
  padding: 4rem 2rem;
}

.loading-spinner {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
}

.spinner-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-top: 2px solid #6366f1;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.spinner-core {
  position: absolute;
  inset: 15px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  opacity: 0.8;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.loading-text {
  color: #a1a1aa;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

/* NO ARTICLES STATE */
.no-articles {
  text-align: center;
  padding: 4rem 2rem;
}

.no-articles-text {
  color: #a1a1aa;
  font-size: 1.1rem;
  font-weight: 500;
  margin: 0;
}

/* ВСЕ ОСТАЛЬНЫЕ СТИЛИ */
* {
  box-sizing: border-box;
}

.app-container {
  position: relative;
  min-height: 100vh;
  background: #0a0a0f;
  color: #e4e4e7;
  overflow-x: hidden;
}

.spotlight {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* HEADER STYLES */
.futuristic-header {
  position: sticky;
  top: 0;
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
  z-index: 100;
}

.header-grid {
  max-width: 1400px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 3rem;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
}

.brand-symbol {
  position: relative;
}

.hexagon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.brand-initial {
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
}

.brand-name {
  margin: 0;
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  background: linear-gradient(to right, #e4e4e7, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.brand-tagline {
  font-size: 0.7rem;
  letter-spacing: 0.3em;
  color: #6366f1;
  font-weight: 500;
}

/* HEADER ACTIONS */
.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.emergency-button {
  position: relative;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid #ef4444;
  color: #ef4444;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 0.1em;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
}

.emergency-button:hover {
  color: white;
  background: #ef4444;
  box-shadow: 0 0 20px rgba(239, 68, 68, 0.5);
}

.emergency-pulse {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 10px;
  height: 10px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}

.menu-trigger {
  width: 50px;
  height: 50px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.menu-trigger:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
}

.menu-icon {
  width: 24px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.menu-icon span {
  width: 100%;
  height: 2px;
  background: #e4e4e7;
  transition: all 0.3s ease;
  position: absolute;
}

.menu-icon span:nth-child(1) { 
  top: 0; 
}
.menu-icon span:nth-child(2) { 
  top: 50%; 
  transform: translateY(-50%); 
}
.menu-icon span:nth-child(3) { 
  bottom: 0; 
}

.menu-icon.active span:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

.menu-icon.active span:nth-child(2) {
  opacity: 0;
}

.menu-icon.active span:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

/* HERO SECTION */
.hero-section {
  padding: 5rem 2rem;
  text-align: center;
  position: relative;
  background: linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.02));
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-title {
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #e4e4e7, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.02em;
}

.hero-subtitle {
  font-size: 1.2rem;
  color: #a1a1aa;
  margin-bottom: 3rem;
  letter-spacing: 0.05em;
}

.hero-actions {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* CYBER BUTTONS */
.cyber-button {
  position: relative;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  outline: none;
}

.button-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border-radius: 12px;
  filter: blur(8px);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-button:hover .button-glow {
  opacity: 0.7;
}

.emergency-glow {
  background: linear-gradient(45deg, #ef4444, #f97316) !important;
}

.button-content {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(99, 102, 241, 0.1);
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  color: #e4e4e7;
  font-weight: 600;
  font-size: 1rem;
  letter-spacing: 0.02em;
  transition: all 0.3s ease;
  overflow: hidden;
}

.cyber-button.emergency .button-content {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  color: #ef4444;
}

.cyber-button:hover .button-content {
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
  transform: translateY(-2px);
}

.cyber-button.emergency:hover .button-content {
  background: rgba(239, 68, 68, 0.2);
  border-color: #ef4444;
  color: white;
}

.button-icon {
  font-size: 1.2rem;
}

.button-particles {
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="%236366f1" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></circle><circle cx="80" cy="30" r="0.5" fill="%238b5cf6" opacity="0.7"><animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/></circle></svg>') no-repeat;
  background-size: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-button:hover .button-particles {
  opacity: 1;
}

.emergency-indicator {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  background: #ef4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

/* SECTION STYLES */
.section-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 5rem 2rem;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
  margin-bottom: 1rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 0.5rem 0;
  background: linear-gradient(135deg, #e4e4e7, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-line {
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, transparent, #6366f1, transparent);
  margin: 0 auto;
}

/* TESTIMONIALS */
.testimonials-section {
  background: linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.02), transparent);
}

.testimonials-carousel {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
}

.testimonial-track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-card {
  min-width: 100%;
  padding: 0 2rem;
}

.testimonial-content {
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 20px;
  padding: 3rem;
  position: relative;
}

.quote-mark {
  position: absolute;
  top: 1rem;
  left: 2rem;
  font-size: 4rem;
  color: #6366f1;
  opacity: 0.3;
  font-family: serif;
}

.testimonial-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #e4e4e7;
  margin: 2rem 0;
  font-style: italic;
}

.testimonial-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.client-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.client-name {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #e4e4e7;
}

.client-role {
  margin: 0;
  font-size: 0.9rem;
  color: #6366f1;
}

.rating {
  display: flex;
  gap: 0.2rem;
}

.star {
  color: #fbbf24;
  font-size: 1.2rem;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
}

.carousel-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  color: #6366f1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
}

.carousel-btn:hover {
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
  transform: scale(1.1);
}

.carousel-indicators {
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(99, 102, 241, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #6366f1;
  box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
}

/* CTA SECTION */
.cta-section {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  border-top: 1px solid rgba(99, 102, 241, 0.2);
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.cta-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  text-align: center;
}

.cta-title {
  font-size: 3rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #e4e4e7, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cta-subtitle {
  font-size: 1.3rem;
  color: #a1a1aa;
  margin-bottom: 3rem;
}

.cta-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2.5rem;
  font-weight: 900;
  color: #6366f1;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: #a1a1aa;
  letter-spacing: 0.1em;
  font-weight: 600;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: linear-gradient(to bottom, transparent, #6366f1, transparent);
}

.cta-actions {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* QUANTUM BUTTONS */
.quantum-button {
  position: relative;
  width: 180px;
  height: 180px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.quantum-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.quantum-button.contact .quantum-core {
  background: linear-gradient(135deg, #8b5cf6, #a855f7);
}

.quantum-rings {
  position: absolute;
  inset: 0;
}

.quantum-rings::before,
.quantum-rings::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(99, 102, 241, 0.3);
  animation: quantum-spin 10s linear infinite;
}

.quantum-rings::before {
  inset: 10px;
  animation-direction: normal;
}

.quantum-rings::after {
  inset: 20px;
  animation-direction: reverse;
  animation-duration: 15s;
}

@keyframes quantum-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.quantum-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: 700;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
}

.quantum-icon {
  font-size: 1.5rem;
}

.quantum-button:hover .quantum-core {
  transform: translate(-50%, -50%) scale(1.1);
  box-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
}

.quantum-button:hover .quantum-rings::before,
.quantum-button:hover .quantum-rings::after {
  border-color: #6366f1;
}

/* FOOTER */
.cyber-footer {
  margin-top: 5rem;
  background: linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.05));
  border-top: 1px solid rgba(99, 102, 241, 0.2);
  padding: 4rem 0 0;
}

.footer-grid {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem;
}

.column-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.column-icon {
  color: #6366f1;
  font-size: 1.2rem;
}

.column-header h3 {
  margin: 0;
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  font-weight: 700;
  color: #e4e4e7;
}

.data-row {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
}

.data-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #6366f1;
  letter-spacing: 0.1em;
}

.data-value {
  color: #a1a1aa;
}

.operation-link {
  display: block;
  padding: 0.75rem 0;
  color: #a1a1aa;
  text-decoration: none;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
  transition: all 0.3s ease;
}

.operation-link:hover {
  color: #6366f1;
  padding-left: 1rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
}

.status-indicator.online {
  background: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

.footer-bottom {
  margin-top: 3rem;
  padding: 2rem;
  background: rgba(99, 102, 241, 0.05);
  position: relative;
  overflow: hidden;
}

.footer-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(99, 102, 241, 0.03) 35px, rgba(99, 102, 241, 0.03) 70px);
  pointer-events: none;
}

.footer-info {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
  font-size: 0.85rem;
}

.separator {
  color: #6366f1;
}

.footer-link {
  color: #a1a1aa;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #6366f1;
}

/* FULLSCREEN MENU */
.fullscreen-menu {
  position: fixed;
  inset: 0;
  z-index: 200;
}

.menu-background {
  position: absolute;
  inset: 0;
  background: rgba(10, 10, 15, 0.98);
  backdrop-filter: blur(50px);
}

.menu-content {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1.5rem 3rem;
  text-decoration: none;
  color: #a1a1aa;
  font-size: 1.5rem;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: slideIn 0.5s ease forwards;
  opacity: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.menu-item:hover {
  color: white;
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateX(10px);
}

.item-index {
  font-size: 0.9rem;
  color: #6366f1;
  font-weight: 700;
}

.item-arrow {
  margin-left: auto;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.menu-item:hover .item-arrow {
  opacity: 1;
  transform: translateX(0);
}

.menu-footer {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}

.contact-info {
  display: flex;
  gap: 3rem;
}

.info-item {
  text-align: center;
}

.info-label {
  display: block;
  font-size: 0.75rem;
  color: #6366f1;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.info-value {
  display: block;
  font-size: 1.1rem;
  color: #e4e4e7;
  font-weight: 500;
}

/* SCROLL BUTTON */
.quantum-scroll {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 99;
}

.scroll-ring {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 50%;
  animation: ring-pulse 2s infinite;
}

@keyframes ring-pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.5; }
}

.scroll-core {
  position: absolute;
  inset: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  transition: all 0.3s ease;
}

.quantum-scroll:hover .scroll-core {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(99, 102, 241, 0.5);
}

/* TRANSITIONS */
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: all 0.3s ease;
}

.menu-slide-enter-from,
.menu-slide-leave-to {
  opacity: 0;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .emergency-button {
    display: none;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
  
  .quantum-button {
    width: 150px;
    height: 150px;
  }
  
  .quantum-core {
    width: 100px;
    height: 100px;
  }
  
  .blog-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .header-grid {
    padding: 1rem;
  }
  
  .brand-name {
    font-size: 1.5rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .cta-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .stat-divider {
    width: 50px;
    height: 1px;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .quantum-button {
    width: 120px;
    height: 120px;
  }
  
  .quantum-core {
    width: 80px;
    height: 80px;
  }
  
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .menu-item {
    font-size: 1.2rem;
    padding: 1rem 2rem;
  }
  
  .blog-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title,
  .latest-posts-header .section-title {
    font-size: 2rem;
  }
  
  .header-icon {
    font-size: 2rem;
  }

  .cta-title {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .testimonial-content {
    padding: 2rem 1rem;
  }
  
  .contact-info {
    flex-direction: column;
    gap: 1rem;
  }
  
  .carousel-controls {
    flex-direction: column;
    gap: 1rem;
  }
  
  .post-header {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
  }
  
  .post-content {
    padding: 0 1.5rem 1rem 1.5rem;
  }
  
  .read-more {
    margin: 1rem 1.5rem 1.5rem 1.5rem;
  }
}
</style>
