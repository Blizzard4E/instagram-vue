<template>
    <div>
        <form @submit.prevent="signup()">
            <input type="text" placeholder="Username" v-model="user.username">
            <button>Sign Up</button>
        </form>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    data(){
        return{
            user:{
                username:'',
                name:'',
                googleId:'',
                profileImage:'',
                email:''
            }
        }
    },
    methods:{
        signup(){
            if(!this.user.username)
                return alert('Please choose a username')
            else{
                axios.post(`${process.env.VUE_APP_ROOT_API}user/signup`,this.user)
                .then(res=>{
                    console.log(res.data.data.alreadySignedUp)
                    if(!res.data.data.alreadySignedUp){
                        let user=JSON.parse(localStorage.getItem('user'));
                        user['email']=res.data.data.email;
                        user['userId']=res.data.data._id;
                        localStorage.setItem('user',JSON.stringify(user));
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        }
    },
    created(){
        const user=JSON.parse(localStorage.getItem('user'));
        this.user.googleId=user.El;
        this.user.name=user.w3.ig;
        this.user.email=user.w3.U3;
        this.user.profileImage=user.Paa;
    }
}
</script>

<style scoped>

</style>


