import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

sgMail.setApiKey(process.env.SG_API_KEY);
console.log(process.env.SG_API_KEY);

const sendEmail = async (user, token) => {
  const msg = {
    to: user.email,
    from: process.env.EMAIL_FROM,
    subject: "Password Reset",
    text: `
    Hello, ${user.username}
    We have sent you this email in response to your request to reset your password. To reset your password, please follow the link:${process.env.CLIENT_URL}/reset-password/${token}
    Please ignore this email if you did not request a password reset.
    `,
    html: `<style>
    * {
      margin: 0;
      padding: 0;
      font-size: 16px;
    }
    body {
      font-family: Arial, sans-serif;
    }
    table,
    td,
    tr {
      margin: 0;
      padding: 0;
    }
    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #0E1216;
    }
    .main {
      width: 100%;
      max-width: 600px;
      background-color: #0E1216;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .center {
      text-align: center;
    }
    .card {
      padding: 20px;
    }
    .card h1 {
      font-size: 24px;
      color: #26303B;
    }
    .black-card {
      background-color: #26303B;
      padding: 20px;
    }
    .icon {
      width: 60px;
      height: 60px;
      filter: invert(1);
    }
    .white {
      color: white;
      margin-top: 10px;
      font-size: 24px;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      background-color: #26303B;
      color: white;
      text-decoration: none;
      border-radius: 5px;
    }
    .flex-col-center {
      display: flex;
      flex-direction: column;
    }
    .italic {
      font-style: italic;
      font-size: 14px;
    }
    .whitesmoke {
      color: #E9EDF1;
    }
    .logo {
      width: 60px;
      height: 60px;
    }
    .flex-between {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .disclaimer {
      font-size: 12px;
      color: #26303B;
    }
  </style>
  <div class="wrapper">
    <table class="main">
      <tr>
        <td class="card center">
          <h1>NextUp</h1>
        </td>
      </tr>
      <tr>
        <td class="black-card center">
          <img
            src="https://i.postimg.cc/2jBfCPrZ/Change-Password-Icon.png"
            alt="change-password-icon"
            class="icon"
          />
          <h1 class="white">Please reset your password</h1>
        </td>
      </tr>
      <tr>
        <td class="card flex-col">
          <p>Hello, ${user}</p>
          <br />
          <p>
            You are receiving this email because we received a password reset
            request for your account.
          </p>
          <p>To reset your password, click the button below:</p>
          <br />
          <a
            href="${process.env.CLIENT_URL}/reset-password/${token}"
            alt="reset-password"
            class="btn"
          >
            Reset Password
          </a>
          <br />
          <br />
          <p class="italic">
            Please ignore this email if you did not request a password reset.
          </p>
          <br />
          <p>Regards,</p>
          <p>NextUp Team</p>
        </td>
      </tr>
      <tr>
        <td class="black-card flex-between">
          <div class="center" width="20%">
            <img
              src="https://i.postimg.cc/Yq0vCDGB/job-Hunter-Logo.png"
              alt="job-hunter-logo"
              class="logo"
            />
          </div>
          <div class="flex-col" width="80%">
            <p class="whitesmoke">NextUp</p>
            <p class="whitesmoke">mariusbobitiu--dev</p>
            <p class="whitesmoke">nextUp@mariusbobitiu.dev</p>
          </div>
        </td>
      </tr>
      <tr>
        <td class="card">
          <p class="disclaimer">
            This email is confidential and intended solely for the use of the
            individual to whom it is addressed. If you are not the intended
            recipient, be advised that you have received this email in error
            and that any use, dissemination, forwarding, printing, or copying
            of this email is strictly prohibited. If you have received this
            email in error, please notify the sender immediately and delete
            the email from your system.
          </p>
        </td>
      </tr>
    </table>
  </div>
    `,
  };

  try {
    await sgMail.send(msg).then(() => {
      console.log("Email sent");
    });
  } catch (error) {
    console.error("Error sending email:", error.response ? error.response.body : error);
  }
};

export default sendEmail;