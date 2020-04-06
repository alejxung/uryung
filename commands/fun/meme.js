const { getMember } = require("../../functions.js")
const { RichEmbed } = require("discord.js")
const randomPuppy = require("random-puppy")

module.exports =
{
    name: "meme",
    aliases: ["m"],
    category: "fun",
    description: "Sends an epic meme",
    run: async (client, message, args) =>
    {
        const member = getMember(message, args.join(" "))
        const color = member.displayHexColor === "#000000" ? "#ffffff" : member.displayHexColor

        const subReddits = ["dankmemes", "memes", "me_irl"]
        const random = subReddits[Math.floor(Math.random() * subReddits.length)]
        
        const img = await randomPuppy(random)
        const embed = new RichEmbed()
            .setColor(color)
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
        
        message.channel.send(embed)
        message.channel.send(random)
    }
}

// type "_m (subreddit name)"
// meme image link?