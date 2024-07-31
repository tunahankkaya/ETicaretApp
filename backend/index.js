const express = require('express');
const cors = require('cors');
const connection = require('./database/db');

const app = express();

app.use(express.json());
app.use(cors());

const authRouter = require('./routers/auth.router');
app.use("/api/auth", authRouter);

connection();

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});