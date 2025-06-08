<script setup>
import Blog from '@/components/Blog.vue';
import Tags from '@/components/Tags.vue';
import Featured from '@/components/Featured.vue';
import Upcoming from '@/components/Upcoming.vue';
import Search from '@/components/Search.vue';

const featuredPosts = [
  {
    id: 1,
    title: "🎁 Free Beauty Samples from Top Brands!",
    excerpt: "Get your hands on free luxury beauty samples from brands like Dior, Chanel, and Estée Lauder. Limited quantities available!",
    category: "Freebies",
    date: "May 15, 2025",
    tags: ["beauty", "samples", "luxury"],
    image: "https://images.unsplash.com/photo-1612817289860-7e7f8f84d759?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 2,
    title: "🏆 Instant Win: $500 Amazon Gift Card!",
    excerpt: "Enter our daily instant win game for a chance to score a $500 Amazon gift card. No purchase necessary!",
    category: "Instant Win",
    date: "May 12, 2025",
    tags: ["amazon", "gift card", "instant win"],
    image: "https://images.unsplash.com/photo-1591270551371-3401a1a9382f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 3,
    title: "🐶 Kentuckiana Pet Expo - Free Admission & Goodies!",
    excerpt: "This weekend's Pet Expo offers free admission and tons of free pet products. Bring your furry friends!",
    category: "Local Events",
    date: "May 10, 2025",
    tags: ["kentuckiana", "pets", "local"],
    image: "https://images.unsplash.com/photo-1540140342550-9767c6c590ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 4,
    title: "📬 Mail-In Sweepstakes: Win a Luxury Vacation!",
    excerpt: "Old-school mail-in sweepstakes to win a 7-day luxury vacation to Hawaii. Just send a postcard!",
    category: "Mail-In",
    date: "May 8, 2025",
    tags: ["vacation", "hawaii", "mail-in"],
    image: "hawaii-vacation.jpg"
  },
  {
    id: 5,
    title: "🍔 Free Burger Day at Local Grill!",
    excerpt: "One day only — get a free burger at participating Local Grill locations. First 100 customers only!",
    category: "Freebies",
    date: "May 6, 2025",
    tags: ["food", "free", "burger"],
    image: "free-burger.jpg"
  },
  {
    id: 6,
    title: "🎮 Game Giveaway: Download 'Sky Realms' for Free!",
    excerpt: "Get the popular fantasy RPG 'Sky Realms' absolutely free this weekend on PC. Limited-time offer!",
    category: "Giveaways",
    date: "May 5, 2025",
    tags: ["games", "free download", "RPG"],
    image: "sky-realms.jpg"
  }
];

const testimonials = [
  {
    name: "Sarah J.",
    location: "Louisville, KY",
    text: "I've saved over $2,000 this year thanks to Freebies City! From free makeup to concert tickets, this site is a game changer.",
    rating: 5,
    avatar: "avatar1.jpg"
  },
  {
    name: "Mike T.",
    location: "Indianapolis, IN",
    text: "As a college student, Freebies City helps me stretch my budget. Just won a $250 grocery gift card last week!",
    rating: 4,
    avatar: "avatar2.jpg"
  },
  {
    name: "The Johnson Family",
    location: "New Albany, IN",
    text: "We take our kids to all the free local events posted here. It's become our family's go-to for weekend activities.",
    rating: 5,
    avatar: "avatar3.jpg"
  }
];

const successStories = [
  {
    title: "How I Got $1,200 Worth of Free Products in 3 Months",
    excerpt: "Follow my strategy for maximizing freebie opportunities without spending hours online...",
    author: "FreebieQueen",
    date: "April 28, 2025"
  },
  {
    title: "From Free Samples to Brand Ambassador",
    excerpt: "My journey from free product tester to paid influencer for major brands...",
    author: "SampleSally",
    date: "April 15, 2025"
  },
  {
    title: "Free Date Night Ideas That Saved Our Marriage",
    excerpt: "How discovering free local events brought the spark back to our relationship...",
    author: "HappyCouple",
    date: "March 30, 2025"
  }
];

const statistics = [
  { number: "12,458+", label: "Freebies Claimed" },
  { number: "$350k+", label: "Total Value Saved" },
  { number: "8,942", label: "Happy Members" },
  { number: "247", label: "Local Events Monthly" }
];
</script>

