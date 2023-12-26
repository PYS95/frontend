<template>
  <!-- 상세 페이지 컴포넌트의 루트 엘리먼트 -->
  <div v-if="currentGridData" class="detail-page">
    <div class="common-buttons">
      <button type="button" class="w3-button w3-round w3-blue-gray">수정</button>&nbsp;
      <button type="button" class="w3-button w3-round w3-red">삭제</button>&nbsp;
      <router-link to="/" class="w3-button w3-round w3-gray">목록</router-link>
    </div>
    <!-- 헤더 섹션: 제목과 작성자 정보 표시 -->
    <div class="header">
      <h1>{{ currentGridData.title }}</h1>
      <p class="author">작성자: {{ currentGridData.name }}</p>
    </div>

    <!-- 내용 섹션: 게시물의 내용을 표시 -->
    <div class="content-section">
      <h2>내용</h2>
      <div class="content" v-html="currentGridData.content"></div>
    </div>

    <!-- 댓글 섹션: 댓글 목록과 추가, 삭제 기능 제공 -->
    <h2>댓글</h2>
    <div v-if="currentGridData.comments" class="comments">
      <div v-for="comment in currentGridData.comments" :key="comment.id" class="comment">
        <div class="comment-content">
          <p>{{ comment.text }}</p>
        </div>
        <button @click="handleDeleteComment(comment.id)">댓글 삭제</button>
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
    handleAddComment() {
      if (this.newComment && this.currentGridData) {
        const listId = this.currentGridData.id;
        axios.post(`/api/addComment/${listId}`, { listId: listId, comment: this.newComment })
            .then(response => {
              // 댓글 추가 성공 시 로컬 데이터 갱신
              this.currentGridData.comments.push(response.data);
              this.newComment = ''; // 입력 필드 초기화
            })
            .catch(error => {
              console.error('Error adding comment:', error);
            });
      }
    },

    // 데이터 받아오는 메서드
    fetchData() {
      const listId = this.$route.params.id; // 현재 라우터의 동적 파라미터로부터 ID를 가져옴
      axios.get(`/api/boardList/${listId}`)
          .then(response => {
            this.currentGridData = response.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
  },
  mounted() {
    // 컴포넌트가 마운트된 후 데이터를 받아오는 메서드 호출
    this.fetchData();
  },
};
</script>

<style scoped>
/* 스타일링: 상세 페이지 컴포넌트에 대한 지역 스타일 */
.detail-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

/* 헤더 스타일 */
.header {
  text-align: center;
  margin-bottom: 20px;
}

.header h1 {
  font-size: 2em;
}

.author {
  font-style: italic;
  color: #666;
  font-size: 1em;
}

/* 내용 스타일 */
.content-section {
  margin-bottom: 20px;
}

.content-section h2 {
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-bottom: 20px;
  font-size: 1.5em;
  margin-top: 50px;
}

.content {
  margin-top: 20px;
  margin-bottom: 150px;
}

/* 댓글 스타일 */
.comments {
  border-top: 1px solid #ddd;
  padding-top: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
}

.comment {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.comment-content {
  flex: 1;
}

.comment p {
  margin: 0;
}

.comment button {
  padding: 5px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  cursor: pointer;
}

/* 댓글 입력 스타일 */
.comment-input textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  box-sizing: border-box;
}

.comment-input button {
  padding: 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
