
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