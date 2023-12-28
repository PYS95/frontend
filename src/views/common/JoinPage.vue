<template>
  <div>
    <h2>회원가입</h2>
    <form @submit.prevent="submitForm">
      <input v-model="name" placeholder="아이디"/>
      <br>
      <input v-model="password" type="password" placeholder="비밀번호"/>
      <br>
      <button type="submit">가입</button>
      <router-link to="/">취소</router-link>
    </form>
  </div>
</template>

<script>
import ListPage from "@/views/ListPage.vue";

export default {
  computed: {
    ListPage() {
      return ListPage
    }
  },
  data() {
    return {
      name: '',
      password: '',
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await this.$axios.post('/api/register', {
          name: this.name,
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

