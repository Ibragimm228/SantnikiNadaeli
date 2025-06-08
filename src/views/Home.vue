<script setup>
import { ref } from 'vue'
import Blog from '../components/Blog.vue'
import { Clock, Award, ShieldCheck, DollarSign } from 'lucide-vue-next'

import heroPlumberImg from '/images/hero-plumbing.jpg'
import certifiedBadgeImg from '/images/privacy-hero.jpg'
import emergencyPlumbingImg from '/images/contact-hero.jpg'
import waterDamageImg from '/images/water-damage.jpg'


const services = [
  {
    icon: '🚰',
    title: 'Emergency Plumbing',
    description: '24/7 emergency plumbing services for when you need us most. Fast response times and reliable solutions.'
  },
  {
    icon: '🔧',
    title: 'Repairs & Maintenance',
    description: 'Expert repair and maintenance services for all your plumbing needs, from leaky faucets to pipe repairs.'
  },
  {
    icon: '🛁',
    title: 'Bathroom Remodeling',
    description: 'Transform your bathroom with our professional remodeling services. Modern designs and quality installations.'
  },
  {
    icon: '🌊',
    title: 'Drain Cleaning',
    description: 'Professional drain cleaning services to keep your plumbing system flowing smoothly and prevent clogs.'
  },
  {
    icon: '🔥',
    title: 'Water Heater Services',
    description: 'Installation, repair, and maintenance of water heaters to ensure reliable hot water for your home.'
  },
  {
    icon: '💧',
    title: 'Water Treatment',
    description: 'Improve your water quality with our professional water treatment and filtration solutions.'
  }
]

const testimonials = ref([
  {
    name: 'John Smith',
    role: 'Homeowner',
    content: 'Ace Plumbing provided exceptional service during our emergency. They arrived quickly and solved the problem efficiently.',
    rating: 5
  },
  {
    name: 'Sarah Johnson',
    role: 'Business Owner',
    content: 'We rely on Ace Plumbing for all our commercial plumbing needs. Their team is professional and always delivers quality work.',
    rating: 5
  },
  {
    name: 'Mike Wilson',
    role: 'Property Manager',
    content: 'The best plumbing service in the area. Their maintenance programs have saved us from many potential issues.',
    rating: 5
  }
])
</script>

