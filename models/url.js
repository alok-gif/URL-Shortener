const mongoose = require('mongoose');

const newSchema = new mongoose.Schema(
    {
        nanoID:{
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        visitHistory: [{
            timestamp:{
            type: Number,
            },
        },]
    }, {timestamps: true}
);

const newModel = mongoose.model('coll', newSchema);

module.exports = newModel;