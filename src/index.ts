import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import App ,{API_PATH} from "./App"

dotenv.config();
const port = process.env.PORT;
const MONGO_URI:any = process.env.MONGODB_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};
mongoose.connect(MONGO_URI, options as ConnectOptions);
mongoose.connection.once('open', () => console.log('Connected to MongoDB via Mongoose'));
mongoose.connection.on('error', (err: any) => console.error('Unable to connect to MongoDB via Mongoose\n'+ err));

App.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}${API_PATH}`);
});
