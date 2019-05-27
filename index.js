const express = require('express');
const bodyParser = require('body-parser');
const port = 3000;
const cors = require('cors');
var mongoose = require('mongoose');

// schema
var Model = new mongoose.Schema({
    user:      String,
    name:      String,
    link:      String,
    password:  String,
    date:      String,
});

var UserModel = mongoose.model('Model', Model);

const app = express();

app.use(cors());

app.use(bodyParser.json());

// mongodb connection
var mongoDB = 'mongodb://127.0.0.1/passwordSaver';
mongoose.connect(mongoDB, { useNewUrlParser: true });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// get data
app.get('/api', function(req, res){
    UserModel.find({}).then((data) => {
        console.log(data);
        res.send(data);
    })
});

// post data
app.post('/new', (req, res) => {
    let models = new UserModel();
    models.user = req.body.user;
    models.name = req.body.name;
    models.link = req.body.link;
    models.password = req.body.password;
    models.date = req.body.date;

    models.save();
    res.send(models);
});
