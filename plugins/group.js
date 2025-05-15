const { cmd } = require('../command');

// Tag All
cmd({
    pattern: 'tagall',
    desc: 'Mention all members in the group',
    category: 'group',
    filename: __filename
}, async (conn, mek, m, { isGroup, participants, reply, isAdmins, isBotAdmins }) => {
    if (!isGroup) return reply('🧛‍♂️ මේක group එකක විතරයි!');
    if (!isAdmins) return reply('⚠️ ඔයා admin නෙමෙයි!');
    if (!isBotAdmins) return reply('⚠️ මම admin නෙමෙයි!');

    let text = '🧛‍♂️ *Group Members List*\n\n';
    for (let member of participants) {
        text += `👤 @${member.id.split('@')[0]}\n`;
    }
    await conn.sendMessage(mek.chat, { text, mentions: participants.map(p => p.id) }, { quoted: mek });
});

// Group Open
cmd({
    pattern: 'group open',
    desc: 'Open the group (anyone can send messages)',
    category: 'group',
    filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, reply }) => {
    if (!isGroup) return reply('🧛‍♂️ මේක group එකක් විතරයි!');
    if (!isAdmins) return reply('⚠️ ඔයා admin නෙමෙයි!');
    if (!isBotAdmins) return reply('⚠️ මම admin නෙමෙයි!');

    await conn.groupSettingUpdate(mek.chat, 'not_announcement');
    reply('✅ Group open කරන ලදී!');
});

// Group Close
cmd({
    pattern: 'group close',
    desc: 'Close the group (only admins can send messages)',
    category: 'group',
    filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, reply }) => {
    if (!isGroup) return reply('🧛‍♂️ මේක group එකක් විතරයි!');
    if (!isAdmins) return reply('⚠️ ඔයා admin නෙමෙයි!');
    if (!isBotAdmins) return reply('⚠️ මම admin නෙමෙයි!');

    await conn.groupSettingUpdate(mek.chat, 'announcement');
    reply('🔒 Group close කරන ලදී!');
});

// Kick User
cmd({
    pattern: 'kick',
    desc: 'Remove user from group',
    category: 'group',
    filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, reply, args, mentionedJid }) => {
    if (!isGroup) return reply('🧛‍♂️ මේක group එකක් විතරයි!');
    if (!isAdmins) return reply('⚠️ ඔයා admin නෙමෙයි!');
    if (!isBotAdmins) return reply('⚠️ මම admin නෙමෙයි!');
    if (!mentionedJid[0]) return reply('⚠️ @mention එකක් දෙන්න!');

    await conn.groupParticipantsUpdate(mek.chat, [mentionedJid[0]], 'remove');
    reply('✅ Member එක group එකෙන් ඉවත් කළා.');
});

// Promote
cmd({
    pattern: 'promote',
    desc: 'Make a member admin',
    category: 'group',
    filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, reply, mentionedJid }) => {
    if (!isGroup) return reply('🧛‍♂️ මේක group එකක් විතරයි!');
    if (!isAdmins) return reply('⚠️ ඔයා admin නෙමෙයි!');
    if (!isBotAdmins) return reply('⚠️ මම admin නෙමෙයි!');
    if (!mentionedJid[0]) return reply('⚠️ @mention එකක් දෙන්න!');

    await conn.groupParticipantsUpdate(mek.chat, [mentionedJid[0]], 'promote');
    reply('✅ Member එක admin කරන ලදී.');
});

// Demote
cmd({
    pattern: 'demote',
    desc: 'Remove a member from admin',
    category: 'group',
    filename: __filename
}, async (conn, mek, m, { isGroup, isAdmins, isBotAdmins, reply, mentionedJid }) => {
    if (!isGroup) return reply('🧛‍♂️ මේක group එකක් විතරයි!');
    if (!isAdmins) return reply('⚠️ ඔයා admin නෙමෙයි!');
    if (!isBotAdmins) return reply('⚠️ මම admin නෙමෙයි!');
    if (!mentionedJid[0]) return reply('⚠️ @mention එකක් දෙන්න!');

    await conn.groupParticipantsUpdate(mek.chat, [mentionedJid[0]], 'demote');
    reply('✅ Member එක admin status ඉවත් කළා.');
});
