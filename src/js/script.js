require('nodelist-foreach-polyfill');
require('formdata-polyfill')
window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let mainSlider = require('./parts/mainSlider');

  mainSlider();

});