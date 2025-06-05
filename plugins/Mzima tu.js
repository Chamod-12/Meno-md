const { cmd, commands } = require('../command');
const axios = require('axios');

const searchXVideos = async (query) => {
  const searchUrl = `https://apis-keith.vercel.app/search/searchxvideos?q=${encodeURIComponent(query)}`;
  const response = await axios.get(searchUrl);
  return response.data;
};

const downloadXVideo = async (url) => {
  const downloadUrl = `https://apis-keith.vercel.app/download/porn?url=${encodeURIComponent(url)}`;
  const response = await axios.get(downloadUrl);
  return response.data;
};

cmd({
  pattern: 'porn',
  alias: ['xvideos', 'xporn'],
  desc: 'Search and download adult videos from XVideos',
  category: 'adult',
  filename: __filename,
}, async (client, message, { from, quoted, q, reply }) => {
  try {
    if (!q) {
      return reply('❌ Please enter a keyword. Example: .porn mia khalifa');
    }

    // Send searching reaction
    await client.sendMessage(from, { react: { text: '🔍', key: message.key } });

    // Search for videos
    const searchResult = await searchXVideos(q);
    if (!searchResult.status || !searchResult.result || !searchResult.result[0]) {
      return reply('❌ No videos found for that keyword.');
    }

    // Get the first video's URL and fetch download options
    const videoUrl = searchResult.result[0].url;
    const downloadResult = await downloadXVideo(videoUrl);
    if (!downloadResult.status || !downloadResult.result) {
      return reply('⚠️ Failed to retrieve video. Please try again.');
    }

    const { videoInfo: { title, thumbnail, duration }, downloads } = downloadResult.result;
    const durationText = `${Math.floor(duration / 60)} min ${duration % 60} sec`;

    // Send video options
    const optionsMessage = `
╭════ 〔 *𝐒𝐈𝐋𝐄𝐍𝐓-𝐌𝐃* 〕═══❐
┃▸ *Title:* ${title}
┃▸ *Duration:* ${durationText}
┃▸ *Download Options:*
📹 *Video Options:*
1️⃣  *Low Quality*
2️⃣  *High Quality*
🎵 *Audio Options:*
3️⃣  *Audio*
4️⃣  *Document*
5️⃣  *Voice*
╰═════════════════❐

📌 *Reply with the number to download your choice.*
🔗 *Join our channel:* *https://tinyurl.com/26kh6jss*
> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐒𝐈𝐋𝐄𝐍𝐓-𝐌𝐃
    `;
    const sentMessage = await client.sendMessage(from, {
      image: { url: thumbnail },
      caption: optionsMessage,
    }, { quoted: message });

    const messageId = sentMessage.key.id;

    // Listen for user reply to select an option
    client.ev.on('messages.upsert', async ({ messages }) => {
      const msg = messages[0];
      if (!msg.message) return;

      const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
      const chatId = msg.key.remoteJid;
      const isReplyToOptions = msg.message.extendedTextMessage?.contextInfo?.stanzaId === messageId;

      if (isReplyToOptions) {
        // Send downloading reaction
        await client.sendMessage(chatId, { react: { text: '⬇️', key: msg.key } });

        switch (text) {
          case '1': // Low Quality Video
            await client.sendMessage(chatId, {
              video: { url: downloads.lowQuality },
              caption: '📥 *Downloaded in Low Quality*',
            }, { quoted: msg });
            break;

          case '2': // High Quality Video
            await client.sendMessage(chatId, {
              video: { url: downloads.highQuality },
              caption: '📥 *Downloaded in High Quality*',
            }, { quoted: msg });
            break;

          case '3': // Audio
            await client.sendMessage(chatId, {
              audio: { url: downloads.lowQuality },
              mimetype: 'audio/mpeg',
            }, { quoted: msg });
            break;

          case '4': // Document
            await client.sendMessage(chatId, {
              document: { url: downloads.lowQuality },
              mimetype: 'audio/mpeg',
              fileName: 'XVideos_Audio.mp3',
              caption: '📥 *Audio Downloaded as Document*',
            }, { quoted: msg });
            break;

          case '5': // Voice
            await client.sendMessage(chatId, {
              audio: { url: downloads.lowQuality },
              mimetype: 'audio/mp4',
              ptt: true,
            }, { quoted: msg });
            break;

          default:
            reply('❌ Invalid option! Please reply with 1, 2, 3, 4, or 5.');
        }
      }
    });
  } catch (error) {
    console.error('Error:', error);
    reply('❌ An error occurred while processing your request. Please try again.');
  }
});
