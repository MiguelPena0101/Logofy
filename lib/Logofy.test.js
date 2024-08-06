const fs = require('fs');
const path = require('path');
const { generateLogo } = require('./Logofy');
const inquirer = require('inquirer');

jest.mock('inquirer');

describe('Logo Generator', () => {
  afterEach(() => {
    if (fs.existsSync('logo.svg')) {
      fs.unlinkSync('logo.svg');
    }
  });

  it('should create an SVG file with correct content', async () => {
    inquirer.prompt = jest.fn().mockResolvedValue({
      text: 'ABC',
      textColor: 'black',
      shape: 'circle',
      fillColor: 'red',
      strokeColor: 'blue',
      fontSize: '60'
    });

    await generateLogo();

    const svgContent = fs.readFileSync(path.join(__dirname, '../logo.svg'), 'utf-8');
    expect(svgContent).toContain('<circle cx="150" cy="100" r="50" fill="red" stroke="blue" stroke-width="3" />');
    expect(svgContent).toContain('<text x="150" y="100" font-size="60" text-anchor="middle" dominant-baseline="middle" fill="black">ABC</text>');
  });

  it('should handle different shapes and colors', async () => {
    inquirer.prompt = jest.fn().mockResolvedValue({
      text: 'XYZ',
      textColor: 'white',
      shape: 'square',
      fillColor: 'green',
      strokeColor: 'yellow',
      fontSize: '40'
    });

    await generateLogo();

    const svgContent = fs.readFileSync(path.join(__dirname, '../logo.svg'), 'utf-8');
    expect(svgContent).toContain('<rect x="75" y="50" width="150" height="150" fill="green" stroke="yellow" stroke-width="3" />');
    expect(svgContent).toContain('<text x="150" y="100" font-size="40" text-anchor="middle" dominant-baseline="middle" fill="white">XYZ</text>');
  });
});