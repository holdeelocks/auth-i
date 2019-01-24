const express = require('express');
const path = require('path');

const server = require('./server/server');

const port = process.env.PORT || 5000;

server.listen(port, () => console.log(`Server up and listening on ${port}`));

server.use(express.static(path.join(__dirname, 'frontend-client/build')));

server.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/frontend-client/build/index.html'));
});
