//1) function block(){
//    for(let i = 1 ;i <10000000000;i++){}
//}

//console.log("one")
//block()
//console.log("two")
//იპოვე გამოსავალი როგორ შეიძლება გაეშვას ჯერ  console.log("one") console.log("two") შემდეგ ფუნქცია
//აუცილებელია გამოიყენო ფრომისი

function block() {
    return Promise.resolve().then(() => {
        for (let i = 1; i < 10000000000; i++) {}
        console.log("მძიმე ციკლი დასრულდა")
    })
}

console.log("one")
block()
console.log("two")


//2)ორი პრომისი შექმენი (ერთმა დაარესოლვოს, ერთმა დაარეჯექთოს) და ორივე შემთხვევა დაამუშავე then/catch-ით  ცალცალკეც და “ჯგუფურადაც”  - ჯგუფურად Allsetteld გამოიყენე.

const p1 = new Promise((res) => res("წარმატება 1"))
const p2 = new Promise((res, rej) => rej("შეცდომა 2"))

p1.then(res => console.log("p1:", res)).catch(err => console.log("p1 შეცდომა:", err))
p2.then(res => console.log("p2:", res)).catch(err => console.log("p2 შეცდომა:", err))

Promise.allSettled([p1, p2]).then(results => {
    console.log("ჯგუფური შედეგი:", results)
})

//3)შექენი 4 პრომისი (ზოგი resolve, ზოგი reject). დააბრუნე მარტო პირველი დარესოლვებული

const pr1 = new Promise((res, rej) => setTimeout(() => rej("უარყოფილი 1"), 500))
const pr2 = new Promise((res) => setTimeout(() => res("პირველი წარმატებული!"), 1000))
const pr3 = new Promise((res) => setTimeout(() => res("მეორე წარმატებული!"), 1500))
const pr4 = new Promise((res, rej) => setTimeout(() => rej("უარყოფილი 2"), 200))

Promise.any([pr1, pr2, pr3, pr4])
    .then(res => console.log("პირველი დარეზოლვებული:", res))
    .catch(err => console.log("ყველა უარყოფილია:", err))

//4)შექმენი 4 ფრომისი  და რედიუსით დაითვალე რამდენია წარმატებული და რამდენი წარუმატებელი

const prom1 = Promise.resolve("OK1")
const prom2 = Promise.reject("ERR1")
const prom3 = Promise.resolve("OK2")
const prom4 = Promise.reject("ERR2")

Promise.allSettled([prom1, prom2, prom3, prom4]).then(results => {
    let count = results.reduce((tot, curr) => {
        if (curr.status === "fulfilled") {
            tot.resolved++
        } else {
            tot.rejected++
        }
        return tot
    }, { resolved: 0, rejected: 0 })

    console.log("სტატუსების რაოდენობა:", count)
})

//5) შექმენი 5 ფრომისი და გაფილტრე ეს ფრომისები დააბრუნე ამრტო წარუმატებლები

const promise1 = Promise.resolve("სწორია 1")
const promise2 = Promise.reject("შეცდომა 1")
const promise3 = Promise.resolve("სწორია 2")
const promise4 = Promise.reject("შეცდომა 2")
const promise5 = Promise.reject("შეცდომა 3")

Promise.allSettled([promise1, promise2, promise3, promise4, promise5]).then(results => {
    let onlyRejected = results.filter(el => el.status === "rejected")
    console.log("მხოლოდ წარუმატებლები:", onlyRejected)
})

//6)api1 = https://jsonplaceholder.typicode.com/users
//api2 = https://jsonplaceholder.typicode.com/posts
//გაუშვი ეს ორი API ერთდროულად

const api1 = "https://jsonplaceholder.typicode.com/users";
const api2 = "https://jsonplaceholder.typicode.com/posts";

async function fetchBothAPIs() {
    try {
        const [usersRes, postsRes] = await Promise.all([fetch(api1), fetch(api2)])
        
        const users = await usersRes.json()
        const posts = await postsRes.json()

        console.log("მომხმარებლები:", users)
        console.log("პოსტები:", posts)
    } catch (error) {
        console.log("მონაცემების წამოღებისას დაფიქსირდა შეცდომა:", error)
    }
}

fetchBothAPIs()