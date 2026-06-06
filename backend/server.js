import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs/promises';
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
const DATA_FILE = './data.json';

app.use(cors());
app.use(express.json());

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Helper to update data.json
const updateData = async (type, newData) => {
  const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
  if (type === 'slides') {
    data.slides = newData;
  } else if (data[type]) {
    data[type].unshift(newData);
    if (data[type].length > 8) {
      data[type] = data[type].slice(0, 8);
    }
  }
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
};

client.once(Events.ClientReady, c => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

// --- Command Handler ---
client.on(Events.MessageCreate, async message => {
  if (message.content === '!manage') {
    const embed = new EmbedBuilder()
      .setColor('#FF4E1D')
      .setTitle('🛠 ALTH WEBSITE ADMINISTRATION')
      .setDescription('เลือกรายการที่คุณต้องการแก้ไข:\n\n📸 **Slider:** อัปเดตสไลด์หน้าแรก\n📰 **News:** อัปเดตข่าว\n🤝 **Partners:** อัปเดตพัธมิตร\n🎬 **Videos:** อัปเดตวิดีโอ\n📖 **Guides:** อัปเดตคู่มือ/Meta\n🏆 **Tournaments:** เพิ่มตารางแข่ง\n\n📏 **ขนาดรูปแนะนำ**\nSlider: 1920x1080px\nNews Cover: 800x450px');

    const select = new StringSelectMenuBuilder()
      .setCustomId('admin_menu')
      .setPlaceholder('เลือกรายการ...')
      .addOptions(
        new StringSelectMenuOptionBuilder().setLabel('เปลี่ยนรูปสไลด์').setValue('open_slider_modal'),
        new StringSelectMenuOptionBuilder().setLabel('อัปเดตเกม').setValue('news_modal_GAME'),
        new StringSelectMenuOptionBuilder().setLabel('อีสปอร์ตไทย').setValue('news_modal_ESPORTS'),
        new StringSelectMenuOptionBuilder().setLabel('กิจกรรมพิเศษ').setValue('news_modal_EVENT'),
        new StringSelectMenuOptionBuilder().setLabel('เพิ่มพัธมิตร').setValue('news_modal_PARTNER'),
        new StringSelectMenuOptionBuilder().setLabel('อัปเดตวิดีโอ').setValue('open_video_modal'),
        new StringSelectMenuOptionBuilder().setLabel('อัปเดตคู่มือ (GUIDES)').setValue('open_guide_modal'),
        new StringSelectMenuOptionBuilder().setLabel('เพิ่มตารางแข่ง').setValue('open_tournament_modal'),
        new StringSelectMenuOptionBuilder().setLabel('ลบพัธมิตร').setValue('delete_partner_list'),
      );

    await message.reply({ embeds: [embed], components: [new ActionRowBuilder().addComponents(select)] });
  }
});

// --- Interaction Handler ---
client.on(Events.InteractionCreate, async interaction => {
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'admin_menu') {
      const selection = interaction.values[0];
      
      // Send a preview message before opening the modal
      if (selection === 'open_slider_modal') {
        // We cannot reply AND show a modal in the same interaction.
        // Opening the modal directly to fix the 'InteractionAlreadyReplied' error.
        await openSliderModal(interaction);
      } else if (selection === 'open_video_modal') {
        await openVideoModal(interaction);
      } else if (selection === 'open_guide_modal') {
        await openGuideModal(interaction);
      } else if (selection === 'open_tournament_modal') {
        await openTournamentModal(interaction);
      } else if (selection === 'news_modal_PARTNER') {
        await openPartnerModal(interaction);
      } else if (selection === 'delete_partner_list') {
        await showDeletePartnerList(interaction);
      } else if (selection.startsWith('delete_partner_')) {
        await deletePartner(interaction, selection.replace('delete_partner_', ''));
      } else if (selection.startsWith('news_modal_')) {
        await openNewsModal(interaction, selection.replace('news_modal_', ''));
      }
    }
  }

  if (interaction.isModalSubmit()) {
    if (interaction.customId === 'video_modal') {
      const newVideos = [];
      for (let i = 1; i <= 5; i++) {
        const url = interaction.fields.getTextInputValue(`video_url_${i}`);
        if (url) newVideos.push({ id: i, url: url, title: `Highlight ${i}` });
      }
      const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
      data.videos = newVideos;
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      await interaction.reply({ content: `✅ **อัปเดตวิดีโอสำเร็จ!**`, flags: MessageFlags.Ephemeral });
    } else if (interaction.customId === 'tournament_modal') {
      await updateData('tournaments', {
        id: Date.now().toString(),
        name: interaction.fields.getTextInputValue('tournament_name'),
        date: interaction.fields.getTextInputValue('tournament_date'),
        details: interaction.fields.getTextInputValue('tournament_details'),
        link: interaction.fields.getTextInputValue('tournament_link'),
        createdAt: new Date().toISOString()
      });
      await interaction.reply({ content: `✅ **เพิ่มรายการแข่งสำเร็จ!**`, flags: MessageFlags.Ephemeral });
    } else if (interaction.customId === 'guide_modal') {
      await updateData('guides', {
        id: Date.now().toString(),
        title: interaction.fields.getTextInputValue('guide_title'),
        content: interaction.fields.getTextInputValue('guide_content'),
        image: interaction.fields.getTextInputValue('guide_image'),
        date: new Date().toISOString()
      });
      await interaction.reply({ content: `✅ **เพิ่มคู่มือสำเร็จ!**`, flags: MessageFlags.Ephemeral });
    } else if (interaction.customId === 'slider_modal_v4') {
      const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
      const newSlides = [
        { url: interaction.fields.getTextInputValue('slider_url_1') || data.slides[0]?.url || "", title: 'SLIDER 1' },
        { url: interaction.fields.getTextInputValue('slider_url_2') || data.slides[1]?.url || "", title: 'SLIDER 2' },
        { url: interaction.fields.getTextInputValue('slider_url_3') || data.slides[2]?.url || "", title: 'SLIDER 3' }
      ];
      data.slides = newSlides;
      await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
      await interaction.reply({ content: `✅ **อัปเดตสไลด์สำเร็จ!**`, flags: MessageFlags.Ephemeral });
    } else if (interaction.customId === 'partner_modal') {
      const fbIgInput = interaction.fields.getTextInputValue('partner_name') ? "" : interaction.fields.getTextInputValue('partner_fb_ig') || "";
      const tiktokYtInput = interaction.fields.getTextInputValue('partner_tiktok_yt') || "";
      const dcInput = interaction.fields.getTextInputValue('partner_dc') || "";
      
      // แยกข้อมูลโดยใช้ , และลบช่องว่างส่วนเกิน
      const socials = [
        ...fbIgInput.split(',').map(s => s.trim()),
        ...tiktokYtInput.split(',').map(s => s.trim()),
        ...dcInput.split(',').map(s => s.trim())
      ].filter(Boolean);

      await updateData('partners', {
        id: Date.now().toString(),
        name: interaction.fields.getTextInputValue('partner_name'),
        image: interaction.fields.getTextInputValue('partner_image'),
        socialsList: socials,
        date: new Date().toISOString()
      });

      await interaction.reply({ content: `✅ **เพิ่มพัธมิตร "${interaction.fields.getTextInputValue('partner_name')}" สำเร็จ!**`, flags: MessageFlags.Ephemeral });
    } else if (interaction.customId.startsWith('news_modal_')) {
      await updateData('news', {
        id: Date.now().toString(),
        title: interaction.fields.getTextInputValue('news_title'),
        content: interaction.fields.getTextInputValue('news_content'),
        image: interaction.fields.getTextInputValue('news_image'),
        links: [interaction.fields.getTextInputValue('news_link1'), interaction.fields.getTextInputValue('news_link2')].filter(Boolean),
        category: interaction.customId.replace('news_modal_', ''),
        date: new Date().toISOString()
      });
      await interaction.reply({ content: `✅ **ลงข่าวสำเร็จ!**`, flags: MessageFlags.Ephemeral });
    }
  }
});

