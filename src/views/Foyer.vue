<template>
  <div class="foyer">
    <transition name="slide">
      <router-view/>
    </transition>
    <FoyerRecap></FoyerRecap>
  </div>
</template>

<script>
import FoyerRecap from '@/components/FoyerRecap.vue'

export default {
  name: 'foyer',
  components: {
    FoyerRecap
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.foyer {
  background-color: whitesmoke;
  padding: 1em 0em;
}

.slide-enter-active, .slide-leave-active {
  transition-property: all;
  transition-duration: .25s;
}

.slide-enter-active {
  transition-delay: .25s;
}

.slide-leave-active {
  opacity: 0;
  transform: translateX(-4em);
}

.slide-enter {
  opacity: 0;
  transform: translateX(4em);  
}

pre {
  text-align: left;
}
</style>
