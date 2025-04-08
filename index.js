import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.route("/signup")
    .get((req, res) => {
        res.sendFile(__dirname + "/signup.html");
    })
    .post(async (req, res) => {
        const {name,email,phno,password} = req.body
    
        const existingUser = await db.collection('users').findOne({ $or: [{ email: email }, { phno: phno }] });
    
        if (existingUser) {
            return res.status(400).send("User with the provided email or phone number already exists.");
        }
    
        var data = {
            "name": name,
            "email": email,
            "phno": phno,
            "password": password
        }
    
        db.collection('users').insertOne(data, (err, collection) => {
            if (err) {
                throw err;
            }
            console.log("Record Inserted Successfully");
        });
    
        return res.redirect('/signup_success.html');
    })

// app.post("/login", async (req, res) => {
//     const email = req.body.email;
//     const password = req.body.password;

//     try {
//         const user = await db.collection('users').findOne({ email: email, password: password });

//         if (!user) {
//            alert('Invalid Credentials.');
//            return false;
//         }

//         return res.redirect('home_page.html');
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("An error occurred while processing your request.");
//     }
// });

app.route("/login")
    .get((req,res)=>{
        res.sendFile(__dirname + "/public/login.html")
    })
    .post(async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
    
        try {
            const user = await db.collection('users').findOne({ email: email, password: password });
    
            if (!user) {
                return res.json({ success: false, message: "Invalid login credentials." });
            }
    
            return res.json({ success: true, message: "Login successful!" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: "An error occurred while processing your request." });
        }
    })

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});