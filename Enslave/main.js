// Give child up for Enslaveion button - costs cash, etc and visible upto a certain age - kills the child in game
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId })
    let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
    if (
      !character.isDead &&
      !character.spouseId &&
      age <= 18
    ) {
      daapi.addCharacterAction({
        characterId,
        key: 'Enslave',
        action: {
          title: 'Enslave',
          icon: daapi.requireImage('/Enslave/Enslave.svg'),
          isAvailable: true,
          hideWhenBusy: false,
          process: {
            event: '/Enslave/main',
            method: 'process',
            context: {
              characterId
            }
          }
        }
      })
    } else {
      daapi.deleteCharacterAction({
        characterId,
        key: 'Enslave'
      })
    }
  },
  methods: {
    process({ characterId }) {
      let character = daapi.getCharacter({ characterId })
      daapi.pushInteractionModalQueue({
        title: 'Enslave',
        message: 'You can sell your relative' + `[c|${characterId}|${character.praenomen}]` + ', and once they\'re enslaved, their well being will no longer be your concern',
        image: daapi.requireImage('/Enslave/Enslave.svg'),
        options: [
          {
            variant: 'danger',
            text: 'Fare thee well ' + `[c|${characterId}|${character.praenomen}]`,
            tooltip: `[c|${characterId}|${character.praenomen}]` + ' wil be enslaved. This action cannot be undone',
            statChanges: {
              cash: +50*(daapi.calculateBaseSkill({ characterId, skillName: 'combat' })),
              prestige: -100,
              influence: -500
            },
            action:{
              event: '/Enslave/main',
              method: 'doEnslave',
              context: {characterId, motherId: character.motherId, fatherId: character.fatherId}
            }
          },
          {
            text: 'No! ' + character.praenomen + ' is our child!'
          }
        ]
      })
    },
    doEnslave({ characterId, fatherId, motherId }) 
	{{       let character = daapi.getCharacter({ characterId })
	  let father = daapi.getCharacter({ characterId: character.fatherId })
	  let mother = daapi.getCharacter({ characterId: character.motherId })
        if( character.fatherId ) {
          if(father.childrenIds && father.childrenIds.length > 0) {
            daapi.updateCharacter({ 
              characterId: character.fatherId,
              character: {
                childrenIds: father.childrenIds.filter(childId => childId !== characterId) 
              } 
            })
          }
        } 
        if( character.motherId ) {
          if(mother.childrenIds && mother.childrenIds.length > 0) {
            daapi.updateCharacter({
              characterId: character.motherId,
              character: {
                childrenIds: mother.childrenIds.filter(childId => childId !== characterId)
              }
            })
          }
        }
      }
      daapi.updateCharacter({characterId, character:{ fatherId: undefined, motherId: undefined, dynastyId: '1' }})
	}
    }
}