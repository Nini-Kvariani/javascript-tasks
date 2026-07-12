//1)წაიკითხე ყველა რიცხვი ფაილიდან, გამოთვალე მათი ჯამი და ჩაწერე სხვა ფაილში

const fs = require("fs/promises")

async function task1() {
    await fs.writeFile("numbers.json", JSON.stringify([10, 20, 30, 40, 50]))
    
    let data = await fs.readFile("numbers.json", "utf-8")
    let numsArray = JSON.parse(data)
    
    let sum = numsArray.reduce((total, current) => total + current, 0)

    await fs.writeFile("sum.txt", sum.toString())
    console.log("დავალება 1: ჯამი ჩაწერილია sum.txt-ში")
}

task1()

//2)ერთი ფაილიდან წაიკითხე ტექსტი, გადაატრიალე (reverse) და ჩაწერე სხვა ფაილში

async function task2() {
    await fs.writeFile("original.txt", "Hello World")
    
    let text = await fs.readFile("original.txt", "utf-8")

    let reversedText = text.split("").reverse().join("")
 
    await fs.writeFile("reversed.txt", reversedText)
    console.log("დავალება 2:  ტექსტი შეტრიალებულია")
}
task2()

//3)შექმენი მომხმარებლების მასივი შემდეგი თვისებებით: name, age, email — შემდეგ ეს მონაცემები ჩაწერე data.json ფაილში

async function task3() {
    let users = [
        { name: "Giorgi", age: 22, email: "giorgi@gmail.com" },
        { name: "Nino", age: 25, email: "nino@gmail.com" },
        { name: "Luka", age: 16, email: "luka@gmail.com" }
    ]

    await fs.writeFile("data.json", JSON.stringify(users, null, 2))
    console.log("დავალება 3: მომხმარებლები ჩაიწერა data.json-ში")
}
task3()

//4)წაიკითხე მონაცემები ორ სხვადასხვა ფაილიდან და ჩაწერე ერთ ფაილში

async function task4() {
    // ვქმნით ფაილებს
    await fs.writeFile("fileA.txt", "ეს არის პირველი ფაილის ტექსტი. ")
    await fs.writeFile("fileB.txt", "ეს კი მეორე ფაილის ტექსტია.")
    
    // ვკითხულობთ 
    let text1 = await fs.readFile("fileA.txt", "utf-8")
    let text2 = await fs.readFile("fileB.txt", "utf-8")
    
    // ვაერთიანებთ 
    await fs.writeFile("combined.txt", text1 + text2)
    console.log("დავალება 4: ტექსტები გაერთიანდა combined.txt-ში")
}
task4()

//5)ჩაწერე ფაილში ტექსტი, შემდეგ წაიკითხე ეს მონაცემები და დათვალე რამდენი სიტყვაა

async function task5() {
    // ვწერთ ტექსტს
    await fs.writeFile("words.txt", "It's a rainy day today")
    
    // ვკითხულობთ
    let text = await fs.readFile("words.txt", "utf-8")
    
    //  ვითვლით სიტყვებს 
    let wordsArray = text.split(" ")
    console.log(`დავალება 5: ფაილში არის ${wordsArray.length} სიტყვა`)
}
task5()

//6)წაიკითხე მომხმარებლების JSON მონაცემები, გაფილტრე ისინი (ის ვინც 18 წელზე უფროსია) და თავიდან ჩაწერე

async function task6() {
    let data = await fs.readFile("data.json", "utf-8")
    let users = JSON.parse(data)
    
    // ვფილტრავთ 
    let adults = users.filter(user => user.age >= 18)
    
    // ვწერთ იმავე ფაილში
    await fs.writeFile("data.json", JSON.stringify(adults, null, 2))
    console.log("დავალება 6: ფაილში მხოლოდ სრულწლოვნები დარჩნენ")
}
task6()

//7)შექმენი სტუდენტების მასივი (name, score, passed), ჩაწერე students.json-ში.
//შემდეგ წაიკითხე და გაფილტრე ისინი, ვისი score 50-ზე მეტია, და ჩაწერე ახალ "passed.json" - ში

async function task7() {
    let students = [
        { name: "Mariami", score: 45, passed: false },
        { name: "Dato", score: 75, passed: true },
        { name: "Nika", score: 50, passed: false },
        { name: "Sopho", score: 90, passed: true }
    ]
    await fs.writeFile("students.json", JSON.stringify(students, null, 2))
    
    //ვფილტრავთ 
    let data = await fs.readFile("students.json", "utf-8")
    let parsedStudents = JSON.parse(data)
    let passedStudents = parsedStudents.filter(student => student.score > 50)
    
    //ვწერთ ახალ ფაილში
    await fs.writeFile("passed.json", JSON.stringify(passedStudents, null, 2))
    console.log("დავალება 7: ჩაბარებული სტუდენტები passed.json-ში არიან")
}
task7()

//8)წაიკითხე "users.json", და ყველას, ვისაც არ აქვს "@" ელფოსტაში, წაშალე
async function task8() {
    let initialUsers = [
  { "name": "Gio", "email": "gio@gmail.com" },
  { "name": "Nika", "email": "nikaexample.com" },
  { "name": "Mariam", "email": "mariam@reeducate.ge" },
  { "name": "Lasha", "email": "lashareeducate.ge" },
  { "name": "Ana", "email": "ana@mail.com" }
]
    await fs.writeFile("users.json", JSON.stringify(initialUsers, null, 2))
    
    let data = await fs.readFile("users.json", "utf-8")
    let users = JSON.parse(data)
    
    // ვტოვებთ მხოლოდ იმათ, ვის მეილშიც ურევია "@" სიმბოლო
    let validUsers = users.filter(user => user.email.includes("@"))
    
    await fs.writeFile("users.json", JSON.stringify(validUsers, null, 2))
    console.log("დავალება 8: არასწორი მეილები წაიშალა")
}

task8()