const URL = require('../models/url');

// Display the home page with short url create form on GET
exports.url_create_get = async function (req, res, next) {
  const url_list = await URL.find({}).exec();
  res.render('index', { url_list, req });
};

// handle the get requests made using short urls
exports.short_url_get = async function (req, res, next) {
  const url = await URL.findOne({ 'url-code': req.params.urlCode }).exec();
  if (url) {
    url.clicks++;
    await url.save(); // persist the changes to the database
    res.redirect(url.original_url);
  } else {
    next();
  }
};

// handle the post requests made to create short urls
exports.short_url_create_post = async function (req, res, next) {
  const url = new URL({ original_url: req.body.original_url });
  try {
    await url.save();
    res.redirect('/');
  } catch (err) {
    next(err);
  }
};
