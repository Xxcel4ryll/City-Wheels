const paystack = require('paystack-api')(process.env.PAYSTACK_SECRET_KEY);

module.exports = async (amount) => {
  return await paystack.transaction
    .initialize({
      email: 'xxcel@gmail.com',
      amount: `${amount.replace(/,/g, '')}00`,
    })
    .then((data) => {
      const authURL = data.data.authorization_url;
      //   res.redirect(`${authURL}`);
      return authURL;
      // sendSms();
    })
    .catch((err) => console.log(err.message));
};
