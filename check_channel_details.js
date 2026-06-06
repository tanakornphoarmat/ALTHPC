import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = '1512436960646664242';

async function checkChannelDetails() {
  try {
    const res = await axios.get(`https://discord.com/api/v10/channels/${CHANNEL_ID}`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    console.log("Channel Details:", res.data);
  } catch (err) {
    console.error("Failed to fetch channel details:", err.response?.data || err.message);
  }
}

checkChannelDetails();
