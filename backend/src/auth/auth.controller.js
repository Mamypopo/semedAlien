import { registerUser, loginUser, getUserById } from './auth.service.js'

export async function register(req, res) {
  try {
    const user = await registerUser(req.body)
    res.status(201).json({
      message: 'ลงทะเบียนสำเร็จ',
      user
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(400).json({
      message: error.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
    })
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const result = await loginUser(email, password)
    res.json({
      message: 'เข้าสู่ระบบสำเร็จ',
      ...result
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(401).json({
      message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
    })
  }
}

export async function getMe(req, res) {
  try {
    const user = await getUserById(req.user.id)
    res.json({ user })
  } catch (error) {
    res.status(404).json({
      message: error.message || 'ไม่พบข้อมูลผู้ใช้'
    })
  }
}