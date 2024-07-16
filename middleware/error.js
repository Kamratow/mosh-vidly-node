const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logfile.log",
    }),
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly",
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});

logger.info("it works!");

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);

  // Log the exception
  res.status(500).send("Something failed.");
};
