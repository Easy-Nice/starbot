module.exports = class NotStonksCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ATTACH_FILES'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'notstonks',
          categoria: '🤣 • Fun',
          desc: 'Faça um confusedmeme stonks !!!'
        },
        en: {
          nome: 'notstonks',
          categoria: '🤣 • Fun',
          desc: 'Make a confusedmeme stonks !!!'
        },
      aliases: ['confused', 'cstonks', 'confusedstonks'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {

      const { createCanvas, loadImage } = require('canvas');
      if((args.join(" ").length) > 300) return message.quote(idioma.image.long.replace("%u", message.author))

      if(!args[0]) return message.quote(`${idioma.image.args.replace("%u", message.author)}`)

      message.quote(`${idioma.image.editando.replace("%u", message.author)}`).then(async m => {
        message.channel.startTyping()
          const canvas = createCanvas(685, 494); 
          const ctx = canvas.getContext('2d');
          
          const DIG = require("discord-image-generation");
          let img = await new DIG.ConfusedStonk().getImage(message.author.displayAvatarURL({ dynamic: false, format: 'png', size: 4096 }))

          //const im = `https://vacefron.nl/api/stonks?user=${img}`

          const background = await loadImage(img)//await loadImage('https://i.imgur.com/AUzBCnR.png');
          ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
          
          ctx.font = '30px sans-serif';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(`${args.join(" ")}`.match(/.{1,50}/g).join("\n"), canvas.width / 50.9, canvas.height / 15.9, 655);
          
          const attachment = new (require("discord.js")).MessageAttachment(canvas.toBuffer(), `cstonks-${message.author.id}.png`);
       
          await message.quote(`${message.author}`, attachment).then(m2 => {
            message.channel.stopTyping()
              m.delete()
              })
      })
    }
}