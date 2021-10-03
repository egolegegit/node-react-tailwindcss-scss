/* eslint-disable no-process-exit */
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

const app = express()

app.use(express.json())
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
    })

    app.listen(PORT, () => console.log(`Server start on port ${PORT}...`))
  } catch (error) {
    console.log('Server Error', error.message)
    process.exit(1)
  }
}

start()
