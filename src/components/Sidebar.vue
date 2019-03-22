<template>
    <div v-if="isLoaded" class="sidebar-content">
        <div class="profile-section" v-if="isLoggedIn">
            <div class="profileImage"  >
                <img :src="currentUser.profileImage" alt="">
            </div>
            <div class="profile-content">
                <h5>{{currentUser.name}}</h5>
                <h6>@{{currentUser.username}}</h6>
            </div>
        </div>
        <div class="stories-section">
            <div class="stories">
                <h5>New Stories</h5>
                <div class="story" v-for="story in newStories.slice(0,3)" :key="story._id">
                    <div class="story-image"><img :src="root_url + '/' + story.pictureURL" alt=""></div>
                    <div class="story-content">
                        <div class="story-writer"><h4>{{story.user.name}}</h4></div>
                        <div class="story-written-date">{{story.createdAt | formatDate}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="you-might-know-section">
            <h5>You Might Know</h5>
            <div class="story-people">
                <div class="story-person" v-for="person in users.slice(0,3)" :key="person._id">
                    <div class="person-image"><img :src="person.profileImage" alt=""></div>
                    <div class="person-details">
                        <h4>{{person.name}}</h4>
                        <p>{{person.followers.length}} followers</p>
                    </div>
                </div>
            </div>
        </div>
     
    </div>
</template>
<script>

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
var currentScrollPos = window.pageYOffset;

//   if (prevScrollpos > currentScrollPos) {
    if(document.querySelector('.sidebar-content')){
        if (currentScrollPos<90) {
            document.querySelector(".sidebar-content").style.marginTop = "0";
        } else {
            document.querySelector(".sidebar-content").style.marginTop = "-100px";
        }
    }
 
//   prevScrollpos = currentScrollPos;
}

const moment=require('moment');
const axios=require('axios');
// console.log(moment)

export default {
    data(){
        return{
            currentUser:{},
            newStories:[],
            users:[],
            root_url:process.env.VUE_APP_ROOT_API,
            isLoaded:false,
            isLoggedIn:false,
        }
    },
    filters: {
        formatDate: function (value) {
            if(value)
                return moment(value.toString()).startOf('day').fromNow();
        }
    },
    sockets:{
        someonePosted(data){
            this.newStories.unshift(data);
        }
    },
    methods:{
    },
    created(){
        axios.get(`${process.env.VUE_APP_ROOT_API}/api/post?perPage=4&page=1`).then(res=>{
            // console.log(res.data.data.docs)
            this.newStories=res.data.data.docs;
            this.isLoaded=true;
        })
        axios.post(`${process.env.VUE_APP_ROOT_API}/api/post/discover`).then(res=>{
            this.users=res.data.data.users;
        })
        
        this.currentUser=JSON.parse(localStorage.getItem('user'));
        if(this.currentUser)
            this.isLoggedIn=true;
    }

}
</script>
