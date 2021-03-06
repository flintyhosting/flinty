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

  client.user.setActivity("being developed. Not responding...", { type: 'PLAYING' });

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
    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
    .setFooter('Member Joined:', member.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

  logChannel.send(embed)

  const memberRole = member.guild.roles.cache.get('961246796531773503')

  member.roles.add(memberRole)
});

client.on('guildMemberRemove', member => {

  const logChannel = member.guild.channels.cache.get('964206562602287105');

  const embed = new Discord.MessageEmbed()
    .setColor('ff0000')
    .setTitle('Member Left')
    .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL({ dynamic: true }))
    .setFooter('Member Left:', member.guild.iconURL({ dynamic: true }))
    .setTimestamp()
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

  logChannel.send(embed)
});

/*client.on("messageDelete", (messageDelete) => {

  if (messageDelete.author.bot) {
    return
  }
  else {

    const rChann = messageDelete.guild.channels.cache.get('964206562602287105')

    const embed = new Discord.MessageEmbed()
      .setColor('ff0000')
      .setTitle('Message Deleted')
      .setTimestamp()
      .setFooter(`${messageDelete.author.tag}`, messageDelete.guild.iconURL({ dynamic: true }))
      .addField('Author:', `<@${messageDelete.author.id}>`, true)
      .addField('Channel:', `<#${messageDelete.channel.id}>`, true)
      .addField('Message:', `\`\`\`\n${messageDelete.content}\n\`\`\``);

    rChann.send(embed)
  }
});
/*

/* client.on("messageUpdate", (oldMessage, newMessage) => {
if (oldMessage.author.bot) {
  return
}
else {

  const rChann = oldMessage.guild.channels.cache.get('964206562602287105')

  const embed = new Discord.MessageEmbed()
    .setColor('ffa500')
    .setTitle('Message Edited')
    .setTimestamp()
    .setFooter(`${oldMessage.author.tag}`, oldMessage.guild.iconURL({ dynamic: true }))
    .addField('Author:', `<@${oldMessage.author.id}>`, true)
    .addField('Channel:', `<#${oldMessage.channel.id}>`, true)
    .addField('Before:', `\`\`\`\n${oldMessage}\n\`\`\``, false)
    .addField('After:', `\`\`\`\n${newMessage}\n\`\`\``, false)

  rChann.send(embed)
}
});
/*/

client.on("channelCreate", channel => {
  const embed = new Discord.MessageEmbed()
  .setFooter('Flinty Log', channel.guild.iconURL({dynamic: true}))
  .setTimestamp()
  .addField('Channel:', `<#${channel.id}>`, true)
  .addField('Channel ID:', `${channel.id}`, false)
  .setColor('00ff00')

  const rChann = channel.guild.channels.cache.find(r => r.id === '964206562602287105')

  rChann.send(embed)
})

client.on("channelUpdate", (oldChannel, newChannel) => {
  const embed = new Discord.MessageEmbed()
  .setFooter('Flinty Log', oldChannel.guild.iconURL({dynamic: true}))
  .setTimestamp()
  .addField('Old Name', `${oldChannel.name}`)
  .addField("New Name:", `${newChannel.id}\n(${newChannel.id})`)
  .setColor('ffff00')

  const rChann = oldChannel.guild.channels.cache.find(r => r.id === '964206562602287105')

  rChann.send(embed)

})

client.on("channelDelete", (channel) => {
  const embed = new Discord.MessageEmbed()
  .setFooter('Flinty Log', channel.guild.iconURL({dynamic: true}))
  .setTimestamp()
  .addField('Name', `${channel.name}\n(${channel.id})`)
  .addField('Channel:', `<#${channel.id}>`)
  .setColor('ff0000')

  const rChann = channel.guild.channels.cache.find(r => r.id === '964206562602287105')

  rChann.send(embed)
})

client.on("emojiCreate", (emoji) => {
  const embed = new Discord.Message()
  .setFooter('Flinty Log', emoji.guild.iconURL({dynamic: true}))
  .setTimestamp()
  .setDescription(`Emoji **${emoji.name}** successfully created with a value of \`${emoji.id}\`. <:${emoji.name}:${emoji.id}>`)
  .setColor('00ff00')

  const rChann = emoji.guild.channels.cache.find(r => r.id === '964206562602287105')

  rChann.send(embed)
})

client.on("emojiDelete", (emoji) => {
  const embed = new Discord.MessageEmbed()
  .setFooter('Flinty Log', emoji.guild.iconURL({dynamic: true}))
  .setTimestamp()
  .setDescription(`Emoji **${emoji.name}** successfully deleted with a value of \`${emoji.id}\`. <:${emoji.name}:${emoji.id}>`)
  .setColor('ff0000')

  const rChann = emoji.guild.channels.cache.find(r => r.id === '964206562602287105')

  rChann.send(embed)
})

client.on("emojiUpdate", (oldEmoji, newEmoji) => {
  const embed = new Discord.MessageEmbed()
  .setFooter('Flinty Log', oldEmoji.guild.iconURL({dynamic: true}))
  .setTimestamp()
  .addField('Old Name', `${oldEmoji.name}`)
  .addField("New Name:", `${newEmoji.name}\n(${newEmoji.id})`)
  .setColor('ffff00')

  const rChann = oldEmoji.guild.channels.cache.find(r => r.id === '964206562602287105')

  rChann.send(embed)

})

client.on("message", async message => {
  const prefix = `${settings.prefix}`;

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