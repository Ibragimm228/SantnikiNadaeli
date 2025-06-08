import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AboutView from '@/views/AboutView.vue'
import Blog from '@/components/Blog.vue'
import TypeView from '@/views/TypeView.vue'
import ContactView from '@/views/ContactView.vue' // Этот компонент уже был импортирован
import ArticleView from '@/views/ArticleView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import ServicesView from '@/views/ServicesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/services',
      name: 'services',
      component: ServicesView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/blog',
      name: 'blog',
      component: Blog
    },
    {
      path: '/type/:type',
      name: 'type',
      component: TypeView
    },
    // --- ИЗМЕНЕНИЯ ЗДЕСЬ ---
    // Маршрут для страницы контактов теперь использует /contact
    {
      path: '/contact', // Было: '/contact-us'
      name: 'contact',   // Было: 'contact-us'
      component: ContactView
    },
    // ----------------------
    {
      path: '/article/:title',
      name: 'article',
      component: ArticleView,
      props: (route) => ({
        title: route.params.title,
      })
    },
    {
      path: '/privacy-policy',
      name: 'privacy-policy',
      component: PrivacyView
    },
  ]
})

export default router