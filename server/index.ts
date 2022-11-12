const express = require('express');
const path = require('path');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const compression = require('compression');

const app = express();
const port = 8080;

app.use(cors());
app.use(compression());

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Handle GET requests to /api route
app.post('/api/send-email', async (req, res) => {
    const { name, company, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.FOLIO_EMAIL,
            pass: process.env.FOLIO_PASSWORD,
        },
    });

    await new Promise((resolve, reject) => {
        // verify connection configuration
        transporter.verify(function (error, success) {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
    
    const mailData = {
        from: {
            name: `"${name}" <1919dotfun@gmail.com>`,
            address: `"${email}"`,
        },
        replyTo: email,
        to: "zaimakankanb@gmail.com",
        subject: `${name} <${email}> ${
                        company ? `from ${company}` : ''
                    } 提交的表单`, // Subject line
        text: `${message}`,
    };
    
    await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(mailData, (err, info) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
        });
    });
    
    res.status(200).json({ status: "OK" });
    });

// listen to app on port 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
