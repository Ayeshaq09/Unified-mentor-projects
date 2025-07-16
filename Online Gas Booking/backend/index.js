require('dotenv').config({ path: __dirname +'/.env.local' });
const db = require('./firebaseDb');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users.js'));
app.use('/api/booking', require('./routes/booking.js'));
app.use('/api/settings', require('./routes/settings.js'));
app.use('/api/notices', require('./routes/notices.js'));

app.listen(port, () => {
  console.log(`Online gas booking app listening on port ${port}`);
});

