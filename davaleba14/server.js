//4)შექმენი სერვერი სადაც გექნება როუტები,"/","/users","/posts".
//აუცილებელია გაუკეთო ორივეს pagination,id-ის მეშვეობით ძებნა და /users ასევე დაამატე name-ით ძებნა 

import http from "http"
import fs from "fs/promises"

const PORT = 8081

const server = http.createServer(async (req, res) => {
   res.setHeader("Content-Type", "application/json")

    const baseURL = `http://${req.headers.host}`
    const parsedURL = new URL(req.url, baseURL)
    const pathname = parsedURL.pathname

    try {
        //  მთავარი როუტი "/"
        if (pathname === "/") {
            return res.end(JSON.stringify({ message: "Welcome to the Home Page" }))
        }

        //  "/users" როუტი
        if (pathname === "/users") {
            const usersData = await fs.readFile("users.json", "utf-8")
            const users = JSON.parse(usersData)

            // ვიღებთ პარამეტრებს URL-დან
            const id = parsedURL.searchParams.get("id")
            const name = parsedURL.searchParams.get("name")
            const page = Number(parsedURL.searchParams.get("page")) || 1
            let take = Number(parsedURL.searchParams.get("take")) || 10  // default 10

            // ძებნა ID-ით
            if (id) {
                const userById = users.find(u => u.id === Number(id))
                return res.end(JSON.stringify(userById || { error: "User not found" }))
            }

            // ძებნა Name-ით
            if (name) {
                const userByName = users.filter(u => u.name.toLowerCase().includes(name.toLowerCase()))
                return res.end(JSON.stringify(userByName.length ? userByName : { error: "User not found" }))
            }

            // პაგინაცია (თუ ID და Name არ არის მითითებული)
            if (take > 30) take = 30
            const paginatedUsers = users.slice((page - 1) * take, page * take)
            return res.end(JSON.stringify(paginatedUsers))
        }

        // 3. "/posts" როუტი
        if (pathname === "/posts") {
            const postsData = await fs.readFile("posts.json", "utf-8")
            const posts = JSON.parse(postsData)

            const id = parsedURL.searchParams.get("id")
            const page = Number(parsedURL.searchParams.get("page")) || 1
            let take = Number(parsedURL.searchParams.get("take")) || 10

            // ძებნა ID-ით
            if (id) {
                const postById = posts.find(p => p.id === Number(id))
                return res.end(JSON.stringify(postById || { error: "Post not found" }))
            }

            // პაგინაცია
            if (take > 30) take = 30
            const paginatedPosts = posts.slice((page - 1) * take, page * take)
            return res.end(JSON.stringify(paginatedPosts))
        }

        // თუ არცერთი როუტი არ დაემთხვა
        res.writeHead(404)
        return res.end(JSON.stringify({ error: "Route not found" }))

    } catch (err) {
        res.writeHead(500)
        return res.end(JSON.stringify({ error: "Internal Server Error" }))
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})