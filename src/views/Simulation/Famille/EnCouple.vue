<template>
  <form @submit.prevent="onSubmit">
    <fieldset>
      <legend
        ><h2 class="aj-question">Vivez-vous seul·e ou en couple ?</h2></legend
      >
      <div class="aj-selection-wrapper">
        <input
          id="seul"
          type="radio"
          v-bind:value="false"
          name="en_couple"
          v-model="value"
        />
        <label for="seul">Je vis seul·e</label>
      </div>
      <div class="aj-selection-wrapper">
        <input
          id="en-couple"
          type="radio"
          v-bind:value="true"
          name="en_couple"
          v-model="value"
        />
        <label for="en-couple">Je vis en couple</label>
      </div>
    </fieldset>
    <Actions v-bind:onSubmit="onSubmit" />
  </form>
</template>

<script>
import Actions from "@/components/Actions"
import { createFamilleMixin } from "@/mixins/FamilleMixin"
import Individu from "@/lib/Individu"

export default {
  name: "SimulationFamilleEnCouple",
  components: {
    Actions,
  },
  mixins: [createFamilleMixin("en_couple")],
  methods: {
    onSubmit() {
      if (this.value === undefined) {
        this.$store.dispatch("updateError", "Ce champ est obligatoire.")
        return
      }
      this.famille.en_couple = this.value
      this.$store.dispatch("updateFamille", this.famille)

      if (this.value) {
        const { individu } = Individu.get(
          this.$store.getters.peopleParentsFirst,
          "conjoint",
          "conjoint",
          this.$store.state.dates
        )
        this.$store.dispatch("updateIndividu", individu)
      } else {
        this.$store.dispatch("removeConjoint")
        this.$store.dispatch("updateIndividu", {
          ...this.$store.state.situation.demandeur,
          statut_marital: "celibataire",
        })
      }
      this.$push()
    },
  },
}
</script>
