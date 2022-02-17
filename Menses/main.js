{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId })
    let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
	if ( (daapi.getState().month === 2 ||daapi.getState().month === 3)  &&
      !character.isMale &&
      character.spouseId &&
	 age >= 14 && 
	 age <= 40 &&
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
Math.random() < 0.7/100	 
    )
	 
    
		{ daapi.impregnate({ characterId })
	daapi.updateCharacter({characterId, character:{flagInMatrilinealMarriage: true
	}}
    )
	}
}}
