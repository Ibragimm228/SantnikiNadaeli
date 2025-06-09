<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const mousePosition = ref({ x: 0, y: 0 })

const stats = [
  { number: '10+', label: 'Jahre Erfahrung', icon: '⚡' },
  { number: '5K+', label: 'Zufriedene Kunden', icon: '👥' },
  { number: '24/7', label: 'Beratungsservice', icon: '🚨' },
  { number: '500+', label: 'Rucksack Modelle', icon: '🎒' }
]

const team = [
  {
    name: 'Klaus Weber',
    role: 'Geschäftsführer',
    code: 'CEO-001',
    description: '15+ Jahre Erfahrung im Outdoor- und Reiseausrüstungsbereich.',
    avatar: 'KW',
    level: 'EXPERT',
    image: '/images/team-member-1.jpg'
  },
  {
    name: 'Anna Schmidt',
    role: 'Produktberaterin',
    code: 'PRD-002',
    description: 'Spezialistin für Wanderrucksäcke und Outdoor-Ausrüstung.',
    avatar: 'AS',
    level: 'PRO',
    image: '/images/team-member-2.jpg'
  },
  {
    name: 'Michael Müller',
    role: 'Kundenservice',
    code: 'SVC-003',
    description: 'Ihr erster Ansprechpartner für Beratung und Support.',
    avatar: 'MM',
    level: 'ELITE',
    image: '/images/team-member-3.jpg'
  },
  {
    name: 'Sarah Hoffmann',
    role: 'Reise-Expertin',
    code: 'TRV-004',
    description: 'Spezialisiert auf Reiserucksäcke und Travel-Gear.',
    avatar: 'SH',
    level: 'QUANTUM',
    image: '/images/team-member-4.jpg'
  }
]

const certifications = [
  { name: 'Autorisierter Händler', code: 'AH-2024', status: 'AKTIV' },
  { name: 'Outdoor Industry Zertifiziert', code: 'OIC-2024', status: 'AKTIV' },
  { name: 'ISO 9001 Qualitätsmanagement', code: 'ISO-2024', status: 'AKTIV' },
  { name: 'Trusted Shops Siegel', code: 'TS-A+', status: 'VERIFIZIERT' },
  { name: 'TÜV Geprüfter Online-Shop', code: 'TÜV-2024', status: 'AKTIV' },
  { name: 'Nachhaltiges Handeln Zertifikat', code: 'NH-2024', status: 'AKTIV' }
]

// Navigation functions
const navigateToContact = () => {
  router.push('/contact')
}

const handleMouseMove = (e) => {
  mousePosition.value = { x: e.clientX, y: e.clientY }
}

const spotlightStyle = computed(() => ({
  background: `radial-gradient(300px at ${mousePosition.value.x}px ${mousePosition.value.y}px, rgba(99, 102, 241, 0.06), transparent 60%)`
}))

