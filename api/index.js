const express = require ( "express")
const bodyParser =require("body-parser")
const mongoose = require("mongoose")
const crypto = require ( "crypto")
const {User} = require("./models/user")
const jwt = require ( "jsonwebtoken")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()
const cors = require ( "cors")


const app= express()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI
const user = process.env.user
const pass= process.env.pass
app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

mongoose.connect(MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connected to mongodb")
}).catch((err)=>{
    console.log(err)
})

app.listen(PORT,()=>{
    console.log("server listening")
})


const sendVerificationEmail = async (email, verificationToken) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        // Configure the email service or SMTP details here
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user,
            pass
        },
        tls : { rejectUnauthorized: false }
    })

    // Compose the email message
    const mailOptions = {
        from: '"amazon.com " <sarina.johns97@ethereal.email>',
        to: email,
        subject: "Email Verification",
        text: `Please click the following link to verify your email: http://localhost:5000/verify/${verificationToken}`,
    };

    // Send the email
    await transporter.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);

        } else {
            console.log("Server is ready to take our messages");
        }
    });
}


app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log("Email already registered:", email); // Debugging statement
            return res.status(400).json({ message: "Email already registered" });
        }


        const newUser = new User({ name, email, password });


        newUser.verificationToken = crypto.randomBytes(20).toString("hex");

        await newUser.save();

        console.log("New User Registered:", newUser);

        await sendVerificationEmail(newUser.email, newUser.verificationToken);

        res.status(201).json({
            message:
                "Registration successful. Please check your email for verification.",
        });
    } catch (error) {
        console.log("Error during registration:", error); // Debugging statement
        res.status(500).json({ message: "Registration failed" });
    }
});


app.get("/verify/:token", async (req, res) => {
    try {
        const token = req.params.token;


        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(404).json({ message: "Invalid verification token" });
        }


        user.verified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        res.status(500).json({ message: "Email Verificatioion Failed" });
    }
});

const generateSecretKey=()=>{
    return crypto.randomBytes(32).toString("hex")
}

const secretKey = generateSecretKey()
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;


        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }


        if (user.password !== password) {
            return res.status(401).json({ message: "Invalid password" });
        }


        const token = jwt.sign({ userId: user._id }, secretKey);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
});

