<template>
  <nav id="navbar">
    <div class="container">
      <button id="add-btn" @click="createPost" :disabled="getHintModalState">
        <svg viewBox="0 0 37 33">
          <path fill="#6C2FD6" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
        </svg>
      </button>
      <input
        type="text"
        placeholder="Search something..."
        v-model="inputValue"
        @keyup="asyncQeuryPost(inputValue)"
      />
    </div>
  </nav>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    ...mapMutations(['setHintModalState']),
    ...mapActions(['asyncQeuryPost', 'asyncCreatePost']),
    createPost () {
      if (this.inputValue === '') {
        this.setHintModalState({ state: true, text: 'searchbar is empty :(' })
      } else {
        let postsArray = this.getPosts
        console.log(postsArray);
        if (postsArray.length !== 0) {
          this.setHintModalState({
            state: true,
            text: 'this title has been added'
          })
        } else {
          this.asyncCreatePost()
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getPosts', 'getHintModalState'])
  }
}
</script>

<style lang="sass" scoped>
@import "../../styles/variables.sass"

#navbar
  position: fixed
  left: 0
  top: 0
  width:100%
  z-index: 500
  .container
    margin: .5rem .7rem
    border-radius: $border-md
    display: flex
    background-color: $color-primary
    padding: 0.5rem 1rem
    box-shadow: $shadow

  input
    width: 100%
    border-radius: $border-lg
    outline: none
    border: none
    background-color: $color-secondary
    background-image: url('../../../public/assets/icons/search.svg')
    background-repeat: no-repeat
    background-position: 0.25rem 0.25rem
    margin-left: .4rem
    padding-left: 2.5rem
    transition: all 0.3s ease
    &:focus
      box-shadow: $shadow

  button
    position: relative
    background: $color-secondary
    border-radius: $border-full
    width: 2.4rem
    height: 2.3rem
    box-shadow: $shadow
    margin-right: 0.3rem
    transition: all 0.3s ease
    padding: .4rem
    border: none
    &:hover
      background: #75F793
      scale: 1.1
    &:focus 
      outline: none
      

  svg
    border-radius: $border-full
    width: 38px
    height: 34px

  path
    background: red

</style>