// Image error handler
const handleImageError = (event) => {
  console.error('Fehler beim Laden des Bildes:', event.target.src)
  // Fallback zu placeholder
  event.target.src = 'https://via.placeholder.com/400x600/6366f1/ffffff?text=Team'
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <main class="about-page">
    <div class="spotlight" :style="spotlightStyle"></div>
    
    <!-- Hero Section -->
    <section class="about-hero">
      <div class="hero-background"></div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">🎒</span>
            <span class="badge-text">ÜBER RUCKSACK KAUFEN</span>
          </div>
          <h1 class="hero-title">PREMIUM RUCKSACK LÖSUNGEN</h1>
          <p class="hero-subtitle">Qualität trifft Innovation seit 2014</p>
          <div class="hero-stats">
            <div class="stat-pulse">
              <span class="pulse-dot"></span>
              <span class="pulse-text">GEGRÜNDET 2014</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="story-section">
      <div class="container">
        <div class="story-content">
          <div class="story-text">
            <div class="section-header">
              <h2 class="section-title">Unsere Geschichte</h2>
              <div class="section-line"></div>
              <span class="section-tag">FIRMENHISTORIE</span>
            </div>
            
            <div class="story-blocks">
              <div class="story-block">
                <div class="block-number">01</div>
                <div class="block-content">
                  <p>Seit über 10 Jahren hat sich Rucksack Kaufen von einem kleinen Online-Shop zu Deutschlands führendem Rucksack-Spezialisten entwickelt und bedient Kunden in ganz Europa mit höchster Qualität und Präzision.</p>
                </div>
              </div>
              
              <div class="story-block">
                <div class="block-number">02</div>
                <div class="block-content">
                  <p>Unser Engagement für Innovation, Qualität und erstklassige Beratung hat uns als die erste Wahl für Outdoor-Enthusiasten, Reisende und Sportler etabliert.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="story-visual">
            <div class="visual-container">
              <div class="hologram-effect">
                <div class="hologram-ring"></div>
                <div class="hologram-ring"></div>
                <div class="hologram-ring"></div>
                <div class="hologram-core">
                  <span class="core-symbol">🎒</span>
                </div>
              </div>
              <div class="visual-data">
                <div class="data-stream">
                  <span class="stream-label">QUALITÄT</span>
                  <span class="stream-value">100%</span>
                </div>
                <div class="data-stream">
                  <span class="stream-label">LIEFERZEIT</span>
                  <span class="stream-value">&lt;24H</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stats-background"></div>
      <div class="container">
        <div class="stats-grid">
          <div v-for="stat in stats" :key="stat.label" class="stat-card">
            <div class="stat-icon">{{ stat.icon }}</div>
            <h3 class="stat-number">{{ stat.number }}</h3>
            <p class="stat-label">{{ stat.label }}</p>
            <div class="stat-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team Section -->
    <section class="team-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Unser Expertenteam</h2>
          <div class="section-line"></div>
          <span class="section-tag">TEAM ÜBERSICHT</span>
        </div>
        
        <div class="team-grid">
          <div v-for="member in team" :key="member.name" class="team-card">
            <div class="member-image-container">
              <div class="member-image-wrapper">
                <img 
                  :src="member.image" 
                  :alt="member.name" 
                  class="member-image"
                  @error="handleImageError"
                  loading="lazy"
                >
              </div>
              <div class="image-overlay"></div>
              <div class="level-badge" :class="member.level.toLowerCase()">
                {{ member.level }}
              </div>
            </div>
            
            <div class="card-body">
              <div class="member-info">
                <h3 class="member-name">{{ member.name }}</h3>
                <p class="member-role">{{ member.role }}</p>
                <span class="member-code">{{ member.code }}</span>
              </div>
              
              <div class="card-content">
                <p class="member-description">{{ member.description }}</p>
              </div>
              
              <div class="card-footer">
                <div class="status-indicator">
                  <span class="status-dot active"></span>
                  <span class="status-text">VERFÜGBAR</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications Section -->
    <section class="certifications-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Zertifizierungen & Auszeichnungen</h2>
          <div class="section-line"></div>
          <span class="section-tag">QUALITÄTSSTANDARDS</span>
        </div>
        
        <div class="certifications-grid">
          <div v-for="cert in certifications" :key="cert.name" class="certification-card">
            <div class="cert-header">
              <span class="cert-icon">✓</span>
              <div class="cert-status" :class="cert.status.toLowerCase()">
                {{ cert.status }}
              </div>
            </div>
            <div class="cert-content">
              <h4 class="cert-name">{{ cert.name }}</h4>
              <span class="cert-code">{{ cert.code }}</span>
            </div>
            <div class="cert-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="about-cta">
      <div class="cta-background"></div>
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">Bereit für Ihren perfekten Rucksack?</h2>
          <p class="cta-subtitle">Lassen Sie sich von unseren Experten beraten!</p>
          
          <div class="cta-actions">
            <button class="quantum-button emergency" @click="navigateToContact">
              <div class="quantum-core"></div>
              <div class="quantum-rings"></div>
              <span class="quantum-text">
                <span class="quantum-icon">📞</span>
                ANRUFEN
              </span>
            </button>
            
            <button class="quantum-button contact" @click="navigateToContact">
              <div class="quantum-core"></div>
              <div class="quantum-rings"></div>
              <span class="quantum-text">
                <span class="quantum-icon">💬</span>
                KONTAKT
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.about-page {
  background: #0a0a0f;
  color: #e4e4e7;
  min-height: 100vh;
  position: relative;
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

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 2;
}

/* HERO SECTION */
.about-hero {
  padding: 8rem 0;
  position: relative;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(99, 102, 241, 0.03) 100px, rgba(99, 102, 241, 0.03) 200px);
  pointer-events: none;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #6366f1;
  margin-bottom: 2rem;
}

