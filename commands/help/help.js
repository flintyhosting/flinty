const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'help',
    category: 'help',
    run: async (client, message, args) => {
        message.delete({timeout: 0})

        const embed = new MessageEmbed()
        .setColor('ffa500')
        .setTitle('Help Menu')
        .setDescription('This menu displays all of my commands. You can use all of them in any channel but if you are going to be using them a lot, please use my official channel -> <#961350003694125056>')
        .setFooter('Flinty Help', message.guild.iconURL({dynamic: true}))
        .setAuthor(message.member.user.tag, message.member.user.avatarURL({dynamic: true}))
        .setThumbnail(message.member.user.avatarURL({dynmaic: true}))
        .addField('Fun', '`hug`')

        message.channel.send(embed)
    }
}