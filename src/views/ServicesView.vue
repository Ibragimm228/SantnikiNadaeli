<script setup>
import { ref, onMounted } from 'vue'
import { Phone } from 'lucide-vue-next'
import emergencyServiceImg from '/images/contact-hero.jpg'
import waterDamageImg from '/images/water-damage.jpg'
import pipeRepairImg from '/images/frozen-pipes.jpg'

const servicesVisible = ref(false)
const mousePosition = ref({ x: 0, y: 0 })

const services = [
  {
    icon: '🚰',
    title: 'Emergency Plumbing',
    description: 'Advanced 24/7 quantum-enhanced emergency response system with AI-powered diagnostics.',
    features: [
      'Burst pipes and water leaks',
      'Blocked drains and sewers', 
      'Overflowing toilets',
      'Gas leaks and repairs',
      'Hot water system failures'
    ],
    image: emergencyServiceImg,
    gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
    glowColor: 'rgba(239, 68, 68, 0.3)'
  },
  {
    icon: '🌊',
    title: 'Drain Cleaning',
    description: 'Cyber-enhanced drain cleaning with high-pressure quantum water jetting technology.',
    features: [
      'High-pressure water jetting',
      'Video camera inspection',
      'Root removal',
      'Drain maintenance',
      'Preventive monitoring'
    ],
    image: waterDamageImg,
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    glowColor: 'rgba(6, 182, 212, 0.3)'
  },
  {
    icon: '🔧',
    title: 'Pipe Repairs',
    description: 'Next-generation pipe repair using thermal management and precision diagnostics.',
    features: [
      'Leak detection and repair',
      'Pipe replacement',
      'Repiping services',
      'Frozen pipe repair',
      'Smart monitoring systems'
    ],
    image: pipeRepairImg,
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    glowColor: 'rgba(99, 102, 241, 0.3)'
  }
]

const handleMouseMove = (e) => {
  mousePosition.value = { x: e.clientX, y: e.clientY }
}

onMounted(() => {
  servicesVisible.value = true
  window.addEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <main class="services-container">
    <div class="cosmic-background"></div>
    <!-- ИСПРАВЛЕННЫЙ SPOTLIGHT - МЕНЬШЕ И ТЕМНЕЕ -->
    <div class="spotlight" :style="{ 
      background: `radial-gradient(400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.1), transparent 80%)` 
    }"></div>

    <!-- HERO SECTION БЕЗ КРУЖКОВ -->
    <section class="services-hero">
      <div class="hero-grid">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">⚡</span>
            <span class="badge-text">ADVANCED PLUMBING SOLUTIONS</span>
          </div>
          
          <h1 class="hero-title">
            <span class="title-line">NEXT-GENERATION</span>
            <span class="title-line title-accent">PLUMBING SERVICES</span>
          </h1>
          
          <p class="hero-subtitle">
            Quantum-enhanced solutions powered by AI diagnostics and thermal management systems
          </p>
          
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">24/7</span>
              <span class="stat-label">EMERGENCY RESPONSE</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">< 15</span>
              <span class="stat-label">MIN ARRIVAL</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">100%</span>
              <span class="stat-label">SATISFACTION</span>
            </div>
          </div>
        </div>
        
        <!-- УБРАЛИ FLOATING ELEMENTS (КРУЖКИ) -->
        <div class="hero-visual">
          <!-- Визуальный элемент без кружков -->
        </div>
      </div>
    </section>

    <!-- SERVICES GRID -->
    <section class="services-section">
      <div class="section-container">
        <!-- ИСПРАВЛЕН ПОРЯДОК И РАСПОЛОЖЕНИЕ -->
        <div class="section-header">
          <h2 class="section-title">Advanced Service Matrix</h2>
          <span class="section-tag">OUR CAPABILITIES</span>
          <div class="section-line"></div>
        </div>

        <div class="services-grid">
          <div 
            v-for="(service, index) in services" 
            :key="service.title"
            class="service-card"
            :class="{ visible: servicesVisible }"
            :style="{ animationDelay: `${index * 0.2}s` }"
          >
            <div class="card-glow" :style="{ 
              background: service.gradient,
              filter: 'blur(20px)'
            }"></div>
            
            <div class="card-content">
              <div class="service-header">
                <div class="service-icon-container">
                  <span class="service-icon">{{ service.icon }}</span>
                  <div class="icon-glow" :style="{ 
                    boxShadow: `0 0 30px ${service.glowColor}` 
                  }"></div>
                </div>
                
                <div class="service-badge">
                  <span class="badge-dot"></span>
                  <span class="badge-status">ACTIVE</span>
                </div>
              </div>

              <div class="service-image">
                <img :src="service.image" :alt="service.title">
                <div class="image-overlay" :style="{ background: service.gradient }"></div>
                <div class="scan-lines"></div>
              </div>

              <div class="service-info">
                <h3 class="service-title">{{ service.title }}</h3>
                <p class="service-description">{{ service.description }}</p>

                <div class="features-grid">
                  <div 
                    v-for="feature in service.features" 
                    :key="feature"
                    class="feature-item"
                  >
                    <span class="feature-bullet">◆</span>
                    <span class="feature-text">{{ feature }}</span>
                  </div>
                </div>

                <button class="cyber-service-button" :style="{ 
                  '--button-gradient': service.gradient,
                  '--button-glow': service.glowColor 
                }">
                  <span class="button-text">ACTIVATE SERVICE</span>
                  <span class="button-arrow">→</span>
                  <div class="button-particles"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EMERGENCY CTA -->
    <section class="emergency-cta">
      <div class="cta-container">
        <div class="emergency-panel">
          <div class="panel-glow"></div>
          <div class="panel-content">
            <div class="emergency-header">
              <div class="emergency-icon">
                <Phone class="phone-icon" />
                <div class="emergency-pulse"></div>
              </div>
              <div class="emergency-info">
                <h2 class="emergency-title">EMERGENCY PROTOCOL ACTIVE</h2>
                <p class="emergency-subtitle">Quantum response team ready for immediate deployment</p>
              </div>
            </div>

            <div class="emergency-stats">
              <div class="emergency-stat">
                <span class="stat-value">< 15 MIN</span>
                <span class="stat-desc">Response Time</span>
              </div>
              <div class="emergency-stat">
                <span class="stat-value">24/7</span>
                <span class="stat-desc">Availability</span>
              </div>
              <div class="emergency-stat">
                <span class="stat-value">INSTANT</span>
                <span class="stat-desc">Connection</span>
              </div>
            </div>

            <div class="emergency-actions">
              <a href="tel:+1234567890" class="quantum-emergency-button">
                <div class="emergency-core"></div>
                <div class="emergency-rings"></div>
                <span class="emergency-text">
                  <span class="emergency-label">EMERGENCY HOTLINE</span>
                  <span class="emergency-number">(123) 456-7890</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.services-container {
  position: relative;
  min-height: 100vh;
  background: #0a0a0f;
  color: #e4e4e7;
  overflow-x: hidden;
}

