<template>
  <div>
    <h2>회원가입</h2>
    <form @submit.prevent="submitForm">
      <input v-model="user_id" type="text" placeholder="아이디 "/>
      <br>
      <input v-model="user_pw" type="password" placeholder="비밀번호"/>
      <br>
      <button type="submit">가입</button>
      <router-link to="/">취소</router-link>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user_id: '',
      user_pw: '',
    };
  },
  methods: {
    async submitForm() {
      // 입력값 검증
      if (!this.user_id || !this.user_pw) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return;
      }

      try {
        // 회원가입 요청 보내기
        const response = await axios.post(
            'http://localhost:8080/api/user/' + this.user_id,
            {
              userId: this.user_id,
              userPw: this.user_pw,
            }
        );

        if (response.data.includes("success")) {
          console.log("회원가입 성공 : ", response.data);
          alert(`${this.user_id}님 환영합니다!`);
        } else {
          this.$router.push(`/join/${this.user_id}`);
          console.log(response.data);
          alert(response.data);
        }
      } catch (error) {
        console.log("회원가입 실패 : ", error.response.data);
      }
    },
  },
};
</script>

<style>
</style>
