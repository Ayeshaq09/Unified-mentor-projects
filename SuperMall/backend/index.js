require('dotenv').config({ path: __dirname +'/.env.local' });
const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: "http://localhost:3000",  
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "auth-token"],
}));
app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/product', require('./routes/product.js'));
app.use('/api/shop', require('./routes/shop.js'));
app.use('/api/category', require('./routes/category.js'));
app.use('/api/floor', require('./routes/floor.js'));
app.use('/api/offer', require('./routes/offer.js'));

app.listen(port, () => {
    console.log(`Super Mall running on port ${port}`);
});

app.get('/', (req,res) => {
    res.send("Super Mall server running!");
})

