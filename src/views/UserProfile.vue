<template>
    <div v-if="!isLoading" class="user-profile">
        <div class="container">
            <div class="user-basic-profile">
                <div class="user-image"><img :src=" user.profileImage" alt=""></div>
                <div class="user-wrapper">
                    <div class="user-profile-content">
                        <h3>{{user.name}}</h3>
                        <p>{{user.username}}</p>
                        <button v-if="isFollowing">Following</button>
                        <button v-if="!isFollowing">Follow</button>
                    </div>
                    <div class="user-activity">
                        <h5>{{user.pictures.length}} posts</h5>
                        <h5>{{user.followers.length}} followers</h5>
                        <h5>{{user.following.length}} following</h5>
                    </div>
                </div>
                
                
            </div>
            <div class="user-posts">
                <div class="discover-post-wrapper">
                        <div class="discover-post" v-for="post in user.pictures" :key="post._id">
                            <div class="discover-post-image">
                                <img :src="root_url + '/' + post.pictureURL" alt="">
                                <div class="post-overlay">
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
            user:{},
            root_url:process.env.VUE_APP_ROOT_API,
            isLoading:true,
            isFollowing:false,
            currentUser:JSON.parse(localStorage.getItem('user'))
        }
    },
    methods:{

    },
    created(){
        axios.get(`${process.env.VUE_APP_ROOT_API}/api/user/${this.$route.params.username}`)
        .then(res=>{
            this.user=res.data.data;
            console.log(res.data.data)
            if(this.user.followers.indexOf(this.currentUser.userId)>-1){
                this.isFollowing=true;                
            }
            this.isLoading=false;
        })
    }
}
</script>
