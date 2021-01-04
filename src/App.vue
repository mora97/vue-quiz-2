<template>
  <div class="app">
    <header>
      <navbar />
    </header>
    <main>
      <post-list />
    </main>
    <hint-modal />
    <delete-modal />
  </div>
</template>

<script>
import HintModal from './components/modal/HintModal.vue'
import Navbar from './components/header/Navbar'
import PostList from './components/post/PostList'
import { mapActions } from 'vuex'
import DeleteModal from './components/modal/DeleteModal.vue'

export default {
  name: 'App',
  components: { Navbar, PostList, HintModal, DeleteModal },
  methods: {
    ...mapActions(['asyncGetPosts'])
  },
  created () {
    this.asyncGetPosts()
  }
}
</script>

<style lang="sass">
</style>
