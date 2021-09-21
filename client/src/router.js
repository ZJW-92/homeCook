import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import About from './views/About.vue'
// import Friends from './views/Friends.vue'
import Recipes from './views/Recipes.vue'
import RecipeCard from './views/RecipeCard.vue'
import UserCard from './views/UserCard.vue'
import Users from './views/Users.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/recipes/:id',
    name: 'recipe-card',
    component: RecipeCard,
    props: true
  },
  {
    path: '/users/:id',
    name: 'user-card',
    component: UserCard,
    props: true
  },
  {
    path: '/recipes',
    name: 'recipes',
    component: Recipes
  },
  {
    path: '/users',
    name: 'users',
    component: Users
  }
  ]
})
