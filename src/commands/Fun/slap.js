const Discord = require('discord.js');
const superagent = require('superagent');


module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: [], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'slap',
          categoria: '🤣 • Fun',
          desc: 'Seu amigo corno está te pertubando ? De um tapa na cara dele !!!!'
        },
        en: {
          nome: 'slap',
          categoria: '🤣 • Fun',
          desc: 'Your cuckold friend is disturbing you Slap him in the face !!!!'
        },
      aliases: ['tapa','bater'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

    if (!message.mentions.users.first()) return message.quote(idioma.hug.user.replace('hug', 'slap').replace('abraçar', 'bater'));

    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/slap");
    let avatar = message.author.displayAvatarURL({format: 'png'});
    const embed = new Discord.MessageEmbed()
    .setTitle('Slap | Star:tm:')
    .setColor("#ff09de")
    .setDescription(`**${message.author.username}** ${idioma.hug.acaba.replace('hugged', 'slapped').replace('abraçar', 'bater')} **${message.mentions.users.first().username}**!`)
    .setThumbnail(avatar)
    .setImage(body.url) 
    message.quote({embed})
 }
}