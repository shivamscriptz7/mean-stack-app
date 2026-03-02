const express = require('express');
const cors = require('cors');

require('./config/mongo');
require('./config/mysql');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', require('./routes/product.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/weather', require('./routes/weather.routes'));

app.listen(3000, () => console.log('Server running on 3000'));
