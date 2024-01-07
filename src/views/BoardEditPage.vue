<template>
  <div>
    <h2>게시판 등록</h2>
    <form @submit.prevent="submitForm">
      <input v-model="post_title" type="text" class="w3-input w3-border" placeholder="제목"/>
      <input v-model="user_id" type="text" class="w3-input w3-border" :placeholder="user_id" readonly />
      <textarea v-model="post_content" class="w3-input w3-border" placeholder="내용"></textarea>
      <input v-model="post_pw" type="password" class="w3-input w3-border" placeholder="패스워드"/>
      <br />
      <button type="submit" class="w3-button w3-round w3-blue-gray">저장</button>&nbsp;
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
    this.fetchUserId();
  },
  methods: {
    fetchUserId() {
      try {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
          this.user_id = storedUserId;
        } else {
          console.error("로컬 스토리지에서 사용자 ID를 찾을 수 없습니다.");
        }
      } catch (error) {
        console.error("로컬 스토리지에서 사용자 ID를 가져오는 중 오류 발생:", error);
      }
    },
    async submitForm() {
      if (!this.post_title || !this.post_content || !this.post_pw) {
        alert("모든 항목을 입력해주세요.");
        return;
      }

      try {
        const response = await axios.post(
            `http://localhost:8080/api/post`,
            {
              user_id: this.user_id,
              post_title: this.post_title,
              post_content: this.post_content,
              post_pw: this.post_pw,
            }
        );

        if (response.status === 201) {
          alert("게시글이 성공적으로 등록되었습니다.");
          await this.$router.go(-1);
        } else {
          alert("게시글 등록에 실패했습니다.");
        }
      } catch (error) {
        console.error("게시판 생성 에러:", error);
        alert("게시글 등록에 실패했습니다.");
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