// --- Helpers ---
const openNewsModal = async (interaction, category) => {
  const modal = new ModalBuilder().setCustomId(`news_modal_${category}`).setTitle(`ลงข่าว: ${category}`);
  modal.addComponents(
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('news_title').setLabel("หัวข้อข่าว").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('news_content').setStyle(TextInputStyle.Paragraph).setLabel("รายละเอียดข่าว").setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('news_image').setLabel("URL รูปหน้าปก").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('news_link1').setLabel("ลิงก์ที่ 1").setStyle(TextInputStyle.Short).setRequired(false)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('news_link2').setLabel("ลิงก์ที่ 2").setStyle(TextInputStyle.Short).setRequired(false))
  );
  await interaction.showModal(modal);
};

const openPartnerModal = async (interaction) => {
  const modal = new ModalBuilder().setCustomId('partner_modal').setTitle('ลงทะเบียนพัธมิตรใหม่');
  modal.addComponents(
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('partner_name').setLabel("ชื่อพัธมิตร").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('partner_image').setLabel("URL รูปโลโก้").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('partner_fb_ig').setLabel("FB และ IG (คั่นด้วย ,)").setStyle(TextInputStyle.Short).setRequired(false)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('partner_tiktok_yt').setLabel("TikTok และ YT (คั่นด้วย ,)").setStyle(TextInputStyle.Short).setRequired(false)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('partner_dc').setLabel("Discord").setStyle(TextInputStyle.Short).setRequired(false))
  );
  await interaction.showModal(modal);
};

