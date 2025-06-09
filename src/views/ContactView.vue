<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: ''
})

const services = [
  'Wanderrucksäcke',
  'Reiserucksäcke', 
  'Sportrucksäcke',
  'Schulrucksäcke',
  'Business Rucksäcke',
  'Laptop Rucksäcke',
  'Andere'
]

const handleSubmit = (e) => {
  e.preventDefault()
  // Handle form submission
  console.log('Form submitted:', form.value)
}
</script>

<template>
  <main class="contact-main">
    <!-- HERO SECTION -->
    <section class="contact-hero">
      <div class="hero-background">
        <div class="hero-pattern"></div>
        <div class="hero-grid"></div>
        <div class="floating-particles">
          <div class="particle" v-for="i in 20" :key="i" 
               :style="{ 
                 left: Math.random() * 100 + '%', 
                 animationDelay: Math.random() * 3 + 's',
                 animationDuration: (Math.random() * 3 + 2) + 's'
               }"></div>
        </div>
      </div>
      
      <div class="hero-content">
        <div class="hero-badge">
          <span class="badge-icon">🎒</span>
          <span class="badge-text">KONTAKT PORTAL</span>
        </div>
        <h1 class="hero-title">Kontaktieren Sie uns</h1>
        <p class="hero-subtitle">Persönliche Rucksack-Beratung • 24/7 Support • Sofortige Antwort</p>
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-value">24/7</span>
            <span class="stat-label">VERFÜGBAR</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">&lt;15min</span>
            <span class="stat-label">ANTWORTZEIT</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">100%</span>
            <span class="stat-label">ZUFRIEDENHEIT</span>
          </div>
        </div>
      </div>
    </section>

    <!-- MAIN CONTACT SECTION -->
    <section class="contact-section">
      <div class="contact-container">
        <div class="contact-grid">
          <!-- QUANTUM FORM -->
          <div class="quantum-form-container">
            <div class="form-header">
              <div class="form-badge">
                <span class="form-icon">⚡</span>
                <span class="form-tag">SICHERE ÜBERTRAGUNG</span>
              </div>
              <h2 class="form-title">Beratungsanfrage senden</h2>
              <div class="form-line"></div>
            </div>

            <form @submit="handleSubmit" class="quantum-form">
              <!-- NAME FIELD -->
              <div class="quantum-field">
                <label for="name" class="field-label">
                  <span class="label-icon">👤</span>
                  <span class="label-text">VOLLSTÄNDIGER NAME</span>
                </label>
                <div class="input-container">
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    required
                    placeholder="Geben Sie Ihren vollständigen Namen ein"
                    class="quantum-input"
                  />
                  <div class="input-glow"></div>
                  <div class="input-border"></div>
                </div>
              </div>

              <!-- EMAIL FIELD -->
              <div class="quantum-field">
                <label for="email" class="field-label">
                  <span class="label-icon">📧</span>
                  <span class="label-text">E-MAIL ADRESSE</span>
                </label>
                <div class="input-container">
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    required
                    placeholder="Geben Sie Ihre E-Mail Adresse ein"
                    class="quantum-input"
                  />
                  <div class="input-glow"></div>
                  <div class="input-border"></div>
                </div>
              </div>

              <!-- PHONE FIELD -->
              <div class="quantum-field">
                <label for="phone" class="field-label">
                  <span class="label-icon">📱</span>
                  <span class="label-text">TELEFONNUMMER</span>
                </label>
                <div class="input-container">
                  <input 
                    type="tel" 
                    id="phone" 
                    v-model="form.phone" 
                    required
                    placeholder="Geben Sie Ihre Telefonnummer ein"
                    class="quantum-input"
                  />
                  <div class="input-glow"></div>
                  <div class="input-border"></div>
                </div>
              </div>

              <!-- SERVICE FIELD -->
              <div class="quantum-field">
                <label for="service" class="field-label">
                  <span class="label-icon">🎒</span>
                  <span class="label-text">RUCKSACK KATEGORIE</span>
                </label>
                <div class="select-container">
                  <select id="service" v-model="form.service" required class="quantum-select">
                    <option value="">Wählen Sie eine Kategorie</option>
                    <option v-for="service in services" :key="service" :value="service">
                      {{ service }}
                    </option>
                  </select>
                  <div class="select-arrow">▼</div>
                  <div class="input-glow"></div>
                  <div class="input-border"></div>
                </div>
              </div>

              <!-- MESSAGE FIELD -->
              <div class="quantum-field">
                <label for="message" class="field-label">
                  <span class="label-icon">💬</span>
                  <span class="label-text">IHRE NACHRICHT</span>
                </label>
                <div class="textarea-container">
                  <textarea 
                    id="message" 
                    v-model="form.message" 
                    rows="5"
                    required
                    placeholder="Erzählen Sie uns von Ihren Rucksack-Wünschen und Anforderungen"
                    class="quantum-textarea"
                  ></textarea>
                  <div class="input-glow"></div>
                  <div class="input-border"></div>
                </div>
              </div>

              <!-- SUBMIT BUTTON -->
              <button type="submit" class="quantum-submit">
                <div class="submit-core"></div>
                <div class="submit-rings"></div>
                <div class="submit-content">
                  <span class="submit-icon">🚀</span>
                  <span class="submit-text">ANFRAGE SENDEN</span>
                  <span class="submit-arrow">→</span>
                </div>
                <div class="submit-particles"></div>
              </button>
            </form>
          </div>

          <!-- CONTACT INFO GRID -->
          <div class="info-grid">
            <!-- EMERGENCY CARD -->
            <div class="cyber-info-card emergency-card">
              <div class="card-glow"></div>
              <div class="card-header">
                <div class="card-icon emergency-icon">🚨</div>
                <h3 class="card-title">Sofort-Beratung</h3>
                <div class="card-status">
                  <div class="status-dot active"></div>
                  <span class="status-text">AKTIV 24/7</span>
                </div>
              </div>
              <div class="card-content">
                <p class="card-description">Sofortige Rucksack-Beratung für dringende Anfragen</p>
                <a href="tel:+4912345678900" class="quantum-link emergency-link">
                  <span class="link-icon">📞</span>
                  <span class="link-text">+49 (123) 456-7890</span>
                  <div class="link-pulse"></div>
                </a>
              </div>
              <div class="card-border"></div>
            </div>

            <!-- HOURS CARD -->
            <div class="cyber-info-card">
              <div class="card-glow"></div>
              <div class="card-header">
                <div class="card-icon">⏰</div>
                <h3 class="card-title">Öffnungszeiten</h3>
                <div class="card-badge">GESCHÄFTSZEITEN</div>
              </div>
              <div class="card-content">
                <div class="hours-grid">
                  <div class="hour-item">
                    <span class="hour-day">MO - FR</span>
                    <span class="hour-time">9:00 - 18:00</span>
                  </div>
                  <div class="hour-item">
                    <span class="hour-day">SAMSTAG</span>
                    <span class="hour-time">10:00 - 16:00</span>
                  </div>
                  <div class="hour-item">
                    <span class="hour-day">SONNTAG</span>
                    <span class="hour-time">Nur Notfälle</span>
                  </div>
                </div>
              </div>
              <div class="card-border"></div>
            </div>

            <!-- LOCATION CARD -->
            <div class="cyber-info-card">
              <div class="card-glow"></div>
              <div class="card-header">
                <div class="card-icon">🏢</div>
                <h3 class="card-title">Standort</h3>
                <div class="card-badge">HAUPTSITZ</div>
              </div>
              <div class="card-content">
                <div class="location-info">
                  <p class="location-address">Rucksackstraße 123</p>
                  <p class="location-city">München, Bayern 80331</p>
                </div>
                <a href="https://maps.google.com" target="_blank" class="quantum-link">
                  <span class="link-icon">📍</span>
                  <span class="link-text">Route anzeigen</span>
                  <div class="link-pulse"></div>
                </a>
              </div>
              <div class="card-border"></div>
            </div>

            <!-- EMAIL CARD -->
            <div class="cyber-info-card">
              <div class="card-glow"></div>
              <div class="card-header">
                <div class="card-icon">📨</div>
                <h3 class="card-title">E-Mail Kontakt</h3>
                <div class="card-badge">SICHER</div>
              </div>
              <div class="card-content">
                <p class="card-description">Für detaillierte Rucksack-Anfragen und Informationen</p>
                <a href="mailto:info@rucksack-kaufen.de" class="quantum-link">
                  <span class="link-icon">✉️</span>
                  <span class="link-text">info@rucksack-kaufen.de</span>
                  <div class="link-pulse"></div>
                </a>
              </div>
              <div class="card-border"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUANTUM MAP SECTION -->
    <section class="map-section">
      <div class="map-container">
        <div class="map-header">
          <div class="map-badge">
            <span class="map-icon">🗺️</span>
            <span class="map-text">STANDORT SCANNER</span>
          </div>
          <h2 class="map-title">Finden Sie unser Rucksack-Center</h2>
          <div class="map-line"></div>
        </div>
        
        <div class="quantum-map">
          <div class="map-frame">
            <div class="map-content">
              <div class="map-placeholder">
                <div class="map-radar">
                  <div class="radar-circle"></div>
                  <div class="radar-sweep"></div>
                  <div class="radar-dots">
                    <div class="radar-dot" v-for="i in 8" :key="i"></div>
                  </div>
                </div>
                <div class="map-info">
                  <span class="map-status">🔍 STANDORT SCANNEN...</span>
                  <span class="map-coords">48.1351° N, 11.5820° E</span>
                </div>
              </div>
            </div>
            <div class="map-glow"></div>
            <div class="map-border"></div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
