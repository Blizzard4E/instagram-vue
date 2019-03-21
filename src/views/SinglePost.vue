<template>
    <div class="singlePost" v-if="isLoaded">

      <div class="post-image">
          <img :src="api_url +'/'+ post.pictureURL" alt="">
      </div>
      <div class="post-details">
        <div class="post-author">
            <h5>{{post.user.name}}</h5>
            <h6>{{post.user.username}}</h6>
        </div>
        <div class="post-description">
          <h5>{{post.title}}</h5>
          <p>{{post.description}}</p>
          <h6>Likes: {{post.likes}}</h6>
        </div>
        <div class="comments">
          <div class="comment" v-for="comment in post.comments" :key="comment._id">
            <div class="comment-details">
              <h5>{{comment.commenterName}} </h5>
              <p>{{comment.comment.slice(0,40)}}</p>
            </div>
            <!-- <div class="comment-likes"> -->
              <!-- <span>Likes{{comment.likes}}</span> -->
              <!-- <i class="fas fa-heart"></i><span>{{comment.likes}}</span> -->
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            postId:'',
            post:{},
            isLoaded:false,
            api_url:process.env.VUE_APP_ROOT_API,
        }
    },
    computed:{
        fetchPost(){
            axios.get(`${process.env.VUE_APP_ROOT_API}/api/post/${this.postId}`).then(res=>{
              this.post=res.data.data;
              this.isLoaded=true;
            })
        }
    },
    created(){
        this.postId=this.$route.params.postId;
        this.fetchPost;
    },
    beforeRouteUpdate(to){
        this.postId=to.params.postId;
        this.fetchPost;
    }
}
</script>

<style scoped>

</style>

