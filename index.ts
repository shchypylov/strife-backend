const express = require("express");
const port = process.env.port || 3000;
const app = express();
const cors = require('cors')

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
    res.status(200).send(strifes)
})

app.listen(port, () => {
    console.log('running just fine');
})