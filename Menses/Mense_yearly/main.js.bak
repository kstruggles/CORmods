{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId })
    let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
	if (!character.isMale &&
      character.spouseId &&
	 age >= 14 && 
	 age <= 40 && 
	 Math.random() < 1 / 13 / 5 / (character.childrenIds.length || 1) &&
	 	 !character.startedPregnancyTime 
		  )
	{
		daapi.impregnate({ characterId })
    }
else if
(
      !character.isMale &&
      !character.spouseId &&
	 age >= 14 && 
	 age <= 40 &&
	 !character.startedPregnancyTime &&
Math.random() < 1 / 13 / 5 / (character.childrenIds.length || 1)
    )
	 
    
		{ daapi.impregnate({ characterId })
	daapi.updateCharacter({characterId, character:{flagInMatrilinealMarriage: true
	}}
    )
	}
}}
