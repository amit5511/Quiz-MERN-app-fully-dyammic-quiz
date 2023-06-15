import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path'
import authRoutes from './api/auth.js';
import quizRoutes from './api/quiz.js';
import questionRoutes from './api/questions.js';
import quizResponseRoutes from './api/quizResponse.js';

dotenv.config({path:'./.env'});

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URI = process.env.URL;
// Middleware
app.use(cors({
  origin:"*",
  
}));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
// Connection to DB
mongoose.connect(
  DB_URI,
  {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log('Connected to database')
);



// Routes
app.use('/auth', authRoutes);
app.use('quiz', quizRoutes);
app.use('/question', questionRoutes);
app.use('/response/', quizResponseRoutes);

//frontend setup
app.use(express.static(path.join('../client/build')));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve('../client/build/index.html'))
})


app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
