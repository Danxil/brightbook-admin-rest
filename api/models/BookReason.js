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
      required: true,
    },
    author: {
      type: 'string',
      required: true,
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

