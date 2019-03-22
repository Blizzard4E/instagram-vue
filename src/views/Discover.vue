<template>
    <div class="container">
        <div class="discover">
            <div class="discover-people-section">
                <h5 class="discover-header">You might want to follow</h5>
                <div class="discover-people">
                    <div class="people" v-for="user in users" :key="user._id">
                        <img :src="user.profileImage" alt="">
                        <h5>{{user.name}}</h5>
                        <p>{{user.followers.length}} followers</p>
                        <button @click.prevent="followPerson(user._id)">Follow</button>
                    </div>
                </div>
            </div>
            <div class="discover-post-section">
                <h5 class="discover-header">You might like</h5>
                <div class="discover-post-wrapper">
                    <div class="discover-post" v-for="post in posts" :key="post._id">
                        <div class="discover-post-image">
                            <img :src="root_url + post.pictureURL" alt="" >
                            <div class="post-overlay" @click="goToPhoto(post._id)">
                                <div class="post-likes">
                                    <i class="fas fa-heart"></i>
                                    <h5>{{post.likes}}</h5>
                                </div>
                                <div class="post-comments">
                                    <i class="fas fa-comment"></i>
                                    <h5>{{post.comments.length}}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';



export default {
    data(){
        return{
            posts:[],
            users:[],
            root_url:process.env.VUE_APP_ROOT_API
        }
    },
    methods:{
        followPerson(userId){
            // console.log(userId)
        },
        goToPhoto(postId){
            this.$router.push({name:'singlePost',params:{postId}})
        }
    },
    created(){
        axios.post(`${process.env.VUE_APP_ROOT_API}api/post/discover`).then(res=>{
            // console.log(res.data)
            this.posts=res.data.data.posts;
            this.users=res.data.data.users;
        })
    }
}
</script>
