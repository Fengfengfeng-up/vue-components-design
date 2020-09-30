<script>
export default {
  render(h) {
    return h('div', { class: 'home' }, 'this is home')
  },
  created() {
    setTimeout(() => {
      // this.$router.push('/about')
      this.$router.push({path: '/about', query: {'a': '1', b: '1'}, param: {id: '1',data:'2'}})
      console.log(this.$router.route)
      // this.$router.replace('/about')
    }, 1000)
  },
}
</script>

<style>
.home {
  font-weight: bold;
  color: #000;
}
</style>
