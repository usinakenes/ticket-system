const nodemailer = require("nodemailer");

// send email
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "biljettsystemet@gmail.com",
    pass: "biljett123",
  },
});

async function sendMail(to, subject, order) {
  const totalPrice = order.tickets.reduce(
    (acc, ticket) => acc + ticket.price * ticket.purchased
    , 0);

  const html = generate_html(order, totalPrice);


  return new Promise((resolve, reject) => {
    var mailOptions = {
      from: "biljettsystemet@gmail.com",
      to,
      subject,
      html,
      attachments: [
        {
          filename: 'biljetta.png',
          path: __dirname + '/biljetta.png',
          cid: 'logo'
        },
        {
          filename: 'qr.png',
          path: __dirname + '/qr.png',
          cid: 'qr'
        },
      ]

    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email: " + error);
        reject(error);
      } else {
        console.log("Email sent: " + info.response);
        resolve(info);
      }
    });
  });
}




const generate_html = (order, totalPrice) => {
  const randomness = Date.now();

  return (`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      color: black;
    }
  </style>
</head>
<body>

<!-- this ensures Gmail doesn't trim the email -->
<span style="opacity: 0"> ${randomness} </span>

<div style="margin: 20px; background: white;">

  <!-- logo -->
  <div style="width: 100%;">
    <img src="cid:logo" alt="logo" width="150" style="display: block; margin: 16px auto;">
  </div>

  <!-- Some info -->
  <p style="text-align: center; margin: 20px;">
    Tack för ditt köp hos Biljetta!
    <br>
    Här är en orderbekräftelse på ditt köp.
  </p>

  <!-- Items -->
  <div style="box-sizing: border-box; border-radius: 1.5rem; background: #F1F5F9; padding: 20px; width: 100%; margin: auto;">
    <p style="font-weight: bold;">${order.event.longTitle}</p>
    <br>
    <p>Dina biljetter:</p>
    <div style="margin: 16px 0; height: 1px; background: #DAE1EA;"></div>

    <div>
      ${order.tickets.reduce((acc, ticket) => `
      ${acc}
      <div>
        ${ticket.name}
        <br>
        <p style="--tw-text-opacity: 1; color: #6B7280;">${ticket.purchased} x ${ticket.price}kr = ${ticket.purchased*ticket.price}kr</p>
      </div>

      <div style="margin: 16px 0; height: 1px; background: #DAE1EA;"></div>
      `
      , "")}
    </div>

    <br>

    Totalpris: <span class="font-bold" style="font-weight: bold;">${totalPrice}kr</span>

    <br>
    <br>

    <div>
      Ditt Ordernummer är:
      <span class="font-bold" style="font-weight: bold;">${order.id}</span>
    </div>
  </div>

  <!-- QR Code -->
  <div style="margin-top: 20px; width: 100%;">
    <p style="text-align: center;">Visa QR koden när du kommer till eventet!</p>
    <img src="cid:qr" alt="logo" width="200" style="display: block; margin: 0 auto;">
  </div>

</div>

<!-- this ensures Gmail doesn't trim the email -->
<span style="opacity: 0"> ${randomness} </span>
</body>
</html>
`);
}

exports.sendMail = sendMail;