// creats multiple children
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
    checkAndAct(characterId) {
      let character = daapi.getCharacter({ characterId })
      let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
      if (
        character.isMale &&
        character.spouseId &&
        (character.isHeir || !character.flagInMatrilinealMarriage) &&
        age >= 16
      ) {
        daapi.addCharacterAction({
          characterId,
          key: 'GenMultiDescendants',
          action: {
            title: 'GenMultiDescendants',
            icon: daapi.requireImage('/GenMultiDescendants/GenMultiDescendants.svg'),
            isAvailable: true,
            hideWhenBusy: false,
            process: {
              event: '/GenMultiDescendants/main',
              method: 'adopt1',
              context: {
                characterId
              }
            }
          }
        })
      }
      else {
        daapi.deleteCharacterAction({
          characterId,
          key: 'GenMultiDescendants'
        })
      }
    },
  methods: {
    adopt1({ characterId }) {
      let character = daapi.getCharacter({ characterId })
      let spouseId = character.spouseId
      let options = []
      for (let i = 1; i < 5; i++) {
        options.push(
          {
            text: `Yes, ` + ` [c|${characterId}|${character.praenomen}]` + ` should adopt `+ i +` child or children. And to help them get back on their feet we should give them some money.`,
            tooltip: 'Will generate '+ i +' child for you next month.',
            statChanges: {
              cash: (-50*i),
              prestige: (+500*i),
              influence: (+1000*i),
              influence: (+1000*i),
              scaleByRevenue: ['cash']
            },
            action: {
              event: '/GenMultiDescendants/main',
              method: 'doGenMultiDescendants',
              context: { characterId, spouseId, i }
            }
          }
        )
      }
      daapi.pushInteractionModalQueue({
        title: 'GenMultiDescendants',
        message: `And old friend approached ` + `[c|${characterId}|${character.praenomen}]` + `they have fallen on hard times and are struggling to raise their children. Would you like them to adopt a child?`,
        image: daapi.requireImage('/GenMultiDescendants/GenMultiDescendants.svg'),
        options: [
          ...options,
          {
            text: 'No, I cannot afford to.'
          }
        ]
      })
    },

    doGenMultiDescendants({ characterId, spouseId, i })	{
      for (let b = 0; b < i; b++) {
        let character = daapi.getCharacter({ characterId })
        let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
        var generatedCharacterId = daapi.generateCharacter({
          characterFeatures: {
            dynastyId: daapi.getCharacter({ characterId: daapi.getState().current.id }).dynastyId,
            birthYear: daapi.getState().year - 1
          }
        })
        daapi.updateCharacter({ characterId, character: { childrenIds: [...character.childrenIds, generatedCharacterId] } })
        daapi.updateCharacter({ characterId: spouseId, character: { childrenIds: [...characterSpouse.childrenIds, generatedCharacterId] } })
        daapi.updateCharacter({
          characterId: generatedCharacterId, character: { fatherId: characterId, motherId: character.spouseId }
        })
      }
    }
  }
}
