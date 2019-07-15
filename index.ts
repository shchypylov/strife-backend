const express = require("express");
const port = process.env.port || 3000;
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fs = require("fs");
const {mongo: {login, password}} = JSON.parse(fs.readFileSync(__dirname + '/data.json'))

mongoose.connect(`mongodb://${login}:${password}@ds151247.mlab.com:51247/strifes`, {useNewUrlParser: true})

const db = mongoose.connection;

const strifeSchema = new mongoose.Schema({
    title: String,
    author: String,
    tags: Array
})
const Strife = mongoose.model('Strife', strifeSchema)

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('db is up');
})
app.use(bodyParser.json())
app.use(cors())

const strifes = [
    {
        id: 1,
        title: 'First strife',
        author: 'Some guy',
        tags: ['Dummy', 'Fun']
    },
    {
        id: 2,
        title: 'Second strife',
        author: 'Some guy',
        tags: ['Dummy', 'Fun']
    },
    {
        id: 3,
        title: 'Third strife',
        author: 'Some guy',
        tags: ['Dummy', 'Fun']
    },
]

app.get('/strifes', (req: any, res: any) => {
    if (req.query.q) {
        const searchInput = req.query.q.toLowerCase();
        const filteredList = strifes.filter(strife => strife.title.toLowerCase().includes(searchInput))
        res.status(200).send(filteredList)
    } else {
        res.status(200).send(strifes)
    }
})

app.post('/strife', (req, res) => {
    console.log(req.body);
    const strife = new Strife(req.body);
    strife.save((err, strife) => {
        if (err) console.error

        console.log('1', strife);
    })
    res.send('nice')    
})

app.listen(port, () => {
    console.log('running just fine');
})