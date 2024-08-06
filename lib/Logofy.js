const inquirer = require('inquirer');
const fs = require('fs');

const shapes = {
  circle: '<circle cx="150" cy="100" r="50" fill="{fillColor}" stroke="{strokeColor}" stroke-width="3" />',
  triangle: '<polygon points="150,25 275,175 25,175" fill="{fillColor}" stroke="{strokeColor}" stroke-width="3" />',
  square: '<rect x="75" y="50" width="150" height="150" fill="{fillColor}" stroke="{strokeColor}" stroke-width="3" />',
  ellipse: '<ellipse cx="150" cy="100" rx="100" ry="50" fill="{fillColor}" stroke="{strokeColor}" stroke-width="3" />',
  star: '<polygon points="150,25 179,111 269,111 196,165 217,251 150,200 83,251 104,165 31,111 121,111" fill="{fillColor}" stroke="{strokeColor}" stroke-width="3" />'
};

const Colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'black', 'white'];

async function generateLogo() {
  const answers = await inquirer.prompt([
    { name: 'text', message: 'Enter up to three characters:', validate: input => input.length <= 3 || 'Text should be up to three characters' },
    { name: 'textColor', type: 'list', message: 'Select text color:', choices: Colors },
    { name: 'shape', type: 'list', message: 'Choose a shape:', choices: ['circle', 'triangle', 'square', 'ellipse', 'star'] },
    { name: 'fillColor', type: 'list', message: 'Select shape fill color:', choices: Colors },
    { name: 'strokeColor', type: 'list', message: 'Select shape stroke color:', choices: Colors },
    { name: 'fontSize', message: 'Enter font size (default is 60):', validate: input => !input || !isNaN(input) || 'Font size should be a number', default: 60 }
  ]);

  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapes[answers.shape].replace('{fillColor}', answers.fillColor).replace('{strokeColor}', answers.strokeColor)}
      <text x="150" y="100" font-size="${answers.fontSize}" text-anchor="middle" dominant-baseline="middle" fill="${answers.textColor}">${answers.text}</text>
    </svg>
  `;

  fs.writeFileSync('logo.svg', svgContent.trim());
  console.log('Generated logo.svg');
}

module.exports = { generateLogo };