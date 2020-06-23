const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});