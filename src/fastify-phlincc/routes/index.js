// Import our Controllers
const subContorller = require('../controllers/subController');

const routes = [
  {
    method: 'GET',
    url: '/b64/:id',
    handler: subContorller.getSingleSubscribe
  },
  {
    method: 'POST',
    url: '/b64',
    handler: subContorller.addSubscribe
  },
  { method: 'POST',
    url: '/b64/check',
    handler: subContorller.checkSubscribe
  },
  {
    method: 'PUT',
    url: '/b64/:id',
    handler: subContorller.updateSubscribe
  },
  {
    method: 'DELETE',
    url: '/b64/:id',
    handler: subContorller.deleteSubscribe
  }
]

module.exports = routes;