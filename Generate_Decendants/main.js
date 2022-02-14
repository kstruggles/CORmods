// Give child up for Generate_Decendantsion button - costs cash, etc and visible upto a certain age - kills the child in game
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
      age >=  16
    )
	{
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
    }
 else if (
      character.isMale &&
      !character.spouseId &&
	  (character.isHeir || !character.flagInMatrilinealMarriage) &&
      age >= 16
    )
	{
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
            method: 'process1',
            context: {
              characterId
            }
          }
        }
      })
    }

else if (
      !character.isMale &&
      character.spouseId &&
	  (character.isHeir || character.flagInMatrilinealMarriage) &&
      age >= 16
    )
	{
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
            method: 'process2',
            context: {
              characterId
            }
          }
        }
      })
    }
 
else if (
      !character.isMale &&
      !character.spouseId &&
	  (character.isHeir || character.flagInMatrilinealMarriage) &&
      age >= 16
    )
	{
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
            method: 'process3',
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
        key: 'Generate_Decendants'
      })
    }
  },
  methods: {    process({ characterId }) {
      let character = daapi.getCharacter({ characterId })
	  let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
      daapi.pushInteractionModalQueue({
        title: 'Generate_Decendants',
        message: 'And old friend approached '+ `[c|${characterId}|${character.praenomen}]`+' , they have fallen on hard times and are struggling to raise their children. Would you like them to addopt a child?',
        image: daapi.requireImage('/Generate_Decendants/Generate_Decendants.svg'),
        options: [
          {
            variant: 'primary',
            text: 'yes? '+ `[c|${characterId}|${character.praenomen}]`+' should adopt a child. And to help them get back on their feet we should give them some money',
            tooltip: 'will generate a child for you next month',
            statChanges: {
              cash: -50,
              prestige: +500,
              influence: +1000,
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
    doGenerate_Decendants({ characterId, spouseId }) 		
	{let character = daapi.getCharacter({ characterId })
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
	   daapi.updateCharacter({characterId: spouseId, character:{ childrenIds: [...characterSpouse.childrenIds, generatedCharacterId] }})
	},
	    process1({ characterId }) {
      let character = daapi.getCharacter({ characterId })
	    daapi.pushInteractionModalQueue({
        title: 'Generate_Decendants',
        message: 'And old friend approached '+ `[c|${characterId}|${character.praenomen}]`+', they have fallen on hard times and are struggling to raise their children. Would you like to addopt one of them ?',
        image: daapi.requireImage('/Generate_Decendants/Generate_Decendants.svg'),
        options: [
          {
            variant: 'primary',
            text: 'yes? '+ `[c|${characterId}|${character.praenomen}]`+' should adopt a child. And to help them get back on their feet we should give them some money',
            tooltip: 'will generate a child for you next month',
            statChanges: {
              cash: -50,
              prestige: +500,
              influence: +1000,
              scaleByRevenue: ['cash']
            },
            action:{
              event: '/Generate_Decendants/main',
              method: 'doGenerate_Decendants1',
              context: {characterId}
            }
          },
		  {
            text: 'No, I cannot affor to'
          }
        ]
      })
    },
    doGenerate_Decendants1({ characterId}) 		
	{let character = daapi.getCharacter({ characterId })
	     var generatedCharacterId = daapi.generateCharacter({
  characterFeatures: {
	dynastyId:daapi.getCharacter({ characterId: daapi.getState().current.id }).dynastyId,
     birthYear: daapi.getState().year - 1 ,
	 fatherId: daapi.getState().current.id	  },
                 })
		
           
       daapi.updateCharacter({characterId, character:{ childrenIds: [...character.childrenIds, generatedCharacterId] }})
	},
	    process2({ characterId }) {
      let character = daapi.getCharacter({ characterId })
	  let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
      daapi.pushInteractionModalQueue({
        title: 'Generate_Decendants',
        message: 'And old friend approached '+ `[c|${characterId}|${character.praenomen}]`+' , they have fallen on hard times and are struggling to raise their children. Would you like them to addopt a child?',
        image: daapi.requireImage('/Generate_Decendants/Generate_Decendants.svg'),
        options: [
          {
            variant: 'primary',
            text: 'yes? '+ `[c|${characterId}|${character.praenomen}]`+' should adopt a child. And to help them get back on their feet we should give them some money',
            tooltip: 'will generate a child for you next month',
            statChanges: {
              cash: -50,
              prestige: +500,
              influence: +1000,
              scaleByRevenue: ['cash']
            },
            action:{
              event: '/Generate_Decendants/main',
              method: 'doGenerate_Decendants2',
              context: {characterId, spouseId: character.spouseId }
            }
          },
		  {
            text: 'No, I cannot affor to'
          }
        ]
      })
    },
    doGenerate_Decendants2({ characterId, spouseId }) 		
	{let character = daapi.getCharacter({ characterId })
let characterSpouse = daapi.getCharacter({ characterId: character.spouseId })
	     var generatedCharacterId = daapi.generateCharacter({
  characterFeatures: {
	dynastyId:daapi.getCharacter({ characterId: daapi.getState().current.id }).dynastyId,
     birthYear: daapi.getState().year - 1 ,
	 fatherId: daapi.getCharacter({ characterId: daapi.getState().current.id }).spouseId,
	motherId:daapi.getState().current.id ,
  },
                 })
		
           
       daapi.updateCharacter({characterId, character:{ childrenIds: [...character.childrenIds, generatedCharacterId] }})
	   daapi.updateCharacter({characterId: spouseId, character:{ childrenIds: [...characterSpouse.childrenIds, generatedCharacterId] }})
	
  
	},
	    process3({ characterId }) {
      let character = daapi.getCharacter({ characterId })
	    daapi.pushInteractionModalQueue({
        title: 'Generate_Decendants',
        message: 'And old friend approached '+ `[c|${characterId}|${character.praenomen}]`+' , they have fallen on hard times and are struggling to raise their children. Would you like them to addopt a child?',
        image: daapi.requireImage('/Generate_Decendants/Generate_Decendants.svg'),
        options: [
          {
            variant: 'primary',
            text: 'yes? '+ `[c|${characterId}|${character.praenomen}]`+' should adopt a child. And to help them get back on their feet we should give them some money',
            tooltip: 'will generate a child for you next month',
            statChanges: {
              cash: -50,
              prestige: +500,
              influence: +1000,
              scaleByRevenue: ['cash']
            },
            action:{
              event: '/Generate_Decendants/main',
              method: 'doGenerate_Decendants3',
              context: {characterId }
            }
          },
		  {
            text: 'No, I cannot affor to'
          }
        ]
      })
    },
    doGenerate_Decendants3({ characterId }) 		
	{let character = daapi.getCharacter({ characterId })
	     var generatedCharacterId = daapi.generateCharacter({
  characterFeatures: {
	dynastyId:daapi.getCharacter({ characterId: daapi.getState().current.id }).dynastyId,
     birthYear: daapi.getState().year - 1 ,
	 motherId: daapi.getState().current.id	  }
                 })
	 daapi.updateCharacter({characterId, character:{ childrenIds: [...character.childrenIds, generatedCharacterId] }})
	
  
	}


    
}

}


