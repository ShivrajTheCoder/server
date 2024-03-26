const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT;
const { createClient, StreamChat } = require("stream-chat");

const client = StreamChat.getInstance("ubeu99htkqtq", "m33a3d9yvtjd3xn28t3z8u7uczxjtpz8ddak75hbev59t2vrk8njcxctubsn83n2")


const users = [
    {
        id: "1",
        email: "xyz@gmail.com",
        password: "123",
        name: "boss"
    },
    {
        id: "2",
        email: "xyz@gmail.com",
        password: "123",
        name: "shtt",
    },
    {
        id: "3",
        email: "xyz@gmail.com",
        password: "123",
        name: "shivraj"
    }
]

app.use(express.json())
app.post("/login", async (req, res) => {
    const { id, password } = req.body;
    try {
        const user = users.find((user) => user.id === id && user.password === password);
        if (user) {
            const token = client.createToken(id);
            return res.status(200).json({ message: "Login success", user,token });
        }
        else {
            return res.status(500).json({ message: "Login failed" });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

app.post("/signup", async (req, res) => {
    const { id, email, password, name } = req.body;
    const user = users.find((user) => user.id === id);
    try {
        if (user) {
            return res.status(500).json({ message: "User already exists" });
        }
        else {
            users.push({ id, email, name, password });
            await client.upsertUser({
                id,
                email,
                name
            })
            const token = client.createToken(id);
            return res.status(200).json({ message: "User created successfully", token: token });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }

})


app.listen(PORT, () => console.log("Server is running on port 3000"))