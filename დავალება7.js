//1) შექმენი Triangle (სამკუთხედი) კლასი, რომელიც იღებს სამ გვერდს (a, b, c) და დაამატე 
//მეთოდები: getPerimeter(), getArea() , isRightTriangle().
class Triangle {
    constructor(a, b, c) {
        this.a = a
        this.b = b
        this.c = c
    }

    // პერიმეტრი
    getPerimeter() {
        return this.a + this.b + this.c
    }

    // ფართობი 
    getArea() {
        const s = this.getPerimeter() / 2
        const area = Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c))
        return Number(area.toFixed(2))
    }

    
    isRightTriangle() {
        const sides = [this.a, this.b, this.c].sort((x, y) => x - y)
        return Math.pow(sides[0], 2) + Math.pow(sides[1], 2) === Math.pow(sides[2], 2)
    }
}

const triangle = new Triangle(3, 4, 5)
console.log("პერიმეტრი:", triangle.getPerimeter())
console.log("ფართობი:", triangle.getArea())
console.log("მართკუთხაა?", triangle.isRightTriangle())


//2) შექმენი Smartphone (სმარტფონი) კლასი property-ებით: brand, model, releaseYear. 
//გააკეთე ექსტენშენი GamingPhone, რომელსაც დაემატება gpuScore და batteryCapacity, და დაამატე მეთოდი performanceIndex().

class Smartphone {
    constructor(brand, model, releaseYear) {
        this.brand = brand
        this.model = model
        this.releaseYear = releaseYear
    }
}

class GamingPhone extends Smartphone {
    constructor(brand, model, releaseYear, gpuScore, batteryCapacity) {
        super(brand, model, releaseYear)
        this.gpuScore = gpuScore
        this.batteryCapacity = batteryCapacity
    }

    performanceIndex() {
        const index = this.gpuScore + (this.batteryCapacity * 0.1)
        return `Performance Index for ${this.model}: ${index}`
    }
}

const myGamingPhone = new GamingPhone("ASUS", "ROG Phone 8", 2024, 9500, 5500)
console.log(myGamingPhone)
console.log(myGamingPhone.performanceIndex())

//3)შექმენი CryptoWallet (კრიპტო საფულე) კლასი, მეთოდებით: deposit(), withdraw(), transfer(), getHistory(),

class CryptoWallet {
    constructor(address, initialBalance = 0) {
        this.address = address
        this.balance = initialBalance
        this.history = []
    }


    deposit(amount) {
        if (amount <= 0) return "თანხა უნდა აღემატებოდეს 0-ს"
        this.balance += amount
        this.history.push({ type: "Deposit", amount, date: new Date().toLocaleTimeString() })
        return `ბალანსი შეივსო: +${amount}. მიმდინარე ბალანსი: ${this.balance}`
    }

    
    withdraw(amount) {
        if (amount > this.balance) return "არასაკმარისი ბალანსი!"
        this.balance -= amount
        this.history.push({ type: "Withdraw", amount, date: new Date().toLocaleTimeString() })
        return `თანხა გატანილია: -${amount}. მიმდინარე ბალანსი: ${this.balance}`
    }

    
    transfer(targetWallet, amount) {
        if (amount > this.balance) return "ტრანსფერი ვერ განხორციელდა: არასაკმარისი ბალანსი!"
        this.balance -= amount
        targetWallet.deposit(amount)
        this.history.push({ type: `Transfer to ${targetWallet.address}`, amount, date: new Date().toLocaleTimeString() })
        return `გადაირიცხა ${amount} მისამართზე: ${targetWallet.address}`
    }

    
    getHistory() {
        return this.history
    }
}


const walletA = new CryptoWallet("0xABC123", 100)
const walletB = new CryptoWallet("0xXYZ789", 10)

walletA.deposit(50)
walletA.withdraw(20)
walletA.transfer(walletB, 40)

console.log("Wallet A ისტორია:", walletA.getHistory())
console.log("Wallet A ბალანსი:", walletA.balance)
console.log("Wallet B ბალანსი:", walletB.balance)

//4)შექმენი Wishlist (სურვილების სია) კლასი, რომელიც ინახავს ნივთებს. მეთოდები: addItem(), deleteItem(id), updateItem()

class Wishlist {
    constructor() {
        this.items = []
    }

  
    addItem(id, name, price) {
        this.items.push({ id, name, price })
        return this
    }

    
    deleteItem(id) {
        this.items = this.items.filter(item => item.id !== id)
        return this
    }

    
    updateItem(id, updatedProperties) {
        this.items = this.items.map(item => {
            if (item.id === id) {
                return { ...item, ...updatedProperties }
            }
            return item
        })
        return this
    }

    
    showList() {
        console.log("Wishlist Items:", this.items)
    }
}

const myWishlist = new Wishlist()
myWishlist.addItem(1, "Laptop", 1200)
          .addItem(2, "Phone", 800)
          .addItem(3, "Headphones", 150)

myWishlist.deleteItem(2)
myWishlist.updateItem(1, { price: 1100 })

myWishlist.showList()

//5)შექმენი Freelancer (ფრილანსერი) კლასი მეთოდით calculateEarnings(), რომელიც დათვლის შემოსავალს შესრულებული საათებისა 
//და საათობრივი ტარიფის მიხედვით, დამატებით optional bonus-ს გადამეტებულ საათებზე (მაგ >160 სთ).

class Freelancer {
    constructor(name, hourlyRate) {
        this.name = name
        this.hourlyRate = hourlyRate
    }

    calculateEarnings(hoursWorked) {
        const standardHours = 160
        let totalEarnings = 0

        if (hoursWorked <= standardHours) {
           
            totalEarnings = hoursWorked * this.hourlyRate
        } else {
            
            const regularEarnings = standardHours * this.hourlyRate
          
            const overtimeHours = hoursWorked - standardHours
           
            const overtimeRate = this.hourlyRate * 1.5
            const overtimeEarnings = overtimeHours * overtimeRate

            totalEarnings = regularEarnings + overtimeEarnings
        }

        return `${this.name}-ის გამომუშავება ${hoursWorked} საათში არის: $${totalEarnings}`
    }
}


const freelancer = new Freelancer("გიორგი", 20)

// 1) ბონუსის გარეშე (150 საათი)
console.log(freelancer.calculateEarnings(150))

// 2) ბონუსით (170 საათი -> 160 ჩვეულებრივი + 10 ზეგანაკვეთური $30-ად)
console.log(freelancer.calculateEarnings(170))