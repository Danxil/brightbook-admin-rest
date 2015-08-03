/**
* BookReason.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    text: {
      type: 'string',
    },
    author: {
      type: 'string',
    },
    avatars: {
      collection: 'BookReasonAvatar',
      via: 'bookReason'
    },
    book: {
      model: 'book'
    }
  }
};

