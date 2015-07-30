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
    images: {
      collection: 'BookImage',
      via: 'book'
    },
    banners: {
      collection: 'BookBanner',
      via: 'book'
    },
    previews: {
      collection: 'bookPreview',
      via: 'book'
    },
    pdfLinks: {
      collection: 'PdfLink',
      via: 'book'
    },
    epubLinks: {
      collection: 'EpubLink',
      via: 'book'
    },
    categories: {
      collection: 'Category',
      via: 'books'
    },
    rubrics: {
      collection: 'Rubric',
      via: 'books'
    },
    authors: {
      collection: 'Author',
      via: 'books'
    },
    reviews: {
      collection: 'BookReview',
      via: 'book'
    },
    reason: {
      model: 'BookReason',
    },
    format: {
      model: 'BookFormat'
    },
    coverType: {
      model: 'CoverType'
    },
    priceE: {
      type: 'integer',
    },
    priceA: {
      type: 'integer',
    },
    countReeditions: {
      type: 'integer',
    },
    recommendRetailPrice: {
      type: 'integer',
    },
    about: {
      type: 'string',
    },
    dateFirstEdition: {
      type: 'date',
      notNull: true,
    },
    length: {
      type: 'integer',
    },
    toJSON: function() {
      var obj = this.toObject()
      obj.dateFirstEdition = obj.dateFirstEdition != '0000-00-00' ? obj.dateFirstEdition : null

      return obj
    }
  }
};

