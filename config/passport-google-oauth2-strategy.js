const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const fs = require('fs');
const path = require('path');



const baseDir = path.join(__dirname,'../.data');


passport.use(new googleStrategy({
    clientID : "93467824609-nhn3ar82nuss68dlcr2nsioc3nvatjtv.apps.googleusercontent.com",
    clientSecret : "xKs4ZlEH3mtT2YFIzNa3JK1Z",
    callbackURL : "http://localhost:3000/auth/google/callback"

},
    function (accessToken,refreshToken,profile,done)
    {

        //Saving accesToken in .data directory
        fs.open(baseDir + '/' + 'token.json','w',function (err,token){
            if(!err)
            {

                Date.prototype.addHours = function(h) {
                    this.setTime(this.getTime() + (h*60*60*1000));
                    return this;
                  }
                  
                exp = new Date().addHours(1)*1;
                jsn = {
                    token : accessToken,
                    expiryTime : exp
                }
                    data = JSON.stringify(jsn);


                fs.writeFile(token,data,function(err){

                    if(!err){
                        fs.close(token,function(err){
                            if(err){
                                console.log('Error closing new file');
                            }
                        });
                    }else{
                        console.log('Error in writing to new file');

                    }

                });

            }else{
                console.log('Error in opening File :' + err);
            }

        });


        return done(null,profile);
        
    }

));

passport.serializeUser(function(user, done){

    done(null, user);
});

// Used to decode the received cookie and persist session
passport.deserializeUser(function(user,done){
    done(null, user);
});

// checking token expiry time and authenticated user 
passport.checkAuthentication = function(req,res,next){
    if(req.user){
        fs.readFile(baseDir+'/'+'token.json','utf-8',function(err,token){
            if(!err){
              creds = JSON.parse(token);
              if((new Date()*1)<creds.expiryTime){
                
                next();
              }
              else{
                res.send("You must login");
              }
                
            }
        });
    }else{
        res.send("You must login");
    }
}


module.exports = passport;
 