<template>
  <div class="home-container">
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1>Discover Amazing <span class="highlight">Freebies</span> Near You!</h1>
          <p class="subtitle">Your ultimate source for free products, contests, and local events in Kentuckiana and
            beyond.</p>
          <div class="search-bar">
            <Search />
          </div>
        </div>
        <div class="hero-stats">
          <div v-for="stat in statistics" :key="stat.label" class="stat-item">
            <div class="stat-number">{{ stat.number }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
      <div class="hero-image">
        <div class="floating-cards">
          <div class="card card1" :style="{ backgroundImage: `url(${featuredPosts[0].image})` }"></div>
          <div class="card card2" :style="{ backgroundImage: `url(${featuredPosts[1].image})` }"></div>
          <div class="card card3" :style="{ backgroundImage: `url(${featuredPosts[2].image})` }"></div>
        </div>
      </div>
    </section>

    <Featured />

    <section class="success-stories">
      <div class="section-header">
        <h2 class="section-title">✨ Community Success Stories</h2>
      </div>
      <div class="stories-grid">
        <article v-for="story in successStories" :key="story.title" class="story-card">
          <div class="story-content">
            <h4>{{ story.title }}</h4>
            <p class="story-excerpt">{{ story.excerpt }}</p>
            <div class="story-meta">
              <span class="author">By {{ story.author }}</span>
              <span class="date">{{ story.date }}</span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <div class="content-sidebar">
      <main class="main-content">
        <Blog />
      </main>

      <aside class="sidebar">
        <Tags />

        <Upcoming />

        <div class="sidebar-widget newsletter">
          <div class="newsletter-header">
            <h4>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>

              Get Freebie Alerts
            </h4>
          </div>
          <p>Never miss a freebie! Get our weekly newsletter with the best offers.</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Your email address">
            <button type="submit">Subscribe</button>
          </form>
          <p class="privacy-note">We respect your privacy. Unsubscribe at any time.</p>
        </div>

        <div class="sidebar-widget leaderboard-widget">
          <h4>🏆 Top Freebie Hunters</h4>
          <ol class="leaderboard">
            <li>
              <span class="rank">1</span>
              <span class="name">FreebieQueen</span>
              <span class="score">42 wins</span>
            </li>
            <li>
              <span class="rank">2</span>
              <span class="name">SampleSally</span>
              <span class="score">38 wins</span>
            </li>
            <li>
              <span class="rank">3</span>
              <span class="name">BargainBob</span>
              <span class="score">29 wins</span>
            </li>
            <li>
              <span class="rank">4</span>
              <span class="name">DealFinder</span>
              <span class="score">25 wins</span>
            </li>
            <li>
              <span class="rank">5</span>
              <span class="name">ThriftyTheo</span>
              <span class="score">22 wins</span>
            </li>
          </ol>
        </div>
      </aside>
    </div>

    <section class="testimonials">
      <h2 class="section-title">💬 What Our Community Says</h2>
      <div class="testimonials-grid">
        <div v-for="testimonial in testimonials" :key="testimonial.name" class="testimonial-card">
          <div class="testimonial-rating">
            <span v-for="i in 5" :key="i" :class="{ 'filled': i <= testimonial.rating }">★</span>
          </div>
          <p class="testimonial-text">"{{ testimonial.text }}"</p>
          <div class="testimonial-author">
            <div class="avatar" :style="{ backgroundColor: getRandomColor() }">
              {{ testimonial.name.charAt(0) }}
            </div>
            <div class="author-info">
              <h5>{{ testimonial.name }}</h5>
              <p class="location">{{ testimonial.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
:root {
  --primary: #FF6B95;
  --primary-light: #FF9A8B;
  --primary-dark: #E0557E;
  --secondary: #6B73FF;
  --accent: #FF8E53;
  --dark: #2E2E48;
  --light: #F8F9FF;
  --gray: #A3A3C2;
  --light-gray: #F0F2F6;
  --success: #4CAF50;
  --warning: #FFC107;
  --danger: #F44336;
}

.home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--dark);
}

h1,
h2,
h3,
h4,
h5 {
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
}

.highlight {
  color: var(--primary);
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 100%;
  height: 8px;
  background-color: rgba(255, 107, 149, 0.2);
  z-index: -1;
  border-radius: 4px;
}

.hero {
  display: flex;
  align-items: center;
  gap: 3rem;
  margin: 3rem 0 4rem;
  padding: 3rem 0;
}

.hero-content {
  flex: 1;
}

.hero-text h1 {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: var(--dark);
}

.subtitle {
  font-size: 1.25rem;
  color: var(--gray);
  margin-bottom: 2rem;
  line-height: 1.6;
  max-width: 600px;
}

.search-bar {
  display: flex;
  max-width: 500px;
  margin-bottom: 2rem;
  position: relative;
}

.search-bar input {
  flex: 1;
  padding: 1rem 1.5rem;
  border: 2px solid var(--light-gray);
  border-radius: 50px;
  font-size: 1rem;
  transition: all 0.3s ease;
  padding-right: 50px;
}

.search-bar input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(255, 107, 149, 0.2);
}

