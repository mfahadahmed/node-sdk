/****************************************************************************
 * Copyright 2017, Optimizely, Inc. and contributors                   *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *    http://www.apache.org/licenses/LICENSE-2.0                            *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 ***************************************************************************/

var express = require('express');
var request = require('request');
var optimizelyClient = require('../../');
var Config = require('../models/config');
var Visitor = require('../models/visitor');
var Product = require('../models/product');
var DemoApp = require('../models/demo_app');

var router = express.Router();
var demoApp = new DemoApp();

// GET - get homepage data.
router.get('/', function(req, res) {
    res.send({
        status: 0,
        sdk_title: 'Optimizely Node SDK',
        doc_link: 'https://developers.optimizely.com/x/solutions/sdks/reference/index.html?language=node'
    });
});

// POST - set project configuration.
router.post('/config', function(req, res) {
    demoApp.config = new Config(req.body.project_id, req.body.experiment_key, req.body.event_key);
    var url = `https://cdn.optimizely.com/json/${demoApp.config.projectId}.json`;
    
    request.get(url, function (error, response, body) {
        // Retrieving project configuration.
        if (!error && response.statusCode == 200) {
            demoApp.config.projectConfigJson = JSON.parse(body);
            demoApp.optimizely = optimizelyClient.createInstance(
                {datafile: demoApp.config.projectConfigJson}
            );

            // Failure in creating optimizely instance.
            if (!(demoApp && demoApp.optimizely.isValidInstance)) {
                res.send({status: '2'});
            }

            // Project configuration saved successfully.
            res.send({
                status: 0,
                project_id: demoApp.config.projectId,
                experiment_key: demoApp.config.experimentKey,
                event_key: demoApp.config.eventKey,
                datafile_json: demoApp.config.projectConfigJson
            });
        }
        else {
            // Invalid project Id.
            res.send({status: 1});
        }
    });
});

// GET - get project configuration.
router.get('/config', function(req, res) {
    var projectId = null, experimentKey = null, eventKey = null, projectConfigJson = null;
    if (demoApp.config) {
        projectId = demoApp.config.projectId;
        experimentKey = demoApp.config.experimentKey;
        eventKey = demoApp.config.eventKey;
        projectConfigJson = demoApp.config.projectConfigJson;
    }

    res.send({
        status: 0,
        project_id: projectId,
        experiment_key: experimentKey,
        event_key: eventKey,
        datafile_json: projectConfigJson
    });
});

// POST - select visitor.
router.post('/select_visitor', function(req, res) {
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
