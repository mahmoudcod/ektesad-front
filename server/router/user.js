const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  if (req.body) {
    req.session.user = req.body.user;
    return res.json({
      status_code: 200,
      message: 'User login successfully'
    });
  }
  return res.redirect('/');
});

router.post('/register', (req, res) => {
  if (req.body) {
    req.session.user = req.body.user;
    return res.json({
      status_code: 200,
      message: 'User register successfully'
    });
  }
  return res.redirect('/');
});

router.post('/editProfile', (req, res) => {
  if (req.body) {
    req.session.user = req.body.user;
    return res.json({
      status_code: 200,
      message: 'User update profile successfully'
    });
  }
  return res.redirect('/');
});

router.post('/logout', (req, res) => {
  if (req.session) {
    if (req.session.user) {
      delete req.session.user;
    }
    if (req.session.cart) {
      delete req.session.cart;
    }
    return res.json({
      status_code: 200,
      message: 'Logout successfully'
    });
  }
  return res.redirect('/');
});

module.exports = router;
