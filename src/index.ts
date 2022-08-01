import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';
import App ,{API_PATH} from "./App"
import AccountUtils from './common/utils/AccountUtils';
import Developer, {IDeveloper} from './models/developer';
import ExtractionService from './services/ExtractionService';

dotenv.config();
const port = process.env.PORT;
const MONGO_URI:any = process.env.MONGODB_URI;
const extractionService = new ExtractionService();
const accountUtils = new AccountUtils();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(MONGO_URI, options as ConnectOptions);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB via Mongoose');
  // extractDevelopersToDB();  
});
mongoose.connection.on('error', (err: any) => console.error('Unable to connect to MongoDB via Mongoose\n'+ err));

App.listen(port, () => {
    console.log(`Express is listening at http://localhost:${port}${API_PATH}`);
});


async function extractDevelopersToDB() {
  let session = null;
  try {
      session = await accountUtils.createMongooseTransaction();
      extractionService.saveCsvToDB<IDeveloper>("/Users/moni-tech/Downloads/graph_data.csv", Developer, session);
      await session.commitTransaction();

  } catch (error: any) {
      console.log(error);
      await session.abortTransaction();
  }
}
