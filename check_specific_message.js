import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = '1512436960646664242';
const MESSAGE_ID = '1512482805114998977';

async function getMessage() {
  try {
    const res = await axios.get(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages/${MESSAGE_ID}`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    console.log("Message Content:", res.data.content);
  } catch (err) {
    console.error("Failed to fetch message:", err.response?.data || err.message);
  }
}

getMessage();
