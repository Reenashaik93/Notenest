const express = require('express');
const { registerUser, loginUser,getUserDetails, updatePassword, deleteAccount } = require('../controllers/authController');
const { body } = require('express-validator');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.post('/createuser', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], registerUser);

router.post('/login', [
    body('email').isEmail().withMessage('Please include a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
], loginUser);

router.post('/getuser', authMiddleware, getUserDetails);

// Route to update password
router.put('/update-password', authMiddleware, [
    body('currentPassword').notEmpty().withMessage('Current password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
], updatePassword);

// Route to delete account
router.delete('/delete-account', authMiddleware, deleteAccount);

module.exports = router;
