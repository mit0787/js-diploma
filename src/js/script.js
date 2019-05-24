require('nodelist-foreach-polyfill');
require('formdata-polyfill')
window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let mainSlider = require('./parts/mainSlider'),
    secondSlider = require('./parts/secondSlider'),
    burgerMenu = require('./parts/burgerMenu'),
    modals = require('./parts/modals'),
    accordion = require('./parts/accordion'),
    images = require('./parts/images'),
    forms = require('./parts/forms');

  mainSlider();
  secondSlider();
  burgerMenu();
  modals();
  accordion();
  images();
  forms();
});