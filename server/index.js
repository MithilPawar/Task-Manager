import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./database/db.js";

dotenv.config({
  path: "./.env",
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Mongodb Conection failed ", error);
  });
