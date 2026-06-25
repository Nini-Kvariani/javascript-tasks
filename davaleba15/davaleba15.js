//შექმენი შენი სერვერი express-ის დახმარებით. ააწყე User-ის CRUD, რომელსაც ექნება:დამატება,წაშლა,აფდეითი,id-ის
//  მიხედვით ინფორმაციის წამოღება,ფეჯინეიშენი,სექრეთ როუტი, age და name იყოს აუცილებელი ფილდი, ხოლო email და eyecolor ოფშენალი.
//  ასევე არუნდა შეეძლოს 30 წელზე მეტის დარექვესთება და 10 წელზე ნაკლების.

const express = require("express")
const app = express()
const PORT = 3030
const cors = require("cors")

app.use(cors());
app.use(express.json());

//მონაცემები 
let users = [
    { id: 1, name: "Giorgi", age: 25, email: "giorgi@example.com", eyecolor: "brown" },
    { id: 2, name: "Nino", age: 28, email: "nino@example.com", eyecolor: "green" },
    { id: 3, name: "Luka", age: 15, email: "luka@example.com", eyecolor: "blue" },
    { id: 4, name: "Ana", age: 22, email: null, eyecolor: null }
];

app.get("/", (req, res) => {
    res.json("this is / request")
});

//  ყველა იუზერის წამოღება
app.get("/api/users", (req, res) => {
    let { page = 1, take = 3 } = req.query;
    take > 3 ? take = 3 : take; 
    res.json(users.slice((page - 1) * take, page * take))
});

//  id-ის მიხედვით ინფორმაციის წამოღება
app.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const findUser = users.find(el => el.id === Number(id))
    
    if (!findUser) {
        return res.status(404).json({ message: "not found (Id is invalid)", data: null })
    }
    res.json({ message: "found successfully", data: findUser })
});

//  დამატება 
app.post("/api/users", (req, res) => {
    const { name, age, email, eyecolor } = req.body;

    // ვალიდაცია:
    if (!name || !age) {
        return res.status(400).json({ message: "name and age are required fields!" })
    }

    if (age < 10 || age > 30) {
        return res.status(400).json({ message: "age must be between 10 and 30!" })
    }

    const lastID = users[users.length - 1]?.id || 0;
    
    let newUser = {
        id: lastID + 1,
        name,
        age,
        email: email || null, 
        eyecolor: eyecolor || null 
    };

    users.push(newUser)
    res.status(201).json({ message: "added successfully", data: users })
});

//  აფდეითი 
app.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, email, eyecolor } = req.body;
    
    const index = users.findIndex(el => el.id === Number(id))
    if (index === -1) {
        return res.status(404).json({ message: "id is invalid" })
    }

    // ასაკის ვალიდაცია აფდეითის დროსაც
    if (age !== undefined && (age < 10 || age > 30)) {
        return res.status(400).json({ message: "age must be between 10 and 30!" })
    }

    // ვანახლებთ მონაცემებს
    users[index] = {
        ...users[index],
        name: name || users[index].name,
        age: age || users[index].age,
        email: email !== undefined ? email : users[index].email,
        eyecolor: eyecolor !== undefined ? eyecolor : users[index].eyecolor
    };

    res.json({ message: "updated successfully", data: users[index] })
});

// წაშლა 
app.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(el => el.id === Number(id))
    
    if (index === -1) {
        return res.status(404).json({ message: "id is invalid" })
    }
    
    const deletedUser = users.splice(index, 1)
    res.json({ message: "deleted successfully", data: deletedUser })
});

// სექრეთ როუტი
app.get("/secret", (req, res) => {
    const secretKey = req.headers.secretkey
    if (!secretKey || secretKey !== "12345") {
        return res.status(401).json({ message: "unAuth", data: "ამ ინფორმაციას ვერ გაგატან სამწუხაროდ" });
    }
    res.json({ message: "Success", data: "საიდუმლო ინფორმაცია" })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})