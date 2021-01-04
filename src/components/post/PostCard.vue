<template>
  <div id="post-card">
    <div class="context">
      <img :src="post.img" alt="" />
      <div class="text">
        <h3>{{ post.title.text }}</h3>
        <span>{{ post.description }}</span>
      </div>
    </div>
    <div class="bottom-line" :style="{ 'background-color': post.color }"></div>
    <svg viewBox="0 0 24 24" @click="deletPost()">
      <path
        fill="#E02245"
        d="M20.37,8.91L19.37,10.64L7.24,3.64L8.24,1.91L11.28,3.66L12.64,3.29L16.97,5.79L17.34,7.16L20.37,8.91M6,19V7H11.07L18,11V19A2,2 0 0,1 16,21H8A2,2 0 0,1 6,19Z"
      />
    </svg>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    post: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: Number
    }
  },
  methods: {
    ...mapMutations(['setDeleteModalState', 'setDeleteSelectedPost']),
    deletPost () {
      this.setDeleteModalState()
      this.setDeleteSelectedPost({ id: this.post.id, index: this.index })
    }
  }
}
</script>

<style lang="sass" scoped>
@import "../../styles/variables.sass"

#post-card
    text-align: right
    margin: .5rem 0.3rem
    position: relative
    direction: rtl
    background: $color-secondary
    padding: .5rem
    border-radius: $border-sm
    min-width: 20rem
    max-width: 40rem
    flex:1
    box-shadow: $shadow
    transition: all 1s
    .context
        display: flex
        margin-top: .5rem
        .post-image
            height: 6rem
            width: 7rem
            border-radius: .5rem
            background-position: center
            background-size: auto 100%
            background-repeat: no-repeat
        img
          height: 6rem
          width: 6rem
          border-radius: .5rem
        .text
            margin-right: .6rem
            h3
                margin-top: 2rem
                margin-bottom: 0rem

    .bottom-line
        width: 100%
        height: .75rem
        border-radius: 1.5rem
        margin-top: .9rem

    svg
        position: absolute
        left: 0
        bottom: 2rem
        height: 2.4rem
</style>
