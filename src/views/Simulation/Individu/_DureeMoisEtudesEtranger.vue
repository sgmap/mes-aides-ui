<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label class="aj-question" for="_dureeMoisEtudesEtranger">
        Combien de mois envisagez-vous de partir à l'étranger dans le cadre de
        vos études ?
      </label>
      <div>
        <InputNumber
          id="_dureeMoisEtudesEtranger"
          min="0"
          v-model="value"
        ></InputNumber>
      </div>
    </div>
    <Actions v-bind:onSubmit="onSubmit" />
  </form>
</template>

<script>
import { createIndividuMixin } from "@/mixins/IndividuMixin"
import Actions from "@/components/Actions"
import InputNumber from "@/components/InputNumber"

export default {
  name: "SimulationIndividuDureeMoisEtudesEtranger",
  components: {
    Actions,
    InputNumber,
  },
  mixins: [createIndividuMixin("_dureeMoisEtudesEtranger")],
}
</script>
