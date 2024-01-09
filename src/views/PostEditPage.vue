<template>
  <div>
    <h2>게시글 수정</h2>
    <form @submit.prevent="submitForm">
      <input v-model="post_title" type="text" class="w3-input w3-border" placeholder="제목"
             style="width:750px; height:50px; margin-left: auto; margin-right: auto"/>&nbsp;
      <input v-model="user_id" type="text" class="w3-input w3-border" :placeholder="user_id"
             style="width:750px; height:50px; margin-left: auto; margin-right: auto" readonly/>&nbsp;
      <textarea v-model="post_content" class="w3-input w3-border" placeholder="내용"
                style="width:750px; height:100px; margin-left: auto; margin-right: auto"/>&nbsp;
      <input v-model="post_pw" type="password" class="w3-input w3-border" placeholder="패스워드"
             style="width:750px; height:50px; margin-left: auto; margin-right: auto"/>
      <br/>
      <button type="submit" class="w3-button w3-round w3-blue-gray">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-light-gray" @click="goBack">취소</button>&nbsp;
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post_title: "",
      user_id: "",
      post_content: "",
      post_pw: "",
    };
  },
  mounted() {
    // 게시글 데이터를 불러와서 표시
    this.fetchPostData();
  },
  methods: {
    async fetchPostData() {
      try {
        // 수정할 게시글의 post_no를 라우터에서 받아옴
        const post_no = this.$route.params.post_no;

        // 서버에서 해당 게시글의 데이터를 가져옴
        const response = await axios.get(`http://localhost:8080/api/post/${post_no}`);

        // 데이터를 컴포넌트의 상태에 설정
        this.post_title = response.data.post_title;
        this.user_id = response.data.user_id;
        this.post_content = response.data.post_content;
        this.post_pw = response.data.post_pw;
      } catch (error) {
        console.error("게시글 데이터를 불러오는 중 에러:", error);
      }
    },
    async submitForm() {
      // 수정된 게시글 데이터를 서버로 전송
      try {
        const post_no = this.$route.params.post_no;
        const response = await axios.put(`http://localhost:8080/api/post/${post_no}`, {
          post_title: this.post_title,
          post_content: this.post_content,
          post_pw: this.post_pw,
        });

        if (response.status === 200) {
          alert("게시글이 성공적으로 수정되었습니다.");
          await this.$router.go(-1);
        } else {
          alert("게시글 수정에 실패했습니다.");
        }
      } catch (error) {
        console.error("게시글 수정 에러:", error);
        alert("게시글 수정에 실패했습니다.");
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
</style>
