<template>
    <form @submit.prevent='onSubmit'>
        <h1>{{ title }}</h1>
        <fieldset>
            <label>{{ codePostalQuestion.label }}
                <input type="number" v-model="codePostalQuestion.selectedValue">
            </label>
        </fieldset>

        <p v-if="retrievingCommunes"><i class="fa fa-spinner fa-spin" aria-hidden="true"></i></p>
        <fieldset v-show="communes && communes.length">
            <label>{{ communeQuestion.label }}
                <select
                    v-model="communeQuestion.selectedValue"
                    id="commune">
                    <option v-for="commune in communes" v-bind:value="commune.nom" v-bind:key="commune.code">
                        {{ commune.nom }}
                    </option>
                </select>
            </label>
        </fieldset>
        <Actions v-bind:onSubmit='onSubmit'/>
    </form >
</template>

<script>
    import Actions from '@/components/Actions'
    import Commune from '@/lib/Commune'
    import _ from 'lodash'

    export default {
        name: 'SimulationMenageDepcom',
        components: {
            Actions
        },
        data: function() {
            const menage = this.$store.getters.getMenage || {}
            return {
                title: 'Votre logement principal',
                menage: menage,
                retrievingCommunes: false,
                codePostalQuestion: {
                    label: 'Code postal',
                    selectedValue: menage._codePostal
                },
                communeQuestion: {
                    label: 'Ville',
                    selectedValue: menage._nomCommune
                }
            }
        },
        asyncComputed: {
            communes: {
                get: function() {
                    if (! this.codePostalQuestion.selectedValue || this.codePostalQuestion.selectedValue.toString().length !== 5) {
                        return []
                    }
                    this.retrievingCommunes = true
                    return Commune.get(this.codePostalQuestion.selectedValue)
                        .then((communes) => {
                            console.log(communes)
                            if (!_.includes(_.map(communes, 'nom'), this.communeQuestion.selectedValue)) {
                                this.communeQuestion.selectedValue = Commune.getMostPopulated(communes).nom
                            }
                            return communes
                        })
                        .catch(() => {
                            return []
                        })
                        .finally(() => {
                            this.retrievingCommunes = false
                        })
                },
                default: []
            },
        },
        methods: {
            onSubmit: function() {
                const communeMatches = this.communes.filter(c => c.nom == this.communeQuestion.selectedValue)
                if (communeMatches.length) {
                    this.menage.depcom = communeMatches[0].code
                    this.menage._codePostal = this.codePostalQuestion.selectedValue.toString()
                    this.menage._nomCommune = this.communeQuestion.selectedValue
                    this.$store.dispatch('updateMenage', this.menage)                    
                }
                this.$push()
            }
        }
    }
</script>

<style scoped lang="scss">
    span.help {
        font-style: italic;
    }

    fieldset {
        margin-bottom: 2em;
    }
</style>