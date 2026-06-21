//1) შექმენი utils/helper.js სადაც გექნება ფუქნციები read(უნდა პარსავდეს true-ს გადაწოდების შემდეგ) და write(ანალოგიურად stringify-უნდა გაუკეთოს).
//შექმენი ამ ფუქნციებით 2 ფაილი და ჩაწერე შიგნით ნებისმიერი რამ. ასევე ჰელფერებში დაამატე ჯამის დათვლა და სტრინგის შეტრიალების ფუქნცია.

const fs = require("fs/promises")

async function read(path, isJson) {
    let data = await fs.readFile(path, "utf8")
    if (isJson) {
        return JSON.parse(data)
    }
    return data;
}

async function write(path, data) {
    if (typeof data === "object") {
        await fs.writeFile(path, JSON.stringify(data, null, 2))
    } else {
        await fs.writeFile(path, data)
    }
}

function calculateSum(arr) {
    return arr.reduce((a, b) => a + b, 0)
}

function reverseSTR(str) {
    return str.split("").reverse().join("")
}

module.exports = { read, write, calculateSum, reverseSTR }

const { read, write, calculateSum, reverseSTR } = require("./utils/helper")

async function main() {
    await write("textData.txt", "Hello NodeJS")
    await write("jsonData.json", [{ message: "Hello JSON" }])

    console.log(reverseSTR("giorgi"))
    console.log(calculateSum([1, 2, 3, 4]))
}

main()

//2)წამოიღე ინფორმაცია ამ ორი api-დან
//let api = https://jsonplaceholder.typicode.com/users
//let api2 = https://jsonplaceholder.typicode.com/posts
//1)გამოიყენე axios და ერთდროულად გაუშვი 2 API.
//2)გაუშვი ორივე ერთად და რომელიც პირველი მოვა ის დააკონსოლე.
//3)გაუშვი ორივე ერთად და დააბრუნე ინფრომაცია რომელი დარესოლვდა დარეჯექთდა და ა.შ.


const axios = require("axios")

let api = "https://jsonplaceholder.typicode.com/users"
let api2 = "https://jsonplaceholder.typicode.com/posts"

async function fetchApis() {
    let [users, posts] = await Promise.all([axios.get(api), axios.get(api2)])
    console.log("Promise.all result:", users.data.length, posts.data.length)

    let first = await Promise.race([axios.get(api), axios.get(api2)])
    console.log("Promise.race result (პირველი მოვიდა):", first.config.url)

    let settledInfo = await Promise.allSettled([axios.get(api), axios.get(api2)])
    console.log("Promise.allSettled result:", settledInfo)
}

fetchApis()

//3)commander-ით შექმენი phone-cli, რომელსაც ექნება დამატება,წაშლა,id-ის მიხედვით კონკრეტული ობიექტის ამოღება, და option-ის 
//მიხედვით(--america)- ამ ოფშენს თუ გადავცემთ ნომერს წინ უნდა დაუამტოს 011 (ანუ phone-cli add giorgi 574221355 --america)- ასე თუ გადავცემთ
//უნდა დაამტოს 011574221355

#!/usr/bin/env node

const { Command } = require("commander")
const { read, write } = require("./utils/helper")
const program = new Command()

program
    .command("add")
    .description("add user phone")
    .argument("<name>")
    .argument("<phone>")
    .option("--america", "add 011 prefix")
    .action(async (name, phone, options) => {
        let readDAtaJson = [];
        try {
            readDAtaJson = await read("data.json", true)
        } catch (error) {
            readDAtaJson = []
        }

        let lastID = readDAtaJson[readDAtaJson.length - 1]?.id || 0
       
        let finalPhone = options.america ? "011" + phone : phone

        let newObj = {
            id: lastID + 1,
            name,
            phone: finalPhone
        }

        readDAtaJson.push(newObj)
        await write("data.json", readDAtaJson)
    });

program
    .command("delete")
    .description("delete user by id")
    .argument("<id>")
    .action(async (id) => {
        let readDAtaJson = await read("data.json", true);
        readDAtaJson = readDAtaJson.filter(el => el.id !== +id)
        await write("data.json", readDAtaJson)
    })

program
    .command("get")
    .description("get specific user by id")
    .argument("<id>")
    .action(async (id) => {
        let readDAtaJson = await read("data.json", true)
        let user = readDAtaJson.find(el => el.id === +id)
        console.log(user)
    })

program.parse()