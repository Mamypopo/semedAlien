import prisma from '../config/database.js'
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

export async function registerUser(userData) {
  const { email, password, role, registerCode } = userData

  if (role === 'DOCTOR' && registerCode !== process.env.DOCTOR_REGISTER_CODE) {
    throw new Error('Invalid doctor register code')
  }
  if (role === 'STAFF' && registerCode !== process.env.STAFF_REGISTER_CODE) {
    throw new Error('Invalid staff register code')
  }

  const existingUser = await prisma.users.findUnique({ where: { email } })
  if (existingUser) {
    throw new Error('Email already exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  const { registerCode: _, ...userDataToSave } = userData

  const user = await prisma.users.create({
    data: {
      ...userDataToSave,
      password: hashedPassword
    }
  })

  delete user.password
  return user
}

export async function loginUser(email, password) {
  const user = await prisma.users.findUnique({ where: { email } })
  if (!user) {
    throw new Error('Invalid credentials')
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    throw new Error('Invalid credentials')
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  )

  delete user.password
  return { user, token }
}

export async function getUserById(userId) {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
      fullname: true,
      chkname: true,
      licenseno: true,
      chkposition: true,
      phone: true
    }
  })

  if (!user) {
    throw new Error('User not found')
  }

  return user
}