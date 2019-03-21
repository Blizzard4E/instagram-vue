import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{},
    isLoggedIn:false,
    posts:[]
  },
  mutations: {
    setUser(state,userData){
      state.user=userData;
      state.isLoggedIn=true;
    },
    logOut(state,data){
      localStorage.removeItem('user');
      state.user={};
      state.isLoggedIn=false;
    },
    getPosts(state,posts){
      state.posts=posts;
    }
  },
  actions: {
    fetchPosts({commit,state},payload){
      axios.get(`${process.env.VUE_APP_ROOT_API}/api/post?perPage=${payload.perPage}&page=${payload.page}`).then(res=>{
        // this.posts=res.data.data
        // state.posts=res.data.data;
        // commit('getPosts',res.data.data);
        state.posts=res.data.data;
      })
    },
    commentOnPost({commit,state},payload){
      // console.log(payload)

      // axios.post(`${process.env.VUE_APP_ROOT_API}/api/comment/comment`,{
      //   pictureId:payload.pictureId,
      //   userId:state.user.userId,
      //   comment:payload.newcomment,
      //   commenterName:state.user.username,
      //   postId:payload.postId
      // }).then(res=>{
      //   console.log(res)
      // })
    }
  }
});
