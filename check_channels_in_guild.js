import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const GUILD_ID = '543110414246871052'; // From check_bot.js

async function checkChannels() {
  try {
    const res = await axios.get(`https://discord.com/api/v10/guilds/${GUILD_ID}/channels`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    console.log(`Found ${res.data.length} channels in guild:`);
    res.data.forEach(c => console.log(` - ${c.name} (ID: ${c.id})`));
  } catch (err) {
    console.error("Failed to fetch channels:", err.response?.data || err.message);
  }
}

checkChannels();
