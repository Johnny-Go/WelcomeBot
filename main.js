// Setup our environment variables via dotenv
require('dotenv').config();

// Import relevant classes
const { Client, Intents } = require('discord.js');

// Instantiate a new client with some necessary parameters.
const client = new Client(
    {
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
        partials: ['CHANNEL']
    }
);

// Notify progress
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
})

client.on('guildMemberAdd', member =>{
    console.log(`Sending Welcome message for ${member.displayName}`);

    try {
        const guild = client.guilds.cache.get(process.env.GUILD);
        const channel = guild.channels.cache.find(ch => ch.id === process.env.WELCOME_CHANNEL);
        channel.send('https://tenor.com/view/simpson-gif-25340727');
    }
    catch(e) {
        console.log(e);
    }
})

// Authenticate
client.login(process.env.DISCORD_TOKEN);