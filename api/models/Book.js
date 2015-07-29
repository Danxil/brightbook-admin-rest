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
    bookImages: {
      collection: 'BookImage',
      via: 'book'
    },
    bookBanners: {
      collection: 'BookBanner',
      via: 'book'
    },
    bookPreviews: {
      collection: 'bookPreview',
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
    bookReviews: {
      collection: 'BookReview',
      via: 'book'
    },
    bookReason: {
      model: 'BookReason',
    },
    bookFormat: {
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
    },
    length: {
      type: 'integer',
    },
    pdfLinks: {
      collection: 'PdfLink',
      via: 'book'
    },
    epubLinks: {
      collection: 'EpubLink',
      via: 'book'
    }
  }
};

