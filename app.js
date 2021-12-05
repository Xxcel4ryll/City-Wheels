require('dotenv').config();
const Path = require('path');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const express = require('express');
// const mysql = require('mysql2');
const app = express();

// app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use('/public', express.static(Path.join(__dirname, 'public')));
app.use(cookieParser(process.env.COOKIE_SECRET));

const authMiddleware = require('./services/verifytoken');

const mainRoute = require('./routes/main.routes');

const waybillRoute = require('./routes/waybill.routes');

const authRoute = require('./routes/auth.routes');

app.use(
  '/',
  mainRoute,
  authRoute,
  authMiddleware({ allowedRoles: ['ADMIN'] }),
  waybillRoute
);

app.use((req, res) =>
  res.render('error', {
    message: 'Oops! The page you requested doesnt exist',
    errorCode: '404',
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Running ${PORT}`));
