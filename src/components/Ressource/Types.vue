<template>
  <form>
    <p>
      Sélectionnez les types de ressources perçues
      <strong>
        <span v-if="individu._role === 'conjoint'">par votre conjoint(e)</span>
        <span v-else-if="individu._role !== 'demandeur'"
          >par {{ individu._firstName }}</span
        >
        depuis {{ $store.state.dates.twelveMonthsAgo.label }}</strong
      >. Vous pourrez ensuite saisir les montants.
    </p>
    <div
      class="form__group"
      v-for="category in categories"
      v-bind:key="category.id"
    >
      <h2 class="aj-question">{{ category.label(individu) | capitalize }}</h2>
      <div class="aj-selections">
        <div
          v-for="type in sort(typesByCategories[category.id])"
          class="aj-selection-wrapper"
          v-bind:key="type.id"
        >
          <input
            :id="type.id"
            type="checkbox"
            v-model="selectedTypes[type.id]"
          />
          <label :for="type.id">
            {{ type.label }}
          </label>
        </div>
      </div>
    </div>
    <div class="form__group">{{ countLabel }}</div>
    <Actions v-bind:onSubmit="onSubmit"> </Actions>
  </form>
</template>

<script>
import Actions from "@/components/Actions"
import orderBy from "lodash/orderBy"
import groupBy from "lodash/groupBy"
import { ressourceCategories, ressourceTypes } from "@/constants/resources"
import Ressource from "@/lib/Ressource"

export default {
  name: "RessourceTypes",
  components: {
    Actions,
  },
  props: {
    individu: Object,
  },
  data: function () {
    let types = ressourceTypes.filter((ressourceType) => {
      return (
        Ressource.isRessourceOnMainScreen(ressourceType) &&
        Ressource.isRessourceRelevant(
          ressourceType,
          this.$store.state.situation,
          this.individu
        )
      )
    })
    let selectedTypes = Ressource.getIndividuRessourceTypes(
      this.individu,
      this.$store.state.situation
    )
    return {
      categories: ressourceCategories,
      typesByCategories: groupBy(types, (t) => t.category),
      selectedTypes,
    }
  },
  computed: {
    countLabel: function () {
      const count = Object.keys(this.selectedTypes).filter(
        (selectType) => this.selectedTypes[selectType]
      ).length
      return `${count} ${
        count == 1 ? "ressource sélectionnée" : "ressources sélectionnées"
      }`
    },
  },
  watch: {
    individu: function () {
      this.selectedTypes = Ressource.getIndividuRessourceTypes(
        this.individu,
        this.$store.state.situation
      )
    },
  },
  methods: {
    onSubmit: function () {
      Ressource.setIndividuRessourceTypes(
        this.individu,
        this.selectedTypes,
        this.$store.state.dates
      )
      this.$store.dispatch("updateIndividu", this.individu)
      this.$push()
    },
    sort: function (array) {
      return orderBy(array, ["positionInList", "label"])
    },
  },
}
</script>
