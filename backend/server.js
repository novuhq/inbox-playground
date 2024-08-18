// backend/server.js

const express = require('express');
const { Novu } = require('@novu/node');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const novu = new Novu(process.env.NOVU_SECRET_KEY);

app.post('/api/trigger-notification', async (req, res) => {
    const { subscriberId, payload } = req.body;

    try {
        await novu.trigger('Inbox Demo', {
            to: { subscriberId },
            payload
        });
        res.status(200).json({ message: 'Notification sent successfully!' });
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).json({ error: 'Failed to send notification' });
    }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
