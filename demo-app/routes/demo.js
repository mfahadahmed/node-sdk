var express = require('express');
var router = express.Router();

// GET - show home page.
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Optimizely Node SDK Demo App' });
});

// GET - get project configuration.
router.get('/config', function(req, res) {
  res.send(
      {
        service: "/config",
        type: "GET",
        status: "incomplete"
      }
    )
});

// GET - get visitors list.
router.get('/visitor', function(req, res) {
    res.send(
        {
          service: "/visitor",
          type: "GET",
          status: "incomplete"
        }
      )
});

// POST - select visitor.
router.post('/visitor', function(req, res) {
    res.send(
        {
          service: "/visitor",
          type: "POST",
          status: "incomplete"
        }
      )
});

// GET - get products list.
router.get('/products', function(req, res) {
    res.send(
        {
          service: "/products",
          type: "GET",
          status: "incomplete"
        }
      )
});

// POST - buy a product.
router.post('/buy', function(req, res) {
    res.send(
        {
          service: "/buy",
          type: "POST",
          status: "incomplete"
        }
      )
});

// GET - get log messages.
router.get('/messages', function(req, res) {
    res.send(
        {
          service: "/messages",
          type: "GET",
          status: "incomplete"
        }
      )
});

// POST - clear all log messages.
router.post('/messages', function(req, res) {
    res.send(
        {
          service: "/messages",
          type: "POST",
          status: "incomplete"
        }
      )
});

module.exports = router;
