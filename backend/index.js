const app = require("./app");
const http = require("http");
const { PORT } = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server running on port ${PORT}`);
});
