<template>
  <!-- TuiGrid 컴포넌트의 템플릿 -->
  <div ref="tuiGrid" class="grid-container"></div>
</template>

<script>
// TuiGrid 라이브러리를 가져옴
import Grid from 'tui-grid';

export default {
  // 컴포넌트의 이름
  name: 'TuiGrid',
  // 컴포넌트가 기대하는 속성들
  props: {
    // 그리드에 표시할 데이터 (배열 또는 객체)
    data: {
      type: [Array, Object],
      required: true,
    },
    // 그리드의 열 구성 설정
    columns: {
      type: Array,
      required: true,
    },
    // 그리드를 구성하기 위한 추가적인 옵션들
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  mounted() {
    // 사용자 정의 옵션과 기본 옵션을 병합
    const option = Object.assign(this.options || {}, {
      // 그리드를 부착할 엘리먼트 지정
      el: this.$refs.tuiGrid,
      // 데이터와 열 구성을 제공
      data: this.data,
      columns: this.columns,
      // 행 번호를 사용한 행 헤더 설정
      rowHeaders: ['rowNum'],
      // 그리드의 페이지네이션 옵션
      pageOptions: {
        useClient: true, // 클라이언트 측에서의 페이지네이션
        perPage: 10, // 페이지 당 행 수
      },
      // 클라이언트 측 정렬 활성화
      useClientSort: true,
    });

    // 지정된 옵션으로 TuiGrid의 새로운 인스턴스 생성
    this.gridInstance = new Grid(option);

    // 그리드 인스턴스를 부모 컴포넌트로 전달
    this.$emit('grid-instance', this.gridInstance);
  },
};
</script>

<style scoped>
</style>
