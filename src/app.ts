import express from "express"

const app = express()

app.use("/", (req, res) => {
  res.send("<h1> Aguante Boca papa </h1>")
})

app.listen(3000, ()=>{
  console.log('Server runnning on http://localhost:3000/')
})

