//trans inclusion
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId })
    let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
	 
	if (character.isMale == true &&
	age >= 5	 	&&
Math.random() < 1 / 13 / 30 )
	{ let character = daapi.getCharacter({ characterId })
	 
	  daapi.updateCharacter({characterId , character:{isMale: false,	traits: [...character.traits, 'sapphic' ] }}    )
    }
else if (character.isMale == false &&
	age >= 5	 	&&
Math.random() < 1 / 13 / 30  )
	 
    {let character = daapi.getCharacter({ characterId })
	 
		
	daapi.updateCharacter({characterId , character:{isMale: true,	traits: [...character.traits, 'achillean' ] }}    )
	}
}}


