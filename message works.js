//this document is used to test if your let, if. amnd other statements work to help with troubleshooting. You can also use it to test out. REMEMBER TO CHANGE ANYTHING THAT SAYS "CHANGE ME" most of them are file paths
{
  canTriggerIfUnavailable: true,
  checkType: 'householdCharacters',
  checkAndAct(characterId) {
     	let character = daapi.getState().current.id
		if ( !character.isDead )
			 {
      daapi.addCharacterAction({
        characterId,
        key: 'CHANGE ME',
        action: {
          title: 'CHANGE ME',
          icon: daapi.requireImage('/CHANGE ME/CHANGE ME.svg'),
          isAvailable: true,
          hideWhenBusy: false,
          process: {
            event: '/CHANGE ME/main',
            method: 'process',
            context: {  characterId }
          }
        }
      })
    }
	else {
      daapi.deleteCharacterAction({
        characterId,
        key: 'CHANGE ME'
      })
    }
	}
	,
  methods: {
    process({ characterId }) {
      let character = daapi.getState().current.id
           daapi.pushInteractionModalButtonQueue({
        title: 'CHANGE ME?',
        message: 'And old friend has approached you, they have fallen on hard times and are struggling to raise their children. Would you like to addopt one of them ?',
        image: daapi.requireImage('/CHANGE ME/CHANGE ME.svg'),
        options: [
          {
            
            text: 'Yes!!!'
            
            }
          ,
          {
            text: 'No way!'
          }
        ]
      })
    }
}
}