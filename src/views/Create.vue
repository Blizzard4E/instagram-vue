<template>
  <div class="create-post-form">
  <div class="container createPost">
      <form
        action="/create"
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="createPost()"
      >
        <div class="field">
          <label>Title</label>
          <input name="title" v-model="title" type="text" placeholder="Title">
        </div>
        <div class="field">
          <label>Image</label>
          <input name="image" type="file" @change="onFileChanged">
        </div>
        <h5>{{progress}}</h5>
        <button type="submit">Post</button>
      </form>
    </div>
  </div>
</template>

<script>
const axios = require("axios");

export default {
  data() {
    return {
      image: null,
      title: "",
      progress: ""
    };
  },
  
  methods: {
    onFileChanged(event) {
      //   console.log(event.target.files[0])
      this.image = event.target.files[0];
    },
    async createPost() {
      const userId = JSON.parse(localStorage.getItem("user")).userId;
      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("description", this.description);
      formData.append("user", userId);
      formData.append("pictureURL", this.image);
      const post=await axios({
        method: "post",
        url: `${process.env.VUE_APP_ROOT_API}/api/post`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } }
      });
      this.$socket.emit('newPost',post.data.data);
      this.$router.replace('/');
    }
  }
};
</script>

<style scoped>
</style>

