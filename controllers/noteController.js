const Note = require('../models/Note');
const { validationResult } = require('express-validator');

exports.getNotes = async (req, res) => {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
};

exports.createNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, content } = req.body;
    const note = new Note({
        user: req.user.id,
        title,
        content,
    });
    await note.save();
    res.status(201).json(note);
};

exports.updateNote = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const note = await Note.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        req.body,
        { new: true }
    );
    res.json(note);
};

exports.deleteNote = async (req, res) => {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: 'Note deleted' });
};
