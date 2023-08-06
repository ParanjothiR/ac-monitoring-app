const handlebars = require('handlebars');
const helpers = require('handlebars-helpers')();

handlebars.registerHelper('isString', function (value, options) {
    return typeof value === 'string' ? options.fn(this) : options.inverse(this);
});

module.exports = handlebars;
