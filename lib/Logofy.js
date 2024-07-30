const inquirer = require('inquirer');
const fs = require('fs');

const shapes = {
  circle: '<circle cx="150" cy="100" r="50" fill="{color}" />',
  triangle: '<polygon points="150,25 275,175 25,175" fill="{color}" />',
  square: '<rect x="75" y="50" width="150" height="150" fill="{color}" />'
};