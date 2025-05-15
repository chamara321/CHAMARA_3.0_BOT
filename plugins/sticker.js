const { MessageType } = require('@whiskeysockets/baileys');
const fetch = require('node-fetch');  // 'node-fetch' එක install කරන්න
const { getBuffer } = require('../lib/functions'); // Media buffer එකක් ලබා ගන්නා function

module.exports = {
    name: 'sticker',
    description: 'Convert images or videos to stickers.',
    category: 'media',
    async execute(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, reply }) {
        try {
            // පරිශීලකයා පින්තූරයක් හෝ වීඩියෝවක් එවුවා නම්
            if ((m.message.imageMessage || m.message.videoMessage) && !m.isGroup) {
                let mediaType = m.message.imageMessage ? 'image' : 'video';
                let mediaUrl = mediaType === 'image' ? m.message.imageMessage.url : m.message.videoMessage.url;
                let mediaBuffer = await getBuffer(mediaUrl);

                // පින්තූරය හෝ වීඩියෝව sticker එකක් ලෙස පරිවර්තනය කරලා
                let stickerBuffer = await conn.prepareMessage(from, mediaBuffer, MessageType.sticker);
                
                // sticker එක පරිශීලකයාට එවන්න
                await conn.sendMessage(from, stickerBuffer.message, MessageType.sticker);
            } else if (quoted && quoted.message.imageMessage) {
                // quoted පින්තූරයක් හෝ වීඩියෝවක් ඇත්නම්, එය sticker එකක් බවට පරිවර්තනය කරන්න
                let mediaUrl = quoted.message.imageMessage.url;
                let mediaBuffer = await getBuffer(mediaUrl);
                let stickerBuffer = await conn.prepareMessage(from, mediaBuffer, MessageType.sticker);
                
                await conn.sendMessage(from, stickerBuffer.message, MessageType.sticker);
            } else {
                // පින්තූරයක් හෝ වීඩියෝවක් නැත්නම්
                reply("කරුණාකර sticker එකක් ලෙස පරිවර්තනය කිරීමට පින්තූරයක් හෝ වීඩියෝවක් එවන්න.");
            }
        } catch (err) {
            console.log(err);
            reply("sticker එක සාදන්නෙකුට දෝෂයක් ඇතිවුණි.");
        }
    }
};