.badge-icon {
  color: #6366f1;
  font-size: 1rem;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #e4e4e7, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 0.02em;
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #a1a1aa;
  margin-bottom: 3rem;
  letter-spacing: 0.02em;
}

.hero-stats {
  display: flex;
  justify-content: center;
}

.stat-pulse {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 50px;
}

.pulse-dot {
  width: 12px;
  height: 12px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}

.pulse-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6366f1;
  letter-spacing: 0.05em;
}

/* STORY SECTION */
.story-section {
  padding: 8rem 0;
  background: linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.02));
}

.story-content {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 6rem;
  align-items: center;
}

.section-header {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0;
  background: linear-gradient(135deg, #e4e4e7, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-line {
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, #6366f1, transparent);
  margin-top: 1rem;
  margin-bottom: 1rem;
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

.story-blocks {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.story-block {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.block-number {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: white;
  font-size: 1.2rem;
}

.block-content p {
  color: #a1a1aa;
  line-height: 1.8;
  font-size: 1.1rem;
  margin: 0;
}

.story-visual {
  display: flex;
  justify-content: center;
}

.visual-container {
  position: relative;
  width: 300px;
  height: 300px;
}

.hologram-effect {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 50px auto;
}

.hologram-ring {
  position: absolute;
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 50%;
  animation: rotate 20s linear infinite;
}

.hologram-ring:nth-child(1) {
  inset: 0;
  animation-duration: 20s;
}

.hologram-ring:nth-child(2) {
  inset: 20px;
  animation-duration: 15s;
  animation-direction: reverse;
}

.hologram-ring:nth-child(3) {
  inset: 40px;
  animation-duration: 25s;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.hologram-core {
  position: absolute;
  inset: 60px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
}

.visual-data {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.data-stream {
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
}

.stream-label {
  display: block;
  font-size: 0.7rem;
  color: #6366f1;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 0.25rem;
}

.stream-value {
  display: block;
  font-size: 1.2rem;
  color: #e4e4e7;
  font-weight: 900;
}

/* STATS SECTION */
.stats-section {
  padding: 6rem 0;
  position: relative;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  overflow: hidden;
}

.stats-background {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.stat-card {
  position: relative;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  overflow: hidden;
}

.stat-card:hover {
  transform: translateY(-10px);
  border-color: rgba(99, 102, 241, 0.4);
}

.stat-card:hover .stat-glow {
  opacity: 1;
}

.stat-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.stat-number {
  font-size: 3rem;
  font-weight: 900;
  color: #6366f1;
  margin: 0 0 0.5rem 0;
  line-height: 1;
}

.stat-label {
  font-size: 0.9rem;
  color: #a1a1aa;
  font-weight: 600;
  letter-spacing: 0.05em;
  margin: 0;
}

.stat-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border-radius: 20px;
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.3s ease;
  z-index: -1;
}

/* TEAM SECTION */
.team-section {
  padding: 8rem 0;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  margin-top: 4rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
}

.team-card {
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 20px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.team-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
}

.member-image-container {
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
  background: #f8f9fa;
}

.member-image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.member-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 15%;
  transition: transform 0.3s ease;
  background: transparent;
  display: block;
}

.team-card:hover .member-image {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    transparent 70%, 
    rgba(10, 10, 15, 0.3) 85%, 
    rgba(10, 10, 15, 0.7) 100%
  );
  pointer-events: none;
}

.card-body {
  padding: 2rem;
}

.member-info {
  text-align: center;
  margin-bottom: 1.5rem;
}

.member-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #e4e4e7;
  margin: 0 0 0.5rem 0;
}

.member-role {
  color: #6366f1;
  font-weight: 600;
  margin: 0 0 0.25rem 0;
  font-size: 1.1rem;
}

.member-code {
  font-size: 0.85rem;
  color: #a1a1aa;
  font-family: monospace;
  letter-spacing: 0.05em;
  opacity: 0.8;
}

.level-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  border: 1px solid;
  backdrop-filter: blur(10px);
  background: rgba(10, 10, 15, 0.8);
}

.level-badge.quantum {
  background: rgba(139, 92, 246, 0.3);
  border-color: #8b5cf6;
  color: #8b5cf6;
}

.level-badge.elite {
  background: rgba(99, 102, 241, 0.3);
  border-color: #6366f1;
  color: #6366f1;
}

.level-badge.pro {
  background: rgba(16, 185, 129, 0.3);
  border-color: #10b981;
  color: #10b981;
}

.level-badge.expert {
  background: rgba(245, 158, 11, 0.3);
  border-color: #f59e0b;
  color: #f59e0b;
}

.card-content {
  margin-bottom: 1.5rem;
  text-align: center;
}

.member-description {
  color: #a1a1aa;
  line-height: 1.6;
  margin: 0;
}

.card-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(99, 102, 241, 0.1);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
}

.status-dot.active {
  background: #10b981;
  box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
}

.status-text {
  font-size: 0.8rem;
  color: #10b981;
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* CERTIFICATIONS SECTION */
.certifications-section {
  padding: 8rem 0;
  background: linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.02));
}

.certifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
}

.certification-card {
  position: relative;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
  overflow: hidden;
}

.certification-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.3);
}

.certification-card:hover .cert-glow {
  opacity: 0.5;
}

.cert-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.cert-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #10b981, #059669);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 900;
  font-size: 1.2rem;
}

.cert-status {
  padding: 0.375rem 0.75rem;
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  border: 1px solid;
}

.cert-status.aktiv {
  background: rgba(16, 185, 129, 0.2);
  border-color: #10b981;
  color: #10b981;
}

.cert-status.verifiziert {
  background: rgba(99, 102, 241, 0.2);
  border-color: #6366f1;
  color: #6366f1;
}

.cert-content {
  flex: 1;
}

.cert-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: #e4e4e7;
  margin: 0 0 0.5rem 0;
}

.cert-code {
  font-size: 0.85rem;
  color: #a1a1aa;
  font-family: monospace;
  letter-spacing: 0.05em;
}

.cert-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  border-radius: 16px;
  opacity: 0;
  filter: blur(15px);
  transition: opacity 0.3s ease;
  z-index: -1;
}

/* CTA SECTION */
.about-cta {
  padding: 8rem 0;
  position: relative;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
  overflow: hidden;
}

.cta-background {
  position: absolute;
  inset: 0;
  background-image: 
    repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(99, 102, 241, 0.03) 100px, rgba(99, 102, 241, 0.03) 200px);
  pointer-events: none;
}

.cta-content {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #e4e4e7, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.cta-subtitle {
  font-size: 1.2rem;
  color: #a1a1aa;
  margin-bottom: 3rem;
}

.cta-actions {
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* QUANTUM BUTTONS */
.quantum-button {
  position: relative;
  width: 160px;
  height: 160px;
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
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.quantum-button.emergency .quantum-core {
  background: linear-gradient(135deg, #ef4444, #dc2626);
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

.quantum-button.emergency .quantum-rings::before,
.quantum-button.emergency .quantum-rings::after {
  border-color: rgba(239, 68, 68, 0.3);
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
  font-size: 0.9rem;
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

.quantum-button.emergency:hover .quantum-core {
  box-shadow: 0 0 30px rgba(239, 68, 68, 0.5);
}

.quantum-button:hover .quantum-rings::before,
.quantum-button:hover .quantum-rings::after {
  border-color: #6366f1;
}

.quantum-button.emergency:hover .quantum-rings::before,
.quantum-button.emergency:hover .quantum-rings::after {
  border-color: #ef4444;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .story-content {
    grid-template-columns: 1fr;
    gap: 4rem;
  }
  
  .visual-data {
    position: static;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
  }
  
  .team-grid {
    gap: 2rem;
  }
  
  .certifications-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .cta-title {
    font-size: 2rem;
  }
  
  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
  
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .member-image-container {
    height: 280px;
  }
  
  .certifications-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-actions {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  
  .quantum-button {
    width: 140px;
    height: 140px;
  }
  
  .quantum-core {
    width: 90px;
    height: 90px;
  }
  
  .container {
    padding: 0 1rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .story-block {
    flex-direction: column;
    gap: 1rem;
  }
  
  .block-number {
    width: 50px;
    height: 50px;
  }
  
  .member-image-container {
    height: 250px;
  }
  
  .quantum-button {
    width: 120px;
    height: 120px;
  }
  
  .quantum-core {
    width: 80px;
    height: 80px;
  }
}
</style>
