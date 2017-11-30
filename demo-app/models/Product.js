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

// The Product class.
class Product {
    /**
     * Product constructor.
     * @param   {Number}        id
     * @param   {string}        name
     * @param   {string}        color
     * @param   {string}        category
     * @param   {Number}        price
    */
    constructor(id, name, color, category, price) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.category = category;
        this.price = price;
    }
}

module.exports = Product;
