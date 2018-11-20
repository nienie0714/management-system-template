<template>
  <div>
  </div>
</template>

<script>
  import bus from '../common/bus'
  export default {
    name: 'webpack',
    data() {
      return {
      }
    },
    components: {
    },
    computed: {
    },
    created() {
    },
    deactivated() {
      window.removeEventListener('resize', this.renderChart)
      bus.$off('collapse', this.handleBus)
    },
    methods: {
    }
  }

</script>

<style scoped>
  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }

  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }

  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }

  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }

  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
  }

  .user-info-list span {
    margin-left: 70px;
  }

  .mgb20 {
    margin-bottom: 20px;
  }

  .todo-item {
    font-size: 14px;
  }

  .todo-item-del {
    text-decoration: line-through;
    color: #999;
  }

  .schart {
    width: 100%;
    height: 300px;
  }
</style>
