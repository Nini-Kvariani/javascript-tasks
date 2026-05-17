//1) გაქვს ლეპტოპების მასივი, იპოვე ყველაზე ძვირი და გამოიტანე კონსოლში
 const laptops = [
 { model: "Dell XPS 13", price: 1800 },
 { model: "MacBook Pro 14", price: 2499 },
 { model: "Lenovo ThinkPad X1", price: 2100 },
 { model: "Asus Zephyrus G14", price: 1999 },
];
let mostExpensive = laptops.reduce((prev,curr) => {
    return (prev.price > curr.price) ? prev : curr
})
console.log("ყველაზე ძვირიანი ლეპტოპია:", mostExpensive)

//2)შექმენი ობიექტი, რომელსაც ექნება width, height და getArea() მეთოდი, რომელიც დააბრუნებს ფართობს.
const square = {
    width: 15,
    height: 20,
    getArea: function(){
        return this.width * this.height
    }
}
console.log(square.getArea())

//3)დაბეჭდე მხოლოდ იმ სტუდენტების სახელები, რომელთაც passed === true.
const students = [
  { name: "Giorgi", score: 85, passed: true },
  { name: "Nika", score: 50, passed: false },
  { name: "Mariam", score: 92, passed: true },
  { name: "Luka", score: 60, passed: false }
];
let passedNames = students.filter(student => student.passed === true).map(student => student.name)
console.log(passedNames)

//4)გაფილტრე ისეთი პროდუქტები, რომლებიც 10$-ზე იაფია და დააბრუნე მხოლოდ მათი სათაურების მასივი.
const products = [
  { title: "Pencil", price: 2 },
  { title: "Notebook", price: 5 },
  { title: "Backpack", price: 35 },
  { title: "Ruler", price: 3 },
  { title: "Calculator", price: 40 }
];
let lowPrice = products.filter(product => product.price < 10).map(product => product.title)
console.log(lowPrice)


//5)დაალაგე ზრდადობით rating-ის მიხედვით
const movies = [
  { title: "Inception", rating: 9 },
  { title: "Avatar", rating: 7.5 },
  { title: "Joker", rating: 8.2 },
  { title: "Tenet", rating: 6.9 }
];
movies.sort((a,b) => a.rating - b.rating)
console.log(movies)

//6)იპოვე ყველაზე იაფი ტელეფონი და გამოიტანე მხოლოდ მისი model
const phones = [
  { model: "iPhone 15", price: 1200 },
  { model: "Samsung Galaxy S24", price: 950 },
  { model: "Xiaomi Redmi 13", price: 250 },
  { model: "Pixel 8", price: 800 }
];
let sortedPhones = phones.sort((a,b) => a.price - b.price)
console.log(sortedPhones[0].model)

//7)დაბეჭდე 300- გვერდიანზე მეტი 
const books = [
  { title: "Harry Potter", pages: 500 },
  { title: "The Little Prince", pages: 120 },
  { title: "Lord of the Rings", pages: 700 },
  { title: "Animal Farm", pages: 250 },
];
let filterPages = books.filter(book => book.pages > 300)
console.log(filterPages)


//8)დაალაგე ზრდადობით და შეკრიბე ფასი
const phones = [
  { model: "iPhone 15", price: 1200 },
  { model: "Samsung Galaxy S24", price: 950 },
  { model: "Xiaomi Redmi 13", price: 250 },
  { model: "Pixel 8", price: 800 }
];
let sortedPrices = phones.sort((a,b) => a.price - b.price)
console.log("დალაგებული ზრდადობით", sortedPrices)

let totalPrice = phones.reduce((tot,curr) => tot + curr.price , 0)
console.log("ჯამური ფასი:", totalPrice)