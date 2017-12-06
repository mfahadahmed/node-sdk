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

var Product = require('./product');
const IMAGE_DIR = 'public/images/';

// Controller class for Demo Application.
class DemoApp {
    /**
     * DemoApp constructor.
     */
    constructor() {
        this.optimizely = null;
        this.config = null;
        this.products = [
            new Product(1, 'Long Sleeve Swing Shirt', 'Baby Blue', 'Shirts', 54, IMAGE_DIR + 'item_7.png'),
            new Product(2, 'Bo Henry', 'Khaki', 'Shorts', 37, IMAGE_DIR + 'item_2.png'),
            new Product(3, 'The "Go" Bag', 'Forest Green', 'Bags', 118, IMAGE_DIR + 'item_3.png'),
            new Product(4, 'Springtime', 'Rose', 'Dresses', 84, IMAGE_DIR + 'item_4.png'),
            new Product(5, 'The Night Out', 'Olive Green', 'Dresses', 153, IMAGE_DIR + 'item_5.png'),
            new Product(6, 'Dawson Trolley', 'Pine Green', 'Shirts', 107, IMAGE_DIR + 'item_6.png'),
            new Product(7, 'Derby Hat', 'White', 'Hats', 100, IMAGE_DIR + 'item_1.png'),
            new Product(8, 'Long Sleever Tee', 'Baby Blue', 'Shirts', 62, IMAGE_DIR + 'item_8.png'),
            new Product(9, 'Simple Cardigan', 'Olive Green', 'Sweaters', 238, IMAGE_DIR + 'item_9.png')
        ];
    }
}

module.exports = DemoApp;