const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const api = require('./src/api');

dotenv.config({ path: './config.env' });

app.use(cookieParser());
app.use(express.json());

app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

const DB = process.env.DATABASE.replace('<USERNAME>', process.env.DATABASE_USERNAME)
    .replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
    .replace('<DB_NAME>', process.env.DATABASE_NAME);

mongoose
    .connect(DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

app.use('/api', api);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/public/404.html'));
});

app.use((error, req, res, next) => {
    let { statusCode, message } = error;

    statusCode = statusCode ? statusCode : 500;

    res.status(statusCode).json({
        statusCode,
        message,
    });
});
