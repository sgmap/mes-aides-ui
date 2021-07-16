<template>
  <form @submit.prevent="onSubmit">
    <label for="date_entree_logement"
      ><h2 class="aj-question"
        >Depuis quand êtes-vous locataire de votre logement ?</h2
      ></label
    >
    <InputDate required id="date_entree_logement" v-model="value" />
    <p class="notification warning" v-if="$state.error">
      Ce champ est obligatoire.
    </p>
    <Actions v-bind:onSubmit="onSubmit" />
  </form>
</template>

<script>
import Actions from "@/components/Actions"
import InputDate from "@/components/InputDate"

export default {
  name: "SimulationDateEntreeLogement",
  components: {
    Actions,
    InputDate,
  },
  data: function () {
    // eslint-disable-next-line no-debugger
    debugger
    const menage = { ...(this.$store.getters.getMenage || {}) }
    return {
      menage: menage,
      value: menage.date_entree_logement,
    }
  },
  methods: {
    onSubmit() {
      if (this.value === undefined) {
        this.$store.dispatch("updateError", "Ce champ est obligatoire.")
        return
      }
      this.menage.date_entree_logement = this.value
      this.$store.dispatch("updateMenage", this.menage)
      this.$push()
    },
  },
}
</script>
