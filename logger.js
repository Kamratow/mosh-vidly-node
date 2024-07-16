const winston = require("winston");
require("winston-mongodb");

module.exports = winston.createLogger({
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
