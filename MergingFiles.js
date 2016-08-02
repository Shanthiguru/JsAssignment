var fs = require('fs');

function ReadAppend(file,appendFile)
{
  fs.readFile(appendFile,function  (err,data){
    if(err) throw err;
    console.log("file read");

    fs.appendFile(file,data,function(err){
      if(err) throw err;
      console.log("appended");

    });
  });
}

file='India2011.csv';
appendFile='IndiaSC2011.csv';
ReadAppend(file,appendFile);

appendFile='IndiaST2011.csv';
ReadAppend(file,appendFile);
