<template>
  <div class="hello">
    <a href="#" @click.prevent="loginGoogle()">Login</a>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data(){
    return{
      isSignIn:null
    }
  },
  methods:{
    loginGoogle(){
      this.$gAuth.signIn()
      .then(GoogleUser => {
        // On success do something, refer to https://developers.google.com/api-client-library/javascript/reference/referencedocs#googleusergetid
        console.log('user', GoogleUser)
        this.isSignIn = this.$gAuth.isAuthorized
      })
      .catch(error  => {
        //on fail do something
        console.log('failed')
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
