import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListView.vue'
import AboutView from '../views/AboutView.vue'
import EventDetailView from '../views/event/EventDetailView.vue'
import EventEditView from '../views/event/EventEditView.vue'
import EventRegisterView from '../views/event/EventRegisterView.vue'
import EventLayoutView from '../views/event/EventLayoutView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import NetworkErrorView from '../views/NetworkErrorView.vue'
import NProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import OrganizerListView from '../views/OrganizerListView.vue'
import AddEventView from '@/views/EventFormView.vue'
import AddOrganizerView from '@/views/OrganizerFormView.vue'
import AuctionItemListView from '@/views/AuctionItemListView.vue'
import OrganizerLayoutViewVue from '@/views/organizer/OrganizerLayoutView.vue'
import { useOrganizerStore } from '@/stores/organizer'
import OrganizerService from '@/services/OrganizerService'
import OrganizerDetailViewVue from '@/views/organizer/OrganizerDetailView.vue'
import LoginView from '@/views/LoginView.vue'

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
      path: '/organizer',
      name: 'organizer-list',
      component: OrganizerListView,
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
      path: '/add-event',
      name: 'add-event',
      component: AddEventView
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: AddOrganizerView
    },
    {
      path: '/auction-list',
      name: 'auction-list',
      component: AuctionItemListView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1')
      })
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/event/:id',
      name: 'event-layout',
      component: EventLayoutView,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        EventService.getEventById(id)
          .then((response) => {
            eventStore.setEvent(response.data)
          })
          .catch((error) => {
            console.log(error)
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'event' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'event-detail',
          component: EventDetailView,
          props: true
        },
        {
          path: 'edit',
          name: 'event-edit',
          component: EventEditView,
          props: true
        },
        {
          path: 'register',
          name: 'event-register',
          component: EventRegisterView,
          props: true
        }
      ]
    },{
      path: '/organizer/:id',
      name: 'organizer-layout',
      component: OrganizerLayoutViewVue,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const organizerStore = useOrganizerStore()
        OrganizerService.getOrganizerById(id)
          .then((response) => {
            organizerStore.setOrganizer(response.data)
          })
          .catch((error) => {
            console.log(error)
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'organizer' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'organizer-detail',
          component: OrganizerDetailViewVue,
          props: true
        }
      ]
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
