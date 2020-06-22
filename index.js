const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');


app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

app.use('/users', userRoutes);


app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});