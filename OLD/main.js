//should remove offspring who died before adulthood, to save space when you've had a lot of children die
{
  canTriggerIfUnavailable: true,
  checkType: 'general',
  checkAndAct() {
    daapi.getState().current.householdCharacterIds.forEach((characterId) => {
      let character = daapi.getCharacter({ characterId })
      let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
      if (
        character.isDead &&
        (!character.childrenIds || character.childrenIds.length === 0) &&
        age <= 18
      ) { 
        if( character.fatherId ) {
          let father = daapi.getCharacter({ characterId: character.fatherId })
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
          let mother = daapi.getCharacter({ characterId: character.motherId })
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
    })
  }
}