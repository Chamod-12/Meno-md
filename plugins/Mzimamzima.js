const { cmd, commands } = require('../command');

cmd({
    pattern: "randporn",
    alias: ["randomporn", "randxvideo", "randomxvideos"],
    desc: "Get a random adult video from the HentaiVid API",
    category: "download",
    filename: __filename
}, async (client, message, { from, quoted, reply }) => {
    try {
        // React with 🔍
        await client.sendMessage(from, { react: { text: "🔍", key: message.key } });

        // Fetch data from HentaiVid API
        const response = await fetch('https://apis-keith.vercel.app/dl/hentaivid');
        const data = await response.json();

        // Check if data is valid
        if (!data.result || !data.result.length) return reply("❌ No videos found.");

        // Select random video
        const video = data.result[Math.floor(Math.random() * data.result.length)];
        const { title, link, category, media: { video_url }, views_count } = video;

        // Format message
        const caption = `╭════ 〔 *𝐒𝐈𝐋𝐄𝐍𝐓-𝐌𝐃* 〕══❐\n` +
                       `┃▸ *Title:* ${title}\n` +
                       `┃▸ *Category:* ${category}\n` +
                       `┃▸ *Views:* ${views_count}\n` +
                       `╰═════════\n` +
                       `> ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐒𝐈𝐋𝐄𝐍𝐓-𝐌𝐃\n` +
                       `🔗 *Join our channel:* *https://whatsapp.com/channel/0029Vb69IgXBqbrGn2PrF43M*`;

        // Send video with caption
        const videoMessage = { video: { url: video_url }, caption };
        const sentMessage = await client.sendMessage(from, videoMessage, { quote

        // Listen for reply
        client.ev.on("messages.upsert", async ({ messages }) => {
            const msg = messages[0];
            if (!msg.message) return;

            const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
            const chatId = msg.key.remoteJid;
            const isReplyToVideo = msg.message.extendedTextMessage?.contextInfo?.stanzaId === messageId;

            if (isReplyToVideo) {
                // React with ⬇️
                await client.sendMessage(chatId, { react: { text: "⬇️", key: msg.key } });

                if (text.toLowerCase() === "download") {
                    // Send video again for download
                    await client.sendMessage(chatId, {
                        video: { url: video_url },
                        caption: `📥 *Download your requested video:* ${title}`
                    }, { quoted: msg });
                } else {
                    reply("❌ Invalid option! Please reply with *download* to get the video.");
                }
            }
        });
    } catch (error) {
        console.error("Error:", error);
        reply("❌ An error occurred while processing your request. Please try again.");
    }
});
