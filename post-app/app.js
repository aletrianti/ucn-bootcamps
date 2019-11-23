const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));