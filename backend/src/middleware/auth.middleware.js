import jwt from 'jsonwebtoken'

export const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        const token = authHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded // เก็บข้อมูลจาก token ไว้ใน req.user
        next()
    } catch (error) {
        console.error('Auth middleware error:', error)
        res.status(401).json({ message: 'Not authorized' })
    }
} 