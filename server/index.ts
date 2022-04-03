const express = require('express');
const path = require('path');
const cors = require('cors');
const router = express.Router();
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(cors());
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.FOLIO_EMAIL,
        pass: process.env.FOLIO_PASSWORD,
    },
});

transporter.verify().then(console.log).catch(console.error);

// console.log(process.env.FOLIO_EMAIL);

// Handle GET requests to /api route
app.post('/api/send-email', (req, res) => {
    const { name, company, email, message } = req.body;

    transporter
        .sendMail({
            from: '"Henry Heffernan" <henryheffernan.folio@gmail.com>', // sender address
            to: 'henryheffernan@gmail.com, henryheffernan.folio@gmail.com', // list of receivers
            subject: `Contact Request: ${name} <${email}> ${
                company ? `from ${company}` : ''
            } submitted a contact form`, // Subject line
            text: `${message}`, // plain text body
        })
        .then((info) => {
            console.log({ info });
            res.json({ message: 'success' });
        })
        .catch((e) => {
            console.error(e);
            res.status(500).send(e);
        });
});
// listen to app on port 8080
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
