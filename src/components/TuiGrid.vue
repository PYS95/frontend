<!-- TuiGrid.vue -->
<template>
  <div ref="tuiGrid" class="grid-container"></div>
</template>

<script>
import Grid from 'tui-grid';

export default {
  name: 'TuiGrid',
  props: {
    data: {
      type: [Array, Object],
      required: true,
    },
    columns: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },

  mounted() {
    try {
      const option = Object.assign(this.options || {}, {
        el: this.$refs.tuiGrid,
        data: this.data,
        columns: this.columns,
        rowHeaders: ['rowNum'],
        pageOptions: {
          useClient: true,
          perPage: 10,
        },
      });
      this.gridInstance = new Grid(option);
      this.$emit('grid-instance', this.gridInstance);
    } catch (error) {
      console.error('그리드 초기화 중 오류 발생:', error);
    }
  },

  beforeDestroy() {
    if (this.gridInstance) {
      this.gridInstance.destroy();
      this.gridInstance = null;
    }
  },

  watch: {
    data(newData) {
      try {
        this.gridInstance.resetData(newData);
      } catch (error) {
        console.error('그리드 데이터 업데이트 중 오류 발생:', error);
      }
    },
  },
};
</script>

<style scoped>
</style>