const openGuideModal = async (interaction) => {
  const modal = new ModalBuilder().setCustomId('guide_modal').setTitle('ลงทะเบียนคู่มือใหม่');
  modal.addComponents(
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('guide_title').setLabel("หัวข้อคู่มือ").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('guide_content').setLabel("เนื้อหาคู่มือ").setStyle(TextInputStyle.Paragraph).setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('guide_image').setLabel("URL รูปหน้าปก").setStyle(TextInputStyle.Short).setRequired(true))
  );
  await interaction.showModal(modal);
};

const openTournamentModal = async (interaction) => {
  const modal = new ModalBuilder().setCustomId('tournament_modal').setTitle('เพิ่มรายการแข่งขันใหม่');
  modal.addComponents(
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tournament_name').setLabel("ชื่อรายการแข่งขัน").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tournament_date').setLabel("วันที่/เวลา").setStyle(TextInputStyle.Short).setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tournament_details').setLabel("รายละเอียด").setStyle(TextInputStyle.Paragraph).setRequired(true)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('tournament_link').setLabel("ลิงก์สมัคร/ข้อมูลเพิ่มเติม").setStyle(TextInputStyle.Short).setRequired(false))
  );
  await interaction.showModal(modal);
};

const openSliderModal = async (interaction) => {
  const modal = new ModalBuilder().setCustomId('slider_modal_v4').setTitle('อัปเดตสไลด์');
  modal.addComponents(
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('slider_url_1').setLabel("URL รูปภาพที่ 1").setStyle(TextInputStyle.Short).setRequired(false)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('slider_url_2').setLabel("URL รูปภาพที่ 2").setStyle(TextInputStyle.Short).setRequired(false)),
    new ActionRowBuilder().addComponents(new TextInputBuilder().setCustomId('slider_url_3').setLabel("URL รูปภาพที่ 3").setStyle(TextInputStyle.Short).setRequired(false))
  );
  await interaction.showModal(modal);
};

const openVideoModal = async (interaction) => {
  const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
  const videos = data.videos || [];
  const modal = new ModalBuilder().setCustomId('video_modal').setTitle('อัปเดตวิดีโอ (สูงสุด 5 ลิงก์)');
  const inputs = [];
  for (let i = 0; i < 5; i++) {
    inputs.push(new TextInputBuilder().setCustomId(`video_url_${i + 1}`).setLabel(`URL วิดีโอที่ ${i + 1}`).setStyle(TextInputStyle.Short).setValue(videos[i]?.url || "").setRequired(false));
  }
  modal.addComponents(inputs.map(i => new ActionRowBuilder().addComponents(i)));
  await interaction.showModal(modal);
};

const showDeletePartnerList = async (interaction) => {
  const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
  if (data.partners.length === 0) {
    await interaction.reply({ content: '❌ ไม่พบข้อมูลพัธมิตร', flags: MessageFlags.Ephemeral });
    return;
  }
  const select = new StringSelectMenuBuilder()
    .setCustomId('admin_menu')
    .setPlaceholder('เลือกพัธมิตรที่ต้องการลบ...')
    .addOptions(data.partners.map(p => new StringSelectMenuOptionBuilder().setLabel(p.name).setValue(`delete_partner_${p.id}`)));
  await interaction.reply({ content: '🗑️ เลือกพัธมิตรที่ต้องการลบ:', components: [new ActionRowBuilder().addComponents(select)], flags: MessageFlags.Ephemeral });
};

const deletePartner = async (interaction, partnerId) => {
  const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
  const partnerIndex = data.partners.findIndex(p => p.id === partnerId);
  if (partnerIndex === -1) {
    await interaction.reply({ content: '❌ ไม่พบพัธมิตรดังกล่าว', flags: MessageFlags.Ephemeral });
    return;
  }
  data.partners.splice(partnerIndex, 1);
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
  await interaction.reply({ content: `✅ ลบพัธมิตรเรียบร้อยแล้ว`, flags: MessageFlags.Ephemeral });
};

// --- API Endpoints ---
app.get('/api/:type', async (req, res) => {
  try {
    const data = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8'));
    res.json(data[req.params.type] || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(PORT, () => {
  console.log(`Discord Bridge Server running on port ${PORT}`);
  client.login(DISCORD_BOT_TOKEN);
});

process.on('SIGINT', () => { client.destroy(); process.exit(0); });
process.on('SIGTERM', () => { client.destroy(); process.exit(0); });
