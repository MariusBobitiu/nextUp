import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";

dotenv.config();

sgMail.setApiKey(process.env.SG_API_KEY);
console.log(process.env.SG_API_KEY);
console.log(process.env.EMAIL_FROM);

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
    html: `<!--
    * This email was built using Tabular.
    * For more information, visit https://tabular.email
    -->
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
    <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <!--[if !mso]>-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="x-apple-disable-message-reformatting" content="" />
    <meta content="target-densitydpi=device-dpi" name="viewport" />
    <meta content="true" name="HandheldFriendly" />
    <meta content="width=device-width" name="viewport" />
    <meta name="format-detection" content="telephone=no, date=no, address=no, email=no, url=no" />
    <style type="text/css">
    table {
    border-collapse: separate;
    table-layout: fixed;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt
    }
    table td {
    border-collapse: collapse
    }
    .ExternalClass {
    width: 100%
    }
    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
    line-height: 100%
    }
    body, a, li, p, h1, h2, h3 {
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    }
    html {
    -webkit-text-size-adjust: none !important
    }
    body, #innerTable {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
    }
    #innerTable img+div {
    display: none;
    display: none !important
    }
    img {
    Margin: 0;
    padding: 0;
    -ms-interpolation-mode: bicubic
    }
    h1, h2, h3, p, a {
    line-height: 1;
    overflow-wrap: normal;
    white-space: normal;
    word-break: break-word
    }
    a {
    text-decoration: none
    }
    h1, h2, h3, p {
    min-width: 100%!important;
    width: 100%!important;
    max-width: 100%!important;
    display: inline-block!important;
    border: 0;
    padding: 0;
    margin: 0
    }
    a[x-apple-data-detectors] {
    color: inherit !important;
    text-decoration: none !important;
    font-size: inherit !important;
    font-family: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important
    }
    u + #body a {
    color: inherit;
    text-decoration: none;
    font-size: inherit;
    font-family: inherit;
    font-weight: inherit;
    line-height: inherit;
    }
    a[href^="mailto"],
    a[href^="tel"],
    a[href^="sms"] {
    color: inherit;
    text-decoration: none
    }
    img,p{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#9095a2;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:52px;font-weight:700;font-style:normal;font-size:48px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#000;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:700;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:700;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}
    </style>
    <style type="text/css">
    @media (min-width: 481px) {
    .hd { display: none!important }
    }
    </style>
    <style type="text/css">
    @media (max-width: 480px) {
    .hm { display: none!important }
    }
    </style>
    <style type="text/css">
    @media (min-width: 481px) {
    h2,h3{color:#333;mso-text-raise:2px}img,p{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:400;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#9095a2;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1,h2,h3{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;font-weight:700;font-style:normal;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;text-align:left;mso-line-height-rule:exactly}h1{line-height:52px;font-size:48px;color:#000;mso-text-raise:1px}h2{line-height:30px;font-size:24px}h3{line-height:26px;font-size:20px}.t21{padding-bottom:100px!important;width:620px!important}.t3{mso-line-height-alt:80px!important;line-height:80px!important}.t1{width:81px!important}.t26,.t7{mso-line-height-alt:40px!important;line-height:40px!important}.t5{padding-bottom:40px!important}.t4{line-height:52px!important;font-size:48px!important;mso-text-raise:1px!important}.t11,.t12,.t8{line-height:28px!important}.t11{mso-line-height-alt:28px!important}.t12,.t8{font-size:18px!important}.t15{mso-line-height-alt:50px!important;line-height:50px!important}.t16,.t17{line-height:48px!important;mso-text-raise:11px!important}.t16{font-size:13px!important}.t36{padding-top:80px!important;padding-bottom:80px!important;width:620px!important}.t24,.t28,.t32{width:600px!important}.t24{padding-bottom:60px!important}
    }
    </style>
    <style type="text/css" media="screen and (min-width:481px)">.moz-text-html img,.moz-text-html p{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:400;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#9095a2;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}.moz-text-html h1{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:52px;font-weight:700;font-style:normal;font-size:48px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#000;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px}.moz-text-html h2{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:700;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html h3{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:700;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}.moz-text-html .t21{padding-bottom:100px!important;width:620px!important}.moz-text-html .t3{mso-line-height-alt:80px!important;line-height:80px!important}.moz-text-html .t1{width:81px!important}.moz-text-html .t7{mso-line-height-alt:40px!important;line-height:40px!important}.moz-text-html .t5{padding-bottom:40px!important}.moz-text-html .t4{line-height:52px!important;font-size:48px!important;mso-text-raise:1px!important}.moz-text-html .t11{mso-line-height-alt:28px!important;line-height:28px!important}.moz-text-html .t8{line-height:28px!important;font-size:18px!important}.moz-text-html .t15{mso-line-height-alt:50px!important;line-height:50px!important}.moz-text-html .t12{line-height:28px!important;font-size:18px!important}.moz-text-html .t17{line-height:48px!important;mso-text-raise:11px!important}.moz-text-html .t16{line-height:48px!important;font-size:13px!important;mso-text-raise:11px!important}.moz-text-html .t36{padding-top:80px!important;padding-bottom:80px!important;width:620px!important}.moz-text-html .t26{mso-line-height-alt:40px!important;line-height:40px!important}.moz-text-html .t24{padding-bottom:60px!important;width:600px!important}.moz-text-html .t28,.moz-text-html .t32{width:600px!important}</style>
    <!--[if !mso]>-->
    <link href="https://fonts.googleapis.com/css2?family=Fira+Sans:wght@400;600;700&amp;family=Montserrat:wght@800&amp;display=swap" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <!--[if mso]>
    <style type="text/css">
    img,p{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:28px;font-weight:400;font-style:normal;font-size:18px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#9095a2;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px}h1{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:52px;font-weight:700;font-style:normal;font-size:48px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#000;text-align:left;mso-line-height-rule:exactly;mso-text-raise:1px}h2{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:30px;font-weight:700;font-style:normal;font-size:24px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}h3{margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:700;font-style:normal;font-size:20px;text-decoration:none;text-transform:none;letter-spacing:0;direction:ltr;color:#333;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px}td.t21{padding-bottom:100px !important;width:680px !important}div.t3{mso-line-height-alt:80px !important;line-height:80px !important}td.t1{width:81px !important}div.t7{mso-line-height-alt:40px !important;line-height:40px !important}td.t5{padding-bottom:40px !important}h1.t4{line-height:52px !important;font-size:48px !important;mso-text-raise:1px !important}div.t11{mso-line-height-alt:28px !important;line-height:28px !important}p.t8{line-height:28px !important;font-size:18px !important}div.t15{mso-line-height-alt:50px !important;line-height:50px !important}p.t12{line-height:28px !important;font-size:18px !important}td.t17{line-height:48px !important;mso-text-raise:11px !important}a.t16{line-height:48px !important;font-size:13px !important;mso-text-raise:11px !important}td.t36{padding-top:80px !important;padding-bottom:80px !important;width:680px !important}div.t26{mso-line-height-alt:40px !important;line-height:40px !important}td.t24{padding-bottom:60px !important;width:600px !important}td.t28,td.t32{width:600px !important}
    </style>
    <![endif]-->
    <!--[if mso]>
    <xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    </head>
    <body id="body" class="t40" style="min-width:100%;Margin:0px;padding:0px;background-color:#EDEDED;"><div class="t39" style="background-color:#EDEDED;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td class="t38" style="font-size:0;line-height:0;mso-line-height-rule:exactly;background-color:#EDEDED;" valign="top" align="center">
    <!--[if mso]>
    <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
    <v:fill color="#EDEDED"/>
    </v:background>
    <![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" align="center" id="innerTable"><tr><td>
    <table class="t22" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t21" style="background-color:#001E27;width:420px;padding:60px 30px 70px 30px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t21" style="background-color:#001E27;width:480px;padding:60px 30px 70px 30px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t20" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t19" style="width:475px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t19" style="width:475px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t2" role="presentation" cellpadding="0" cellspacing="0" align="left"><tr>
    <!--[if !mso]>--><td class="t1" style="width:40px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t1" style="width:40px;"><![endif]-->
    <div style="font-size:0px;"><img class="t0" style="display:block;border:0;height:auto;width:100%;Margin:0;max-width:100%;" width="81" height="69.109375" alt="" src="https://effcd2e9-eb3e-4761-8a61-25910f749a5e.b-cdn.net/e/0c6393f0-e626-4941-968e-033998a73a14/d174d2d9-cfa5-42ef-b9f0-10e8b259b94e.png"/></div></td>
    </tr></table>
    </td></tr><tr><td><div class="t3" style="mso-line-height-rule:exactly;mso-line-height-alt:50px;line-height:50px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t6" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t5" style="border-bottom:1px solid #E1E2E6;width:475px;padding:0 0 30px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t5" style="border-bottom:1px solid #E1E2E6;width:475px;padding:0 0 30px 0;"><![endif]-->
    <h1 class="t4" style="margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:38px;font-weight:700;font-style:normal;font-size:28px;text-decoration:none;text-transform:none;direction:ltr;color:#E9EDF1;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Reset your password</h1></td>
    </tr></table>
    </td></tr><tr><td><div class="t7" style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t10" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t9" style="width:475px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t9" style="width:475px;"><![endif]-->
    <p class="t8" style="margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#D0D8E1;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">You&#39;re receiving this e-mail because you requested a password reset for your nextUp account.</p></td>
    </tr></table>
    </td></tr><tr><td><div class="t11" style="mso-line-height-rule:exactly;mso-line-height-alt:18px;line-height:18px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t14" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t13" style="width:475px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t13" style="width:475px;"><![endif]-->
    <p class="t12" style="margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:26px;font-weight:400;font-style:normal;font-size:16px;text-decoration:none;text-transform:none;direction:ltr;color:#D0D8E1;text-align:left;mso-line-height-rule:exactly;mso-text-raise:3px;">Please tap the button below to choose a new password.</p></td>
    </tr></table>
    </td></tr><tr><td><div class="t15" style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t18" role="presentation" cellpadding="0" cellspacing="0" align="left"><tr>
    <!--[if !mso]>--><td class="t17" style="background-color:#F15025;overflow:hidden;width:246px;text-align:center;line-height:46px;mso-line-height-rule:exactly;mso-text-raise:10px;border-radius:40px 40px 40px 40px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t17" style="background-color:#F15025;overflow:hidden;width:246px;text-align:center;line-height:46px;mso-line-height-rule:exactly;mso-text-raise:10px;border-radius:40px 40px 40px 40px;"><![endif]-->
    <a class="t16" href="${process.env.CLIENT_URL}/reset-password/${token}" style="display:block;margin:0;Margin:0;font-family:Montserrat,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:46px;font-weight:800;font-style:normal;font-size:12px;text-decoration:none;text-transform:uppercase;letter-spacing:0.5px;direction:ltr;color:#FFFFFF;text-align:center;mso-line-height-rule:exactly;mso-text-raise:10px;" target="_blank">Reset your password</a></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr><tr><td>
    <table class="t37" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t36" style="background-color:#003141;width:420px;padding:60px 30px 60px 30px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t36" style="background-color:#003141;width:480px;padding:60px 30px 60px 30px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t35" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t34" style="width:475px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t34" style="width:475px;"><![endif]-->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td>
    <table class="t25" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t24" style="border-bottom:1px solid #262626;width:480px;padding:0 0 40px 0;">
    <!--<![endif]-->
    <!--[if mso]><td class="t24" style="border-bottom:1px solid #262626;width:480px;padding:0 0 40px 0;"><![endif]-->
    <h1 class="t23" style="margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:32px;font-weight:600;font-style:normal;font-size:32px;text-decoration:none;text-transform:none;direction:ltr;color:#FFFFFF;text-align:left;mso-line-height-rule:exactly;">nextUp</h1></td>
    </tr></table>
    </td></tr><tr><td><div class="t26" style="mso-line-height-rule:exactly;mso-line-height-alt:30px;line-height:30px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t29" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t28" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t28" style="width:480px;"><![endif]-->
    <p class="t27" style="margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#9095A2;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">If you do not want to change your password or didn&#39;t request a reset, you can ignore and delete this email.</p></td>
    </tr></table>
    </td></tr><tr><td><div class="t30" style="mso-line-height-rule:exactly;mso-line-height-alt:20px;line-height:20px;font-size:1px;display:block;">&nbsp;</div></td></tr><tr><td>
    <table class="t33" role="presentation" cellpadding="0" cellspacing="0" align="center"><tr>
    <!--[if !mso]>--><td class="t32" style="width:480px;">
    <!--<![endif]-->
    <!--[if mso]><td class="t32" style="width:480px;"><![endif]-->
    <p class="t31" style="margin:0;Margin:0;font-family:Fira Sans,BlinkMacSystemFont,Segoe UI,Helvetica Neue,Arial,sans-serif;line-height:22px;font-weight:400;font-style:normal;font-size:14px;text-decoration:none;text-transform:none;direction:ltr;color:#9095A2;text-align:left;mso-line-height-rule:exactly;mso-text-raise:2px;">nextUp. All rights reserved</p></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr></table></td>
    </tr></table>
    </td></tr></table></td></tr></table></div></body>
    </html>
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