const connectToMongo=require("./db");
const express = require('express')
var cors = require('cors')
connectToMongo();
const app = express()
const port = 5000




app.use(cors())


app.use(express.json()) //necessary when we use req.body in router files
app.use('/api/auth',require('./routes/auth'))
app.use('/api/note',require('./routes/note'))



app.listen(port, () => {
  console.log(`inotebook backend listening on port ${port}`)
})
