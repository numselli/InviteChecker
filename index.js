const fetch = require('node-fetch'), randomstring = require("randomstring"), fs = require("fs");

//				      ┌───────────────────────────────────────────────────────────────────────┐
//              │                                                                       │
//              │                                                                       │
//              │  You could be rate-limited or temporarily banned from discord's api.  │
//              │                                                                       │
//              │                                                                     	│
//              └───────────────────────────────────────────────────────────────────────┘


// delay between invite checks (miliseconds 1000 miliseconds = 1 second)
var checkInterval = 15000;

// how long to to wait after being ratelimited (miliseconds 1000 miliseconds = 1 second)
var rateLimitDelay = 6000;

// max random delay to make it hrader to be ratelimited (miliseconds 1000 miliseconds = 1 second)
var humanLikeRandomness = 3000


checkCode();
function checkCode(){
	let code = randomstring.generate(Math.floor(Math.random() * 9) + 5);
	if (code.length>=7){
		fetch(`https://discordapp.com/api/invite/${code}`)
		.then((res) => {
			if (res.status !== 429){
				res.json();
			}else{
				console.log(res.statusText);
			}
		})
		.then((json) => {
			if (!json){
				setTimeout(checkCode, checkInterval + randomDelay(rateLimitDelay,rateLimitDelay));
				return
			}
			if (json.message !== 'Unknown Invite') {
				fs.readFile('invites.json', function (err, data) {
					var json = JSON.parse(data)
					json.push(`${json.guild.name}: https://discord.gg/${code}`)
					fs.writeFile("invites.json", JSON.stringify(json))
				})
				console.log(`Found a valid invite for ${json.guild.name}: ${code}`);
			}else {
				console.log(`Unknown invite: ${code}`);
			}
			setTimeout(checkCode, checkInterval + randomDelay(1, humanLikeRandomness));
		});
	}
}
function randomDelay(min, max){
	var delay =  Math.random() * (max - min) + min;
	console.log(`next check in: ${checkInterval+delay} MS`);
	return delay
}
