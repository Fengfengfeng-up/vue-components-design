export default {
  props: {
    to: {
      type: [String, Object],
      default: '',
    },
    tag: {
      type: String,
      default: 'a',
    },
  },
  render(h) {
    // h(tag, data, children)
    return h(this.tag, { attrs: { href: '#' + this.to } }, this.$slots.default)
    // return <a href={'#' + this.to}>{this.$slots.default}</a>
  },
}
