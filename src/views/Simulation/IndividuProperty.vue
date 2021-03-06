<template>
  <form @submit.prevent="onSubmit">
    <fieldset v-if="questionType === 'enum'">
      <legend>
        <h2 class="aj-question">
          <span v-html="question"></span>
          <EnSavoirPlus v-if="showMoreInfo" />
        </h2>
        <p v-if="meta.help" v-html="meta.help"></p>
      </legend>
      <div class="aj-selections">
        <div
          class="aj-selection-wrapper"
          v-for="(item, index) in items"
          :key="item.value"
        >
          <input
            :id="item.value"
            type="radio"
            :name="fieldName"
            :value="item.value"
            v-model="value"
            :autofocus="index === 0"
          />
          <label :for="item.value">
            {{ item.label }}
          </label>
        </div>
      </div>
    </fieldset>
    <div v-else-if="questionType === 'number'">
      <h2 class="aj-question">
        <span v-html="question" />
        <EnSavoirPlus v-if="showMoreInfo" />
      </h2>
      <p v-if="meta.help" v-html="meta.help"></p>
      <label>
        <InputNumber :min="meta.min" v-model="value"></InputNumber>
      </label>
    </div>
    <YesNoQuestion v-else v-model="value">
      <span v-html="question"></span><EnSavoirPlus v-if="showMoreInfo" />
      <template v-slot:help v-if="meta.help"
        ><p v-html="meta.help"></p
      ></template>
    </YesNoQuestion>
    <Actions v-bind:onSubmit="onSubmit" />
  </form>
</template>

<script>
import Actions from "@/components/Actions"
import YesNoQuestion from "../../components/YesNoQuestion.vue"
import Hint from "@/lib/Hint"
import Individu from "@/lib/Individu"
import IndividuQuestions from "@/lib/IndividuQuestions"
import { executeFunctionOrReturnValue, capitalize } from "@/lib/Utils"
import EnSavoirPlus from "@/components/EnSavoirPlus"
import InputNumber from "@/components/InputNumber"

export default {
  name: "IndividuProperty",
  components: {
    InputNumber,
    Actions,
    YesNoQuestion,
    EnSavoirPlus,
  },
  data: function () {
    return this.loadQuestion(this.$route.params)
  },
  computed: {
    fieldName: function () {
      return this.$route.params.fieldName
    },
    meta: function () {
      return IndividuQuestions[this.fieldName]
    },
    role: function () {
      return this.$route.params.id.split("_")[0]
    },
    questionType: function () {
      return this.meta.questionType
    },
    question: function () {
      return capitalize(
        executeFunctionOrReturnValue(this.meta, "question", this)
      )
    },
    showMoreInfo: function () {
      return Hint.get(this.fieldName)
    },
    items: function () {
      return executeFunctionOrReturnValue(this.meta, "items", this)
    },
  },
  methods: {
    loadQuestion(params) {
      const role = params.id.split("_")[0]
      const { individu } = Individu.get(
        this.$store.getters.peopleParentsFirst,
        role,
        params.id,
        this.$store.state.dates
      )
      const value = individu[params.fieldName]
      return {
        error: false,
        individu,
        value,
      }
    },
    getLabel: function (type) {
      return Individu.label(this.individu, type)
    },
    requiredValueMissing: function () {
      const hasError = this.value === undefined
      this.$store.dispatch(
        "updateError",
        hasError && "Ce champ est obligatoire."
      )
      return hasError
    },
    onSubmit: function () {
      if (this.requiredValueMissing()) {
        return
      }
      this.individu[this.fieldName] = this.value
      this.$store.dispatch("updateIndividu", this.individu)
      this.$push()
    },
  },
}
</script>
