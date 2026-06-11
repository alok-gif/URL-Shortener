const express = require('express');
const app = express();
const path = require('path');
const connectToDB = require('./connect');
const router = require('./routes/url');
const URL = require('./models/url');
const port = process.env.PORT || 8000;
const mongoURL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myPrac';

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/url", router);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/:nanoId', async (req, res) => {
    const nanoId = req.params.nanoId;
    const urlData = await URL.findOneAndUpdate(
        { nanoID: nanoId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        },
        { new: true }
    );
    if (!urlData) {
        return res.status(404).send('Short URL not found');
    }
    return res.redirect(urlData.redirectURL);
});

connectToDB(mongoURL)
.then(()=>{
    console.log("Database connected successfully")
});

app.listen(port, () => console.log(`Server is running at ${port}`));