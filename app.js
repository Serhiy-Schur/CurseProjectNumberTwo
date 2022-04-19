const mysql = require("mysql2");
const express = require("express");
const app = express();
const urlencodedParser = express.urlencoded({extended: false});


const pool = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '12345',
    database: 'aeroport_stuard'
});

app.set("view engine", "hbs");
app.use(express.static(__dirname + '/views'));

app.get("/", function(req, res){
    pool.query("SELECT * FROM літак", function(err, data) {
        if(err) return console.log(err);
        res.render("index.hbs", {
            users: data
        });
    });
});

app.get("/create", function(req, res){
    res.render("create.hbs");
});

app.post("/create", urlencodedParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);
    const value1 = req.body.value1;
    const value2 = req.body.value2;
    const value3 = req.body.value3;
    const value4 = req.body.value4;
    const value5 = req.body.value5;
    const value6 = req.body.value6;
    const data1 = req.body.data1;
    const data2 = req.body.data2;
    const data3 = req.body.data3;
    const data4 = req.body.data4;
    const data5 = req.body.data5;
    const data6 = req.body.data6;
    const table = req.body.table;

    let i = []
    let j = []
    let counter = 0
    let arr = [data1, data2, data3, data4, data5, data6]
    let arr2 = [value1, value2, value3, value4, value5, value6]

    let a = arr.length-1
    console.log(a)
    arr.forEach(function (item){
        if(item){
            i.push('?');
            j.push(arr2[counter])
        }
        counter++
    })
    const value = j.join(", ");
    const n =  i.join(", ");
    let search = "INSERT INTO "+table+" ("+value+")"+" VALUES ("+n+")"
    pool.query(search, [data1, data2, data3, data4, data5, data6], function(err, data) {
        if(err) return console.log(err);
        res.redirect("/create");
    });
});

app.get("/delete", function(req, res){
    res.render("delete.hbs");
});
app.post("/delete", urlencodedParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);
    const value1 = req.body.value1;
    const value2 = req.body.value2;

    const data1 = req.body.data1;
    const data2 = req.body.data2;

    const table = req.body.table;

    let search = "DELETE FROM "+table+" WHERE "+value1+"=?"+"AND "+value2+"=?"
    pool.query(search,[data1,data2], function(err, data) {
        if(err) return console.log(err);
        res.redirect("/delete");
    });
});

app.get("/Stuard", function(req, res){
    pool.query("SELECT * FROM літак", function(err, data) {
        if(err) return console.log(err);
        res.render("Stuard_Page.hbs", {
            users: data
        });
    });
});


//Запит Екіпаж
app.get("/Ekipag", function (req, res) {
    pool.query("SELECT * FROM екіпаж", function(err, data) {
        if(err) return console.log(err);
        res.render("Ekipag.hbs", {
            users: data
        });
    });
});
app.get("/Ekipag/:value/:value2", urlencodedParser, function(req, res){
    const value = req.params['value'];
    console.log(value);
    const value2 = req.params['value2'];
    pool.query("SELECT * FROM екіпаж WHERE  Клас_екіпажу =? AND Номер_екіпажу =?",[value,value2], function(err, data) {
        if(err) return console.log(err);
        res.render("Ekipag.hbs", {
            users: data
        });
    });
});

//Запит літак
app.get("/Litak", function (req, res) {
    pool.query("SELECT * FROM літак", function(err, data) {
        if(err) return console.log(err);
        res.render("Litak.hbs", {
            users: data
        });
    });
});
app.get("/Litak/:value/:value2", urlencodedParser, function(req, res){
    const value = req.params['value'];
    console.log(value);
    const value2 = req.params['value2'];
    pool.query("SELECT * FROM літак WHERE Марка_літака =? AND Кількість_пасажирів <?",[value,value2], function(err, data) {
        if(err) return console.log(err);
        res.render("Litak.hbs", {
            users: data
        });
    });
});

