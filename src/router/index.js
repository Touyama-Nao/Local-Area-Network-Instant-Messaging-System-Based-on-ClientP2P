import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login/Login'
import ContactList from '@/components/ContactList/ContactList'
import Chat from '@/components/ChatBody/Chat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ContactList',
      name: 'ContactList',
      component: ContactList
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat
    }
  ]
})
