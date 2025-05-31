const fs = require("fs")
const express = require("express")
const app = express();
const path = require("path");
const { urlencoded } = require("body-parser");
const { title } = require("process");
const { PassThrough } = require("stream");


app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded(({ extended: true })))
app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req, res) => {
    res.render("homepage.ejs")
})

app.get("/gettask", function (req, res) {
    res.render("gettask")
})

app.get("/readfiles", (req, res) => {
    let result = [];
    try {
        let folderpath = __dirname + "/files"
        let titles = fs.readdirSync(folderpath)
        titles.forEach((filetitle) => {
            let singlefiledata = fs.readFileSync(`${folderpath}/${filetitle}`, "utf-8")
            result.push({"title":filetitle, "content":singlefiledata});
        })
        res.send(result)
    } catch (error) {
        console.error(error);
        res.status(500).send("Error reading files")
    }
})

app.get("/delete",(req,res)=>{
    const folderpath = "./files";
    fs.readdir(folderpath,(err,files)=>{
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(folderpath, file),(err)=>{
                if (err) {
                    throw err;
                }
            });
        }
    })
})

app.post("/createfile", (req, res) => {
    fs.writeFileSync(`./files/${req.body.title}.txt`,req.body.note)
})

app.listen(3000, (err) => {
    console.log(("Hello"));
})