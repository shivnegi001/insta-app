const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5000;
const {MONGOURI} = require("./keys.js");

require("./models/user");
require("./models/post");

app.use(cors());
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/post"));
app.use(require("./routes/user"));

mongoose.connect(MONGOURI,{
    useNewURLParser:true,
    useUnifiedTopology:true,
});

mongoose.connection.on('connected',()=>{
    console.log("DB CONNECTED");
})

mongoose.connection.on('error',(err)=>{
    console.log("DB NOT CONNECTED",err);
})


app.listen(PORT,()=> console.log(`server is running on ${PORT}`));