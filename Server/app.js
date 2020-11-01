var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());


// default route
app.get('/', function (req, res) {
    return res.send({ error: true, message: 'hello' })
});
// db configuraatio
var dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'tikettijarjestelma',
    port: 3307
});

// yhidistet‰‰n db
dbConn.connect();


// Hae kaikki tiketit
app.get('/tiketti', function (req, res) {
    dbConn.query('SELECT * FROM tiketit', function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'tikettilista.' });
    });
});

// Hae id:ll‰
app.get('/tiketti/:id', function (req, res) {

    let tiketti_id = req.params.id;

    if (!tiketti_id) {
        return res.status(400).send({ error: true, message: 'anna tiketin id' });
    }

    dbConn.query('SELECT * FROM tiketit where id=?', tiketti_id, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results[0], message: 'tiketit.' });
    });

});


// Lis‰‰ uusi
app.post('/tiketti', function (req, res) {

    let nimi = req.body.nimi;
    let tila = req.body.tila;
    let kuvaus = req.body.kuvaus;

    if (!nimi || !tila || !kuvaus) {
        return res.status(400).send({ error: true, message: 'ei saa olla tyhj‰' });
    }

    dbConn.query("INSERT INTO tiketit (nimi, tila, kuvaus) VALUES (?, ?, ?) ", [nimi, tila, kuvaus], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'uusi tiketti lis‰tty.' });
    });
});


//  Muokkaa id:ll‰
app.put('/tiketti', function (req, res) {

    let tiketti_id = req.params.tiketti_id;
    let tiketti = req.body.tiketti;

    if (!tiketti_id || !tiketti) {
        return res.status(400).send({ error: tiketti, message: 'virhe' });
    }

    dbConn.query("UPDATE users SET tiketit = ? WHERE id = ?", [tiketti, tiketti_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'muokattu' });
    });
});


//  Poista id:ll‰
app.delete('/tiketti/:id', function (req, res) {

    let tiketti_id = req.params.id;
    console.log('b‰kist‰');
    console.log(tiketti_id);
    if (!tiketti_id) {
        return res.status(400).send({ error: true, message: 'anna id' });
    }
    dbConn.query('DELETE FROM tiketit WHERE id = ?', [tiketti_id], function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'poistettu.' });
    });
});

// portti
app.listen(3000, function () {
    console.log('Node app is running on port 3000');
});

module.exports = app;