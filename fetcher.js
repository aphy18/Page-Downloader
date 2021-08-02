const request = require('request');
const fs = require('fs');
const readline = require('readline');

const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

request(url, (err, res, body) => {
  
  if (err) {
    console.log("URL is invalid or doesn't exist.");
    rl.close();
  } else {
    if (fs.existsSync(filePath)) {
      rl.question("This file exists. Type y/Y to overwrite or q/Q to replace: " , key => {
        if (key === 'Y' || key === 'y') {
          fs.writeFile(filePath, body, (err) => {
            if (err) {
              console.log("There was an error while creating this file.");
              rl.close();
            }
          });
        } else if (key === 'Q' || key === 'q') {
          console.log("Exited.");
          rl.close();
        }
      });
    
    } else {
      fs.writeFile(filePath, body, (err) => {
        if (err) {
          console.log("This file cannot be created.");
          rl.close();
        } else {
          console.log(`Downloaded and saved ${fs.statSync(filePath).size} bytes to ${filePath}`);
          rl.close();
        }
      });
    }
  }
});
