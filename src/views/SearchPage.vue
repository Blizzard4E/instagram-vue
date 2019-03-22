<template>
    <div class="container" v-if="isLoaded">
        <div class="discover">
            <div class="discover-people-section">
                <h4 class="discover-header">Users</h4>
                <div class="discover-people" v-if="userResults.length>0">
                    <div class="people" v-for="user in userResults.slice(0,6)" :key="user._id">
                        <img :src="user.profileImage" alt="">
                        <h5>{{user.name}}</h5>
                        <p>{{user.followers.length}} followers</p>
                        <button @click.prevent="followPerson(user._id)">Follow</button>
                    </div>
                </div>
                <div v-else><p>No users found with the search term {{this.searchTerm}}</p></div>
            </div>
            <div class="discover-post-section">
                <h4 class="discover-header">Stories</h4>
                <div class="discover-post-wrapper" v-if="postResults.length>0">
                    <div class="discover-post" v-for="post in postResults.slice(0,10)" :key="post._id">
                        <p>{{post.title}}</p>
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
                <div v-else><p>No stories found with the search term {{this.searchTerm}}</p></div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data(){
        return{
            searchTerm:'',
            userResults:[],
            postResults:[],
            isLoaded:false,
            root_url:process.env.VUE_APP_ROOT_API,

        }
    },
    computed:{
        fetchSearchResults(){
            axios.get(`${process.env.VUE_APP_ROOT_API}api/post/search/${this.searchTerm}`)
                    .then(res=>{
                        this.userResults=res.data.data.userResults;
                        this.postResults=res.data.data.postResults
                        this.isLoaded=true;
                    })
        }
    },
     beforeRouteUpdate(to){
         this.searchTerm=to.params.searchTerm
         this.fetchSearchResults;
    },
    created(){
        this.searchTerm=this.$route.params.searchTerm;
        this.fetchSearchResults;
    }

}
</script>
