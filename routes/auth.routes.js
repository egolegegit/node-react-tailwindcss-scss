const { Router } = require('express')
const config = require('config')
const router = Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')

// /api/auth/register
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длинна пароля 6 символов').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        })
      }

      const { email, password } = req.body
      const candidate = await User.findOne({ email: email })

      if (candidate) {
        return res.status(400).json('Such user already exists')
      }

      const hashedPassword = await bcrypt.hash(password, 12)

      const user = new User({
        username: email,
        email: email,
        password: hashedPassword,
        isAdmin: false,
      })

      await user.save()

      res.status(201).json('User successfully registered')
    } catch (error) {
      res.status(500).json('Registration error... Try again')
    }
  }
)

// /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в магазин',
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json('Пользователь не найден')
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Password does not match' })
      }

      const token = jwt.sign(
        { userId: user.id, isAdmin: user.isAdmin },
        config.get('jwtSecret'),
        {
          expiresIn: '1h',
        }
      )

      res.status(200).json({ token, userId: user.id })
    } catch (error) {
      res.status(500).json('Registration error... Try again')
    }
  }
)

module.exports = router
