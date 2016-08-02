var fs = require('fs');
var readLine = require('readline');
var stream = require('stream');


headerRow=0,
push_array = [],
readStream = fs.createReadStream('India2011.csv');
writeStream = fs.createWriteStream('age.json');
var count = 0;
var age,liPerson;
function Push_first(age,liPerson){

    this.age = age,
    this.liPerson = liPerson;

};

var lineStream = readLine.createInterface({
input: readStream
});
/*Reister callback to read each line from CSV. All logic to select data to write to JSON goes here*/
var readLine = lineStream.on('line', function (line) {
 if(count==0){
   var headers = line.split(",");
  //  Area = headers.indexOf("Area Name");
   age = headers.indexOf("Age-group");
   liPerson = headers.indexOf("Literate - Persons");

   count = 1;
 }
 else{
    objectArray='';
   var lines = line.split(',');
//   if(lines[age]>=7){
     objectArray =  new Push_first(lines[age],lines[liPerson]);
     console.log(objectArray);
     push_array.push(objectArray);
}

}).on('close', function() {
      writeStream.write(JSON.stringify(push_array));
 });
