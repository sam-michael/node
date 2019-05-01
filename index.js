const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send({hi: 'there'});
})
// In prod env Heroku tells us witch port our app will use by injecting a  PORT variable in 'process.env', 
// so we need to make sure we listen to the port they tell us to use.

// If dev env we will use the default PORT = 5000 (process.env.PORT will be undefined)
const PORT = process.env.PORT || 5000;
console.log(PORT);
app.listen(PORT);