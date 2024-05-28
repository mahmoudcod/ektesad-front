const express = require('express');
const router = express.Router();
const { getSettings } = require('../graphql/settings');

router.post('/get-settings', async (req, res) => {
  const {
    data: { Settings }
  } = await getSettings();
  return res.json({
    status_code: 200,
    message: 'Settings set successfully',
    data: Settings[0]
  });
});

module.exports = router;
