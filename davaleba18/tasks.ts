//დავალება 2: მომხმარებლის სახელის და ასაკის გამოტანა
function getUserInfo(name: string, age: number): string {
  return `User ${name} is ${age} years old.`
}
console.log("--- Task 2 ---")
console.log(getUserInfo("Nika", 22))


//დავალება 3: პროდუქტების ინტერფეისი და ფასის კალკულაცია
interface Product {
  name: string;
  price: number;
}

const products: Product[] = [
  { name: "Keyboard", price: 45 },
  { name: "Mouse", price: 25 },
  { name: "Headphones", price: 40 }
]

const totalPrice = products.reduce((sum, currentProduct) => sum + currentProduct.price, 0)
console.log("\n--- Task 3 ---")
console.log(`Total Price: $${totalPrice}`)
if (totalPrice > 100) {
  console.log("Discount available!")
}


//დავალება 4: IHero და ISuperHero ინტერფეისები
interface IHero {
  name: string;
  age: number;
}

interface ISuperHero extends IHero {
  power: string;
  level?: string;
}

function levelUp(hero: ISuperHero): void {
  if (hero.age > 30) {
    hero.level = "Pro";
  } else {
    hero.level = "Newbie";
  }
  console.log(`${hero.name} is now level: ${hero.level}`);
}

const hero1: ISuperHero = {
  name: "Batman",
  age: 35,
  power: "Stealth",
}

console.log("\n--- Task 4 ---")
levelUp(hero1)


// დავალება 5: Generic ფუნქცია 
function getFirstElement<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log("\n--- Task 5 ---")
const numbers = [10, 20, 30]
console.log("პირველი რიცხვი:", getFirstElement(numbers))

const strings = ["Apple", "Banana", "Cherry"]
console.log("პირველი ხილი:", getFirstElement(strings))