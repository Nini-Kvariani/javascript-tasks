const isAdmin = (req, res, next) => {
    const role = req.headers['user-role']
    if (role !== 'admin') {
        return res.status(403).json({ message: 'Access Denied: Requires Admin Role' })
    }
    next()
}

const isEditorOrAdmin = (req, res, next) => {
    const role = req.headers['user-role'];
    if (role !== 'admin' && role !== 'editor') {
        return res.status(403).json({ message: 'Access Denied: Requires Admin or Editor Role' })
    }
    next()
}

module.exports = { isAdmin, isEditorOrAdmin }