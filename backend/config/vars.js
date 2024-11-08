import dotenvFlow from "dotenv-flow";
dotenvFlow.config();

const VARS = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
};

export default VARS;