.search-button {
  position: absolute;
  right: 5px;
  top: 5px;
  background: var(--primary);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover {
  background: var(--primary-dark);
  transform: scale(1.05);
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-top: 2rem;
}

.stat-item {
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: var(--gray);
  font-weight: 500;
}

.hero-image {
  flex: 1;
  position: relative;
  min-height: 400px;
}

.floating-cards {
  position: relative;
  width: 100%;
  height: 100%;
}

.card {
  position: absolute;
  width: 250px;
  height: 300px;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card1 {
  top: 0;
  left: 0;
  z-index: 3;
  transform: rotate(-5deg);
}

.card2 {
  top: 40px;
  left: 120px;
  z-index: 2;
  transform: rotate(3deg);
}

.card3 {
  top: 80px;
  left: 240px;
  z-index: 1;
  transform: rotate(8deg);
}

.card:hover {
  transform: scale(1.05) rotate(0deg);
  z-index: 10;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.categories {
  margin: 2rem 0 3rem;
  overflow-x: auto;
  padding-bottom: 10px;
}

.categories ul {
  display: flex;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.categories a {
  display: block;
  padding: 0.75rem 1.5rem;
  background: var(--light-gray);
  border-radius: 50px;
  color: var(--dark);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.categories a:hover {
  background: var(--primary);
}

.categories a.active {
  background: var(--primary);
  box-shadow: 0 5px 15px rgba(255, 107, 149, 0.3);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 2rem;
  color: var(--dark);
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(to right, var(--primary), var(--accent));
  border-radius: 2px;
}

.view-all {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: all 0.3s ease;
}

.view-all span {
  transition: transform 0.3s ease;
}

.view-all:hover {
  color: var(--primary-dark);
}

.view-all:hover span {
  transform: translateX(3px);
}

.featured-posts {
  margin-bottom: 4rem;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.post-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.post-image {
  height: 200px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.post-category {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: var(--primary);
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
}

.post-content {
  padding: 1.5rem;
}

.post-card h4 {
  font-size: 1.25rem;
  color: var(--dark);
}

.post-excerpt {
  color: var(--gray);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  font-size: 0.85rem;
}

.post-date {
  color: var(--gray);
}

.post-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  color: var(--primary);
  font-weight: 500;
}

.post-actions {
  display: flex;
  gap: 0.75rem;
}

.post-button {
  flex: 1;
  background: var(--primary);
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.post-button:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

.save-button {
  width: 44px;
  height: 44px;
  background: var(--light-gray);
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-button:hover {
  background: var(--primary);
}

.success-stories {
  margin-bottom: 4rem;
}

.stories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.story-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.story-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.story-content {
  padding: 1.5rem;
  flex: 1;
}

.story-card h4 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--dark);
}

.story-excerpt {
  color: var(--gray);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.story-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--gray);
}

.story-link {
  display: block;
  padding: 1rem 1.5rem;
  background: var(--light-gray);
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  text-align: center;
  transition: all 0.3s ease;
}

.story-link:hover {
  background: var(--primary);
}

.content-sidebar {
  display: flex;
  gap: 2rem;
  margin-bottom: 4rem;
}

.main-content {
  flex: 2;
}

.sidebar {
  flex: 1;
}

.sidebar-widget {
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.sidebar-widget h4 {
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--dark);
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.location-selector {
  position: relative;
  margin-bottom: 1.5rem;
}

.location-selector select {
  width: 100%;
  padding: 0.75rem 1rem;
  padding-left: 2.5rem;
  border: 2px solid var(--light-gray);
  border-radius: 8px;
  appearance: none;
  font-size: 0.9rem;
  color: var(--dark);
  cursor: pointer;
}

.location-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--primary);
}


.newsletter-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  color: #FF6B95;
}

.newsletter-header svg {
  width: 24px;
  height: 24px;
}

.newsletter p {
  margin-bottom: 1.5rem;
  opacity: 0.9;
}



.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.newsletter-form input {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
}

.newsletter-form button {
  color: var(--primary);
  border: none;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.newsletter-form button:hover {
  background: var(--light);
  transform: translateY(-2px);
}

.privacy-note {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: 1rem;
}

.leaderboard-widget ol {
  padding: 0;
  margin: 0;
  list-style: none;
}

.leaderboard li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--light-gray);
}

.leaderboard li:last-child {
  border-bottom: none;
}

.rank {
  background: var(--light-gray);
  color: var(--primary);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 600;
}

.name {
  flex: 1;
  margin: 0 1rem;
  font-weight: 500;
}

.score {
  color: var(--primary);
  font-weight: 600;
}

.see-more {
  display: block;
  text-align: center;
  margin-top: 1rem;
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.see-more:hover {
  color: var(--primary-dark);
}

.testimonials {
  margin-bottom: 4rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.testimonial-card {
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.testimonial-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.testimonial-rating {
  color: #FFD700;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
}

.testimonial-rating .filled {
  color: #FFD700;
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: var(--dark);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.25rem;
}

.author-info h5 {
  margin-bottom: 0.25rem;
}

.location {
  font-size: 0.85rem;
  color: var(--gray);
}

.cta-section {
  background: linear-gradient(135deg, var(--primary-light), var(--primary));
  border-radius: 16px;
  padding: 4rem 2rem;
  margin-bottom: 4rem;
  text-align: center;
}

.cta-content h2 {
  font-size: 2.25rem;
  margin-bottom: 1rem;
}

.cta-content p {
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cta-button {
  padding: 0.75rem 2rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.cta-button.primary {
  color: var(--primary);
}

.cta-button.primary:hover {
  background: var(--light);
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.cta-button.secondary {
  background: transparent;
}

.cta-button.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-3px);
}

@media (max-width: 1200px) {
  .hero {
    flex-direction: column;
    text-align: center;
  }

  .hero-text {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .hero-image {
    margin-top: 2rem;
    min-height: 300px;
  }

  .card1,
  .card2,
  .card3 {
    position: relative;
    top: auto;
    left: auto;
    margin: 0 auto;
    transform: none;
  }

  .card2 {
    margin-top: -150px;
    margin-left: 100px;
  }

  .card3 {
    margin-top: -150px;
    margin-left: -100px;
  }
}

@media (max-width: 768px) {
  .hero-text h1 {
    font-size: 2.25rem;
  }

  .subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .content-sidebar {
    flex-direction: column;
  }

  .posts-grid,
  .stories-grid,
  .testimonials-grid {
    grid-template-columns: 1fr;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .card {
    width: 200px;
    height: 250px;
  }
}

@media (max-width: 480px) {
  .home-container {
    padding: 0 1rem;
  }

  .hero-text h1 {
    font-size: 2rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }

  .card {
    width: 150px;
    height: 200px;
  }
}
</style>

<script>
export default {
  methods: {
    getRandomColor() {
      const colors = [
        '#FF6B95', '#6B73FF', '#FF8E53', '#4CAF50', '#9C27B0',
        '#2196F3', '#FFC107', '#F44336', '#673AB7', '#3F51B5'
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    },
    getRandomGradient() {
      const gradients = [
        '#FF9A8B, #FF6B95',
        '#FF6B95, #FF8E53',
        '#6B73FF, #000DFF',
        '#57CBFF, #45B6FE',
        '#A18CD1, #FBC2EB',
        '#FAD0C4, #FFD1FF'
      ];
      return gradients[Math.floor(Math.random() * gradients.length)];
    },
    getRandomShadow() {
      const shadows = [
        'rgba(255, 106, 149, 0.4)',
        'rgba(107, 115, 255, 0.4)',
        'rgba(255, 142, 83, 0.4)',
        'rgba(87, 203, 255, 0.4)',
        'rgba(161, 140, 209, 0.4)',
        'rgba(250, 208, 196, 0.4)'
      ];
      return shadows[Math.floor(Math.random() * shadows.length)];
    }
  }
};
</script>