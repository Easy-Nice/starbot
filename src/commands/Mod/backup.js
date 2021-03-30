module.exports = class ExemploCommand {
    constructor(){
      return {
        permissoes: {
          membro: [], //Permissoes que o usuario necessita
          bot: ['ADMINISTRATOR'], //Permissoes que o bot necessita
          dono: false //Se apenas nos devs podem usar o comando
        },
        pt: {
          nome: 'backup',
          categoria: '🔨 • Moderação',
          desc: 'Descrição'
        },
        en: {
          nome: 'backup',
          categoria: '🔨 • Moderation',
          desc: 'Description'
        },
      aliases: ['backups'],
      run: this.run
      }
    }
    
    async run(client, message, args, prefixo, idioma) {
        const backup = require("../../../starnpms/discord-backup/lib/index");

        if(message.author.id !== message.guild.ownerID) return message.quote(`Só dono do sv mermão`)

        const embed = new (require("discord.js")).MessageEmbed()
        .setTitle(`☁️ Backup | ${client.user.username}`)
        .addField(`[1] Create:`, `Cria um backup desse servidor, \`s!backup create\``)
        .setColor("BLUE")
        if(!args[0]) return message.quote(embed)

        if(args[0].toLowerCase == "create") {
          if(message.author.id !== message.guild.ownerID) return message.quote(`Só dono do sv mermão`)
          backup.create(message.guild, {
            jsonBeautify: true
        }).then((backupData) => {
            const sucesso = new Discord.MessageEmbed()
            .setTitle(`☁️ Backup | ${client.user.username}`)
            .setDescription(`Seu backup foi criado!`)
            .addField(`ID do Backup: ${backupData.id}`, `Para carregar ultilize \`${prefix}backup load <ID>\``)
            .setColor(config.color)
    
            const criado = new Discord.MessageEmbed()
            .setTitle(`☁️ Backup | ${client.user.username}`)
            .setDescription(`Seu backup foi criado, e as informações mandadas em seu direct`)
            .setColor(config.color)
            message.quote(criado).then(m => {
            message.author.send(sucesso).catch((e) => {
              m.delete()
              message.quote(sucesso)
            })
          })
        });
        }
    }
  }
  
  //ADG