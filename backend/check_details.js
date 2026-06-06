import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CHANNEL_ID = process.env.CHANNEL_ID;

async function checkDetails() {
  try {
    const res = await axios.get(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages?limit=5`, {
      headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
    });
    
    console.log(`Found ${res.data.length} messages.`);
    res.data.forEach((msg, i) => {
      console.log(`--- Message ${i+1} ---`);
      console.log(`Content: ${msg.content}`);
      console.log(`Attachments: ${msg.attachments.length}`);
      msg.attachments.forEach(att => console.log(` - URL: ${att.url}`));
    });
  } catch (err) {
    console.error("Failed:", err.message);
  }
}

checkDetails();
