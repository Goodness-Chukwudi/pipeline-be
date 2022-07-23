import cors from "cors";

class Cors {
    static corsSettings() {
        const prodCorsOptions = {
            origin: "https://eduquiz.netlify.app",
            // origin: "https://127.0.0.1:5500",
            methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
            allowedHeaders: ["Date", "Content-Type", "Origin"],
            credentials: true,
            optionSuccessStatus: 200,
        };

        const devCorsOptions = {
            origin: "https://127.0.0.1:5500",
            methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS", "HEAD"],
            allowedHeaders: ["Date", "Content-Type", "Origin"],
            credentials: true,
            optionSuccessStatus: 200,
        };

        if (process.env.ENVIRONMENT == "prod")  return cors(prodCorsOptions);
        return cors(devCorsOptions);
    }
    
}

export default Cors.corsSettings;