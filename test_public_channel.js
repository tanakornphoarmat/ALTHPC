import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const TEST_CHANNEL_ID = '1049300868593360906'; // 💬┃ห้องพูดคุยทั่วไป-general

async function testPublicChannel() {
  try {
    console.log(`Attempting to fetch messages from public channel: ${TEST_CHANNEL_ID}...`);
    const res = await axios.get(`https://discord.com/api/v10/channels/${TEST_CHANNEL_ID}/messages?limit=1`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    console.log(`Success! Found ${res.data.length} messages.`);
    if (res.data.length > 0) {
      console.log(`Latest Message: "${res.data[0].content}" by ${res.data[0].author.username}`);
    }
  } catch (err) {
    console.error("Public Channel Fetch Failed:", err.response?.data || err.message);
  }
}

testPublicChannel();
