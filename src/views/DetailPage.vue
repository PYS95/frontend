<template>
  <div v-if="currentGridData" class="detail-page">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-gray" @click="goBack">목록</button>&nbsp;
    </div>
    <div class="header">
      <h1>{{ currentGridData.post_title }}</h1>
      <p class="author">작성자: {{ currentGridData.user_id }}</p>
    </div>
    <div class="content-section">
      <h2>내용</h2>
      <div class="content" v-html="currentGridData.post_content"></div>
      <h2>댓글</h2>
    </div>
    <template v-if="hasComments">
      <div v-for="comment in reversedComments" :key="comment.comment_no">
        <div class="comment">
          <div class="comment-content">
            <p>{{ comment.comment_content }} | {{ comment.user_id }}</p>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      currentGridData: {
        post_title: '',
        user_id: '',
        post_content: '',
        comment: [],
      },
    };
  },
  computed: {
    hasComments() {
      return this.currentGridData.comment && this.currentGridData.comment.length > 0;
    },
    reversedComments() {
      return this.currentGridData.comment.slice().reverse();
    },
  },
  methods: {
    fetchData() {
      const listId = this.$route.params.post_no;
      console.log('listId로 데이터 가져오는 중:', listId);

      axios.get(`/api/post/${listId}`)
          .then(response => {
            this.currentGridData = response.data || {};
            return axios.get(`/api/comment/list/${listId}`);
          })
          .then(response => {
            // 기존에 존재하는 comment 속성에 데이터를 할당
            this.$set(this.currentGridData, 'comment', response.data || []);
          })
          .catch(error => {
            console.error('데이터 가져오기 오류:', error);
            // 오류 시 빈 배열로 설정
            this.$set(this.currentGridData, 'comment', []);
          });
    },

    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
</style>
