const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const channel1Id = '-1002031134343'; // Telegram channel ID
const channel3Id = '-1002214181486'; // Telegram channel ID
const channel4Name = '🌍 Barcha kinolar olami 🌍';
const channel4Id = 'https://t.me/Kinolarkanali21';

// Handle /start command
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;

    // Replace with your channel URLs and names
    const channel1Id = 'https://t.me/Kinolarkanali21'; // Proper URL for Telegram channel
    const channel2Id = 'https://t.me/BMW1kanli'; // Proper URL for Telegram channel
    const channel3Id = 'https://www.instagram.com/kinolarkanali21/'; // Proper URL for Instagram
    const channel1Name = 'Kinolar Kanali 🌍';
    const channel2Name = 'BMW 🌍';
    const channel3Name = 'Intagram 🌍';

    // Keyboard markup
    const keyboard = {
        reply_markup: {
            inline_keyboard: [
                [{ text: channel1Name, url: `${channel1Id}` }],
                [{ text: channel2Name, url: `${channel2Id}` }],
                [{ text: channel3Name, url: `${channel3Id}` }],
                [{ text: `Obuna bo'ldim ✅`, callback_data: 'check_subscriptions' }]
            ]
        }
    };

    // Send message with channels and button
    bot.sendMessage(chatId, "🌍🌍 Kanallarga obuna bo'ling ✅", keyboard);
});

// Handle button press
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const userId = query.from.id;

    if (query.data === 'check_subscriptions') {
        try {
            // Check if user is a member of the channels concurrently
            const [member1, member3] = await Promise.all([
                bot.getChatMember(channel1Id, userId),
                bot.getChatMember(channel3Id, userId)
            ]);

            const isMember1 = member1.status === 'member' || member1.status === 'administrator';
            const isMember3 = member3.status === 'member' || member3.status === 'administrator';

            if (isMember1 && isMember3) {
                // User is subscribed to both channels, send a different message or perform other actions
                const keyboard2 = {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: channel4Name, url: `${channel4Id}` }]
                        ]
                    }
                };
                await bot.sendMessage(chatId, '✅Kinoni kodini shu yerga kirib qidiruv qismiga yozing👇👇👇👇👇👇👇👇👇👇', keyboard2);
            } else {
                // User is not subscribed to both channels, display the original keyboard
                const keyboard = {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Kinolar Kanali 🌍', url: 'https://t.me/Kinolarkanali21' }],
                            [{ text: 'BMW 🌍', url: 'https://t.me/BMW1kanli' }],
                            [{ text: 'Intagram 🌍', url: 'https://www.instagram.com/kinolarkanali21/' }],
                            [{ text: `Obuna bo'ldim ✅`, callback_data: 'check_subscriptions' }]
                        ]
                    }
                };
                await bot.sendMessage(chatId, "❌ Siz kanallarga obuna bo'lmagansiz kanallarga obuna bo'ling❗", keyboard);
            }
        } catch (error) {
            console.error('Error checking subscriptions:', error);
            bot.sendMessage(chatId, "❌ Xato yuz berdi. Iltimos, keyinroq qayta urinib ko'ring.");
        }
    }
});
