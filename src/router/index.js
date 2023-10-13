import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WeatherView from '../views/WeatherView.vue'
import ImageOfTheDayView from '../views/ImageOfTheDayView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/weather',
      name: 'Weathe API',
      component: WeatherView
    },
    {
      path: '/image',
      name: 'Image of The Day API',
      component: ImageOfTheDayView
    }
  ]
})

export default router
