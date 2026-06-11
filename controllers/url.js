const { nanoid } = require('nanoid');
const newModel = require('../models/url');

async function generateNewUrl(req, res){
    const rawUrl = req.body?.url;
    if(!rawUrl || !rawUrl.trim()){
        return res.status(400).json({
            error: "URL is required"
        });
    }
    let redirectURL = rawUrl.trim();
    if (!/^https?:\/\//i.test(redirectURL)) {
        redirectURL = `https://${redirectURL}`;
    }

    try {
        new URL(redirectURL);
    } catch (error) {
        return res.status(400).json({
            error: "Please enter a valid URL"
        });
    }

    const nanoId = nanoid(8);
    await newModel.create({
            nanoID: nanoId,
            redirectURL,
            visitHistory: [],
    })
    return res.status(201).json({
        id: nanoId,
        shortURL: `${req.protocol}://${req.get('host')}/${nanoId}`,
        redirectURL,
    });
}

async function getAnalytics(req, res){
    const nanoID = req.params.nanoID;
    const findURL = await newModel.findOne({nanoID:nanoID});
    if(!findURL){
        return res.status(404).json({error:"No such URL found"});
    }
    return res.json({
        timestamp: Date.now(), totalclicks: findURL.visitHistory.length, analytics: findURL.visitHistory,
    })
}

module.exports = {
    generateNewUrl, getAnalytics
}