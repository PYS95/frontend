<template>
  <div v-if="currentGridData" class="detail-page">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray" @click="goToPostEditPage">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red" @click="handleDeletePost">삭제</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-gray" @click="goBack">목록</button>
    </div>
    <div class="header">
      <h1>{{ currentGridData.post_title }}</h1>
      <p class="author">작성자: {{ currentGridData.user_id }}</p>
    </div>
    <div class="content-section">
      <h2>내용</h2>
      <div class="content" v-html="currentGridData.post_content"></div>
    </div>
    <h2>댓글</h2>
    <div v-if="currentGridData.comment" class="comment">
      <div v-for="comment in currentGridData.comment" :key="comment.user_id" class="comment">
        <div class="comment-content">
          <p>{{ comment.comment_content }}</p>
        </div>
        <button @click="handleDeleteComment(comment.user_id)">댓글 삭제</button>
      </div>
    </div>
    <div class="comment-input">
      <textarea v-model="newComment" placeholder="댓글을 입력하세요."></textarea>
      <button @click="handleAddComment">댓글 추가</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      newComment: '',
      currentGridData: null,
    };
  },
  methods: {
    handleAddComment() {
      if (this.newComment && this.currentGridData) {
        const listId = this.currentGridData.id;
        axios.post(`/api/addComment/${listId}`, { listId: listId, comment_content: this.newComment })
            .then(response => {
              this.currentGridData.comment_content.push(response.data);
              this.newComment = '';
            })
            .catch(error => {
              console.error('Error adding comment:', error);
            });
      }
    },
    fetchData() {
      const listId = this.$route.params.post_no;
      axios.get(`/api/post/${listId}`)
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
    goBack() {
      this.$router.go(-1);
    },
    goToPostEditPage() {
      const isAuthor = this.currentGridData.user_id === localStorage.getItem('userId');
      if (isAuthor) {
        this.$router.push(`/edit/${this.currentGridData.post_no}`);
      } else {
        alert('게시글 작성자만 수정할 수 있습니다.');
      }
    },
    handleDeletePost() {
      const postId = this.currentGridData.post_no;
      const isAuthor = this.currentGridData.user_id === localStorage.getItem('userId');
      if (!isAuthor) {
        alert('게시글 작성자만 삭제할 수 있습니다.');
        return;
      }

      const postPw = prompt('게시글 삭제를 위해 패스워드를 입력하세요.');
      if (postPw === null) {
        // 사용자가 취소를 누른 경우
        return;
      }

      if (postPw === this.currentGridData.post_pw) {
        axios.delete(`/api/post/${postId}`)
            .then(response => {
              alert(response.data);
              this.$router.go(-1);
            })
            .catch(error => {
              console.error('게시글 삭제 오류:', error);
              alert('게시글 삭제에 실패했습니다.');
            });
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    },
  },
  mounted() {
    this.fetchData();
    this.$root.$on('refreshData', this.refreshData);
  },
};
</script>

<style scoped>
</style>
