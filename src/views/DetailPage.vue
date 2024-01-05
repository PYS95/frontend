<!--DetailPage.vue-->
<template>
  <!-- 상세 페이지 컴포넌트의 루트 엘리먼트 -->
  <div v-if="currentGridData" class="detail-page">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red">삭제</button>&nbsp;
      <router-link to="/join/${this.user_id}" class="w3-button w3-round w3-gray">목록</router-link>
    </div>
    <!-- 헤더 섹션: 제목과 작성자 정보 표시 -->
    <div class="header">
      <h1>{{ currentGridData.post_title }}</h1>
      <p class="author">작성자: {{ currentGridData.user_id }}</p>
    </div>

    <!-- 내용 섹션: 게시물의 내용을 표시 -->
    <div class="content-section">
      <h2>내용</h2>
      <div class="content" v-html="currentGridData.post_content"></div>
    </div>

    <!-- 댓글 섹션: 댓글 목록과 추가, 삭제 기능 제공 -->
<!--    수정이 필요함.-->
    <h2>댓글</h2>
    <div v-if="currentGridData.comment" class="comment">
      <div v-for="comment in currentGridData.comment" :key="comment.user_id" class="comment">
        <div class="comment-content">
          <p>{{ comment.comment_content }}</p>
        </div>
        <buttson @click="handleDeleteComment(comment.user_id)">댓글 삭제</buttson>
      </div>
    </div>

    <!-- 댓글 입력 섹션: 새로운 댓글 입력과 추가 기능 제공 -->
    <div class="comment-input">
      <textarea v-model="newComment" placeholder="댓글을 입력하세요."></textarea>
      <button @click="handleAddComment">댓글 추가</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios'; // Axios 라이브러리 import

export default {
  data() {
    return {
      newComment: '',
      currentGridData: null,
    };
  },
  methods: {
    // 댓글 추가 메서드
    // 수정이 필요함.
    handleAddComment() {
      if (this.newComment && this.currentGridData) {
        const listId = this.currentGridData.id;
        axios.post(`/api/addComment/${listId}`, { listId: listId, comment_content: this.newComment })
            .then(response => {
              // 댓글 추가 성공 시 로컬 데이터 갱신
              this.currentGridData.comment_content.push(response.data);
              this.newComment = ''; // 입력 필드 초기화
            })
            .catch(error => {
              console.error('Error adding comment:', error);
            });
      }
    },

    // 데이터 받아오는 메서드
    fetchData() {
      const listId = this.$route.params.post_no; // 현재 라우터의 동적 파라미터로부터 post_no를 가져옴
      console.log('Fetching data for listId:', listId);
      axios.get(`/api/board/${listId}`)
          .then(response => {
            this.currentGridData = response.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            console.error('Response data:', error.response.data);
          });
    },
    refreshData() {
      this.fetchData();
    },
  },
  mounted() {
    // 컴포넌트가 마운트된 후 데이터를 받아오는 메서드 호출
    this.fetchData();
    this.$root.$on('refreshData', this.refreshData);
  },
};
</script>

<style scoped>
</style>
