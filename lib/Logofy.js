const inquirer = require('inquirer');
const fs = require('fs');

const shapes = {
  circle: '<circle cx="150" cy="100" r="50" fill="{color}" />',
  triangle: '<polygon points="150,25 275,175 25,175" fill="{color}" />',
  square: '<rect x="75" y="50" width="150" height="150" fill="{color}" />'
};
async function generateLogo() {
  const answers = await inquirer.prompt([
    {
      name: 'text',
      message: 'Enter up to three characters:',
      validate: input => input.length <= 3 || 'Text must be up to three characters long.'
    },
    {
      name: 'textColor',
      message: 'Enter text color (keyword or hex):',
      validate: input => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$|^[a-zA-Z]+$/.test(input) || 'Invalid color format.'
    },
    {
      name: 'shape',
      type: 'list',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square', 'ellipse', 'hexagon']
    },
    {
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hex):',
      validate: input => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$|^[a-zA-Z]+$/.test(input) || 'Invalid color format.'
    },
    {
      name: 'strokeColor',
      message: 'Enter stroke color (keyword or hex):',
      validate: input => /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$|^[a-zA-Z]+$/.test(input) || 'Invalid color format.',
      default: 'none'
    },
    {
      name: 'strokeWidth',
      message: 'Enter stroke width (number):',
      default: '0',
      validate: input => !isNaN(input) && Number(input) >= 0 || 'Stroke width must be a non-negative number.'
    }
  ]);
 
  const { text, textColor, shape, shapeColor } = answers;
  
  const svgContent = `
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      ${shapes[answers.shape]
        .replace(/{color}/g, answers.shapeColor)
        .replace(/{strokeColor}/g, answers.strokeColor)
        .replace(/{strokeWidth}/g, answers.strokeWidth)}
      <text x="150" y="125" font-size="60" text-anchor="middle" fill="${answers.textColor}">${answers.text}</text>
    </svg>
  `;

  fs.writeFileSync('logo.svg', svg); 

  console.log('Generated logo.svg');
}

generateLogo();