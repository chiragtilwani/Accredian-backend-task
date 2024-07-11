require('dotenv').config();
const PORT = process.env.PORT || 5000;

var cors = require('cors')
const express = require('express');
const app = express();

const userRoute=require('./routes/user')

app.use(cors());
app.use(express.json());
app.use('/',userRoute)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
