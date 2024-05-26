const { calculateStoppages } = require('../utils/stoppageCalculator');

exports.getStoppages = async (req, res) => {
  const threshold = req.query.threshold ? parseInt(req.query.threshold) : 5; 
  if (isNaN(threshold)) {
    return res.status(400).json({ error: 'Invalid threshold value' });
  }

  try {
    const stoppages = await calculateStoppages(threshold);
    res.json(stoppages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
