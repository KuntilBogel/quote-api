const { createCanvas } = require('canvas');
const fs = require('fs');

// Sample text with newlines and bold markers (*)
const text = "Hello,\n*My world*,\nHow are you? *where he is*";

// Split text by lines to handle newlines (\n)
const lines = text.split('\n');

// Canvas setup
const canvas = createCanvas(400, 200);  // Width and height in pixels
const ctx = canvas.getContext('2d');

// Background color
ctx.fillStyle = 'black';  // Set background to black
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Set text color to white
ctx.fillStyle = 'white';

// Initial text position
let yPos = 30;
const lineHeight = 30;  // Vertical space between lines

// Process each line
lines.forEach((line) => {
    // Split the line into parts: normal text and bolded parts between *
    const parts = line.split(/(\*.*?\*)/);

    let xPos = 10; // Starting x position for each line

    parts.forEach((part) => {
        console.log(part)
        if (part.startsWith('*') && part.endsWith('*')) {
            // Bold text (remove * and apply bold style)
            const boldText = part.slice(1, -1);
            ctx.font = 'bold 20px Arial';
            ctx.fillText(boldText, xPos, yPos);
            xPos += ctx.measureText(boldText).width; // Move x position after bold text
        } else {
            // Normal text
            ctx.font = '20px Arial';
            ctx.fillText(part, xPos, yPos);
            xPos += ctx.measureText(part).width; // Move x position after normal text
        }
    });

    // Move y position down for the next line if there’s more text
    yPos += lineHeight;
});

// Save the canvas to a file
const out = fs.createWriteStream(__dirname + '/output.png');
const stream = canvas.createPNGStream();
stream.pipe(out);

out.on('finish', () => console.log('The image was saved as output.png'));
