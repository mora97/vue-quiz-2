<template>
  <div>
    <overlay />
    <transition name="slide">
      <div id="hint-modal" v-if="getHintModalState">
        <h4>{{ getHintModalText }}</h4>
        <button @click="setHintModalState({ state: false, text: '' })">
          Ok
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Overlay from './Overlay.vue'

export default {
  components: { Overlay },
  data () {
    return {
      post: {
        title: '',
        desc: '',
        image: null
      },
      imgIndex: 0,
      newImageFile: null,
      setNewImages: '../../public/assets/icons/plus.svg'
    }
  },
  methods: {
    ...mapMutations(['setHintModalState'])
  },
  computed: {
    ...mapGetters(['getHintModalState', 'getHintModalText'])
  }
}
</script>

<style lang="sass" scoped>
@import "../../styles/mixins.sass"

#hint-modal
  @include modal
  top: 50%
  padding: .5rem

button 
  @include modal-button
  background: green 
.slide-enter-active, .slide-leave-active
  transition: all .8s ease

.slide-enter-from, .slide-leave-to
  transform: translateY(-30px)
  opacity: 0
</style>
