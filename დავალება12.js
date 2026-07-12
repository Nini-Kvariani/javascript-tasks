//1)შექმენი 2 ფოლდერი 3 ფაილი, წაშალე მარტო ფოლდერები. შეამომწე lstat-ის მეშვეობით

const fs = require("fs/promises")

async function taskOne() {
    await fs.mkdir("Folder1", { recursive: true })
    await fs.mkdir("Folder2", { recursive: true })

    await fs.writeFile("File1.txt", "hello Giorgi")
    await fs.writeFile("File2.txt", "hello Nini")
    await fs.writeFile("File3.txt", "hello Nika")

    let items = await fs.readdir(__dirname)

    for (let item of items) {
        let infostat = await fs.lstat(item)
        
        if (infostat.isDirectory() && item.startsWith("Folder")) {
            await fs.rmdir(item)
            console.log(`${item} ფოლდერი წაიშალა`)
        }
    }
}

taskOne()

//2)შექმენი  მთავარი ფოლდერი, ფოლდერში აიღე ერთი main.js ამ main.js ით შექმენი (mkdir) ფოლდერი და ამ ფოლდერში ჩაწერე index.js 
//შემდეგ ამ index.js-ით ჩაწერე მთავარფოლდერში message.txt, ამ message.txt-ში რაც გექნება შეატრიალე ეგ სტრინგი და ისევ იგივეში ჩაწერე.

const fs = require("fs/promises")

async function main() {
    await fs.mkdir("newfolder", { recursive: true })

    const indexJsCode = `
const fs = require("fs/promises")

async function run() {
    await fs.writeFile("../message.txt", "Hello World")
    
    let data = await fs.readFile("../message.txt", "utf-8")

    let reversedStr = data.split("").reverse().join("")

    await fs.writeFile("../message.txt", reversedStr)
}

run()
    `

    await fs.writeFile("newfolder/index.js", indexJsCode.trim())
    console.log("newfolder და index.js შეიქმნა.შეგვიძლია გაუშვათ node newfolder/index.js")
}

main()

 //3) შექმენი ფოლდერი ამ ფოლდერში გქონდეს 6 ფაილი. 3 ფაილის გაფართოვება უნდა იყოს .txt. 3 ფაილის გაფართოვება უნდა იყოს .js. 
 //შენ უნდა იპოვო ,ისეთი ფაილები, რომლის გაფართოვებაცაა .txt და ისინი ჩწერო საერთო all.txt-ში

const fs = require("fs/promises")

async function task3() {
    const folderName = "mixed_files"
    await fs.mkdir(folderName, { recursive: true })


    await fs.writeFile(`${folderName}/1.txt`, "ეს არის პირველი ტექსტი. ")
    await fs.writeFile(`${folderName}/2.txt`, "ეს არის მეორე ტექსტი. ")
    await fs.writeFile(`${folderName}/3.txt`, "ეს არის მესამე ტექსტი. ")
    await fs.writeFile(`${folderName}/app1.js`, "console.log(1);")
    await fs.writeFile(`${folderName}/app2.js`, "console.log(2);")
    await fs.writeFile(`${folderName}/app3.js`, "console.log(3);")

    let items = await fs.readdir(folderName)
    
    let combinedText = ""

    for (let item of items) {
        if (item.endsWith(".txt")) {
            let content = await fs.readFile(`${folderName}/${item}`, "utf-8")
            combinedText += content + "\n"
        }
    }

    await fs.writeFile(`${folderName}/all.txt`, combinedText)
    console.log("ტექსტები გაერთიანდა all.txt ფაილში")
}

task3()

//4) დაწერე http სერვერი და გამოდგი 3 ენდფოინითი (/animals,/cars,/motorcycle)

const http = require("http")

let animals = [
    { type: "Dog", name: "Mailo" },
    { type: "Cat", name: "Phoebe" }
]

let cars = [
    { brand: "Toyota", model: "Camry" },
    { brand: "Hyundai", model: "Elantra" }
]

let motorcycles = [
    { brand: "Yamaha", model: "R1" },
    { brand: "Kawasaki", model: "Ninja" }
]

const server = http.createServer((req, res) => {
    if (req.url === "/animals") {
        res.writeHead(200, { "content-type": "application/json" })
        res.write(JSON.stringify(animals))
        res.end()
    }
    else if (req.url === "/cars") {
        res.writeHead(200, { "content-type": "application/json" })
        res.write(JSON.stringify(cars))
        res.end()
    }
    else if (req.url === "/motorcycle") {
        res.writeHead(200, { "content-type": "application/json" })
        res.write(JSON.stringify(motorcycles))
        res.end()
    }
    else {
        res.writeHead(404, { "content-type": "text/html" })
        res.write("<h1>404 - Page Not Found</h1>")
        res.end()
    }
})

server.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
})