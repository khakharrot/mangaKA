const express= require("express")
const app= express()
const port= 6000

app.use(express.json())
const connect= require("./Config/Connect")
connect()

app.use("/Manga-KA",require("./Routes/api"))
app.listen(port,(err)=>{
    err?console.log(err):console.log(`Server is running on ${port}`)
})