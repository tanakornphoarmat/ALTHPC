import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

async function checkChannel() {
  try {
    console.log(`Checking Channel ID: ${CHANNEL_ID}...`);
    const res = await axios.get(`https://discord.com/api/v10/channels/${CHANNEL_ID}`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    console.log(`Found Channel: ${res.data.name} (Type: ${res.data.type})`);
  } catch (err) {
    console.error("Channel Check Failed:", err.response?.data || err.message);
  }
}

checkChannel();
