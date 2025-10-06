/**
 * Smart Chart Co-Pilot - Suggest Title Cloud Function
 * @version 0.1.0
 *
 * This is a hello world implementation to test Cloud Functions deployment.
 * Full Gemini AI integration will be implemented in FASE 2.
 */

const functions = require('@google-cloud/functions-framework');

/**
 * HTTP Cloud Function to suggest chart titles
 *
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 */
functions.http('suggestTitle', (req, res) => {
  // CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).send('');
  }

  // Hello world response
  res.json({
    status: 'ok',
    message: 'Cloud Function working!',
    version: '0.1.0',
    timestamp: new Date().toISOString()
  });
});
