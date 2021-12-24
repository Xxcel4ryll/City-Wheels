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

  static clearCookies(req, res) {
    res.clearCookie('user');
  }
}

module.exports = Waybilling;
