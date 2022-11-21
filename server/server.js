const express = require('express')
require("dotenv").config();
const {errorHandler} = require('./middleware/errorMiddleware')
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express()
const mongoose = require("mongoose");

const PORT = process.env.PORT || 5000

//DB setup
const uri = process.env.MONGO_URI

async function dbconnect(){
    try{
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Connected to MongoDB")
    } catch(error){
        console.error(error);
    }
}
dbconnect();

/*var corsOptions = {
    origin: "http://localhost:3000"
  };*/
app.use(require('cors')()); //enable cors

//parse requests of content type - app/json
app.use(bodyParser.json());
//parse requests of content-type app/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json())

app.get("/api", (req,res)=>{
    res.json({message: "Hello from the server"})
})

const home = require("./routes/index.route")
app.use("/", home)

const usersRouter = require("./routes/userRoutes")
app.use("/api/users", usersRouter)

const booksRouter = require("./routes/booksRoutes")
app.use("/api/books", booksRouter)

const conversationRouter = require("./routes/conversationRoutes")
app.use("/api/conversation", conversationRouter)

const messageRouter = require("./routes/messageRoutes")
app.use("/api/message", messageRouter)

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))