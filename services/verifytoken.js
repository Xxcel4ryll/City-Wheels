const jwt = require('../helpers/jwt');

const isAllowedRoles = (allowedRoles, role) => {
  allowedRoles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return allowedRoles
    .map((allowedRole) => allowedRole.toUpperCase())
    .includes(role.toUpperCase());
};

// role = 1 - user
// role = 2 - admin

module.exports =
  ({ allowedRoles }) =>
  async (req, res, next) => {
    if (!req.cookies.user)
      return res.render('sign-in', { message: 'Please log In' });

    const { token } = req.cookies.user;

    const decoded = await jwt.verify(token);

    if (!decoded || !token) {
      // return res.status(401).json({
      //   status: false,
      //   error: 'Invalid authorization token',
      // });
      return res
        .status(401)
        .render('sign-in', { message: 'Invalid Credentials' });
    }

    const { role, id } = decoded;

    try {
      req.user = id;
      req.role = role;

      if (req.role) {
        if (isAllowedRoles(allowedRoles, req.role)) {
          return next();
        } else {
          return (
            res
              .status(401)
              // .errorMessage('You are not authorized to perform this action');
              .render('error', {
                message: 'You are not authorized to perform this action',
                errorCode: 401,
              })
          );
        }
      }
    } catch (err) {
      console.log({ type: 'danger', msg: 'invalid token ' + err });

      return res.status(403).json({
        status: false,
      });
    }
  };
