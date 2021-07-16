<template>
  <form @submit.prevent="onSubmit">
    <label class="aj-question" for="date_debut_chomage"
      >Quand {{ getLabel("avoir") }} commencé à être au chômage&nbsp;?</label
    >
    <InputDate required id="date_debut_chomage" v-model="value" />
    <Actions v-bind:onSubmit="onSubmit" />
  </form>
</template>

<script>
import Actions from "@/components/Actions"
import InputDate from "@/components/InputDate"
import { createIndividuMixin } from "@/mixins/IndividuMixin"

export default {
  name: "SimulationIndividuDateDebutChomage",
  components: {
    Actions,
    InputDate,
  },
  mixins: [createIndividuMixin("date_debut_chomage")],
}
</script>
