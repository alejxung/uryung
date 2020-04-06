module.exports = 
{
    name: "clear",
    aliases: ["c", "delete"],
    category: "moderation",
    description: "Clears the chat",
    run: async (client, message, args) =>
    {
        if (message.deletable)
        {
            message.delete()
        }

        // Member does not have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
        {
            return message.reply("You do not have permissions to delete messages.").then(m => m.delete(5000))
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0)
        {
            return message.reply("You typed incorrectly. Try numbers that are above 0").then(m => m.delete(5000))
        }

        // The bot cannot delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES"))
        {
            return message.reply("Sorry, I do not have permissions to delete messgaes.").then(m => m.delete(10000))
        }

        let deleteAmount

        if (parseInt(args[0]) > 100)
        {
            deleteAmount = 100
        }
        else
        {
            deleteAmount = parseInt(args[0])
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`).then(m => m.delete(5000)))
            .catch(err => message.reply(`Something went wrong... ${err}`))

        return args[0]
    }
}