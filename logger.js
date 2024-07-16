const winston = require("winston");
require("winston-mongodb");

module.exports = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: "logfile.log",
      level: "error",
    }),
    new winston.transports.Console({ level: "info" }),
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly",
      level: "error",
      options: {
        useUnifiedTopology: true,
      },
    }),
  ],
});