/* MAIN CONTAINER */
.contact-main {
  min-height: 100vh;
  background: #0a0a0f;
  color: #e4e4e7;
  position: relative;
}

/* HERO SECTION */
.contact-hero {
  position: relative;
  padding: 8rem 2rem 6rem;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.05));
  border-bottom: 1px solid rgba(99, 102, 241, 0.2);
}

.hero-background {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.hero-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
}

.hero-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: grid-move 20s linear infinite;
}

@keyframes grid-move {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}

.floating-particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #6366f1;
  border-radius: 50%;
  animation: particle-float linear infinite;
  opacity: 0.6;
}

@keyframes particle-float {
  0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
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
  margin-bottom: 2rem;
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
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
  font-size: 4rem;
  font-weight: 900;
  margin: 0 0 1.5rem 0;
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
  margin: 0 0 3rem 0;
  letter-spacing: 0.05em;
}

.hero-stats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 900;
  color: #6366f1;
  text-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
}

.stat-label {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #a1a1aa;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: linear-gradient(to bottom, transparent, #6366f1, transparent);
}

/* CONTACT SECTION */
.contact-section {
  padding: 6rem 0;
  position: relative;
}

.contact-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

/* QUANTUM FORM */
.quantum-form-container {
  position: relative;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  overflow: hidden;
}

