const Discord = require('discord.js')
const fs = require('fs')

const settings = require("./config.json")

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();


client.categories = fs.readdirSync("./commands/");

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});


const mongo = require('./mongo')

client.on("ready", async () => {
    console.log(`Hi, ${client.user.username} is now online!`);
  
  client.user.setActivity("with fire.", {type: 'PLAYING'});
  
    await mongo().then((mongoose) => {
    try {
      console.log('Connected to mongo!')
    } finally {
      mongoose.connection.close()
    }
  })
});


client.on('guildMemberAdd', member => {
  
  const logChannel = member.guild.channels.cache.get('964206562602287105');
  
  const embed = new Discord.MessageEmbed()
  .setColor('00ff00')
  .setTitle('Member Joined')
  .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({dynamic:true}))
  .setFooter('Member Joined:', member.guild.iconURL({dynamic: true}))
  .setTimestamp()
  .setThumbnail(member.user.displayAvatarURL({dynamic: true}));
 
  logChannel.send(embed)
  
  const memberRole = member.guild.roles.cache.get('961246796531773503')
  
  member.roles.add(memberRole)
});

client.on('guildMemberRemove', member => {
  
  const logChannel = member.guild.channels.cache.get('964206562602287105');
  
  const embed = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setTitle('Member Left')
  .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({dynamic:true}))
  .setFooter('Member Left:', member.guild.iconURL({dynamic: true}))
  .setTimestamp()
  .setThumbnail(member.user.displayAvatarURL({dynamic: true}));
 
  logChannel.send(embed)
});

client.on("messageDelete", (messageDelete) => {
  
  if (messageDelete.author.bot) {
    return
  }
  else {
  
  const rChann = messageDelete.guild.channels.cache.get('964206562602287105')
  
  const embed = new Discord.MessageEmbed()
  .setColor('ff0000')
  .setTitle('Message Deleted')
  .setTimestamp()
  .setFooter(`${messageDelete.author.tag}`, messageDelete.guild.iconURL({dynamic: true}))
  .addField('Author:', `<@${messageDelete.author.id}>`, true)
  .addField('Channel:', `<#${messageDelete.channel.id}>`, true)
  .addField('Message:', `\`\`\`\n${messageDelete.content}\n\`\`\``);
  
  rChann.send(embed)
  }
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  
  if (oldMessage.author.bot) {
    return
  }
  else {
  
  const rChann = oldMessage.guild.channels.cache.get('964206562602287105')
  
  const embed = new Discord.MessageEmbed()
  .setColor('ffa500')
  .setTitle('Message Edited')
  .setTimestamp()
  .setFooter(`${oldMessage.author.tag}`, oldMessage.guild.iconURL({dynamic: true}))
  .addField('Author:', `<@${oldMessage.author.id}>`, true)
  .addField('Channel:', `<#${oldMessage.channel.id}>`, true)
  .addField('Before:', `\`\`\`\n${oldMessage}\n\`\`\``, false)
  .addField('After:', `\`\`\`\n${newMessage}\n\`\`\``, false)
  
  rChann.send(embed)
  }
});

client.on("message", async message => {
    const prefix = `${settings.prefix}`;
  
  if (message.channel.id === '961347706553520198') {
      message.react('<:upvote:959897879244308510>  ')
          .then(() => { 
              message.react('<:downvote:959897877742780526>')
          });
  }

    if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args);
});

client.login(settings.token)