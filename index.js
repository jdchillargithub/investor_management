import express from "express";
import morgan from "morgan";
import adminRouter from './src/v1/routes/adminRouter.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: true,
    message: "welcome",
  });
});

app.use("/api/v1/admin", adminRouter);

app.get("*", (req, res) => {
  res.status(404).json({
    status: false,
    message: "Unknown path specified....",
  });
});

app.post("*", (req, res) => {
  res.status(404).json({
    status: false,
    message: "Unknown path specified....",
  });
});

app.listen(process.env.PORT, (err) => {
  if (err) console.log(`server error.`);
  else console.log(`server is on ${process.env.PORT}`);
});