.form-header {
  text-align: center;
  margin-bottom: 3rem;
}

.form-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 50px;
  margin-bottom: 1.5rem;
}

.form-icon {
  font-size: 1rem;
}

.form-tag {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #6366f1;
}

.form-title {
  font-size: 2rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #e4e4e7, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.form-line {
  width: 80px;
  height: 2px;
  background: linear-gradient(to right, transparent, #6366f1, transparent);
  margin: 0 auto;
}

.quantum-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.quantum-field {
  position: relative;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  color: #6366f1;
  letter-spacing: 0.05em;
}

.label-icon {
  font-size: 1.1rem;
}

.input-container,
.select-container,
.textarea-container {
  position: relative;
}

.quantum-input,
.quantum-select,
.quantum-textarea {
  width: 100%;
  padding: 1rem 1.5rem;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 12px;
  color: #e4e4e7;
  font-size: 1rem;
  font-family: inherit;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
}

.quantum-input:focus,
.quantum-select:focus,
.quantum-textarea:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.quantum-input::placeholder,
.quantum-textarea::placeholder {
  color: #64748b;
}

.select-container {
  position: relative;
}

.select-arrow {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #6366f1;
  pointer-events: none;
  z-index: 3;
  font-size: 0.8rem;
}

.input-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6, #6366f1);
  border-radius: 12px;
  opacity: 0;
  filter: blur(10px);
  transition: opacity 0.3s ease;
  z-index: 1;
}

.quantum-input:focus + .input-glow,
.quantum-select:focus + .select-arrow + .input-glow,
.quantum-textarea:focus + .input-glow {
  opacity: 0.6;
}

.input-border {
  position: absolute;
  inset: 0;
  border-radius: 12px;
  padding: 1px;
  background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.5), transparent);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.quantum-input:focus + .input-glow + .input-border,
