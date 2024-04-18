import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Edit from '@/views/Edit.vue'
import AddProject from '@/views/AddProject.vue'



const routes = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/edit/:id',
      component: Edit
    },
    {
      path: '/addproject',
      component: AddProject
    }
  ]

const router = createRouter({
  history: createWebHistory(),
    routes
})
  
export default router