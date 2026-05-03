import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()

const port = process.env.PORT || 3001
const origin = process.env.FRONTEND_ORIGIN || 'http://localhost:5173'
const smtpUser = process.env.SMTP_USER
const smtpPass = process.env.SMTP_PASS
const mailFrom = process.env.MAIL_FROM
const mailTo = process.env.MAIL_TO

if (!smtpUser || !smtpPass) {
  console.warn('SMTP credentials are missing. Emails will not send.')
}

app.use(cors({ origin }))
app.use(express.json({ limit: '1mb' }))

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/contact', async (req, res) => {
  const { name, email, projectType, budget, timeline, message } = req.body || {}

  if (!name || !email || !projectType || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields.' })
  }

  if (!smtpUser || !smtpPass || !mailFrom || !mailTo) {
    return res.status(500).json({ ok: false, error: 'Email service not configured.' })
  }

  const subject = 'New Project Plan Request'
  const body = [
    'Project Plan Request',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Project Type: ${projectType}`,
    `Budget Range: ${budget || 'Not specified'}`,
    `Timeline: ${timeline || 'Not specified'}`,
    '',
    'Goals & Success Metrics:',
    message,
  ].join('\n')

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      replyTo: email,
      subject,
      text: body,
    })

    return res.json({ ok: true })
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'Email send failed.' })
  }
})

app.listen(port, () => {
  console.log(`Contact API listening on port ${port}`)
})
