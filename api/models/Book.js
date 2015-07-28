/**
* Book.js
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
    categories: {
      collection: 'category',
      via: 'books'
    },
    authors: {
      collection: 'author',
      via: 'books'
    },
    reviews: {
      collection: 'review',
      via: 'books'
    },
    format: {
      model: 'format'
    },
    coverType: {
      model: 'coverType'
    },
    preceE: {
      type: 'integer',
      required: true
    },
    preceA: {
      type: 'integer',
      required: true
    },
    countReeditions: {
      type: 'integer',
      required: true
    },
    recommendRetailPrice: {
      type: 'integer',
      required: true
    },
    about: {
      type: 'string',
      required: true
    },
    dateFirstEdition: {
      type: 'date',
      required: true
    },
    length: {
      type: 'integer',
      required: true
    }
  }
};

