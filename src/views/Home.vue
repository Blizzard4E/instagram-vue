<template>
  <div class="home container">
    <div class="posts" v-if="isLoaded">
    <div class="new-post-alert" v-if="newPostsAvailable">New Posts</div>
      
      <div class="post" v-for="(post,index) in posts" :key="post._id">
        <div class="post-author">
          <h5 @click="goToUserProfile(post.user.username)">{{post.user.name}}</h5>
          <h6>{{post.user.username}}</h6>
        </div>
        <div class="post-image">
          <img :src="root_url + '/' + post.pictureURL" alt="" @click="viewPost(post._id)">
        </div>
        <div class="post-body">
            <div class="react-buttons">
              <div class="like"><i class="fas fa-heart" @click.prevent="likePost(post._id)"></i></div>
              <div class="download" @click.prevent="goToPhoto(post.pictureURL)"><i class="fas fa-arrow-alt-circle-down"></i></div>
            </div>
            <div class="post-description">
              <h4>{{post.title}}</h4>
              <h6>{{post.likes}} likes</h6>
            </div>
            
            <div class="comments">
              <div class="comment" v-for="comment in post.comments.slice(0,4)" :key="comment._id">
                <h5 class="commenter-name">{{comment.commenterName}}</h5>
                <h6 class="comment-text">{{comment.comment}}</h6>
              </div>
            </div>
            <div class="comment-form">
              <form action="" @submit.prevent="commentOnPost(index,post._id,post.user._id,post.pictureURL)">
                <input type="text" placeholder="Add a comment" v-model="newcomment">
              </form>
            </div>
        </div>
      </div>
      <button v-if="morePostsAvailable" @click.prevent="loadMorePosts()" class="loadMorePostBtn">Load More Post</button>
    </div>
    <div class="sidebar">
      <Sidebar />
    </div>
    
  </div>
</template>

<script>

import axios from 'axios'
import Sidebar from '@/components/Sidebar'
import Vue from 'vue'

export default {
  name: "home",
  components:{
    Sidebar
  },
  data(){
    return{
      isLoaded:false,
      newPostsAvailable:false,
      perPage:4,
      page:1,
      totalPages:1,
      posts:[],
      root_url:process.env.VUE_APP_ROOT_API,
      newcomment:'',
      user:JSON.parse(localStorage.getItem('user')),
      morePostsAvailable:true
    }
  },
 sockets:{
   someonePosted(data){
     this.newPostsAvailable=true;
     this.posts.unshift(data);
   }
 },
  methods:{
    fetchAllPosts(){
      axios.get(`${process.env.VUE_APP_ROOT_API}/api/post?perPage=${this.perPage}&page=${this.page}`).then(res=>{
        this.posts=res.data.data.docs;
        this.totalPages=res.data.data.pages
        // console.log(this.totalPages)
        this.isLoaded=true;
      })
    },
    loadMorePosts(){
      this.page++;
      if(this.page<=this.totalPages){
          axios.get(`${process.env.VUE_APP_ROOT_API}/api/post?perPage=${this.perPage}&page=${this.page}`).then(res=>{
            // console.log(res.data.data.docs);
            res.data.data.docs.forEach(post=>{
              this.posts.push(post);
            })
          })       
      }
      if(this.page==this.totalPages){
        this.morePostsAvailable=false;
      }
      
    },
    goToPhoto(photoURL){
      window.open(`${this.root_url}/${photoURL}`, "_blank");   
    },
    goToUserProfile(username){
      this.$router.push({name:'userprofile',params:{username}});
    },
    viewPost(postId){
      this.$router.push({name:'singlePost',params:{postId}});
    },
  
    likePost(postId){
      // const userId=JSON.parse(localStorage.getItem('user')).userId;
      axios.post(`${process.env.VUE_APP_ROOT_API}/api/post/like`,{
        userId:this.userId,
        postId
      })
    },
    commentOnPost(postIndex,postId,receiverId,pictureURL){
      // this.posts[postIndex].comments.push(this.comment);
      axios.post(`${process.env.VUE_APP_ROOT_API}/api/comment/comment`,{
        userId:this.user.userId,
        comment:this.newcomment,
        commenterName:this.user.name,
        postId
      }).then(res=>{
        this.newcomment=''
        this.fetchAllPosts();
        this.$forceUpdate();
      })
      this.$socket.emit('notification',{postId,comment:this.newcomment,notificationType:"Comment",to:receiverId,pictureURL,userId:this.$store.state.user.userId,username:this.$store.state.user.name});      
    }
  },
  created(){
    this.fetchAllPosts();
    const user=JSON.parse(localStorage.getItem('user'));
    if(user && user.userId!==''){
        this.$store.commit('setUser',user);
        this.$socket.emit('newUser',{userId:user.userId,},function(data){
        });
    }
  },
};
</script>
