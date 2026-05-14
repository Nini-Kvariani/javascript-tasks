//1) გაამრავლე თითოეული ელემენტი 3-ზე.
//Input: [1,2,3] - Output: [3,6,9]
let Arr = [1,2,3]
let MappedArr = Arr.map((el) => el * 3)
console.log(MappedArr)

//2)გაფილტრე ისეთი რიცხვები რომლებიც იყოფა უნაშთოდ 3-ზე
let Arr = [1,2,3,4,7,9,15,23,27,36,44]
let FilteredArr = Arr.filter((el) => el % 3 === 0)
console.log(FilteredArr)

//3)დააბრუნე ყველა დადებითი რიცხვის ჯამი
let Arr = [1,2,-3,4,7,9,-15,23,27,-36,44]
let sumOfPos = 0
for (let i = 0; i < Arr.length; i++){
    if(Arr[i] > 0){
        sumOfPos += Arr[i]
    }
}
console.log(sumOfPos)

//ან
let Arr = [1,2,-3,4,7,9,-15,23,27,-36,44]
let sumOfPos = Arr.reduce((total,curr) => {
    return curr > 0 ? total + curr : total
}, 0)
console.log(sumOfPos)

//4)მოცემული სტრინგების მასივიდან წაშალე თითოეული სტრინგის ბოლო სიმბოლო
//let namesArr = ["giorgi","nika","mariami"]
let namesArr = ["giorgi","nika","mariami"]
let mappedName = namesArr.map((name) => name.slice(0,-1))
console.log(mappedName)

//5)გაამრავლე ყველა ელემენტი მასივში 2-ზე და შემდეგ ამოიღე რიცხვები, რომლებიც იყოფა 3-ზე
let Arr = [1,2,3,4,7,9,15,23,27,36,44]
let Multiplied = Arr.map((el) => el * 2)
let newArr = Multiplied.filter((el) => el % 3 === 0)
console.log(newArr)

//6) დაალაგე რიცხვები ზრდადობით let numsArr = [1,-1,-2,-10,111,3,2,5]
let numsArr = [1,-1,-2,-10,111,3,2,5]
let orderedArr = numsArr.sort((a,b) => a-b)
console.log(orderedArr)

//7)გაამრავლე ყველა ელემენტი 2-ზე და დატოვე მხოლოდ ისინი, რომლებიც 5-ზე მეტია.
let Arr = [1,2,3,4,7,9,15,23,27,36,44]
let filteredArr = Arr.map((el) => el * 2).filter((el) => el > 5)
console.log(filteredArr)

//8)let arr = [1,1,1,1,2,2,3,3,3] დააბრუნე let unque = [1,2,3]
let arr = [1,1,1,1,2,2,3,3,3]
let unique = [ ... new Set(arr)]
console.log(unique)

//9), დააბრუნეთ ორი ყველაზე მცირე რიცხვის ჯამს let arr = [-1,20,90,4,5,111]
let arr = [-1,20,90,4,5,111]
let sortedArr = arr.sort((a,b) => a-b)
let sumArr = sortedArr[0] + sortedArr[1]
console.log(sumArr)

