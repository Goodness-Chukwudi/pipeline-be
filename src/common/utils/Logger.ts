import winston from "winston";
require("winston-mongodb");

class Logger {

    public logError(error: Error) {

        winston.add(
            new winston.transports.Console({
                format: winston.format.prettyPrint(),
            })
        );

        if (process.env.ENVIRONMENT == "prod") {

            // winston.add(
            //     new winston.transports.File({
            //         filename: "Error Logs.log",
            //         format: winston.format.prettyPrint(),
            //     })
            // );

            winston.add(
                // @ts-ignore
                new winston.transports.MongoDB({
                    db: process.env.DB_ERROR_LOGS,
                    options: {
                        useNewUrlParser: true,
                        useUnifiedTopology: true,
                    },
                })
            );   
        }

        winston.log({
            level: "error",
            message: error.message,
            metadata: error,
            time_stamp: new Date()
        });
    }
    
}

export default Logger;
