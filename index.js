const fetch = require('node-fetch');
const randomstring = require("randomstring");

const checkInterval = 15000

setInterval(() => {
  let code = randomstring.generate(Math.floor(Math.random() * 9) + 5);
  fetch(`https://discordapp.com/api/invite/${code}`)
  .then((res) => res.json())
  .then((json) => {
      if (json.message !== 'Unknown Invite') {
        console.log(`Found a valid invite: ${code}`)
      } else {
        console.log(`Unknown invite: ${code}`)
      }
  });
}, checkInterval);