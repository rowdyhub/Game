    let fs = require("fs");
    let file_data = fs.readFileSync('hello.txt', 'utf8',);

    console.log(file_data);