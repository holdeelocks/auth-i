const server = require("./server/server");

const port = 5000;

server.listen(port, () => console.log(`Server up and listening on ${port}`));