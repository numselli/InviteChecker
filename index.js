const fetch = require('node-fetch'), randomstring = require('randomstring'), randomWords = require('random-words'), config = require('./config.json');

//			    ┌───────────────────────────────────────────────────────────────────────┐
//              │                                                                       │
//              │                                                                       │
//              │  You could be rate-limited or temporarily banned from discord's api.  │
//              │                                                                       │
//              │                                                                     	│
//              └───────────────────────────────────────────────────────────────────────┘


if (config.endableRandomInvite){
	setInterval(generateRandomInvite, config.RandomcheckInterval)
}
if (config.endableCustomInvite){
	setInterval(generateCustomInvite, config.CustomcheckInterval)
}

function generateRandomInvite(){
	let code = randomstring.generate(Math.floor(Math.random() * 9) + 5);
	if (code.length>=5){
		postCode(code)
	}
}

function generateCustomInvite(){
	var numberofwords = Math.floor(Math.random() * 10) + 1
	postCode( randomWords({ exactly: numberofwords, join: '-' }) )
}

function postCode(code){
	fetch(config.discordWebhook, {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({"content": `https://discord.gg/${code}`})})
	.then(res => console.log(`posed with status: ${res.status}`))
}