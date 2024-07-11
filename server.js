const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

app.post('/submit-referral', async (req, res) => {
  const { referredCourse, referrerName, referrerId, refereeName,refereeEmail } = req.body;

  try {
    const referral = await prisma.referral.create({
      data: {
        referredCourse,
        referrerName,
        referrerId,
        refereeName,
        refereeEmail,
      },
    });
    res.json({ message: 'Referral submitted successfully', id: referral.id });
  } catch (error) {
    console.error('Error submitting referral:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.get('/referrals', async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.json({ referrals });
  } catch (error) {
    console.error('Error fetching referrals:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