.quantum-select:focus + .select-arrow + .input-glow + .input-border,
.quantum-textarea:focus + .input-glow + .input-border {
  opacity: 1;
}

/* SUBMIT BUTTON */
.quantum-submit {
  position: relative;
  height: 70px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
  margin-top: 1rem;
  transition: transform 0.3s ease;
}

.quantum-submit:hover {
  transform: translateY(-2px);
}

.submit-core {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.2));
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 16px;
  transition: all 0.3s ease;
}

.quantum-submit:hover .submit-core {
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3));
  border-color: #6366f1;
  box-shadow: 
    0 0 30px rgba(99, 102, 241, 0.3),
    inset 0 0 30px rgba(99, 102, 241, 0.1);
}

.submit-rings {
  position: absolute;
  inset: -3px;
  border-radius: 16px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.submit-rings::before,
.submit-rings::after {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid #6366f1;
  border-radius: 16px;
  animation: submit-ring-pulse 2s infinite;
}

.submit-rings::after {
  animation-delay: 1s;
}

.quantum-submit:hover .submit-rings {
  opacity: 1;
}

@keyframes submit-ring-pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(1.1); opacity: 0; }
}

.submit-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #e4e4e7;
  font-weight: 700;
  font-size: 1.1rem;
  z-index: 2;
  transition: color 0.3s ease;
}

.quantum-submit:hover .submit-content {
  color: #6366f1;
}

.submit-icon {
  font-size: 1.3rem;
}

.submit-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.quantum-submit:hover .submit-arrow {
  transform: translateX(5px);
}

/* INFO GRID */
.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.cyber-info-card {
  position: relative;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 20px;
  padding: 2rem;
  overflow: hidden;
  transition: all 0.4s ease;
  cursor: pointer;
}

.cyber-info-card:hover {
  transform: translateY(-5px);
  border-color: rgba(99, 102, 241, 0.4);
  box-shadow: 0 20px 40px rgba(99, 102, 241, 0.1);
}

.card-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6, #6366f1);
  border-radius: 20px;
  opacity: 0;
  filter: blur(10px);
  transition: opacity 0.4s ease;
  z-index: -1;
}

.cyber-info-card:hover .card-glow {
  opacity: 0.4;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.card-icon {
  font-size: 2rem;
  padding: 0.75rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 12px;
  text-align: center;
  min-width: 60px;
}

.emergency-icon {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.3);
  animation: emergency-pulse 2s infinite;
}

@keyframes emergency-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

.card-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: #e4e4e7;
  margin: 0;
  flex: 1;
}

.card-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  animation: status-blink 2s infinite;
}

@keyframes status-blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

.status-text {
  font-size: 0.8rem;
  font-weight: 600;
  color: #10b981;
  letter-spacing: 0.05em;
}

.card-badge {
  padding: 0.25rem 0.75rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #6366f1;
}

.card-content {
  position: relative;
  z-index: 2;
}

.card-description {
  color: #a1a1aa;
  margin: 0 0 1.5rem 0;
  line-height: 1.6;
}

.hours-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.hour-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(99, 102, 241, 0.1);
}

.hour-day {
  font-size: 0.9rem;
  font-weight: 600;
  color: #6366f1;
}

.hour-time {
  font-size: 0.9rem;
  color: #e4e4e7;
}

.location-info {
  margin-bottom: 1.5rem;
}

.location-address,
.location-city {
  color: #a1a1aa;
  margin: 0 0 0.5rem 0;
  line-height: 1.5;
}

.quantum-link {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  color: #6366f1;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  transition: all 0.3s ease;
}

.quantum-link:hover {
  color: #8b5cf6;
  transform: translateX(5px);
}

.link-icon {
  font-size: 1.2rem;
}

.link-pulse {
  position: absolute;
  inset: -5px;
  border-radius: 8px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6);
  opacity: 0;
  filter: blur(10px);
  transition: opacity 0.3s ease;
  z-index: -1;
}

.quantum-link:hover .link-pulse {
  opacity: 0.3;
}

.emergency-link {
  padding: 0.75rem 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 12px;
  color: #ef4444;
}

.emergency-link:hover {
  color: #f87171;
  background: rgba(239, 68, 68, 0.2);
}

.card-border {
  position: absolute;
  inset: 0;
  border-radius: 20px;
  padding: 2px;
  background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.5), transparent);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.cyber-info-card:hover .card-border {
  opacity: 1;
}

