/**
* Category.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    highlight: {
      type: 'boolean',
    },
    bgs: {
      collection: 'CategoryBg',
      via: 'category'
    },
    headerColor: {
      model: 'HeaderColor',
    },
    books: {
      collection: 'Book',
      via: 'categories'
    }
  }
};

