//ArrayTasks

//1)let arr = [1, [2, 3, [4, 5]], 5, [2, [3, 6]]] დაალაგე ზრდადობით და ამოიღე უნიკალურები გამოიყენე ForLoop

let arr = [1, [2, 3, [4, 5]], 5, [2, [3, 6]]]

let flatArr = arr.flat(Infinity)

flatArr.sort((a, b) => a - b)

let uniqueArr = []
for (let i = 0; i < flatArr.length; i++) {
    if (!uniqueArr.includes(flatArr[i])) {
        uniqueArr.push(flatArr[i])
    }
}

console.log(uniqueArr)

//2)
let products = [
  { name:"Phone", price:1200, rating:4.5 },
  { name:"Laptop", price:2500, rating:4.8 },
  { name:"Book", price:30, rating:4.9 },
  { name:"TV", price:800, rating:4.0 }
]
//იპოვე ყველაზე მაღალი rating-ის მქონე პროდუქტი, მაგრამ ისეთი, რომლის ფასიც < 1000.


let affordableProducts = products.filter(prod => prod.price < 1000)

let topRated = affordableProducts.reduce((max, prod) => {
    return prod.rating > max.rating ? prod : max
}, affordableProducts[0])

console.log(topRated)

//3)let sentence = "dog cat dog bird cat dog fish bird"
//რედიუსის დახმარებით დათვალე რომელი რამდენჯერ მეორდება და for ლუპის დახმარებით იპოვე მეტჯერგამეორებული

let sentence = "dog cat dog bird cat dog fish bird";


let words = sentence.split(" ")

let wordCounts = words.reduce((tot, curr) => {
    if (tot[curr]) {
        tot[curr] += 1
    } else {
        tot[curr] = 1
    }
    return tot
}, {})

console.log(wordCounts)


let maxCount = 0;
let mostFrequentWord = ""

for (let word in wordCounts) {
    if (wordCounts[word] > maxCount) {
        maxCount = wordCounts[word]
        mostFrequentWord = word
    }
}

console.log(`ყველაზე ხშირად მეორდება: "${mostFrequentWord}" (${maxCount}-ჯერ)`)


//ForLoop tasks

//1)დაწერე ფუნქცია for loop-ის გამოყენებით, რომელიც დაითვლის რამდენჯერ გვხვდება კონკრეტული ასო მოცემულ სტრინგში. 

function countLetter(str, letter) {
    let count = 0
    
    for (let i = 0; i < str.length; i++) {
        if (str[i] === letter) {
            count++
        }
    }
    
    return count
}

console.log(countLetter("javascript", "a"))
console.log(countLetter("hello world", "l"))

//2) დაწერე ფუნქცია, რომელიც შეამოწმებს არის თუ არა სტრინგი პალინდრომი (ეს სიტყვა თუ იკითხება ერთნაირად ესე იგი პალინდრომია.
// მაგალითად ana, abba,gig) 

function isPalindrome(str) {
    let cleanStr = str.toLowerCase(); 
    
    for (let i = 0; i < cleanStr.length / 2; i++) {
        if (cleanStr[i] !== cleanStr[cleanStr.length - 1 - i]) {
            return false
        }
    }
    return true;
}

console.log(isPalindrome("ana"))
console.log(isPalindrome("abba"))
console.log(isPalindrome("geek"))

//3)შექმენი ფუნქცია, რომელიც მიიღებს ორ რიცხვების მასივს, გააერთიანებს მათ, წაშლის დუბლიკატებს და დაითვლის ჯამს. გამოიყენე მასივის
//  მეთოდები და ლოგიკური ოპერატორები საჭიროებისამებრ.

function mergeAndSum(arr1, arr2) {
    let combined = arr1.concat(arr2)
    
    let unique = [...new Set(combined)]
    
    let totalSum = unique.reduce((sum, curr) => sum + curr, 0)
    
    return totalSum;
}

console.log(mergeAndSum([1, 2, 3], [3, 4, 5]))

// 4)შექმენი ფუნქცია ფაქტორიალის დასათვლელად. 

function factorial(n) {
    if (n < 0) return "უარყოფითი რიცხვის ფაქტორიალი არ არსებობს"
    let result = 1
    
    for (let i = 1; i <= n; i++) {
        result *= i
    }
    
    return result
}

console.log(factorial(5))
console.log(factorial(0))

//5)Two Sum - მოძებნე მასივში ის წყვილები, რომელთა ჯამიც უდრის მოცემულ რიცხვს ანუ [1,2,3,4,5,6,-7,-8] ამ მასივს და -15 თუ 
// გადავცემთ მან უნდა დააბრუნოს [6,7]

function twoSum(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] + arr[j] === target) {
                return [arr[i], arr[j]]
            }
        }
    }
    return "წყვილი ვერ მოიძებნა"
}

let numbers = [1, 2, 3, 4, 5, 6, -7, -8]
console.log(twoSum(numbers, -15))
console.log(twoSum(numbers, 11))