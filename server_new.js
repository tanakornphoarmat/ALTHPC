import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { 
  Client, 
  GatewayIntentBits, 
  ActionRowBuilder, 
  StringSelectMenuBuilder, 
  StringSelectMenuOptionBuilder, 
  Events, 
  EmbedBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  MessageFlags
} from 'discord.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Schemas & Models
const DataSchema = new mongoose.Schema({
  type: String,
  data: mongoose.Schema.Types.Mixed
});
const DataModel = mongoose.model('Data', DataSchema);

// Helper to update MongoDB
const updateData = async (type, newData) => {
  let doc = await DataModel.findOne({ type });
  if (!doc) {
    doc = new DataModel({ type, data: [] });
  }

  if (type === 'slides') {
    doc.data = newData;
  } else {
    // Assuming array structure for news, partners, tournaments, guides, videos
    if (!Array.isArray(doc.data)) doc.data = [];
    doc.data.unshift(newData);
    if (doc.data.length > 8) {
      doc.data = doc.data.slice(0, 8);
    }
  }
  await doc.save();
};

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// --- Command Handlers (omitted for brevity, keep same as before but use updateData) ---
// ... (I will keep the existing handlers in the next step to not lose them)

// --- API Endpoints ---
app.get('/api/:type', async (req, res) => {
  try {
    const doc = await DataModel.findOne({ type: req.params.type });
    res.json(doc ? doc.data : []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Discord Bridge Server running on port ${PORT}`);
  client.login(DISCORD_BOT_TOKEN);
});
