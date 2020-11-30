const Discord = require("discord.js");
const os = require("os");
const config = require('../config.json')

module.exports.run = async (client, message, args) => {

  let totalSeconds = client.uptime / 1000;
  let days = Math.floor(totalSeconds / 86400);
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;  
  let modelo = os.cpus().map((i) => `${i.model}`)[0]

  const promises = [
    client.shard.fetchClientValues('users.cache.size'),
    client.shard.fetchClientValues('guilds.cache.size'),
    client.shard.fetchClientValues('channels.cache.size'),
];

Promise.all(promises).then(async results => {
    const totalUsers = results[0].reduce((prev, userCount) => prev + userCount, 0);
    const totalGuilds = results[1].reduce((prev, guildCount) => prev + guildCount, 0);
    const totalCanais = results[2].reduce((prev, channelCount) => prev + channelCount, 0);


  const botinfo = new Discord.MessageEmbed()
  .setAuthor('Minhas Informações')
  .setThumbnail(client.user.displayAvatarURL())
  .setColor(config.color)
  .addField('<:botdeveloper:763739544549326899>┃Criadores', `\`ADG#2020, Davi Patricio#0001, BONEE#9999, </Etinho>#5672\``)
  .addField(`<:staff:763739862360653864>┃Servidores`,`\`${totalGuilds}\``)
  .addField('<:stafftools:770038834922389524>┃Canais', `\`${totalCanais}\``)
  .addField(`<:panda:754744551176011826>┃Usuários`, `\`${totalUsers}\``)
  .addField(`<:gaming_keyboard:770039079969882122>┃Memória RAM`,`\`${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)}MB de 1024MB\``)
  .addField(`💻┃CPU`, `\`${(process.cpuUsage().system / 1024 / 1024).toFixed(2)}% de CPU\``)
  .addField(`<:cpu:770039330398797834>┃Processador`, `\`${modelo}\``)
  .addField(`<:discord:770039545067995136>┃Ping`,`\`Latência do Servidor: ${Date.now()-message.createdTimestamp}ms\nLatência da API: ${client.ws.ping}ms\``)
  .addField('<:relogio:763736359822819338>┃Tempo de Atividade', `\`${days.toFixed()} dias ${hours.toFixed()} horas ${minutes.toFixed()} minutos ${seconds.toFixed()} segundos\``)
  .setImage('https://top.gg/api/widget/719524114536333342.png')
  message.channel.send(botinfo)
  })
};
exports.help = {
    name: 'botinfo',
    aliases: ['starinfo'],
    status: 'on'
}