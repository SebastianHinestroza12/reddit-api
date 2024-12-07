import { Router } from 'express';
import { SubredditController } from '@/controllers/subredditController';

const router: Router = Router();
const subredditController = new SubredditController();

router.get('/', subredditController.listSubreddits);
router.post('/', subredditController.createSubreddit);
router.get('/:subredditId', subredditController.getSubredditById);

export { router}