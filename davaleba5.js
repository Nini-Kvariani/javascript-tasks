//1. დაწერე ფუნქცია , რომელიც არგუმენტად იღებს sec-ს და ითვლის უკუსვლით იქმადე სანამ 0-მდე არ მივა
function countdown(sec) {
    let timer = sec;
    let interval = setInterval(() => {
        console.log(timer)
        if (timer <= 0) {
            clearInterval(interval)
            console.log("დრო ამოიწურა!")
        }
        timer--
    }, 1000)
}

countdown(5)

//2. დაწერე ფუქნცია ფუქნციას გადააწოდე რიცხვი  და ასევე ლოგე რენდომული რიცხვი იქამდე სანამ ეს გადაცემული და რენდომ რიცხვი არ. დაემთხვევა ერთმამენთს

function matchRandom(targetNumber) {
    let interval = setInterval(() => {
        let randomNum = Math.floor(Math.random() * 10) + 1
        console.log(`გენერირებული რიცხვი: ${randomNum}`)

        if (randomNum === targetNumber) {
            console.log(`დაემთხვა! ორივე არის: ${randomNum}`)
            clearInterval(interval)
        }
    }, 500)
}

matchRandom(7)

//3.და წერე ფუქნცია რომელიც მიიღებს n და callback-ს როცა n > 27-ზე გაუშვი ეს callback-ი რომელიც დააკონსოლებს რომ ეს ნამდვილად მეტია 27-ზე სხვა შემთხვევაში დააკონსოლე რომ n ნაკლებია

function checkNumber(n, callback) {
    if (n > 27) {
        callback()
    } else {
        console.log(`${n} ნაკლებია ან ტოლია 27-ზე`)
    }
}

function successCallback() {
    console.log("მეტია 27-ზე!")
}

checkNumber(30, successCallback)
checkNumber(15, successCallback)

//4.დაწერე ფუქნცია რომელიც პარამეტრად მიიღებს API და დააბრუნებს ამ API-ში მყოფ  4 - users. https://jsonplaceholder.typicode.com/users დაწერე ორივენაირად than/catch & async/await

function fetchUsersThen(API) {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            let fourUsers = data.slice(0, 4)
            console.log("Then/Catch ვერსია:", fourUsers)
        })
        .catch(error => console.log("error", error))
}

fetchUsersThen("https://jsonplaceholder.typicode.com/users")

//5) დააწყვილე reduce-თი ცალკე ვისი ასაკიც მეტია 20 ზე და ვისი ასაკიც ნაკლებია 20
let people = [
  { name: "Giorgi", age: 25 },
  { name: "Nika", age: 15 },
  { name: "Mariam", age: 30 },
  { name: "Luka", age: 18 }
];

function groupPeopleByAge(array) {
    return array.reduce((tot, curr) => {
        if (curr.age > 20) {
            tot.over20.push(curr)
        } else {
            tot.under20.push(curr)
        }
        return tot;
    }, { over20: [], under20: [] })
}

const result = groupPeopleByAge(people);
console.log(result)

//6. დაწერე ფუნქცია რომელიც მიიღებს ორ რიცხვს და callback-ს. თუ პირველი მეტია მეორეზე გაუშვი callback და დაუბეჭდე "მეტია", სხვა შემთხვევაში "ნაკლები ან ტოლია".

function compareNumbers(num1, num2, callback) {
    if (num1 > num2) {
        callback("მეტია")
    } else {
        console.log("ნაკლები ან ტოლია")
    }
}

function logResult(message) {
    console.log(message)
}


compareNumbers(10, 5, logResult)
compareNumbers(3, 8, logResult)

//7.დაწერე reduce, რომელიც დააჯგუფებს - ცალკე 20-ზე მეტ ფასიან რიცხვებს და 
//ცალკე 20-ზე ნაკლები ან ტოლი ფასიანი ნივთები
let products = [
  { name: "Mouse", price: 15 },
  { name: "Keyboard", price: 45 },
  { name: "USB Cable", price: 7 },
  { name: "Headphones", price: 29.9 },
  { name: "Webcam", price: 52 }
];
const groupedProducts = products.reduce((tot, curr) => {
    if (curr.price > 20) {
        tot.expensive.push(curr)
    } else {
        tot.cheap.push(curr)
    }
    return tot
}, { expensive: [], cheap: [] })

console.log(groupedProducts)