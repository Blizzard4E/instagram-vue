<template>
    <nav>
        <!-- <div class="container navbar"> -->
            <header><router-link to="/">Albedo</router-link></header>
            <div class="search-form">
                <form action="" @submit.prevent="searchDatabase()">
                    <input type="text" placeholder="Search" v-model="searchTerm">
                </form>
            </div>
            <div class="profile">
                <div class="links">
                    <router-link to="/discover"><i class="fas fa-compass"></i></router-link>
                    <router-link to="/create"><i class="fas fa-pen-square"></i></router-link>
                </div>
                <div class="notifications">
                    <i class="fas fa-exclamation newNotificationIcon" v-if="newNotification"></i>
                    <i class="fas fa-heart" @click="showNotifications()"  v-bind:class="{ showRed: notificationVisible }"></i>
                    <div class="notification-bar" v-if="notifications"   v-bind:class="{ showNotifications: notificationVisible }">
                            <div class="notification" v-for="notification in notifications.slice(0,15)" :key="notification._id">
                                <div v-if="notification.notificationType==='Comment'"  @click="goToPost(notification.postId)">{{notification.senderName}} commented on your post. <img :src="root_api + notification.pictureURL"></div>
                                
                            </div>
                    </div>
                </div>
                <div class="profileImage"  v-if="isLoggedIn">
                    <img :src="user.profileImage" alt="">
                </div>
                <div class="profile-content"  v-if="isLoggedIn">
                    <h5>{{user.name}}</h5>
                    <h6>@{{user.username}}</h6>
                </div>
                <div class="login-button">
                    <a href="#" @click.prevent="loginGoogle()" v-if="!isLoggedIn">Login</a>
                    <a href="#" @click.prevent="logoutGoogle()" v-if="isLoggedIn">Logout</a>
                </div>
            </div>
            
        <!-- </div> -->
    </nav>
</template>

<script>
const axios=require('axios');
export default {
    name:'Navbar',
    data(){
        return{
            user:{},
            searchTerm:'',
            isLoggedIn:false,
            notifications:[],
            root_api:process.env.VUE_APP_ROOT_API,
            notificationVisible:false,
            newNotification:false
        }
    },
    sockets:{
        notificationReceived(data){
            this.newNotification=true;
        }
    },
    computed:{
        fetchNotifications(){
            axios.get(`${process.env.VUE_APP_ROOT_API}api/notification/${this.user.userId}`).then(res=>{
                this.notifications=res.data.data;
            })
        }
       
    },
    methods:{
        searchDatabase(){
            this.$router.push({name:'searchpage',params:{searchTerm:this.searchTerm}});
            this.searchTerm=''
            
        },
        showNotifications(){
            this.notificationVisible=!this.notificationVisible
            this.newNotification=false;
        },  
        goToPost(postId){
            this.$router.push({name:'singlePost',params:{postId}});
        },
        loginGoogle(){
            
            this.$gAuth.signIn()
            .then(GoogleUser => {
                    let user={
                        email:GoogleUser.w3.U3,
                        profileImage:GoogleUser.w3.Paa,
                        googleId:GoogleUser.El,
                        name:GoogleUser.w3.ig,
                        username:GoogleUser.w3.U3.split('@')[0]
                    }  
                    axios.post(`${process.env.VUE_APP_ROOT_API}api/user/signup`,user)
                    .then(res=>{
                        user.userId=res.data.data._id;
                        localStorage.setItem('user',JSON.stringify(user));
                        this.user=user;
                        this.$store.commit('setUser',user);
                        this.isLoggedIn=true;
                        // this.$socket.emit('newUser',{name:user.name,userId:user.userId});    
                        this.$socket.emit('newUser',{userId:user.userId,},function(data){
                            // if(!data)
                                // console.log("Username Already Exists");
                            // console.log(data)
                        });
                    }).catch(err=>{console.log(err)})                
                
            })
            .catch(error  => {console.log(error)})
        },
        logoutGoogle(){
            this.$gAuth.signOut()
                .then(() => {
                    this.isLoggedIn=false;
                    this.$store.commit('logOut');
                })
                .catch(error  => {
                // things to do when sign-out fails
                })
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('user'))){
            this.user=JSON.parse(localStorage.getItem('user'));
            this.isLoggedIn=true;
            this.fetchNotifications;
        }
    },
    watch:{
        isLoggedIn:function(newValue,oldValue){
            this.isLoggedIn=newValue;
            if(this.isLoggedIn){
                this.user=JSON.parse(localStorage.getItem('user'));
                this.fetchNotifications;
            }
        }
    }
}
</script>

<style scoped>
    .container{
        max-width: 90%;
        margin: 0 auto;
    }
    /* .navbar{
        display: grid;
        grid-template-columns: repeat(12,1fr);
        grid-gap: 1rem;
    } */
    /* header{
        grid-column: span 2;
    } */
    
    
   
   
    
    /* .search-form{
        grid-column: span 4;
    }
    .search-form input{
        width: 100%;
    }
    .links{
        grid-column: span 2;
        display: flex;
        justify-content: space-between;

    }
    .login-button{
        grid-column: span 2;

    }
    .profile{
        grid-column: span 2;
        display: flex;
    }
    .profileImage{
        border-radius: 50%;
        width: 60px;
        height: 60px;
        overflow: hidden;
    }
    .profileImage img{
        width: 100%;
    } */
</style>

