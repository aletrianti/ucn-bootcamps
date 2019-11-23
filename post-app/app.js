// Require dependencies
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

// Require modules
const Post = require('./models/post');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

mongoose.connect('mongodb+srv://admin:admin123@typeit-lnmle.mongodb.net/post-app?retryWrites=true&w=majority', { useNewUrlParser: true })
        .then(() => console.log('Database connected'))
        .catch((err) => console.log('Error: ' + err));

// Routes
app.get('/', (req, res) => {
    Post.find({}, (err, posts) => {
        if (err) { 
            console.log(err);
            res.render('index');
        } else {
            res.render('index', { posts: posts });
        }
    });
});

app.post('/posts', (req, res) => {
    try {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content
        });
    
        newPost.save();
    } catch(err) {
        throw err;
    }

    res.redirect('/');
});

app.get('/posts/:id', (req, res) => {
    Post.findById(req.params.id, (err, post) => {
        if (err) {
            console.log(err);
            res.render('show-post');
        } else {
            res.render('show-post', { post: post });
        }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));