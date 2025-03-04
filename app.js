const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const mongooseConnection = require('./config/mongooseConnection')
const teamRouter = require('./routes/teamRouter')
const flagRouter = require('./routes/flagRouter')
const gameRouter = require('./routes/gameRouter')
require('dotenv').config()
const cors =require('cors')
const leaderboardRouter = require("./routes/leaderboardRouter")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const allowedOrigins = [
  'https://www.thecloudclub.in',
  'http://localhost:4200',
  'https://ctf.thecloudclub.in'
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.get("/",(req,res)=>{
    res.send("Cannot get /cft.thecloudclub.in/")
})
app.use('/team',teamRouter)
app.use('/flag',flagRouter)
app.use('/leaderboard',leaderboardRouter)
app.use('/gamestatus',gameRouter)

const PORT = process.env.PORT || 5000

app.listen(5000)