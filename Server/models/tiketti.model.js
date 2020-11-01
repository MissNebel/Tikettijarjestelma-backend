const sql = require("./db.js");

const Tiketti = function (tiketit) {
    this.nimi = tiketit.nimi;
    this.tila = tiketit.tila;
    this.kuvaus = tiketit.kuvaus;
};

//puuttuu id:llä haku, muokkaus ja poisto

Tiketti.create = (newTiketti, result) => {
    sql.query("INSERT INTO tiketit SET ?", newTiketti, (err, res) => {
        if (err) {
            console.log("error: " + err);
            result(err, null);
            return;
        }
        console.log("uusi tiketti: ", { id: res.insertID, ...newTiketti });
        result(null, { id: res.insertID, ...newTiketti })
    });
};

Tiketti.getAll = result => {
    sql.query("SELECT * FROM tiketit", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("tiketit: ", res);
        result(null, res);
    });
};

Tiketti.getAvoin = result => {
    sql.query("SELECT * FROM tiketit WHERE tila = avoin", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("tiketit avoin: ", res);
        result(null, res);
    });
};

Tiketti.getAloitettu = result => {
    sql.query("SELECT * FROM tiketit WHERE tila = aloitettu", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("tiketit aloitettu: ", res);
        result(null, res);
    });
};

Tiketti.getValmis = result => {
    sql.query("SELECT * FROM tiketit WHERE tila = valmis", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log("tiketit valmis: ", res);
        result(null, res);
    });
};

module.exports = Tiketti;

