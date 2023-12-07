<template>
  <!-- 상세 페이지 컴포넌트의 루트 엘리먼트 -->
  <div v-if="currentGridData" class="detail-page">

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

    <!-- 목록으로 돌아가는 링크 -->
    <router-link to="/" class="back-link">목록으로 돌아가기</router-link>

  </div>
</template>

<script>
// 필요한 Vuex 매핑 및 메서드를 가져옴
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    // Vuex 스토어에서 상태를 매핑하여 사용
    ...mapState('grid', ['currentGridData']),
  },
  data() {
    // 컴포넌트의 데이터 영역: 새로운 댓글을 담는 변수
    return {
      newComment: '',
    };
  },
  methods: {
    // Vuex mutations을 매핑하여 사용
    ...mapMutations('grid', ['addComment', 'deleteComment']),

    // 댓글 추가 메서드
    handleAddComment() {
      if (this.newComment && this.currentGridData) {
        this.addComment({ gridId: this.currentGridData.id, comment: { text: this.newComment } });
        this.newComment = ''; // 입력 필드 초기화
      }
    },

    // 댓글 삭제 메서드
    handleDeleteComment(commentId) {
      if (this.currentGridData) {
        this.deleteComment({ gridId: this.currentGridData.id, commentId });
      }
    },
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

/* 목록으로 돌아가는 링크 스타일 */
.back-link {
  display: block;
  margin-top: 20px;
  color: #3498db;
  text-decoration: none;
  text-align: center;
}
</style>
