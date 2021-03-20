import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import PictureEdit from '../views/PictureEdit.vue'
import PictureList from '../views/PictureList.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        component: CategoryEdit
      },
      {
        path: '/rest/categories/edit/:id',
        component: CategoryEdit,
        props: true
      },
      {
        path: '/categories/list',
        component: CategoryList
      },
      {
        path: '/articles/create',
        component: ArticleEdit
      },
      {
        path: '/rest/articles/edit/:id',
        component: ArticleEdit,
        props: true
      },
      {
        path: '/articles/list',
        component: ArticleList
      },
      {
        path: '/pictures/create',
        component: PictureEdit
      },
      {
        path: '/rest/pictures/edit/:id',
        component: PictureEdit,
        props: true
      },
      {
        path: '/pictures/list',
        component: PictureList
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
