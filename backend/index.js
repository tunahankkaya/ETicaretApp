const express = require('express');
const cors = require('cors');
const connection = require('./database/db');
const path = require('path');

const basketRouter = require('./routers/basket.router');
const authRouter = require('./routers/auth.router');
const categoryRouter = require('./routers/category.router');
const productRouter = require('./routers/product.router');
const orderRouter = require('./routers/order.router');


const app = express();

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname,'uploads')));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/baskets", basketRouter);
app.use("/api/orders", orderRouter);

connection();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
