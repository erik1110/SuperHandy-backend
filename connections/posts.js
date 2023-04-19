const handleSuccess = require('../service/handleSuccess');
const handleError = require('../service/handleError');
const Post = require('../models/posts');
const User = require('../models/users');

const posts = {
    async getPosts(req, res){
    /** 
     * #swagger.tags = ['Get - 貼文']
     * #swagger.description = '取得全部貼文 API '
     * #swagger.parameters['timeSortNew'] = {
            description: '排序最新貼文',
            type: 'string',
            default: 'new',
        }
     * #swagger.parameters['q'] = {
            description: '關鍵字搜尋',
            type: 'string',
            default: '羽球',
        }
     * #swagger.responses[200] = {
        description : '貼文資訊',
        schema: {
            "status": true,
            "data": [
                {
                "_id": "64319a9a4df771952c73d411",
                "content": "今天天氣真好，一起去打羽球",
                "image": "https://imgur.com/kuYyH1O",
                "user": {
                        "_id": "64319450e15991751968e7c5",
                        "name": "John",
                        "photo": "https://thumb.fakeface.rest/thumb_male_10_8c02e4e9bdc0e103530691acfca605f18caf1766.jpg"
                    },
                "likes": 1000,
                "__v": 0
              },
          ]
        }
       }
     */
        const timeSortNew = req.query.timeSortNew === "new" ? "-createdAt" : "createdAt";
        console.log(req.query.timeSortNew,timeSortNew)
        const q = req.query.q !== undefined ? {"content": new RegExp(req.query.q)} : {};
        const myPost = await Post.find(q).populate({
            path: 'user',
            select: 'name photo'
        }).sort(timeSortNew);
        handleSuccess(res, myPost);
    },
    async createPosts(req, res){
        /** 
         * #swagger.tags = ['Posts - 貼文']
         * #swagger.description = '新增一筆貼文'
         * #swagger.parameters['body'] = {
            in: 'body',
            type: "object",
            description: '資料格式',
            required: true,
            schema: {
                "$user": '64319450e15991751968e7c5',
                "$content": '今天天氣真好，一起去打羽球',
                "image": 'https://imgur.com/kuYyH1O',
                "likes": 123
            }
        }
        * #swagger.responses[200] = {
            description : '貼文資訊',
            schema: {
                "status": true,
                "data": {
                    "content": "今天天氣真好，一起去打羽球",
                    "image": "https://imgur.com/kuYyH1O",
                    "createdAt": "2023-04-08T16:47:15.920Z",
                    "user": "64319450e15991751968e7c5",
                    "likes": 0,
                    "_id": "64319a9a4df771952c73d411",
                    "__v": 0
                }
                }
        }
        */
        /* #swagger.security = [{
                "apiKeyAuth": []
        }] */
        try {
            const data = req.body;
            if (data.content) {
                const newPost = await Post.create({
                    user: req.body.user,
                    content: req.body.content,
                    image: req.body.image,
                    likes: req.body.likes
                });
                handleSuccess(res, newPost);
            } else {
                handleError(res);
            }
        } catch(err){
            handleError(res, err);
        }
    },
    async deleteOnePosts(req, res){
        try {
            const _id = req.params.id;
            const data = req.body;
            if (data.content) {
                const result = await Post.findByIdAndDelete(_id);
                if (result) {
                    handleSuccess(res, result);
                } else {
                    handleError(res);
                }
            } else {
                handleError(res);
            }
        } catch(err){
            handleError(res, err);
        }
    },
    async updateOnePosts(req, res){
        try {
            const _id = req.params.id;
            const data = req.body;
            if (data.content) {
                const update = {
                    name: req.body.name,
                    content: req.body.content
                  };
                const result = await Post.findByIdAndUpdate(_id, update, { new: true });
                if (result) {
                    handleSuccess(res, result);
                } else {
                    handleError(res);
                }
            } else {
                handleError(res);
            }
        } catch(err){
            handleError(res, err);
        }
    },
}
module.exports = posts;