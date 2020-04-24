const development =  {
    name : 'development',
    callback : 'http://localhost:3000/auth/google/callback',
    port : 3000

}
const production = {
    name : 'production',
    callback : 'https://event-managment-app.herokuapp.com/auth/google/callback',
    port : process.env.PORT
}

module.exports = eval(process.env.PORT)== undefined ? development: production;

