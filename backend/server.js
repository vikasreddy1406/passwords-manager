const express = require('express')
const connectToMongo = require('./db')
const bodyParser = require('body-parser');
const app = express()
const port = 8000
const Passwords = require('./models/form')
connectToMongo();
const cors = require('cors');
const manager = require('./routes/manager')

app.use(bodyParser.json());
app.use(cors());
// const mongoose = require('mongoose');

// main().catch(err => console.log(err));

// async function main() {
//     await mongoose.connect('mongodb://0.0.0.0:27017/passwords');

// }

app.use('/api/passwords', manager);

app.get('/', (req, res) => {
    // const temp = new Passwords({ website: "www.google.com", username: "vickysai", password: "Sai@123", id: "1234" });
    // console.log(temp);
    // temp.save();
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})