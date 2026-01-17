
import express from 'express'
import { Authenticate } from '../middleware/authMiddleware.js';
import { getMessage, sendMessage } from '../controllers/messageController.js';

const router = express.Router();

router.post("/send/:receiverId", Authenticate, sendMessage);
router.get("/:receiverId", Authenticate, getMessage);

export default router