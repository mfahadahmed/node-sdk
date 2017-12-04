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

var Config = require('./config');
var Visitor = require('./visitor');
var Product = require('./product');

// Controller class for Demo Application.
class DemoApp {
    /**
     * DemoApp constructor.
     */
    constructor() {
        this.optimizely = null;
        this.config = null;
        this.visitors = [
            new Visitor(10001, 'Mike', 23),
            new Visitor(10002, 'Ali', 29),
            new Visitor(10003, 'Sally', 18),
            new Visitor(10004, 'Jennifer', 44),
            new Visitor(10005, 'Randall', 29)
        ];
        this.products = [
            new Product(1, 'Long Sleeve Swing Shirt', 'Baby Blue', 'Shirts', 54),
            new Product(2, 'Bo Henry', 'Khaki', 'Shorts', 37),
            new Product(3, 'The "Go" Bag', 'Forest Green', 'Bags', 118),
            new Product(4, 'Springtime', 'Rose', 'Dresses', 84),
            new Product(5, 'The Night Out', 'Olive Green', 'Dresses', 153),
            new Product(6, 'Dawson Trolley', 'Pine Green', 'Shirts', 107)
        ];
    }
}

module.exports = DemoApp;