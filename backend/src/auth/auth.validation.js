export const validateRegister = async (req, res, next) => {
  const { email, password, fullname, phone, role, licenseno, chkname, chkposition, registerCode } = req.body

  // เช็คฟิลด์พื้นฐาน
  if (!email || !password || !role || !registerCode) {
    return res.status(400).json({
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน'
    })
  }

  // เช็ค email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'รูปแบบอีเมลไม่ถูกต้อง'
    })
  }

  // เช็ครหัสผ่านขั้นต่ำ 4 ตัว
  if (password.length < 4) {
    return res.status(400).json({
      message: 'รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร'
    })
  }

  // เช็คตาม role
  if (role === 'STAFF') {
    if (!fullname) {
      return res.status(400).json({
        message: 'กรุณากรอกชื่อ-นามสกุล'
      })
    }
  } else if (role === 'DOCTOR') {
    if (!licenseno || !chkname || !chkposition) {
      return res.status(400).json({
        message: 'กรุณากรอกข้อมูลแพทย์ให้ครบถ้วน'
      })
    }
  } else {
    return res.status(400).json({
      message: 'ประเภทผู้ใช้ไม่ถูกต้อง'
    })
  }

  next()
}

export const validateLogin = async (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({
      message: 'กรุณากรอกอีเมลและรหัสผ่าน'
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: 'รูปแบบอีเมลไม่ถูกต้อง'
    })
  }

  next()
}