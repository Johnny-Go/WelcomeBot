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

client.on('guildMemberAdd', member => {
    try {
        const guild = client.guilds.cache.get(member.guild.id);
        if(guild) {
            const channel = guild.channels.cache.find(ch => ch.name.match(/general/));
            if(channel) {
                console.log(`Sending Welcome message to ${member.displayName} in guild ${guild.name} and channel ${channel.name}`);
                channel.send('https://tenor.com/view/simpson-gif-25340727');
            } else {
                console.log(`${member.displayName} joined guild ${guild.name}, but unable to find general channel`);
            }
        } else {
            console.log(`${member.displayName} joined guild, but unable to find guild joined`);
        }
    }
    catch(e) {
        console.log(e);
    }
})

// Authenticate
client.login(process.env.DISCORD_TOKEN);