.cosmic-background {
  position: fixed;
  inset: 0;
  background: 
    radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

/* ИСПРАВЛЕННЫЙ SPOTLIGHT - МЕНЬШЕ И ТЕМНЕЕ */
.spotlight {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* HERO SECTION */
.services-hero {
  padding: 8rem 2rem 6rem;
  position: relative;
  z-index: 2;
}

.hero-grid {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #6366f1;
  margin-bottom: 2rem;
}

.badge-icon {
  font-size: 1rem;
  animation: pulse 2s infinite;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 2rem;
  letter-spacing: 0.02em;
}

.title-line {
  display: block;
}

.title-accent {
  background: linear-gradient(135deg, #6366f1, #8b5cf6, #a855f7);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle {
  font-size: 1.3rem;
  color: #a1a1aa;
  line-height: 1.6;
  margin-bottom: 3rem;
  max-width: 500px;
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 900;
  color: #6366f1;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  color: #a1a1aa;
  letter-spacing: 0.1em;
  font-weight: 600;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, #6366f1, transparent);
}

.hero-visual {
  position: relative;
  height: 400px;
  /* УБРАЛИ ВСЕ FLOATING ELEMENTS */
}

/* SERVICES SECTION */
.services-section {
  padding: 6rem 2rem;
  position: relative;
  z-index: 2;
}

.section-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* ИСПРАВЛЕН HEADER - ТЕКСТ СТРОГО СНИЗУ */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-title {
  display: block;
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #e4e4e7, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.section-tag {
  display: block;
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

.section-line {
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, transparent, #6366f1, transparent);
  margin: 1rem auto 0;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 3rem;
}

.service-card {
  position: relative;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(50px);
}

.service-card.visible {
  animation: slideInUp 0.6s ease forwards;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.service-card:hover {
  transform: translateY(-10px);
  border-color: rgba(99, 102, 241, 0.3);
}

.card-glow {
  position: absolute;
  inset: -2px;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 20px;
  z-index: -1;
}

.service-card:hover .card-glow {
  opacity: 0.3;
}

.card-content {
  padding: 2rem;
  position: relative;
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.service-icon-container {
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(99, 102, 241, 0.1);
  border-radius: 50%;
  border: 1px solid rgba(99, 102, 241, 0.3);
}

.service-icon {
  font-size: 1.5rem;
  z-index: 2;
}

.icon-glow {
  position: absolute;
  inset: -5px;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.service-card:hover .icon-glow {
  opacity: 0.5;
}

.service-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 700;
  color: #10b981;
}

.badge-dot {
  width: 6px;
  height: 6px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

.service-image {
  position: relative;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 2rem;
}

.service-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.service-card:hover .service-image img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.3;
  mix-blend-mode: overlay;
}

.scan-lines {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    rgba(99, 102, 241, 0.1) 2px,
    rgba(99, 102, 241, 0.1) 4px
  );
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.service-info {
  position: relative;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #e4e4e7;
  margin-bottom: 1rem;
}

.service-description {
  color: #a1a1aa;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.features-grid {
  display: grid;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #a1a1aa;
  font-size: 0.9rem;
}

.feature-bullet {
  color: #6366f1;
  font-size: 0.8rem;
}

.cyber-service-button {
  width: 100%;
  padding: 1rem 2rem;
  background: rgba(99, 102, 241, 0.1);
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  color: #e4e4e7;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cyber-service-button::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--button-gradient);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-service-button:hover::before {
  opacity: 0.1;
}

.cyber-service-button:hover {
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px var(--button-glow);
}

.button-text,
.button-arrow {
  position: relative;
  z-index: 2;
}

.button-arrow {
  transition: transform 0.3s ease;
}

.cyber-service-button:hover .button-arrow {
  transform: translateX(5px);
}

.button-particles {
  position: absolute;
  inset: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="20" cy="20" r="1" fill="%236366f1" opacity="0.5"><animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/></circle><circle cx="80" cy="30" r="0.5" fill="%238b5cf6" opacity="0.7"><animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite"/></circle></svg>') no-repeat;
  background-size: cover;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.cyber-service-button:hover .button-particles {
  opacity: 1;
}

/* EMERGENCY CTA */
.emergency-cta {
  padding: 6rem 2rem;
  position: relative;
  z-index: 2;
}

.cta-container {
  max-width: 1000px;
  margin: 0 auto;
}

.emergency-panel {
  position: relative;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 20px;
  overflow: hidden;
}

.panel-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #ef4444, #f97316);
  filter: blur(20px);
  opacity: 0.2;
  border-radius: 20px;
}

.panel-content {
  padding: 3rem;
  position: relative;
}

.emergency-header {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.emergency-icon {
  position: relative;
  width: 80px;
  height: 80px;
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phone-icon {
  width: 32px;
  height: 32px;
  color: #ef4444;
  z-index: 2;
}

.emergency-pulse {
  position: absolute;
  inset: -5px;
  border: 2px solid #ef4444;
  border-radius: 50%;
  animation: emergencyPulse 2s infinite;
}

@keyframes emergencyPulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.5); opacity: 0; }
}

.emergency-title {
  font-size: 2rem;
  font-weight: 900;
  color: #ef4444;
  margin: 0 0 0.5rem 0;
  letter-spacing: 0.05em;
}

.emergency-subtitle {
  color: #a1a1aa;
  font-size: 1.1rem;
  margin: 0;
}

.emergency-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.emergency-stat {
  text-align: center;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 900;
  color: #ef4444;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.stat-desc {
  color: #a1a1aa;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
}

.emergency-actions {
  text-align: center;
}

.quantum-emergency-button {
  position: relative;
  display: inline-block;
  padding: 2rem 3rem;
  background: rgba(239, 68, 68, 0.1);
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 15px;
  text-decoration: none;
  color: #e4e4e7;
  transition: all 0.3s ease;
  overflow: hidden;
}

.emergency-core {
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, #ef4444, #f97316);
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 15px;
}

.quantum-emergency-button:hover .emergency-core {
  opacity: 0.1;
}

.quantum-emergency-button:hover {
  border-color: #ef4444;
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(239, 68, 68, 0.3);
}

.emergency-rings {
  position: absolute;
  inset: -10px;
  border: 2px solid rgba(239, 68, 68, 0.3);
  border-radius: 20px;
  animation: emergencyRings 3s linear infinite;
}

@keyframes emergencyRings {
  0% { transform: scale(1) rotate(0deg); opacity: 1; }
  100% { transform: scale(1.1) rotate(360deg); opacity: 0; }
}

.emergency-text {
  position: relative;
  z-index: 2;
  text-align: center;
}

.emergency-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #ef4444;
  margin-bottom: 0.5rem;
}

.emergency-number {
  display: block;
  font-size: 1.5rem;
  font-weight: 900;
  color: #e4e4e7;
}

/* RESPONSIVE */
@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
  
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }
  
  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .services-hero {
    padding: 6rem 1rem 4rem;
  }
  
  .services-section {
    padding: 4rem 1rem;
  }
  
  .emergency-cta {
    padding: 4rem 1rem;
  }
  
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-stats {
    justify-content: center;
  }
  
  .emergency-header {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
  
  .emergency-stats {
    gap: 2rem;
  }
  
  .panel-content {
    padding: 2rem;
  }
  
  .quantum-emergency-button {
    padding: 1.5rem 2rem;
  }
}

@media (max-width: 480px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .card-content {
    padding: 1.5rem;
  }
  
  .emergency-stats {
    flex-direction: column;
    gap: 1rem;
  }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
}
</style>