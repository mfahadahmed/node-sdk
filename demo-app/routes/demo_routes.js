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
var Product = require('../models/product');
var DemoApp = require('../models/demo_app');
var DemoAppLogger = require('../models/demo_logger');
var STATUS_CODES = require('../status_codes').STATUS_CODES;

var router = express.Router();
var DemoApplication = new DemoApp();

// GET - get homepage data.
router.get('/', function (req, res) {
    res.send({
        status: STATUS_CODES.SUCCESS,
        sdk_title: 'Node',
        doc_link: 'https://developers.optimizely.com/x/solutions/sdks/reference/index.html?language=node'
    });
});

// POST - set project configuration.
router.post('/config', function (req, res) {
    // Project Id must be provided.
    if (!req.body.project_id) {
        res.send({
            status: STATUS_CODES.EMPTY_PROJECT_ID
        });
    }

    DemoApplication.config = new Config(req.body.project_id, req.body.experiment_key, req.body.event_key);
    var url = `https://cdn.optimizely.com/json/${DemoApplication.config.projectId}.json`;

    request.get(url, function (error, response, body) {
        // Retrieving project configuration.
        if (!error && response.statusCode == 200) {
            DemoApplication.config.projectConfigJson = JSON.parse(body);
            DemoApplication.optimizely = optimizelyClient.createInstance({
                datafile: DemoApplication.config.projectConfigJson,
                logger: new DemoAppLogger()
            });

            // Uninitialized optimizely instance.
            if (!(DemoApplication.optimizely && DemoApplication.optimizely.isValidInstance)) {
                res.send({
                    status: STATUS_CODES.UNINITIALIZE_OPTIMIZELY_CLIENT
                });
            }

            // Project configuration saved successfully.
            res.send({
                status: STATUS_CODES.SUCCESS,
                project_id: DemoApplication.config.projectId,
                experiment_key: DemoApplication.config.experimentKey,
                event_key: DemoApplication.config.eventKey,
                datafile_json: DemoApplication.config.projectConfigJson
            });
        } else {
            // Datafile does not found against provided project Id.
            res.send({
                status: STATUS_CODES.DATAFILE_NOT_FOUND
            });
        }
    });
});

// GET - get project configuration.
router.get('/config', function (req, res) {
    var projectId = null,
        experimentKey = null,
        eventKey = null,
        projectConfigJson = null;
    if (DemoApplication.config) {
        projectId = DemoApplication.config.projectId;
        experimentKey = DemoApplication.config.experimentKey;
        eventKey = DemoApplication.config.eventKey;
        projectConfigJson = DemoApplication.config.projectConfigJson;
    }

    res.send({
        status: STATUS_CODES.SUCCESS,
        project_id: projectId,
        experiment_key: experimentKey,
        event_key: eventKey,
        datafile_json: projectConfigJson
    });
});

// POST - select visitor.
router.post('/visitor', function (req, res) {
    var visitorId = req.body.visitor_id;
    if (!visitorId) {
        // Visitor Id must be provided.
        res.send({
            status: STATUS_CODES.EMPTY_VISITOR_ID
        });
    }

    // Uninitialized Optimizely client.
    if (!(DemoApplication.config && DemoApplication.config.experimentKey && DemoApplication.optimizely)) {
        res.send({
            status: STATUS_CODES.UNINITIALIZE_OPTIMIZELY_CLIENT
        });
    }

    var products = DemoApplication.products.slice(0);
    var experimentKey = DemoApplication.config.experimentKey;
    var variation = DemoApplication.optimizely.activate(experimentKey, visitorId);

    // Applying variation.
    if (variation) {
        if (variation === 'sort_by_name') {
            products.sort((a, b) => a.name.localeCompare(b.name));
        } else if (variation === 'sort_by_price') {
            products.sort((a, b) => a.price - b.price);
        }
    }

    res.send({
        status: STATUS_CODES.SUCCESS,
        variation_key: variation,
        products: products
    });
});

// GET - get products list.
router.get('/products', function (req, res) {
    res.send({
        status: STATUS_CODES.SUCCESS,
        products: DemoApplication.products
    });
});

// POST - buy a product.
router.post('/buy', function (req, res) {
    var visitorId = req.body.visitor_id;
    if (!visitorId) {
        // Empty visitor Id.
        res.send({
            status: STATUS_CODES.EMPTY_VISITOR_ID
        });
    }

    var productId = req.body.product_id;
    if (!productId) {
        // Empty product Id.
        res.send({
            status: STATUS_CODES.EMPTY_PRODUCT_ID
        });
    }

    // Uninitialized Optimizely client.
    if (!(DemoApplication.config && DemoApplication.config.eventKey && DemoApplication.optimizely)) {
        res.send({
            status: STATUS_CODES.UNINITIALIZE_OPTIMIZELY_CLIENT
        });
    }

    var eventTags = {
        int_param: 420,
        string_param: "420",
        bool_param: false,
        revenue: 4200,
        value: 1000
    };

    DemoApplication.optimizely.track(DemoApplication.config.eventKey, visitorId, null, eventTags);
    res.send({
        status: STATUS_CODES.SUCCESS
    });
});

// GET - get all log messages.
router.get('/messages', function (req, res) {
    if (!(DemoApplication.optimizely && DemoApplication.optimizely.logger &&
            DemoApplication.optimizely.logger instanceof DemoAppLogger)) {
        res.send({
            status: STATUS_CODES.UNINITIALIZE_OPTIMIZELY_CLIENT
        });
    }

    res.send({
        status: STATUS_CODES.SUCCESS,
        logs: DemoApplication.optimizely.logger.getSortedLogs()
    });
});

// POST - remove all log messages.
router.post('/messages', function (req, res) {
    if (!(DemoApplication.optimizely && DemoApplication.optimizely.logger &&
            DemoApplication.optimizely.logger instanceof DemoAppLogger)) {
        res.send({
            status: STATUS_CODES.UNINITIALIZE_OPTIMIZELY_CLIENT
        });
    }

    DemoApplication.optimizely.logger.clearLogs();
    res.send({
        status: STATUS_CODES.SUCCESS
    });
});

module.exports = router;