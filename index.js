const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-Parser');
const passport = require('passport');
const googleStrategy = require('./config/passport-google-oauth2-strategy')
const cookieSession = require('cookie-session');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views','./views');

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ['hello']
}));

app.use(passport.initialize());
app.use(passport.session());




app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log("Error occured in running the server");
    }
    else{
        console.log(`Server running on port : ${port}`);
    }

});