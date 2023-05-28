//generates kids randomly
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
	let character = daapi.getCharacter({ characterId })
	let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
	
console.log(characterId, age, character.spouseId, character.gender)

	if (characterId === daapi.getState().current.id &&
	character.isMale &&
	character.spouseId &&
	age >= 15 && 
	age <= 50 &&
	Math.random() < 1/13/2
	)
	{  let character = daapi.getCharacter({ characterId })
	 let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
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
              event: '/RandomlyAdopt/main',
              method: 'RandomAdoptionM',
              context: { characterId, i }
            }
          }
        )
      }
      daapi.pushInteractionModalQueue({
        title: 'Poverty',

	  message: 'After years of struggling an old family friend has given up hope of being able to raise his children. Rather then sell them to slavery, he came to you. He begs you '+ `[c|${characterId}|${character.praenomen}]`  +' to take in at least one of his children, and raise it as your own.',
	  	image: daapi.requireImage('/RandomlyAdopt/RandomlyAdopt.svg'),
        options: [
          ...options,
          {
            text: 'No, I cannot afford to.'
          }
        ]        
      })
    }
  if (character.isMale &&
  characterId !== daapi.getState().current.id &&
   (character.isHeir || !character.flagInMatrilinealMarriage) &&
	character.spouseId &&
	age >= 15 && 
	age <= 50 &&
	Math.random() < 1/13/2
	)
	{  let character = daapi.getCharacter({ characterId })
	 let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
		let options = []
      for (let i = 1; i < 5; i++) {
        options.push(
          {
            text: `Yes, ` + ` [c|${characterId}|${character.praenomen}] ` + ' and ' + ` [c|${character.spouseId}|${characterSpouse.praenomen}] ` +  ` should adopt `+ i +` child or children. And to help them get back on their feet we should give them some money.`,
            tooltip: 'Will generate '+ i +' child for you next month.',
            statChanges: {
              cash: (-50*i),
              prestige: (+500*i),
              influence: (+100*i),
              scaleByRevenue: ['cash']
            },
            action: {
              event: '/RandomlyAdopt/main',
              method: 'RandomAdoptionM',
              context: { characterId, i }
            }
          }
        )
      }
      daapi.pushInteractionModalQueue({
        title: 'Poverty',
		
	  message: 'After years of struggling an old family friend has given up hope of being able to raise his children. Rather then sell them to slavery, he came to you. He begs'  + ` [c|${characterId}|${character.praenomen}] ` + ' and ' + ` [c|${character.spouseId}|${characterSpouse.praenomen}] ` +  ' to take in at least one of his children, and raise it as your own.',
	  	image: daapi.requireImage('/RandomlyAdopt/RandomlyAdopt.svg'),
        options: [
          ...options,
          {
            text: 'No, I cannot afford to.'
          }
        ]        
      })
    }if (characterId === daapi.getState().current.id &&
	!character.isMale &&
	character.spouseId &&
	age >= 15 && 
	age <= 50 &&
	Math.random() < 1/13/2
	)
	{  let character = daapi.getCharacter({ characterId })
	 let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
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
              event: '/RandomlyAdopt/main',
              method: 'RandomAdoptionF',
              context: { characterId, i }
            }
          }
        )
      }
      daapi.pushInteractionModalQueue({
        title: 'Poverty',
		
	  message: 'After years of struggling an old family friend has given up hope of being able to raise his children. Rather then sell them to slavery, he came to you. He begs you '+ `[c|${characterId}|${character.praenomen}]`  +' to take in at least one of his children, and raise it as your own.',
	  	image: daapi.requireImage('/RandomlyAdopt/RandomlyAdopt.svg'),
        options: [
          ...options,
          {
            text: 'No, I cannot afford to.'
          }
        ]        
      })
    }
  if (!character.isMale &&
  characterId !== daapi.getState().current.id &&
   (character.isHeir || !character.flagInMatrilinealMarriage) &&
	character.spouseId &&
	age >= 15 && 
	age <= 50 &&
	Math.random() < 1/13/2
	)
	{  let character = daapi.getCharacter({ characterId })
	 let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
		let options = []
      for (let i = 1; i < 5; i++) {
        options.push(
          {
            text: `Yes, ` + ` [c|${characterId}|${character.praenomen}] ` + ' and ' + ` [c|${character.spouseId}|${characterSpouse.praenomen}] ` +  ` should adopt `+ i +` child or children. And to help them get back on their feet we should give them some money.`,
            tooltip: 'Will generate '+ i +' child for you next month.',
            statChanges: {
              cash: (-50*i),
              prestige: (+500*i),
              influence: (+100*i),
              scaleByRevenue: ['cash']
            },
            action: {
              event: '/RandomlyAdopt/main',
              method: 'RandomAdoptionF',
              context: { characterId, i }
            }
          }
        )
      }
      daapi.pushInteractionModalQueue({
        title: 'Poverty',
	
	  message: 'After years of struggling an old family friend has given up hope of being able to raise his children. Rather then sell them to slavery, he came to you. He begs'  + ` [c|${characterId}|${character.praenomen}] ` + ' and ' + ` [c|${character.spouseId}|${characterSpouse.praenomen}] ` +  ' to take in at least one of his children, and raise it as your own.',
	  	image: daapi.requireImage('/RandomlyAdopt/RandomlyAdopt.svg'),
        options: [
          ...options,
          {
            text: 'No, I cannot afford to.'
          }
        ]        
      })
    }
  },
  methods: {
	RandomAdoptionM({ characterId, i })	{
      for (let b = 0; b < i; b++) {
       let character = daapi.getCharacter({ characterId })
	   let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
	   let spouseId = daapi.getCharacter({ characterId: character.spouseId })
         var generatedCharacterId = daapi.generateCharacter({
          characterFeatures: {
            dynastyId: daapi.getCharacter({ characterId: daapi.getState().current.id }).dynastyId,
            birthYear: daapi.getState().year - (i-b)
          }
        })
        daapi.updateCharacter({ characterId, character: { childrenIds: [...character.childrenIds, generatedCharacterId] } })
		daapi.updateCharacter({ characterId: spouseId, character: { childrenIds: [...characterSpouse.childrenIds, generatedCharacterId] } })
        daapi.updateCharacter({
          characterId: generatedCharacterId, character: { fatherId: characterId, motherId: character.spouseId }
        })
      }
     } ,
	 	RandomAdoptionF({ characterId, i })	{
      for (let b = 0; b < i; b++) {
       let character = daapi.getCharacter({ characterId })
	   let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
	   let spouseId = daapi.getCharacter({ characterId: character.spouseId })
         var generatedCharacterId = daapi.generateCharacter({
          characterFeatures: {
            dynastyId: daapi.getCharacter({ characterId: daapi.getState().current.id }).dynastyId,
            birthYear: daapi.getState().year - (i-b)
          }
        })
        daapi.updateCharacter({ characterId, character: { childrenIds: [...character.childrenIds, generatedCharacterId] } })
        daapi.updateCharacter({ characterId: spouseId, character: { childrenIds: [...characterSpouse.childrenIds, generatedCharacterId] } })
        daapi.updateCharacter({
          characterId: generatedCharacterId, character: { fatherId: character.spouseId, motherId: characterId }
        })
      }
     } 
    
}}