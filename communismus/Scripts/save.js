

function Save(){

	this.savableNames = ["socialists", "sps", "agents", "agentPrices", "agentEffects"]
    this.savables = [socialists, sps, agents, agentPrices, agentEffects]

    this.save =  function(){
    	 this.savables = [socialists, sps, agents, agentPrices, agentEffects]
    	for (var i = 0; i < this.savables.length; i++){
    		setLocalStorage(this.savableNames[i], this.savables[i])
    		console.log("Saved " + this.savableNames[i] + " as " + this.savables[i])
    	}

    	document.getElementById("gameSavedText").style = "display: inline;"
    	setTimeout(function() {hideSaveTexts()}, 1.5 * 1000);
	}

	this.deleteSave =  function(){
        if(!confirm("Are you sure you want to wipe your save?")){
            return
        }
    	for (var i = 0; i < this.savables.length; i++){
    		localStorage.removeItem(this.savableNames[i])
    		console.log("Removed " + this.savableNames[i])
    	}

        location.reload()
	}
}


save = new Save()


function setLocalStorage(name, value) {
    localStorage[name] = value
}


function getLocalStorage(name) {
    return localStorage[name]
}



