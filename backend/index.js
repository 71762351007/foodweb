const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db")
const cors=require("cors");
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = ['https://foodweb-nu.vercel.app', '*'];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionSuccessStatus: 200,
};
mongoDB();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin"," 192.168.56.1");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With , Content-Type, Accept"
  );
  next();
});
app.use(cors(corsOptions));
app.use(express.json())
app.use('/api',require("./Routes/CreateUser"));
app.use("/api",require("./Routes/DisplayData"));
app.use("/api",require("./Routes/OrderData"));
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
