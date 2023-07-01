import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import EventDetailView from '../views/event/EventDetailView.vue'
import EventEditView from '../views/event/EventEditView.vue'
import EventRegisterView from '../views/event/EventRegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list',
      component: EventListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1')
      })
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/event/:id',
      name: 'event-detail',
      component: EventDetailView,
      props: true
    },
    {
      path: '/event/:id/edit',
      name: 'event-edit',
      component: EventEditView,
      props: true
    },
    {
      path: '/event/:id/register',
      name: 'event-register',
      component: EventRegisterView,
      props: true
    }
  ]
})

export default router
