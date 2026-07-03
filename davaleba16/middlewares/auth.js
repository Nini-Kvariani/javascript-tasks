const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        const userRole = req.headers['role']; 

        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: "წვდომა აკრძალულია. არასაკმარისი უფლებები." })
        }
        next()
    }
}

module.exports = { checkRole }