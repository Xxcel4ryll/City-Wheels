class Waybilling {
  static home(req, res) {
    res.render('home');
  }

  static signIn(req, res) {
    res.render('sign-in', { message: '' });
  }

  static signUp(req, res) {
    res.render('dashboard', { message: '' });
  }

  static profile(req, res) {
    res.render('profile', { message: '' });
  }
}

module.exports = Waybilling;
