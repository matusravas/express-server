const Post = require("../models/post");
const response = require("../helpers/response_sender");

exports.add_one = ((req, res) => {
    if (Object.keys(req.body).length !== 0) {
        // const { name, price, location } = req.body;
        // const post = new post({
        //     name: name,
        //     price: price,
        //     location: location
        // })

        Post.create(new Post(req.body)).then((data) => {
            response(res, 200, {
                post: data
            });
        }).catch((err) => {
            response(res, 400, { error: { status: "Can not create item", message: err } });
        });
    }
    else {
        res.status(400).json({
            error: {
                status: "Can not create post",
                message: "Missing body in POST request"
            }
        });
    }
});

exports.add_more = ((req, res) => {
    if (Object.keys(req.body).length !== 0) {
        const body = req.body;
        Post.create(body).then(data => response(res, 200, data)).catch(err => response(res, 400, err))
    }
});

exports.get_all = ((req, res) => {
    Post.find().exec().then(data => response(res, 200, { posts: data })
    ).catch(err => response(res, 400, { error: { status: "Error while getting posts", message: err } }))
});

// [
//     {
//         "name": "Wardrobe",
//         "price": "500",
//         "location": "London",
//         "count": "100000",
//         "available": "true"
//     },
//     {
//         "name": "Fridge",
//         "price": "500",
//         "location": "London",
//         "count": "100000",
//         "available": "true"
//     },
//     {
//         "name": "Smart TV Philips",
//         "price": "500",
//         "location": "London",
//         "count": "100000",
//         "available": "true"
//     }
// ]