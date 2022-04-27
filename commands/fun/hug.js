const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'hug',
    category: 'fun',
    run: async (client, message, args) => {
        message.delete({timeout: 0})

        const target = message.guild.members.cache.get(args[0]) || message.mentions.members.first()

        const ranTargetedResponse = [`<@${message.member.id}> gave <@
        ${target.user.id}> the biggest hug ever.`, `<@${target.user.id}> was given a great big squeeze by <@${message.member.id}>`]
        const ranSelfReponse = [``]
    }
}