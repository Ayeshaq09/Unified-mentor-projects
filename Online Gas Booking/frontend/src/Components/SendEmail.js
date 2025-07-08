import emailjs from "@emailjs/browser";

const SendEmail = async (toName, toEmail, status, fromEmail) => {
  console.log(process.env.REACT_APP_EMAIL_PUBLIC_KEY);
  emailjs.init({
    publicKey: process.env.REACT_APP_EMAIL_PUBLIC_KEY,
  });

  let message = `Your booking has been ${status}`;

  var templateParams = {
    to_name: toName,
    to_email: toEmail,
    message: message,
    from_name: 'Online Gas Booking',
    from_email: fromEmail,
  };

  try {
    const response = await emailjs.send(
      "service_l42r7zh",
      "template_nb2tg1g",
      templateParams
    );
    console.log("SUCCESS!", response.status, response.text);
  } catch (error) {
    console.error("FAILED...", error.message);
  }
};

export default SendEmail;
