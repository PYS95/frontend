// index.js
import Vue from 'vue';
import VueRouter from 'vue-router';
import DetailPage from "@/views/DetailPage.vue";
import ListPage from "@/views/ListPage.vue";
import JoinPage from "@/views/common/JoinPage.vue";
import BoardEditPage from "@/views/common/BoardEditPage.vue";
import JoinMemberPage from "@/views/common/JoinMemberPage.vue";

// Vue Router 플러그인을 사용
Vue.use(VueRouter);

// 라우트 정의
const routes = [
    {
        path: '/',
        name: 'list',
        component: ListPage,
    },
    {
        path: '/detail/:post_no',
        name: 'detail',
        component: DetailPage,
        props: true, // 라우트 매개변수를 컴포넌트의 props로 전달
    },
    {
      path: '/join',
      name: 'join',
      component: JoinPage,
    },
    {
        path: '/join/:user_id',
        name: 'joinMember',
        component: JoinMemberPage,
        props: true
    },
    {
      path: '/edit',
      name: 'boardEdit',
      component: BoardEditPage
    }
];

// Vue Router 인스턴스 생성
const router = new VueRouter({
    mode: 'history', // HTML5 History 모드 사용
    base: process.env.BASE_URL, // 라우터의 기본 경로
    routes, // 라우트 목록
});

// 라우터 인스턴스 내보내기
export default router;