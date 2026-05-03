import nodemailer from 'nodemailer'

const buildEmailBody = ({
  name,
  email,
  projectType,
  budget,
  timeline,
  message,
}) => {
  return [
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
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed.' })
    return
  }

  const { name, email, projectType, budget, timeline, message } = req.body || {}

  if (!name || !email || !projectType || !message) {
    res.status(400).json({ ok: false, error: 'Missing required fields.' })
    return
  }

  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const mailFrom = process.env.MAIL_FROM
  const mailTo = process.env.MAIL_TO

  if (!smtpUser || !smtpPass || !mailFrom || !mailTo) {
    res.status(500).json({ ok: false, error: 'Email service not configured.' })
    return
  }

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
      subject: 'New Project Plan Request',
      text: buildEmailBody({ name, email, projectType, budget, timeline, message }),
    })

    res.json({ ok: true })
  } catch (error) {
    res.status(500).json({ ok: false, error: 'Email send failed.' })
  }
}
