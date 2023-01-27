process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const mineflayer = require('mineflayer');
const Vec3 = require('vec3');
const ProxyAgent = require('proxy-agent');
const readline = require('readline');


const accounts = [
  
];

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

let messageLogged = false

const bots = [];
for (const account of accounts) {
  setTimeout(() => {
    const bot = mineflayer.createBot({
      host: 'hypixel.net',
      port: 25565,
      version: "1.8.9",
      username: account.username,
      password: account.password,
      auth: 'microsoft',
      agent: new ProxyAgent(account.proxy),
    });
    bots.push(bot);

    bot.on('spawn', () => {
       console.log("--------------------------")
       console.log(bot.username + ' Connected ');
       console.log("--------------------------")
       sleep(3000)
    });
    
    let intervalId;

    let randomDelay = Math.floor(Math.random() * (20000 - 5000 + 1) + 5000);

    intervalId = setInterval(() => {
      bot.chat("/play pit");
      console.log("--------------------------")
      console.log(bot.username + ' Is Attempting To Play Pit');
      randomDelay = Math.floor(Math.random() * (20000 - 5000 + 1) + 5000);
      console.log('Next Delay For ' + bot.username + ' is ' + randomDelay+'ms');
      console.log("Number of players in " + bot.username+"'s the lobby: ", Object.keys(bot.players).length);
      console.log("--------------------------")
    }, randomDelay);


bot.on('kicked', (reason) => {
    console.log(bot.username + ' has been kicked. Reason: ' + reason);
});
bot.on('error', (error) => {
    console.log("error with: " + bot.username);
});

 }, 3000);
}
