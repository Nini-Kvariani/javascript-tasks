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