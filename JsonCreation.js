var ageWise = new Object();
var eduWise = new Object();

function d3DataFormatter (obj)
{
  var arrObj =  new Array();
  for(key in obj)
  {
    arrObj.push(obj[key]);
  }
  return arrObj;
}

function textToArray(text)
{
  var headerLine = new Array();
  text.split("\n").map(function(strLine, lineNum)
  {
      if(strLine !== '')
      {
        var arrLine = strLine.split(",");
        if (lineNum != 0)
         {
          arrLine[4] = arrLine[4].trim();
          ageKey = arrLine[5].trim();
          if (arrLine[4] == "Total" )
           {
            if (arrLine[5] != "All ages")
            {
              // Age wise Total Literate Population JSON
              arrLine[12] = parseInt(arrLine[12]);
              if(ageKey in ageWise){
                ageWise[ageKey].TotalLiteratePop += arrLine[12];
                // ageWise[ageKey].headerLine[12] += arrLine[12];
              }
              else {
                console.log("Keys are "+ Object.keys(ageWise));
                console.log("key" + ageKey);
                ageWise[ageKey] = new Object();
                ageWise[ageKey].ageGroup = ageKey;
                ageWise[ageKey].TotalLiteratePop = arrLine[12];

              }
            }
            else
            {
              //Education Category wise - all India data combined together
              for(eduCatIndex=15;eduCatIndex<44;eduCatIndex+=3)
              {
                // console.log(headerLine);
                var eduCatValue = headerLine[eduCatIndex].trim().match(/.*- (.*) -.*/)[1];
                var totalPopValue = parseInt(arrLine[eduCatIndex]);
                if (eduCatValue in eduWise)
                {
                  eduWise[eduCatValue].totalPop += totalPopValue;
                }
                else
                {
                    eduWise[eduCatValue] = {eduCateg: eduCatValue, totalPop:totalPopValue };

                }
              }
            }

          }
        }

        else
        {
            // console.log(lineNum);
            headerLine = arrLine;
            // console.log(headerLine);
        }
    }
  });
}

function fileReader(fileNames)
{
    fileNames.map(function(fileName)
    {
      // console.log("***Keys After File Read"+ Object.keys(ageWise));
      var fs = require('fs');
      var data = fs.readFileSync(fileName).toString();
      console.log("For File: "+fileName);
      textToArray(data);
    });
    ageWise = d3DataFormatter(ageWise);
    eduWise = d3DataFormatter(eduWise);
  // console.log(eduWise);
}

function dataDumper()
{
    var fs = require('fs');
    // console.log(ageWise);
    fs.writeFile("outPutFiles/graph1.json",JSON.stringify(ageWise),function(err) {
      if (err) throw err;
      console.log('First file is saved!');
    });
    fs.writeFile("outPutFiles/graph2.json",JSON.stringify(eduWise), function(err) {
      if (err) throw err;
      console.log('second file is saved!');
    });
}

var fileNames = ["mergedFiles.csv"];
fileReader(fileNames);
dataDumper();
