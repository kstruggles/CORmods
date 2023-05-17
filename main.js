//generates popup for event
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
	let character = daapi.getCharacter({ characterId })
	let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
	 console.log('characterId')
   	if (!character.spouseId &&
		age <= 16) 
	{
		return
	}
		
	else (characterId === daapi.getState().current.id &&
	age >= 15	 	&&
	Math.random() < 1 / 2
	)
	{  let character = daapi.getCharacter({ characterId })
		let options = []
      for (let i = 1; i < 5; i++) {
        options.push(
          {
            text: `Yes, I ` +  `[c|${characterId}|${character.praenomen}]`  + ` should adopt `+ i +` child or children. And to help them get back on their feet we should give them some money.`,
            tooltip: 'Will generate '+ i +' child for you next month.',
            statChanges: {
              cash: (-50*i),
              prestige: (+500*i),
              influence: (+100*i),
              scaleByRevenue: ['cash']
            },
            action: {
              event: '/RandomAdopt/main',
              method: 'RandomAdoption',
              context: { characterId, i }
            }
          }
        )
      }
      daapi.pushInteractionModalQueue({
        title: 'CHANGE ME',
	  message: 'I ' + `[c|${characterId}|${character.praenomen}]` +' Work',
        options: [
          {
            text: 'CHANGEME'
          }
        ]        
      })
    }
  },
  methods: {
	RandomAdoption({ characterId, i })	{
      for (let b = 0; b < i; b++) {
        let character = daapi.getCharacter({ characterId })
         var generatedCharacterId = daapi.generateCharacter({
          characterFeatures: {
            dynastyId: daapi.getCharacter({ characterId: daapi.getState().current.id }).dynastyId,
            birthYear: daapi.getState().year - (i-b)
          }
        })
        daapi.updateCharacter({ characterId, character: { childrenIds: [...character.childrenIds, generatedCharacterId] } })
        daapi.updateCharacter({
          characterId: generatedCharacterId, character: { fatherId: characterId, motherId: character.spouseId }
        })
      }
     } 
    
}}


