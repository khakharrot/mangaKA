const express= require("express")
const app= express()
const port= 6000
 const path = require("path")

app.use(express.json())
const connect= require("./Config/Connect")
connect()

app.use("/Manga-KA",require("./Routes/api"))

app.use("/api/uploads", require("./routes/uploadRoute"));

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));


app.listen(port,(err)=>{
    err?console.log(err):console.log(`Server is running on ${port}`)
})