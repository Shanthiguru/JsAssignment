fs= require('fs');


var readLine = require('readline')

headerRow=0,
push_array = [],
readStream = fs.createReadStream('India2011.csv');
writeStream = fs.createWriteStream('educate.json');
var count = 0;
var liPerson,eduLevel,belowPrim,primary,middle,matric,higherSec,nonTech,techDip,gradu,unclassi;
function Push_first(Area,liPerson,eduLevel,belowPrim,primary,middle,matric,higherSec,nonTech,techDip,gradu,unclassi){
    this.Area = Area,
    this.liPerson = liPerson,
    this.eduLevel=eduLevel,
    this.belowPrim=belowPrim,
    this.primary=primary,
    this.middle=middle,
    this.matric=matric,
    this.higherSec=higherSec,
    this.nonTech=nonTech,
    this.techDip=techDip,
    this.gradu=gradu,
    this.unclassi=unclassi;
};

var lineStream = readLine.createInterface({
input: readStream
});
/*Reister callback to read each line from CSV. All logic to select data to write to JSON goes here*/
var readLine = lineStream.on('line', function (line) {
 if(count==0){
   var headers = line.split(",");
    Area = headers.indexOf("Area Name");
   //age = headers.indexOf("Age-group");
   liPerson = headers.indexOf("Literate - Persons");
   eduLevel=headers.indexOf("Educational level - Literate without educational level - Persons");
   belowPrim=headers.indexOf("Educational level - Below Primary - Persons");
   primary=headers.indexOf("Educational level - Primary - Persons");
   middle=headers.indexOf("Educational level - Middle - Persons");
   matric=headers.indexOf("Educational level - Matric/Secondary - Persons");
   higherSec=headers.indexOf("Educational level - Higher secondary/Intermediate/Pre-University/Senior secondary - Persons");
   nonTech=headers.indexOf("Educational level - Non-technical diploma or certificate not equal to degree - Persons");
   techDip=headers.indexOf("Educational level - Technical diploma or certificate not equal to degree - Persons");
   gradu=headers.indexOf("Educational level - Graduate & above - Persons");
   unclassi=headers.indexOf("Educational level - Unclassified - Persons");
   count = 1;
 }
 else{
    objectArray='';
   var lines = line.split(',');
     objectArray =  new Push_first(lines[Area],lines[liPerson],lines[eduLevel],lines[belowPrim],lines[primary],lines[middle],lines[matric],lines[higherSec],lines[nonTech],lines[techDip],lines[gradu],lines[unclassi]);
     console.log(objectArray);
     push_array.push(objectArray);

 }
}).on('close', function() {
      writeStream.write(JSON.stringify(push_array));
 });
