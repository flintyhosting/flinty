const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'import',
    category: 'owner',
    run: async(client, message, args) => {
        message.delete({timeout: 0})

        const { guild, channel, member} = message

        const param = message.args[0]

        if (!member.roles.cache.find(r => r.name === 'Community Manager')) {
            return
        }
        else {
            if (!param) {
                message.channel.send(`You have not provided a \`function_for_import\`. Please parse one of these arguments through as the function:\n\n\`server_rules\`\n\`server_roles\`\n\`server_info\`\n\`server_giveaways\`\n\`server_partnership\`\n\`community_suggestions\`\n\`mod_prood\`\n\`mod_requests\`\n\`mod_cmds\`\n\`mod_bots\`\n\`mod_absence\``).then(msg => {
                    msg.delete({timeout: 2500})
                })
                return
            }
            else {
                if (param === 'server_rules') {
                    //
                }
                if (param === 'server_roles') {
                    //
                }
                if (param === 'server_info') {
                    //
                }
                if (param === 'server_partnerships') {
                    //
                }
                if (param === 'server_giveaways') {
                    //
                }
                if (param === 'community_suggestions') {
                    //
                }
            }
        }
    }
}