require('nodelist-foreach-polyfill');
require('formdata-polyfill')
window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  let burgerMenu = require('./parts/burgerMenu'),
    mainSlider = require('./parts/mainSlider'),
    blocks = require('./parts/blocks'),
    calc = require('./parts/calc'),
    tabs = require('./parts/tabs'),
    images = require('./parts/images'),
    secondSlider = require('./parts/secondSlider'),
    accordion = require('./parts/accordion'),
    forms = require('./parts/forms'),
    validation = require('./parts/validation'),
    modals = require('./parts/modals');

  burgerMenu();
  mainSlider();
  blocks();
  calc();
  tabs();
  images();
  secondSlider();
  accordion();
  forms();
  validation();
  modals();
});