/* MAP SECTION */
.map-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.02), rgba(139, 92, 246, 0.02));
  border-top: 1px solid rgba(99, 102, 241, 0.1);
}

.map-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.map-header {
  text-align: center;
  margin-bottom: 4rem;
}

.map-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 50px;
  margin-bottom: 1.5rem;
}

.map-icon {
  font-size: 1rem;
}

.map-text {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #6366f1;
}

.map-title {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 1rem 0;
  background: linear-gradient(135deg, #e4e4e7, #6366f1);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.map-line {
  width: 100px;
  height: 2px;
  background: linear-gradient(to right, transparent, #6366f1, transparent);
  margin: 0 auto;
}

.quantum-map {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.map-frame {
  position: relative;
  height: 500px;
  background: rgba(99, 102, 241, 0.05);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 24px;
  overflow: hidden;
}

.map-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8));
}

.map-placeholder {
  text-align: center;
  position: relative;
}

.map-radar {
  position: relative;
  width: 200px;
  height: 200px;
  margin: 0 auto 2rem;
}

.radar-circle {
  position: absolute;
  inset: 0;
  border: 2px solid rgba(99, 102, 241, 0.3);
  border-radius: 50%;
}

.radar-circle::before,
.radar-circle::after {
  content: '';
  position: absolute;
  inset: 20px;
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 50%;
}

.radar-circle::after {
  inset: 40px;
}

.radar-sweep {
  position: absolute;
  inset: 0;
  background: conic-gradient(transparent, transparent, transparent, rgba(99, 102, 241, 0.5));
  border-radius: 50%;
  animation: radar-sweep 3s linear infinite;
}

@keyframes radar-sweep {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.radar-dots {
  position: absolute;
  inset: 0;
}

.radar-dot {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #6366f1;
  border-radius: 50%;
  animation: radar-blink 2s infinite;
}

.radar-dot:nth-child(1) { top: 20%; left: 50%; animation-delay: 0.2s; }
.radar-dot:nth-child(2) { top: 50%; right: 20%; animation-delay: 0.4s; }
.radar-dot:nth-child(3) { bottom: 20%; left: 50%; animation-delay: 0.6s; }
.radar-dot:nth-child(4) { top: 50%; left: 20%; animation-delay: 0.8s; }
.radar-dot:nth-child(5) { top: 30%; right: 30%; animation-delay: 1s; }
.radar-dot:nth-child(6) { bottom: 30%; right: 30%; animation-delay: 1.2s; }
.radar-dot:nth-child(7) { bottom: 30%; left: 30%; animation-delay: 1.4s; }
.radar-dot:nth-child(8) { top: 30%; left: 30%; animation-delay: 1.6s; }

@keyframes radar-blink {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

.map-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.map-status {
  font-size: 1.1rem;
  color: #6366f1;
  font-weight: 600;
}

.map-coords {
  font-size: 0.9rem;
  color: #a1a1aa;
  font-family: 'Courier New', monospace;
}

.map-glow {
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg, #6366f1, #8b5cf6, #6366f1);
  border-radius: 24px;
  opacity: 0.2;
  filter: blur(15px);
  z-index: -1;
}

.map-border {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  padding: 2px;
  background: linear-gradient(45deg, transparent, rgba(99, 102, 241, 0.5), transparent);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: xor;
  opacity: 0.7;
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-stats {
    gap: 1.5rem;
  }
  
  .stat-divider {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.1rem;
  }
  
  .quantum-form-container {
    padding: 2rem;
  }
  
  .form-title {
    font-size: 1.8rem;
  }
  
  .map-title {
    font-size: 2rem;
  }
  
  .map-frame {
    height: 400px;
  }
  
  .map-radar {
    width: 150px;
    height: 150px;
  }
  
  .contact-section,
  .map-section {
    padding: 4rem 0;
  }
}

@media (max-width: 480px) {
  .contact-hero {
    padding: 6rem 1rem 4rem;
  }
  
  .contact-container,
  .map-container {
    padding: 0 1rem;
  }
  
  .quantum-form-container {
    padding: 1.5rem;
  }
  
  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
  
  .hour-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .map-frame {
    height: 300px;
  }
  
  .map-radar {
    width: 120px;
    height: 120px;
  }
}
</style>
