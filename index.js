const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const appConf = require('./config/app.conf');
const Auth = require('./auth');
const CORS = require('./cors');
const userRouter = require('./routers/UserRouter')
const productRouter = require('./routers/ProductRouter')
const adminVoteRouter = require('./routers/AdminVoteRouter')
const userVoteRouter = require('./routers/UserVoteRouter')


const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json({limit:"50mb"}))
app.use(cookieParser());

app.set('views', __dirname + '/frontend');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')

app.use(express.static(__dirname+'/frontend'))
// mendefinisikan router
app.get('/', Auth.UI, (req, res) => {
    res.redirect("/admin")
});
app.get('/login', (req, res) => {
    const token = req.cookies.access_token;
    if (token) {
        return res.redirect("/");
    }
    return res.render('login.html')
});
// app.get('/product',Auth.UI, (req, res) => {
//     return res.render('list_produk.html')
// });
app.get("/admin",Auth.UI,(req,res)=>{
    res.render("index")
})

app.use("/api/admin/vote", Auth.API, adminVoteRouter)
app.use("/api/vote", CORS, userVoteRouter )
app.use("/api/user", userRouter)
app.use("/api/product", Auth.API, productRouter)

// Konfigurasi Database
const dbConfig = require('./config/db.conf');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// koneksi Ke Database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully Sekarang Anda Terkonek Ke database");    
}).catch(err => {
    console.log('Error database Tidak Terkoneksi atau Tidak Ada');
    process.exit();
});

// listen for requests
app.listen(appConf.PORT, () => {
    console.log(`Server is listening on port ${appConf.PORT}`);
});