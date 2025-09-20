const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname)));

const compoundRouter = require('./routes/compound');
app.use('/compound-interest', compoundRouter);

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'interestcompounded.html')));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

module.exports = app;
