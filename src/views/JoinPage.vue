<template>
  <div>
    <h2>회원가입</h2>
    <form @submit.prevent="submitForm">
      <input v-model="userid" placeholder="아이디"/>
      <br>
      <input v-model="password" type="password" placeholder="비밀번호"/>
      <br>
      <button type="submit">제출</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: '',
      password: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await this.$axios.post('/api/register', {
          userid: this.userid,
          password: this.password,
        });

        console.log('회원가입 성공:', response.data);
        this.$router.push('/' + this.userid + '/detail');
      } catch (error) {
        console.error('회원가입 실패:', error.response.data);
        // 여기서 에러 처리를 원하는 대로 수행할 수 있습니다.
      }
    },
  },
};
</script>

<style>
</style>

