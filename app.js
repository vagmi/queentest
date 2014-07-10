var queen=require('queen');
var app = require('express')();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var knex=require('knex')({
  client: 'pg',
  connection: process.env.QUEEN_PG_TEST ||  "postgresql://postgres:pass@localhost:5432/queen_test"
});
app.set("view engine", "jade");
var q = queen(app,{db: 'pg', knex: knex});

app.use('/secret',queen.authenticate);
app.get('/secret',function(req,res) {
  res.render('secret');
});
app.get('/',function(req,res) {
  res.render("index");
});

app.listen(3000);
