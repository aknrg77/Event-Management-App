const development =  {
    name : 'development',
    port : 3000,
    google : {
    clientID : "93467824609-nhn3ar82nuss68dlcr2nsioc3nvatjtv.apps.googleusercontent.com",
    clientSecret : "xKs4ZlEH3mtT2YFIzNa3JK1Z",
    callbackURL : "http://localhost:3000/auth/google/callback"

    }

}
const production = {
    name : 'production',
    port : process.env.PORT,
    google : {
        clientID : "93467824609-nhn3ar82nuss68dlcr2nsioc3nvatjtv.apps.googleusercontent.com",
        clientSecret : "xKs4ZlEH3mtT2YFIzNa3JK1Z",
        callbackURL : "https://event-managment-app.herokuapp.com/auth/google/callback"
    
        }

}

module.exports = eval(process.env.PORT)== undefined ? development: production;

