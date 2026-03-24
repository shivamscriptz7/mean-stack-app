const express = require('express');
const cors = require('cors');

require('./backend/config/mongo');
require('./backend/config/mysql');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/products', require('./backend/routes/product.routes'));
app.use('/api/auth', require('./backend/routes/auth.routes'));
app.use('/api/orders', require('./backend/routes/order.routes'));
app.use('/api/weather', require('./backend/routes/weather.routes'));

app.listen(3000, () => console.log('Server running on 3000'));
