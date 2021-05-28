import { createIndividuMixin } from "@/mixins/Steps/IndividuMixin"
import _ from "lodash"
import EnumQuestion from "@/components/Questions/Type/EnumQuestion"

const fieldName = "nationalite"

export default {
  questions: [
    {
      type: () => {
        const component = _.cloneDeep(EnumQuestion)

        component.mixins = [
          ...(EnumQuestion.mixins || []),
          createIndividuMixin(fieldName),
        ]
        return component
      },
      label: (component) => {
        return component.role === "demandeur"
          ? "Quelle est votre nationalité ?"
          : `Quelle est la nationalité ${component.getLabel(
              "préposition"
            )}${component.getLabel("nom")} ?`
      },
      fieldName: fieldName,
      items: [
        {
          label: "Française",
          value: "fr",
        },
        {
          label: "Européenne",
          value: "ue",
        },
        {
          label: "Non européenne",
          value: "autre",
        },
      ],
    },
  ],
}
