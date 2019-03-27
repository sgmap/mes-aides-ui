description: 'Fill the "Demandeur" form.',

steps: [
    HomepageComponent.start(),
    {
        'IndividualFormComponent.birthDateInput': true,
    },
    IndividualFormComponent.setBirthDateInput('2'),
    IndividualFormComponent.setBirthDateInput('1'),
    IndividualFormComponent.setBirthDateInput('/'),
    IndividualFormComponent.setBirthDateInput('0'),
    IndividualFormComponent.setBirthDateInput('1'),
    IndividualFormComponent.setBirthDateInput('/'),
    IndividualFormComponent.setBirthDateInput('1'),
    IndividualFormComponent.setBirthDateInput('9'),
    IndividualFormComponent.setBirthDateInput('8'),
    IndividualFormComponent.setBirthDateInput('1'),
    IndividualFormComponent.submit(),
    {
        'RecapComponent.firstPersonBirthdate': DEMANDEUR_BIRTHDATE_PLAIN_TEXT,
    }
]