//Запит меню
app.get("/Menu", function (req, res) {
    pool.query("SELECT * FROM меню", function(err, data) {
        if(err) return console.log(err);
        res.render("Menu.hbs", {
            users: data
        });
    });
});
app.get("/Menu/:value/:value2", urlencodedParser, function(req, res){
    const value = req.params['value'];
    console.log(value);
    const value2 = req.params['value2'];
    pool.query("SELECT * FROM меню WHERE Номер_меню =? AND Тип_меню =?",[value,value2], function(err, data) {
        if(err) return console.log(err);
        res.render("Menu.hbs", {
            users: data
        });
    });
});

//Запит штаб
app.get("/Shtab", function (req, res) {
    pool.query("SELECT * FROM штаб", function(err, data) {
        if(err) return console.log(err);
        res.render("Shtab.hbs", {
            users: data
        });
    });
});
app.get("/Shtab/:value/:value2", urlencodedParser, function(req, res){
    const value = req.params['value'];
    console.log(value);
    const value2 = req.params['value2'];
    pool.query("SELECT * FROM штаб WHERE Кількість_кімнат =? AND Наявність_їдальні =?",[value,value2], function(err, data) {
        if(err) return console.log(err);
        res.render("Shtab.hbs", {
            users: data
        });
    });
});

//Запит авіакомпанія
app.get("/Aviakompaniya", function (req, res) {
    pool.query("SELECT * FROM авіакомпанія", function(err, data) {
        if(err) return console.log(err);
        res.render("Aviakompaniya.hbs", {
            users: data
        });
    });
});
app.get("/Aviakompaniya/:value/:value2", urlencodedParser, function(req, res){
    const value = req.params['value'];
    console.log(value);
    const value2 = req.params['value2'];
    pool.query("SELECT * FROM авіакомпанія WHERE Контактний_номер_телефону =? AND Країна_розташування_офісу =?",[value,value2], function(err, data) {
        if(err) return console.log(err);
        res.render("Aviakompaniya.hbs", {
            users: data
        });
    });
});

//Запит рейс
app.get("/Rays", function (req, res) {
    pool.query("SELECT * FROM рейс", function(err, data) {
        if(err) return console.log(err);
        res.render("Rays.hbs", {
            users: data
        });
    });
});
app.get("/Rays/:value/:value2", urlencodedParser, function(req, res){
    const value = req.params['value'];
    console.log(value);
    const value2 = req.params['value2'];
    pool.query("SELECT * FROM рейс WHERE Час_вильоту =? AND Дата_прибуття =?",[value,value2], function(err, data) {
        if(err) return console.log(err);
        res.render("Rays.hbs", {
            users: data
        });
    });
});

//Запит аеропорт
app.get("/Aeroport", function (req, res) {
    pool.query("SELECT * FROM аеропорт", function(err, data) {
        if(err) return console.log(err);
        res.render("Aeroport.hbs", {
            users: data
        });
    });
});
app.get("/Aeroport/:value/:value2", urlencodedParser, function(req, res){
    const value = req.params['value'];
    console.log(value);
    const value2 = req.params['value2'];
    pool.query("SELECT * FROM аеропорт WHERE Кількість_смур =? AND Номер_аеропорту =?",[value,value2], function(err, data) {
        if(err) return console.log(err);
        res.render("Aeroport.hbs", {
            users: data
        });
    });
});

//Запит маршрут
app.get("/Marshrut", function (req, res) {
    pool.query("SELECT * FROM маршрут", function(err, data) {
        if(err) return console.log(err);
        res.render("Marshrut.hbs", {
            users: data
        });
    });
});
app.get("/Marshrut/:value/:value2", urlencodedParser, function(req, res){
    const value = req.params['value'];
    console.log(value);
    const value2 = req.params['value2'];
    pool.query("SELECT * FROM маршрут WHERE Країна_відправлення =? AND Країна_прибуття =?",[value,value2], function(err, data) {
        if(err) return console.log(err);
        res.render("Marshrut.hbs", {
            users: data
        });
    });
});
app.listen(3000, function(){
    console.log("Підключення до сервера успішне!");
});
//