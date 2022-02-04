// Give child up for Generate_Decendantsion button - costs cash, etc and visible upto a certain age - kills the child in game
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
    let character = daapi.getCharacter({ characterId })
    let age = daapi.calculateAge({ month: character.birthMonth, year: character.birthYear })
    if (
      character.isMale &&
      age >= 18
    ) {
      daapi.addCharacterAction({
        characterId,
        key: 'Generate_Decendants',
        action: {
          title: 'Generate_Decendants',
          icon: daapi.requireImage('/Generate_Decendants/Generate_Decendants.svg'),
          isAvailable: true,
          hideWhenBusy: false,
          process: {
            event: '/Generate_Decendants/main',
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
        key: 'Generate_Decendants'
      })
    }
  },
  methods: {
    process({ characterId }) {
      let character = daapi.getCharacter({ characterId })
	  let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
      daapi.pushInteractionModalQueue({
        title: 'Generate_Decendants',
        message: 'And old friend has approached you, they have fallen on hard times and are struggling to raise their children. Would you like to addopt one of them ?',
        image: daapi.requireImage('/Generate_Decendants/Generate_Decendants.svg'),
        options: [
          {
            variant: 'primary',
            text: 'not only will I adopt one of your children, I will help you out financially?',
            tooltip: 'this will generate a child for you next month',
            statChanges: {
              cash: -50,
              prestige: +25,
              influence: +300,
              scaleByRevenue: ['cash']
            },
            action:{
              event: '/Generate_Decendants/main',
              method: 'doGenerate_Decendants',
              context: {characterId, spouseId: character.spouseId }
            }
          },
		  {
            text: 'No, I cannot affor to'
          }
        ]
      })
    },
    doGenerate_Decendants({ characterId, spouseId }) 		{
let character = daapi.getCharacter({ characterId })
let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
	     var generatedCharacterId = daapi.generateCharacter({
  characterFeatures: {
	      	dynastyId:daapi.getCharacter({ characterId: daapi.getState().current.id }).dynastyId,
     birthYear: daapi.getState().year - 1 ,
	 fatherId: daapi.getState().current.id,
	motherId: daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId,
  },
                 })
		
           
       daapi.updateCharacter({characterId, character:{ childrenIds: [...character.childrenIds, generatedCharacterId] }})
	   if( character.spouseId){
	   daapi.updateCharacter({characterId: spouseId, character:{ childrenIds: [...characterSpouse.childrenIds, generatedCharacterId] }})}
	
    console.log(generatedCharacterId, characterId, spouseId)
	}
	
    
}

}


