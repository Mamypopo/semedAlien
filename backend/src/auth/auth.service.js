import prisma from '../config/database.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const registerUser = async (userData) => {
  const { email, password, role, registerCode } = userData

  if (role === 'DOCTOR' && registerCode !== process.env.DOCTOR_REGISTER_CODE) {
    throw new Error('Invalid doctor register code')
  }
  if (role === 'STAFF' && registerCode !== process.env.STAFF_REGISTER_CODE) {
    throw new Error('Invalid staff register code')
  }

  const existingUser = await prisma.users.findUnique({
    where: { email }
  })
  if (existingUser) {
    throw new Error('Email already exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.users.create({
    data: {
      ...userData,
      password: hashedPassword
    }
  })

  delete user.password
  return user
}

export const loginUser = async (email, password) => {
  const user = await prisma.users.findUnique({
    where: { email }
  })

  if (!user) {
    throw new Error('Invalid email or password')
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    throw new Error('Invalid email or password')
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  delete user.password
  return { user, token }
}