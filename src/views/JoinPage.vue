<!-- JoinPage.vue -->
<template>
  <div>
    <h2>회원가입</h2>
    <form @submit.prevent="submitForm">
      <input v-model="user_id" type="text" placeholder="아이디"
             style="width:500px; height:50px; margin-left: auto; margin-right: auto"/>
      <br>
      <br>
      <input v-model="user_pw" type="password" placeholder="비밀번호"
             style="width:500px; height:50px; margin-left: auto; margin-right: auto"/>
      <br>
      <br>
      <button type="submit" class="w3-button w3-round w3-blue-gray">가입</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-light-gray" @click="goBack">취소</button>
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
            `http://localhost:8080/api/user/${this.user_id}`,
            {
              user_id: this.user_id,
              user_pw: this.user_pw,
            }
        );
        if (response.status === 201) {
          console.log("회원가입 성공: ", response.data);
          alert(`${this.user_id}님 환영합니다!`);

          // 회원가입 성공 후 로컬 스토리지에 정보 저장
          localStorage.setItem('userId', this.user_id);

          // 회원가입 성공 후 페이지 이동
          // user_id를 다음 route로 전달
          this.$router.push({
            path: `/join/${this.user_id}`,
            params: {user_id: this.user_id},
          });
        } else {
          console.log("이미 존재하는 아이디입니다. : ", response.data);
          alert(response.data);
        }
      } catch (error) {
        console.error("회원가입 실패: ", error.response.data);
        alert("회원가입 실패");
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
