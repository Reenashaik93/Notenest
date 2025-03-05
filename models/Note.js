const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: { type: String, required: true },
    description: { type: String},
    tag:{type: String, default: "General"},
    date: {type: Date, default: Date.now}
}, { timestamps: true });

module.exports = mongoose.model('Note', NoteSchema);
