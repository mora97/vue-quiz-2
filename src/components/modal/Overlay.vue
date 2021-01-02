<template>
  <transition name="fade">
    <div
      id="modal-overlay"
      @click="setHintModalState(false)"
      v-if="getHintModalState || getDeleteModalState"
    ></div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setHintModalState'])
  },
  computed: {
    ...mapGetters(['getHintModalState', 'getDeleteModalState'])
  }
}
</script>

<style lang="sass" scoped>
#modal-overlay
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  background: #EEDEE1
  opacity: 0.15
  z-index: 800

.fade-enter-active, .fade-leave-active
  transition: opacity 0.1s ease-out

.fade-enter, .fade-leave-to 
  opacity: 0


</style>
