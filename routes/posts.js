var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const handleErrorAsync = require('../services/handleErrorAsync');
const PostsController = require('../controllers/posts');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', handleErrorAsync(async (req, res, next) => {
    const posts = await PostsController.getPosts(req, res, next);
    res.json(posts);
}));
router.post('/', handleErrorAsync(async (req, res, next) => {
    const posts = await PostsController.createPosts(req, res, next);
    res.json(posts);
}));
router.delete('/:id', handleErrorAsync(async (req, res, next) => {
    const posts = await PostsController.deleteOnePosts(req, res, next);
    res.json(posts);
}));
router.put('/:id', handleErrorAsync(async (req, res, next) => {
    const posts = await PostsController.updateOnePosts(req, res, next);
    res.json(posts);
}));

module.exports = router;