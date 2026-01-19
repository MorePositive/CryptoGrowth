const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const BUILD_DIR = path.resolve(__dirname, '../client/build');

app.use(express.static(BUILD_DIR));

app.get('/api', (req, res) => {
    res.json({ message: 'example' });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(BUILD_DIR, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
