import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Profile from './views/Profile'
import CreatePost from './views/Create'
import SinglePost from './views/SinglePost'
import Discover from './views/Discover'
import UserProfile from './views/UserProfile'
import SearchPage from './views/SearchPage'

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/profile/:username",
      name: "userprofile",
      component: UserProfile
    },
    {
      path: "/search/:searchTerm",
      name: "searchpage",
      component: SearchPage
    },
    {
      path: "/create",
      name: "createpost",
      component: CreatePost
    },
    {
      path: "/post/:postId",
      name: "singlePost",
      component: SinglePost
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/discover",
      name: "discover",
      component: Discover
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
