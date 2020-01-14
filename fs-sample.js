const fs = require('fs');


fs.readFile('./sample.txt', (err, data) => {
    if (err) {
        console.log("An error has occured.",err)
        return;
    }
    console.log(data.toString());
});

const data = new Uint8Array(Buffer.from('Hello Node.js'));

fs.writeFile('sample.txt', data, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
});
console.log("completed");