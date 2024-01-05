<!--BoardEditPage.vue-->
<template>
  <div>
    <h2>게시판 등록</h2>
    <form @submit.prevent="submitForm">
      <input v-model="post_title" type="text" class="w3-input w3-border" placeholder="제목"/>
      <input v-model="user_id" type="text" class="w3-input w3-border" placeholder="작성자" />
      <textarea v-model="post_content" class="w3-input w3-border" placeholder="내용"></textarea>
      <input v-model="post_pw" type="password" class="w3-input w3-border" placeholder="패스워드"/>
      <br />
      <button type="submit" class="w3-button w3-round w3-blue-gray" @click="savePost">저장</button>&nbsp;
      <router-link to="/join">취소</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      requestBody: this.$route.query,
      idx: this.$route.query.idx,

      post_title: "",
      user_id: "",
      post_content: "",
      post_pw: "",
    };
  },
  methods: {
    async submitForm() {
      if (!this.post_title || !this.user_id || !this.post_content || !this.post_pw) {
        alert("모든 항목을 입력해주세요.");
        return;
      }
      try {
        const response = await axios.post(
            "http://localhost:8080/api/post/${this.user_id}",
            {
              postTitle: this.post_title,
              userId: this.user_id,
              postContent: this.post_content,
              postPw: this.post_pw,
            }
        );

        // 200(성공): 서버가 요청을 제대로 처리했다는 뜻이다. 이는 주로 서버가 요청한 페이지를 제공했다는 의미로 쓰인다.
        // 201(작성됨): 성공적으로 요청되었으며 서버가 새 리소스를 작성했다.
        // 202(허용됨): 서버가 요청을 접수했지만 아직 처리하지 않았다.

        if (response.status === 201) {
          this.$router.push('/post/list');
        } else {
          alert("게시글 등록에 실패했습니다.");
        }
      } catch (error) {
        console.error("게시판 생성 에러:", error);
        alert("게시글 등록에 실패했습니다.");
      }
    },
    savePost() {

    }
  },
};


</script>

<style>
</style>