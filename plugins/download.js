const { fetchJson } = require('../lib/functions')
const config = require('../config')
const { cmd, commands } = require('../command')

// FETCH API URL
let baseUrl;
(async () => {
    let baseUrlGet = await fetchJson(`https://raw.githubusercontent.com/prabathLK/PUBLIC-URL-HOST-DB/main/public/url.json`)
    baseUrl = baseUrlGet.api
})();


const yourName = "> 𝗠𝗘𝗧𝗛𝗨_𝗠𝗗";

//twitter dl (x)
cmd({
    pattern: "twitter",
    alias: ["twdl"],
    desc: "download tw videos",
    category: "download",
    react: "🔎",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("give me twitter url")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/twitterdl?url=${q}`)
        reply("*Downloading...*")
        //send video (hd,sd)
        await conn.sendMessage(from, { video: { url: data.data.data.HD }, mimetype: "video/mp4", caption: `- HD\n\n ${yourName}` }, { quoted: mek })
        await conn.sendMessage(from, { video: { url: data.data.data.SD }, mimetype: "video/mp4", caption: `- SD \n\n ${yourName}` }, { quoted: mek })  
        //send audio    
        await conn.sendMessage(from, { audio: { url: data.data.data.audio }, mimetype: "audio/mpeg" }, { quoted: mek })  
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

//gdrive(google drive) dl
cmd({
    pattern: "gdrive",
    alias: ["googledrive"],
    desc: "download gdrive files",
    category: "download",
    react: "🔎",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("give me gdrive url")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/gdrivedl?url=${q}`)
        reply("*Downloading...*")
        await conn.sendMessage(from, { document: { url: data.data.download }, fileName: data.data.fileName, mimetype: data.data.mimeType, caption: `${data.data.fileName}\n\n${yourName}` }, { quoted: mek })                                                                                                                 
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

//mediafire dl
cmd({
    pattern: "mediafire",
    alias: ["mfire"],
    desc: "download mfire files",
    category: "download",
    react: "🔎",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("give me mediafire url")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/mediafiredl?url=${q}`)
        reply("*Downloading...*")
        await conn.sendMessage(from, { document: { url: data.data.link_1 }, fileName: data.data.name, mimetype: data.data.file_type, caption: `${data.data.name}\n\n${yourName}` }, { quoted: mek })                                                                                                                 
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})

//facebook dl
cmd({
  'pattern': 'fb',
  'alias': ["facebook"],
  'desc': "Download Facebook videos",
  'category': "download",
  'filename': __filename
}, async (_0x463020, _0x55bd97, _0x368c99, {
  from: _0xd59c39,
  quoted: _0x3054c8,
  body: _0x267a02,
  isCmd: _0x3e2744,
  command: _0x79551a,
  args: _0x1989d2,
  q: _0x32da14,
  isGroup: _0x3f7b6f,
  sender: _0x42116d,
  senderNumber: _0x45dc5e,
  botNumber2: _0x34e464,
  botNumber: _0x461cb9,
  pushname: _0x213d3c,
  isMe: _0x44ce4f,
  isOwner: _0x1feea4,
  groupMetadata: _0x3e49b1,
  groupName: _0x20f33f,
  participants: _0x5d4661,
  groupAdmins: _0x57a821,
  isBotAdmins: _0x122d73,
  isAdmins: _0x1d8749,
  reply: _0x26d68e
}) => {
  try {
    if (!_0x32da14 || !_0x32da14.startsWith("https://")) {
      return _0x463020.sendMessage(_0xd59c39, {
        'text': "*`Need URL`*"
      }, {
        'quoted': _0x55bd97
      });
    }
    await _0x463020.sendMessage(_0xd59c39, {
      'react': {
        'text': '⏳',
        'key': _0x55bd97.key
      }
    });
    const _0xba6170 = await facebook(_0x32da14);
    const _0x8af79d = "╭━━━〔 *⎝⧹ 𝗠𝗘𝗧𝗛𝗨_𝗠𝗗 ⧸⎠* 〕━━━┈⊷\n┃▸╭───────────\n┃▸┃๏ *FB DOWNLOADER*\n┃▸└───────────···๏\n╰────────────────┈⊷\n╭━━━❐━⪼\n┇๏ *Duration* - " + _0xba6170.result.duration + " \n╰━━━❐━⪼\n╭━❮ *Download Video* ❯━┈⊷\n┃▸╭─────────────·๏\n┃▸┃๏ *1.1*     ┃  *SD Quality*\n┃▸┃๏ *1.2*     ┃  *HD Quality*\n┃▸└────────────┈⊷\n╰━━━━━━━━━━━━━━━⪼\n╭━❮ *Download Audio* ❯━┈⊷\n┃▸╭─────────────·๏\n┃▸┃๏ *2.1*     ┃  *Audio*\n┃▸┃๏ *2.2*     ┃  *Document*\n┃▸┃๏ *2.3*     ┃  *Voice*\n┃▸└────────────┈⊷\n╰━━━━━━━━━━━━━━━⪼\n> *© ⎝⧹ 𝗠𝗘𝗧𝗛𝗨_𝗠𝗗 ⧸⎠♡*";
    const _0x1e4914 = await _0x463020.sendMessage(_0xd59c39, {
      'image': {
        'url': _0xba6170.result.thumbnail
      },
      'caption': _0x8af79d
    }, {
      'quoted': _0x55bd97
    });
    const _0x304402 = _0x1e4914.key.id;
    _0x463020.ev.on("messages.upsert", async _0x1fb420 => {
      const _0x3ddaca = _0x1fb420.messages[0x0];
      if (!_0x3ddaca.message) {
        return;
      }
      const _0x56b3d7 = _0x3ddaca.message.conversation || _0x3ddaca.message.extendedTextMessage?.['text'];
      const _0x138ae5 = _0x3ddaca.key.remoteJid;
      const _0x188836 = _0x3ddaca.message.extendedTextMessage && _0x3ddaca.message.extendedTextMessage.contextInfo.stanzaId === _0x304402;
      if (_0x188836) {
        await _0x463020.sendMessage(_0x138ae5, {
          'react': {
            'text': '⬇️',
            'key': _0x3ddaca.key
          }
        });
        let _0x3f9d82 = _0xba6170.result;
        await _0x463020.sendMessage(_0x138ae5, {
          'react': {
            'text': '⬆️',
            'key': _0x3ddaca.key
          }
        });
        if (_0x56b3d7 === "1.1") {
          await _0x463020.sendMessage(_0x138ae5, {
            'video': {
              'url': _0x3f9d82.links.SD
            },
            'caption': "*©⎝⧹ 𝗠𝗘𝗧𝗛𝗨_𝗠𝗗 ⧸⎠*"
          }, {
            'quoted': _0x3ddaca
          });
        } else {
          if (_0x56b3d7 === "1.2") {
            await _0x463020.sendMessage(_0x138ae5, {
              'video': {
                'url': _0x3f9d82.links.HD
              },
              'caption': "*©⎝⧹ 𝗠𝗘𝗧𝗛𝗨_𝗠𝗗 ⧸⎠*"
            }, {
              'quoted': _0x3ddaca
            });
          } else {
            if (_0x56b3d7 === '2.1') {
              await _0x463020.sendMessage(_0x138ae5, {
                'audio': {
                  'url': _0x3f9d82.links.SD
                },
                'mimetype': "audio/mpeg"
              }, {
                'quoted': _0x3ddaca
              });
            } else {
              if (_0x56b3d7 === '2.2') {
                await _0x463020.sendMessage(_0x138ae5, {
                  'document': {
                    'url': _0x3f9d82.links.SD
                  },
                  'mimetype': "audio/mpeg",
                  'fileName': "SPARK/FBDL.mp3",
                  'caption': "*©⎝⧹ 𝗠𝗘𝗧𝗛𝗨_𝗠𝗗 ⧸⎠*"
                }, {
                  'quoted': _0x3ddaca
                });
              } else if (_0x56b3d7 === '2.3') {
                await _0x463020.sendMessage(_0x138ae5, {
                  'audio': {
                    'url': _0x3f9d82.links.SD
                  },
                  'mimetype': "audio/mp4",
                  'ptt': true
                }, {
                  'quoted': _0x3ddaca
                });
              }
            }
          }
        }
      }
    });
  } catch (_0x536e30) {
    console.log(_0x536e30);
    _0x26d68e('' + _0x536e30);
  }
});