<template>
  <main>
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content container">
        <div class="hero-text">
          <h1 class="text-gradient">Expert Plumbing Services You Can Trust</h1>
          <p>Professional plumbing solutions for your home and business. Available 24/7 for emergencies.</p>
          <div class="hero-buttons">
            <a href="/contact" class="btn btn-primary">Schedule Service</a>
            <a href="tel:+1234567890" class="btn btn-outline">Emergency Call</a>
          </div>
        </div>
        <div class="hero-image-wrapper">
          <img :src="heroPlumberImg" alt="Professional Plumber" class="main-image">
          <div class="trust-badge">
            <img :src="certifiedBadgeImg" alt="Certified Plumber" class="badge">
            <span>Licensed & Insured</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services section">
      <div class="container">
        <h2 class="section-title">Our Services</h2>
        <p class="section-subtitle">Comprehensive plumbing solutions for your needs</p>
        <div class="services-grid">
          <div class="service-card">
            <div class="service-image-wrapper">
              <img :src="emergencyPlumbingImg" alt="Emergency Plumbing" class="service-image">
              <div class="service-overlay">
                <a href="/services#emergency" class="btn btn-light">Learn More</a>
              </div>
            </div>
            <div class="service-content">
              <h3>Emergency Plumbing</h3>
              <p>24/7 emergency plumbing services for when you need help right away.</p>
            </div>
          </div>
          <div class="service-card">
            <div class="service-image-wrapper">
              <img :src="waterDamageImg" alt="Drain Cleaning" class="service-image">
              <div class="service-overlay">
                <a href="/services#drain" class="btn btn-light">Learn More</a>
              </div>
            </div>
            <div class="service-content">
              <h3>Drain Cleaning</h3>
              <p>Professional drain cleaning services to keep your pipes flowing smoothly.</p>
            </div>
          </div>
          <div class="service-card">
            <div class="service-image-wrapper">
              <img :src="waterDamageImg" alt="Water Heater Services" class="service-image">
              <div class="service-overlay">
                <a href="/services#water-heater" class="btn btn-light">Learn More</a>
              </div>
            </div>
            <div class="service-content">
              <h3>Water Heater Services</h3>
              <p>Installation, repair, and maintenance for all types of water heaters.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="why-us section">
      <div class="container">
        <h2 class="section-title">Why Choose Us</h2>
        <p class="section-subtitle">What makes us your trusted plumbing partner</p>
        <div class="features-grid">
          <div class="feature-card">
            <Clock class="feature-icon" />
            <h3>24/7 Service</h3>
            <p>Available anytime for emergency plumbing needs</p>
          </div>
          <div class="feature-card">
            <Award class="feature-icon" />
            <h3>Licensed Experts</h3>
            <p>Fully licensed and insured plumbing professionals</p>
          </div>
          <div class="feature-card">
            <ShieldCheck class="feature-icon" />
            <h3>Guaranteed Work</h3>
            <p>100% satisfaction guarantee on all services</p>
          </div>
          <div class="feature-card">
            <DollarSign class="feature-icon" />
            <h3>Fair Pricing</h3>
            <p>Competitive rates with no hidden fees</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <h2>What Our Customers Say</h2>
        <div class="testimonials-grid">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="testimonial-card">
            <div class="stars">
              ⭐⭐⭐⭐⭐
            </div>
            <p class="testimonial-content">"{{ testimonial.content }}"</p>
            <div class="testimonial-author">
              <strong>{{ testimonial.name }}</strong>
              <span>{{ testimonial.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    

    <!-- Latest Blog Posts -->
    <section class="blog-section section">
      <div class="container">
        <h2 class="section-title">Latest Updates</h2>
        <Blog />
      </div>
    </section>
  </main>
</template>

<style scoped>
.hero {
  background: linear-gradient(rgba(30, 58, 138, 0.05), rgba(30, 58, 138, 0.1));
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: radial-gradient(circle at top right, rgba(30, 58, 138, 0.1), transparent 60%);
  pointer-events: none;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.hero-text h1 {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-text p {
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.hero-image-wrapper {
  position: relative;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.main-image {
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 1rem;
  transition: transform 0.3s ease;
}

.hero-image-wrapper:hover .main-image {
  transform: scale(1.05);
}

.trust-badge {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  transition: transform 0.3s ease;
}

.trust-badge:hover {
  transform: translateY(-5px);
}

.badge {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.section {
  padding: 6rem 0;
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 1rem;
  color: var(--primary);
}

.section-subtitle {
  text-align: center;
  color: var(--text-light);
  font-size: 1.1rem;
  margin-bottom: 3rem;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.service-card {
  background: white;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
}

.service-image-wrapper {
  position: relative;
  overflow: hidden;
}

.service-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.service-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(30, 58, 138, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.service-image-wrapper:hover .service-overlay {
  opacity: 1;
}

.service-image-wrapper:hover .service-image {
  transform: scale(1.1);
}

.service-content {
  padding: 1.5rem;
}

.service-content h3 {
  color: var(--primary);
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.service-content p {
  color: var(--text-light);
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  background: white;
  padding: 2rem;
  border-radius: 1rem;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
  color: var(--primary);
  stroke-width: 1.5;
}

.feature-card h3 {
  color: var(--primary);
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.feature-card p {
  color: var(--text-light);
  line-height: 1.6;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.btn-outline {
  background: transparent;
  border: 2px solid var(--primary);
  color: var(--primary);
}

.btn-outline:hover {
  background: var(--primary);
  color: white;
  transform: translateY(-2px);
}

.btn-light {
  background: white;
  color: var(--primary);
}

.btn-light:hover {
  background: #f8fafc;
  transform: translateY(-2px);
}

.testimonials {
  background: white;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  background: #f8fafc;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stars {
  margin-bottom: 1rem;
}

.testimonial-content {
  color: #4b5563;
  font-style: italic;
  margin-bottom: 1rem;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.testimonial-author strong {
  color: #1e3a8a;
}

.testimonial-author span {
  color: #6b7280;
  font-size: 0.9rem;
}

.cta {
  background: linear-gradient(90deg, #1e3a8a 0%, #2563eb 100%);
  color: white;
  text-align: center;
}

.cta h2 {
  margin-bottom: 1rem;
}

.cta p {
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.primary-button {
  background: #2563eb;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;
}

.primary-button:hover {
  background: #1d4ed8;
}

.secondary-button {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;
}

.secondary-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.blog-section {
  background: #f8fafc;
}

@media (max-width: 1024px) {
  .services-grid,
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero-text h1 {
    font-size: 2.5rem;
  }

  .hero-buttons {
    justify-content: center;
  }

  .main-image {
    height: 400px;
  }

  .services-grid,
  .features-grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 4rem 0;
  }
}
</style> 