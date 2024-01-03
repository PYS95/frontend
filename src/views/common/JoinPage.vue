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
      try {
        const response = await axios.post('http://localhost:8080/api/user/{user_id)', {
          user_id: this.user_id,
          user_pw: this.user_pw,
        });

        if (response.data.include("success")) {
          alert(response.data);
          this.$router.push('/');
        } else {
          console.log('회원가입 실패 : ', response.data);
        }
      } catch (error) {
        console.log('회원가입 실패 : ', error.response.data);
      }
    }
  }
}
</script>

<style>
</style>
