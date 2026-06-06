import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

async function checkBot() {
  try {
    console.log("Checking Bot Status...");
    const me = await axios.get('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    console.log(`Logged in as: ${me.data.username}#${me.data.discriminator}`);

    const guilds = await axios.get('https://discord.com/api/v10/users/@me/guilds', {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    console.log(`Bot is in ${guilds.data.length} servers:`);
    guilds.data.forEach(g => console.log(` - ${g.name} (ID: ${g.id})`));

  } catch (err) {
    console.error("Diagnostic Failed:", err.response?.data || err.message);
  }
}

checkBot();
