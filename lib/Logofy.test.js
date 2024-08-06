const fs = require('fs');

describe('Logo Generator', () => {
  it('should create an SVG file with correct content for circle', done => {
    const mockAnswers = {
      text: 'ABC',
      textColor: 'black',
      shape: 'circle',
      fillColor: 'red',
      strokeColor: 'blue',
      fontSize: '60'
    };

    jest.mock('inquirer', () => ({
      prompt: jest.fn().mockResolvedValue(mockAnswers)
    }));

    require('./logoGenerator');

    setTimeout(() => {
      const fileContent = fs.readFileSync('logo.svg', 'utf-8');
      expect(fileContent).toContain('<circle cx="150" cy="100" r="50" fill="red" stroke="blue" stroke-width="3" />');
      expect(fileContent).toContain('<text x="150" y="125" font-size="60" text-anchor="middle" fill="black">ABC</text>');
      done();
    }, 1000);
  });

  it('should create an SVG file with correct content for star', done => {
    const mockAnswers = {
      text: 'DEF',
      textColor: 'yellow',
      shape: 'star',
      fillColor: 'green',
      strokeColor: 'orange',
      fontSize: '80'
    };

    jest.mock('inquirer', () => ({
      prompt: jest.fn().mockResolvedValue(mockAnswers)
    }));

    require('./logoGenerator');

    setTimeout(() => {
      const fileContent = fs.readFileSync('logo.svg', 'utf-8');
      expect(fileContent).toContain('<polygon points="150,25 179,111 269,111 196,165 217,251 150,200 83,251 104,165 31,111 121,111" fill="green" stroke="orange" stroke-width="3" />');
      expect(fileContent).toContain('<text x="150" y="125" font-size="80" text-anchor="middle" fill="yellow">DEF</text>');
      done();
    }, 1000);
  });
});