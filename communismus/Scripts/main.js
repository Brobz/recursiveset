
var socialists
var socialistText
var socialistButton

var sps
var spsText

var agentButtons = []

var agentImages = ["Images/i_h_marx_flyer.png", "Images/jingle.png", "Images/statue.png"]

var agentDImages = ["Images/i_h_marx_flyer_down.png", "Images/jingle_down.png", "Images/statue_down.png"]

var agentUImages = ["Images/i_h_marx_flyer_unavailable.png", "Images/jingle_unavailable.png", "Images/statue_unavailable.png"]

var agentFlavor = ["I Heart Marx Flyers. Spread Communism!", "Socialist Jingle. Sing for the State!", "Engels Statue. Praise our Saviour!"]

var agentCountText  = []

var agentText = []

var agentPriceText = []

var agentPrices  = []

var agentEffects = []

// 0 -> I H MARX Flyers
// 1 -> Socialist Jingle
// 2 -> Engels Statue
var agents = []

var upgrades = [[0], [0], [0]]

var upgradeEffects = [[2], [2], [2]]

function makeNumArray(a, f){
	for (var i = 0; i < a.length; i++){
		if(f){
			a[i] = parseFloat(a[i])
		}else{
			a[i] = parseInt(a[i])
		}
	}
}

window.onload = function() {

	socialists = parseInt(getLocalStorage("socialists"))
	if (isNaN(socialists)){
		console.log("Failed to load Socialists")
		socialists = 0 
	}
	sps = parseFloat(getLocalStorage("sps"))
	if (isNaN(sps)){
		console.log("Failed to load SpS")
		sps = 0 
	}

	agents = getLocalStorage("agents")
	if (agents == undefined){
		console.log("Failed to load Agents")
		agents = [0, 0, 0]
	}else{
		agents = agents.split(",")
	}

	agentPrices = getLocalStorage("agentPrices")
	if (agentPrices == undefined){
		console.log("Failed to load Agent Prices")
		agentPrices = [10, 100, 800]
	}else{
		agentPrices = agentPrices.split(",")
	}

	agentEffects = getLocalStorage("agentEffects")
	if (agentEffects == undefined){
		console.log("Failed to load Agent Effects")
		agentEffects = [0.2, 2, 10]
	}else{
		agentEffects = agentEffects.split(",")
	}
	
	makeNumArray(agentEffects, true)
	makeNumArray(agentPrices, false)
	makeNumArray(agents, false)

    socialistText = document.getElementById("socialist")
    socialistText.innerHTML = Math.floor(socialists) + " Socialists"
    spsText = document.getElementById("sps")
   	spsText.innerHTML = "per second: " + sps
    socialistButton = document.getElementById("button")

    agentButtons.push(document.getElementById("flyer"))
    agentButtons.push(document.getElementById("jingle"))
    agentButtons.push(document.getElementById("statue"))


    agentCountText.push.apply(agentCountText, document.getElementsByClassName("Count"))
    agentPriceText.push.apply(agentPriceText, document.getElementsByClassName("Price"))
    agentText.push.apply(agentText, document.getElementsByClassName("Text"))


    getSpS()
}

function getsocialist(){
	socialists += 1

	updateDisplay()	
}

function buttonAction(action){
	console.log("wtf")
	if (action){
		socialistButton.src = "Images/button_down.png"
	}else{
		socialistButton.src = "Images/button_idle.png"
		getsocialist()
	}
}


function agentAction(index, action){
	if (socialists >= agentPrices[index]){
		if (action){
			agentButtons[index].src = agentDImages[index]
		}else{
			agentButtons[index].src = agentImages[index]
			addAgent(index)
		}
	}
}

function addAgent(index){
	agents[index] += 1
	socialists -= agentPrices[index]
	agentPrices[index] = parseInt(agentPrices[index] * 1.25)
	sps += agentEffects[index]
	sps = Math.round( sps * 10 ) / 10;
	updateDisplay()
}

function updateDisplay(){
	socialistText.innerHTML = Math.floor(socialists) + " Socialists"
	spsText.innerHTML = "per second: " + sps
	for (var i = 0; i < agentButtons.length; i++){
		if(agentPrices[i] > socialists){
			agentButtons[i].src = agentUImages[i]
		}else{
			agentButtons[i].src = agentImages[i]
		}

		agentText[i].innerHTML = agentFlavor[i] + " (+" + agentEffects[i] + " SpS)"
		agentPriceText[i].innerHTML = "Cost: " + agentPrices[i] + " Socialists"
		if (socialists < agentPrices[i]){
			agentPriceText[i].style = "color:red;"
		}else{
			agentPriceText[i].style = "color:green;"
		}
		agentCountText[i].innerHTML = "Owned: " + agents[i]
	}
}

function getSpS(){
	socialists += sps / 15
	updateDisplay()
	setTimeout(function() {getSpS()}, 0.066666666666 * 1000);
}

function hideSaveTexts(){
	document.getElementById("gameSavedText").style = "display: none;"
}