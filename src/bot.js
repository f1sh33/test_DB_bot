require('dotenv').config();
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');
const { or } = require('sequelize/dist');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const db = require('../database/db');
const Song = require('../database/models/song');


client.on('ready', () => {
    console.log("Bot logged in successfully!");
    db.authenticate().then(() => {
        console.log("Database connected!");
        Song.init(db);
        Song.sync();
    }).catch(err => console.log(err));
});

client.on('messageCreate', async (message) => {
    rawMessage = message.content;
    channel = message.channel;
    if (!(message.author.bot)){
        if (rawMessage.includes(" ")){
            args = rawMessage.match(/^(\S+)\s(.*)/).slice(1);

            if (args[0] == "s-sreg"){
                channel.send("<@" + message.author.id + "> đã đăng ký bài ***" + args[1] + "*** !");
                //Viết 1 bài vào database
                Song.create({
                    requestID: message.id,
                    authorId: message.author.id,
                    songName: args[1]
                });
            }

            if (args[0] == "s-listsong"){
                //Đọc tất cả các bài hát từ database
                let all_songs = await Song.findAll();
                payload = ""
                for (song of all_songs){
                    payload += song.dataValues.soThuTu + ". ***" + song.dataValues.songName + "*** do <@" + song.dataValues.authorId + "> yêu cầu!\n"
                }
                channel.send(payload);
            }
        }
        else {
            channel.send("Xin nhập cả tên bài hát!");
        }
    }

});

client.login(process.env.CLIENT_TOKEN);
