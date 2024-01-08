<template>
  <div>
    <h1>마이페이지 수정</h1>
    <input v-model="user.user_id" type="text" class="w3-input w3-border" placeholder="작성자" :readonly="true"/>
    <input v-model="new_user_pw" type="password" class="w3-input w3-border" placeholder="새로운 패스워드"/>
    <br>
    <button type="button" class="w3-button w3-round w3-blue-gray" @click="updatePassword">수정</button>&nbsp;
    <button type="button" class="w3-button w3-round w3-light-gray" @click="goBack">취소</button>&nbsp;
    <button type="button" class="w3-button w3-round w3-dark-gray" @click="deleteUser">회원탈퇴</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      user: {
        user_id: this.$route.query.user_id,
        user_pw: this.$route.query.user_pw,
      },
      new_user_pw: '',
    };
  },
  methods: {
    async updatePassword() {
      try {
        if (!this.new_user_pw) {
          alert("새로운 비밀번호를 입력해주세요.");
          return;
        }

        const response = await axios.put(
            `http://localhost:8080/api/user/${this.user.user_id}`,
            {
              current_user_pw: this.current_user_pw,
              new_user_pw: this.new_user_pw,
            }
        );
        alert(response.data);
        this.$router.push(`/join/${this.user.user_id}`)
      } catch (error) {
        console.error("비밀번호 변경 에러:", error.response.data);
        alert("비밀번호 변경에 실패했습니다.");
      }
    },

    async deleteUser() {
      try {
        const response = await axios.delete(`http://localhost:8080/api/user/${this.user.user_id}`);
        alert(response.data);
        this.$router.push('/');
      } catch (error) {
        console.error("회원탈퇴 오류:", error.response.data);
        alert("회원탈퇴에 실패했습니다.");
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