//1)შექმენი utils/helepr.js. შექმენი ფუნქცია რომელსაც მიიღებს სტრინგს და გადააქცევს capital letter-ად. აუცილებელია გამოიყენო 
//module(package-დან შეცვალე)

export const capitalizeWord = (str) => {
    if (!str) return ""
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

//2)დაწერე ფუქნცია რომელიც შეამოწმებს გადმოცემული სტრინგი პალინდრომია თუ არა (ანუ ორივე მხრიდან თუ ერთნაირად იკითხება).
// აუცილებელია module(package-დან შეცვალე) გამოიყენო

export const isPalindrome = (str) => {
    const cleanedStr = str.replace(/[^A-Za-z0-9]/g, '').toLowerCase()
    const reversedStr = cleanedStr.split('').reverse().join('')
    return cleanedStr === reversedStr
}

//3)დაწერე ფუქნცია რომელიც იპოვის ყველაზე გრძელ სიტყვას როცა გადავცემ (I love JavaScript very much) - უნდა დააბრუნოს JavaScript.
//  აუცილებელია გამოიყენო module.

export const findLongestWord = (str) => {
    const words = str.split(' ')
    let longest = ""
    
    for (let word of words) {
        if (word.length > longest.length) {
            longest = word
        }
    }
    return longest
}

//4)შექმენი სერვერი სადაც გექნება როუტები,"/","/users","/posts".
//აუცილებელია გაუკეთო ორივეს pagination,id-ის მეშვეობით ძებნა და /users ასევე დაამატე name-ით ძებნა


import http from "http"
import fs from "fs/promises"

const PORT = 8081

const server = http.createServer(async (req, res) => {
   res.setHeader("Content-Type", "application/json")

    const baseURL = `http://${req.headers.host}`
    const parsedURL = new URL(req.url, baseURL)
    const pathname = parsedURL.pathname

    try {
        //  მთავარი როუტი "/"
        if (pathname === "/") {
            return res.end(JSON.stringify({ message: "Welcome to the Home Page" }))
        }

        //  "/users" როუტი
        if (pathname === "/users") {
            const usersData = await fs.readFile("users.json", "utf-8")
            const users = JSON.parse(usersData)

            // ვიღებთ პარამეტრებს URL-დან
            const id = parsedURL.searchParams.get("id")
            const name = parsedURL.searchParams.get("name")
            const page = Number(parsedURL.searchParams.get("page")) || 1
            let take = Number(parsedURL.searchParams.get("take")) || 10  // default 10

            // ძებნა ID-ით
            if (id) {
                const userById = users.find(u => u.id === Number(id))
                return res.end(JSON.stringify(userById || { error: "User not found" }))
            }

            // ძებნა Name-ით
            if (name) {
                const userByName = users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()))
                return res.end(JSON.stringify(userByName.length ? userByName : { error: "User not found" }))
            }

            // პაგინაცია (თუ ID და Name არ არის მითითებული)
            if (take > 30) take = 30
            const paginatedUsers = users.slice((page - 1) * take, page * take)
            return res.end(JSON.stringify(paginatedUsers))
        }

        // 3. "/posts" როუტი
        if (pathname === "/posts") {
            const postsData = await fs.readFile("posts.json", "utf-8")
            const posts = JSON.parse(postsData)

            const id = parsedURL.searchParams.get("id")
            const page = Number(parsedURL.searchParams.get("page")) || 1
            let take = Number(parsedURL.searchParams.get("take")) || 10

            // ძებნა ID-ით
            if (id) {
                const postById = posts.find(p => p.id === Number(id))
                return res.end(JSON.stringify(postById || { error: "Post not found" }))
            }

            // პაგინაცია
            if (take > 30) take = 30
            const paginatedPosts = posts.slice((page - 1) * take, page * take)
            return res.end(JSON.stringify(paginatedPosts))
        }

        // თუ არცერთი როუტი არ დაემთხვა
        res.writeHead(404)
        return res.end(JSON.stringify({ error: "Route not found" }))

    } catch (err) {
        res.writeHead(500)
        return res.end(JSON.stringify({ error: "Internal Server Error" }))
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

//5) შექმენი products-cli,რომელსაც ექნება დამატება,წაკითხვა,id-ის მიხედვით წაკითხვა, წაშლა და აფდეითი.fields(name,description,date,category) + მე 
// თუ გავატან option ის მიხედვით --isexpire. უნდა შეამოწმოს თარიღი და დაამატოს ვადა აქვს გასული თუ არა

#!/usr/bin/env node

import { Command } from "commander"
import fs from "fs/promises"

const program = new Command()
const FILE_NAME = "products.json"

// ფაილის წასაკითხად
async function readData() {
    const data = await fs.readFile(FILE_NAME, "utf-8")
    return JSON.parse(data)
}

// ფაილში ჩასაწერად
async function writeData(data) {
    await fs.writeFile(FILE_NAME, JSON.stringify(data, null, 2))
}

// წაკითხვა (ყველას გამოტანა)
program
    .command("show")
    .description("Show all products")
    .action(async () => {
        const products = await readData()
        console.log(products)
    })

//  წაკითხვა ID-ის მიხედვით
program
    .command("find")
    .description("Find product by ID")
    .argument("<id>", "Product ID")
    .action(async (id) => {
        const products = await readData();
        const product = products.find(p => p.id === Number(id))
        if (!product) return console.log("Product not found")
        console.log(product)
    })

//  დამატება (შემოწმებით: არის თუ არა ვადაგასული)
program
    .command("create")
    .description("Create a new product")
    .argument("<name>", "Product name")
    .argument("<description>", "Product description")
    .argument("<date>", "Expiration date (e.g., 2024-12-31)")
    .argument("<category>", "Product category")
    .option("-e, --isexpire", "Check if the product is expired based on date")
    .action(async (name, description, date, category, options) => {
        const products = await readData()
        const lastId = products.length > 0 ? products[products.length - 1].id : 0;
        
        let newProduct = {
            id: lastId + 1,
            name,
            description,
            date,
            category
        }

        // თუ მომხმარებელმა ტერმინალში --isexpire გადასცა
        if (options.isexpire) {
            const currentDate = new Date();
            const productDate = new Date(date);
            newProduct.isExpired = productDate < currentDate; 
        }

        products.push(newProduct);
        await writeData(products);
        console.log("Product created successfully:", newProduct);
    });

//  წაშლა
program
    .command("delete")
    .description("Delete a product by ID")
    .argument("<id>", "Product ID")
    .action(async (id) => {
        const products = await readData();
        const index = products.findIndex(p => p.id === Number(id));
        
        if (index === -1) return console.log("Product not found");
        
        const deletedProduct = products.splice(index, 1);
        await writeData(products);
        console.log("Deleted successfully:", deletedProduct);
    });

// განახლება
program
    .command("update")
    .description("Update a product")
    .argument("<id>", "Product ID")
    .argument("<name>", "New name")
    .argument("<description>", "New description")
    .argument("<date>", "New date")
    .argument("<category>", "New category")
    .action(async (id, name, description, date, category) => {
        const products = await readData();
        const index = products.findIndex(p => p.id === Number(id));
        
        if (index === -1) return console.log("Product not found");
        
        products[index] = { ...products[index], name, description, date, category };
        await writeData(products);
        console.log("Updated successfully!");
    })

program.parse()