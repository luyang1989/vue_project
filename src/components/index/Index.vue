<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-input v-model="user_name" placeholder="用户名"></el-input>
    <el-input v-model="pass_word" placeholder="密码"></el-input>
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      user_name: '',
      pass_word: ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
