require('dotenv').config();
const express = require('express');
const dbService = require('./config/mongoseConfig');
const { auth } = require('./middlewares/authMiddleware');
const { errorHandler } = require('./middlewares/errorHandlerMiddleware');
const cors = require('cors');
const app = express();

dbService.connecter();
require('./config/cookieParserConfig')(app);//cookie parser
app.use(cors({ origin: ['http://localhost:3000', 'https://cook-blog-d3ed8.web.app', 'https://martin-cook-blog.vercel.app'], credentials: true }));
app.use(auth);//auth middleware
require('./config/expressConfig')(app);//express config
app.use(errorHandler)//error handler

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log(error.message);
    }
    console.log(`"Cook-blog API" listening to port http://localhost:${process.env.PORT}`);
    console.log(`"Cook-blog" React APP and REST API documentation is available at: https://github.com/SpooRe91/react-js-project-final/blob/main/Cook-Blog-README-file.md`);
});
