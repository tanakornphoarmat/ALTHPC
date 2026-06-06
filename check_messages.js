import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

async function checkMessages() {
  try {
    console.log(`Attempting to fetch messages from: ${CHANNEL_ID}...`);
    const res = await axios.get(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=1`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    console.log(`Success! Found ${res.data.length} messages.`);
    if (res.data.length > 0) {
      console.log(`Latest Message: "${res.data[0].content}" by ${res.data[0].author.username}`);
    }
  } catch (err) {
    console.error("Message Fetch Failed:", err.response?.data || err.message);
  }
}

checkMessages();
