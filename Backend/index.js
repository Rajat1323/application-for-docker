const app = require('./Server/server');
const userRouter = require('./Routes/userRoutes');
const authRouter =require('./Routes/authRoutes');

//routes for crud
app.use("/api/users", userRouter);

//routes for authentication
app.use('/api/auth', authRouter);

app.get("/",(req,res)=>{
    res.send("Welcome to User admin");
})
