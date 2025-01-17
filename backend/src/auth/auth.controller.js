import { registerUser, loginUser } from './auth.service.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const register = async (req, res) => {
  try {
    const { email, password, fullname, phone, role, licenseno, chkname, chkposition, registerCode } = req.body

    if (role === 'STAFF' && registerCode !== process.env.STAFF_REGISTER_CODE) {
      return res.status(400).json({ message: 'รหัสลงทะเบียนไม่ถูกต้อง' })
    }
    if (role === 'DOCTOR' && registerCode !== process.env.DOCTOR_REGISTER_CODE) {
      return res.status(400).json({ message: 'รหัสลงทะเบียนไม่ถูกต้อง' })
    }

    const existingUser = await prisma.users.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ message: 'อีเมลนี้ถูกใช้งานแล้ว' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        fullname,
        phone,
        role,
        licenseno,
        chkname,
        chkposition
      }
    })

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      message: 'ลงทะเบียนสำเร็จ',
      user,
      token
    })

  } catch (err) {
    console.error('Register error:', err)
    res.status(500).json({ message: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const result = await loginUser(email, password)
    res.json({
      message: 'Login successful',
      ...result
    })
  } catch (error) {
    res.status(401).json({
      message: error.message
    })
  }
}

export const getMe = async (req, res) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: req.user.id }
    })
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    delete user.password
    res.json({ user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}