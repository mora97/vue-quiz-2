<template>
  <div id="post-list">
    <transition-group name="list">
      <div v-for="(post, index) in getPosts" :key="post.id">
        <post-card :post="post" :index="index" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PostCard from './PostCard.vue'

export default {
  components: { PostCard },
  computed: {
    ...mapGetters(['getPosts'])
  }
}
</script>

<style lang="sass" scoped>
@import "../../styles/variables.sass"

#post-list 
  margin-top: 4.8rem
  display: flex
  flex-wrap: wrap 

#post-list>*
  flex: 1 1 auto
    
.list-enter-active, .list-leave-active
  transition: all .5s ease

.list-enter-from, .list-leave-to
  transform: translateY(-30px)
  opacity: 0

@media (max-width: $breakpoint-tablet) 
  #post-list 
    flex-direction: column   
  

</style>
