const Items = require("../models/item");
const dotenv = require("dotenv");
const connectDatabase = require("../config/database");
const items = require("../data/games.json");
dotenv.config({ path: "backend/config/config.env" });
connectDatabase();
const seeds = async () => {
  try {
    await Items.deleteMany();
    console.log("Products deleted");
    await Items.insertMany(items);
    console.log("All products added");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};
seeds();
