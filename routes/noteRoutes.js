const express = require('express');
const { createNote, getNotes, updateNote, deleteNote } = require('../controllers/noteController');
const { body } = require('express-validator');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/fetchnotes', authMiddleware, getNotes);

router.post('/addnote', authMiddleware, [
    body('title').notEmpty().withMessage('Title is required')
], createNote);

router.put('/updatenote/:id', authMiddleware, [
    body('title').notEmpty().withMessage('Title is required')
], updateNote);

router.delete('/deletenote/:id', authMiddleware, deleteNote);

module.exports = router;
