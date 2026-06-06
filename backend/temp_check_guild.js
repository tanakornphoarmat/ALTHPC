import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

async function getGuildId() {
  try {
    const res = await axios.get('https://discord.com/api/v10/channels/'+process.env.CHANNEL_ID, {
      headers: { Authorization: 'Bot ' + process.env.DISCORD_BOT_TOKEN }
    });
    console.log('Guild ID:', res.data.guild_id);
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
}
getGuildId();
