const nodemailer = require("nodemailer");

async function sendEmailToUser(receiver, token) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.nodeMailer_mail,
      pass: process.env.nodeMailer_pass,
    },
    secure: true,
    port: 465,
  });

  const mailOptions = {
    from: "PayTM Project",
    to: receiver,
    subject: "Reset password request",
    html: `<div style="font-family: Arial, sans-serif; background-color: #f7fafc; padding: 20px; width:100%">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); padding: 20px; position: relative;">
    <h1 style="text-align: center; font-size: 24px; color: #333; margin-bottom: 20px;">PayTM Project</h1>
    <div style="text-align: center; border: 1px solid #e2e8f0; padding: 20px; margin-bottom: 20px; border-radius: 8px; background-color: #f0f4f8; font-size: 18px;">
      <b style="font-size: 20px; color: #2d3748;">Password Reset Request</b>
      <p style="color: #4a5568; line-height: 1.5; margin-top: 10px;">We received a password reset request. Use the button below to reset your password:</p>
    </div>
    <div style="text-align: center;">
      <a href=${process.env.FRONTEND_BASE_URL}/reset-password/?token=${token} style="background-color: #20c130; color: white; padding: 12px 24px; font-size: 16px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
    </div>
  </div>
</div>
`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

module.exports = { sendEmailToUser };
