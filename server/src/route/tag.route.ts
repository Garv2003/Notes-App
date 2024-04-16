import express from 'express';
import { GetUserTags, DeleteTag } from '../controller/tag.controller';

const router = express.Router();

router.get('/tags/user/:userId', GetUserTags);

router.delete('/tag/:id', DeleteTag);

export { router as tagRouter }