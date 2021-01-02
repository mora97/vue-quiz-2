<template>
  <overlay />
  <transition name="slide">
    <div id="delete-modal" v-if="getDeleteModalState">
      <span>are you sure??</span>
      <div class="btn-group">
        <button @click="this.asyncDeletePost()">yes</button>
        <button @click="setDeleteModalState">No</button>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Overlay from './Overlay.vue'

export default {
  components: { Overlay },
  methods: {
    ...mapMutations(['setDeleteModalState']),
    ...mapActions(['asyncDeletePost'])
  },
  computed: {
    ...mapGetters(['getDeleteModalState'])
  }
}
</script>

<style lang="sass" scoped>
@import "../../styles/mixins.sass"

#delete-modal
    @include modal
    top: 10rem
    .btn-group
        margin-top: 1.5rem
        button
            @include modal-button
            &:first-child
                background: green
            &:last-child
                background: red


.slide-enter-active, .slide-leave-active
  transition: all .8s ease

.slide-enter-from, .slide-leave-to
  transform: translateY(-30px)
  opacity: 0
</style>
