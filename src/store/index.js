// Vue 및 Vuex 라이브러리를 가져옴
import Vue from 'vue';
import Vuex from 'vuex';

// grid 모듈을 가져옴
import gridModule from './grid/index';

// Vue에 Vuex 플러그인을 사용하도록 설정
Vue.use(Vuex);

// Vuex 스토어 인스턴스를 생성하고 내보냄
export default new Vuex.Store({
  // 모듈을 등록
  modules: {
    grid: gridModule, // 'grid' 모듈 등록
  },
});
