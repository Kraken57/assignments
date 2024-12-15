const morgan = require("morgan");
const { logger } = require("../logger"); // Import your custom logger

// Define the Morgan format
const morganFormat = ":method :url :status :response-time ms";

// Morgan middleware with Winston integration
const loggerMiddleware = morgan(morganFormat, {
  stream: {
    write: (message) => {
      const logObject = {
        method: message.split(" ")[0],
        url: message.split(" ")[1],
        status: message.split(" ")[2],
        responseTime: message.split(" ")[3],
      };
      logger.info(JSON.stringify(logObject)); // Log HTTP requests
    },
  },
});

module.exports = {
  loggerMiddleware: loggerMiddleware,
};
