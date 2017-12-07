// (function(){

    const arrivalBtn = document.getElementById('arrival');
    const departureBtn = document.getElementById('departure');
    const database = window.localStorage;
    
    try {
        outputHoursForCurrMonth();
    } catch (e) {
        console.warn(e);
    }
    

    //arrival
    arrivalBtn.addEventListener('click', () => {
    
        let date = todaysTimestamp();
        var data = database.getItem('workingData');
        
        
        
        if(data !== null){
            
            let parsedData = JSON.parse(data);
            let newTimestamp =  {
                "arrival":{
                    day: date.day,
                    month: date.month,
                    year: date.year,
                    hour: date.hour,
                    min: date.min
                }
            };

            
            //check if this person arrived today already
            var arivalExist = false;
            for (let prihod in parsedData) {
                if (parsedData[prihod].arrival.day === date.day && parsedData[prihod].arrival.month === date.month && parsedData[prihod].arrival.year === date.year)  {
                    arivalExist = true;
                    break;
                }
                
            }

            if(arivalExist){
                alert("already exist");      
            }
            else{
                parsedData.push(newTimestamp);
                database.setItem('workingData', JSON.stringify(parsedData));
            }

            
        }else{
            let addDate = `[
                {
                    "arrival":{
                        "day": ${date.day},
                        "month": ${date.month},
                        "year": ${date.year},
                        "hour": ${date.hour},
                        "min": ${date.min}
                    }
                }
            ]`;
            
            database.setItem('workingData', addDate);
        }
        
        
    });

    //departure
    departureBtn.addEventListener('click', () => {
        
        let date = todaysTimestamp();
        var data = database.getItem('workingData');

        if(data === null){
            alert("you need to arrive first bruh");
        }
        else{

            let hasDepart = false;

            let parsedData = JSON.parse(data);

            for (let prihod in parsedData) {
                if (parsedData[prihod].arrival.day === date.day && parsedData[prihod].arrival.month === date.month && parsedData[prihod].arrival.year === date.year)  {
                    if(parsedData[prihod].hasOwnProperty("departure")){
                        hasDepart = true;
                        break;
                        
                    }
                    else{                    
                        //insert departure timestamp
                        parsedData[prihod].departure = {
                            day: date.day,
                            month: date.month,
                            year: date.year,
                            hour: date.hour,
                            min: date.min
                        };
                        
                        //calculate hours worked for this day
                        let minsWorked = ((parsedData[prihod].departure.hour * 60) +parsedData[prihod].departure.min) - ((parsedData[prihod].arrival.hour*60) + parsedData[prihod].arrival.min);
                        
                        parsedData[prihod].departure.minWorked = minsWorked;


                    }
                    break;
                }
                
            }
            


            if(hasDepart){
                alert("cant leave us twice");
            }else{
                
                database.setItem('workingData', JSON.stringify(parsedData));
            }
        }

        outputHoursForCurrMonth();
        
    });






    function todaysTimestamp(){
        let date = new Date();
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1;
        let year = date.getUTCFullYear();
        let hour = date.getHours();
        let min = date.getMinutes();
        //pre minutaj kda odstevas pa dobijs 16:00 - 8:50 samo pristejes 60 ka dobijs pravo vrednost

        let formatedDate = {
            day: day,
            month: month,
            year: year,
            hour: hour,
            min: min
        };

        return formatedDate;
    }



//output working hours per month: 
function outputHoursForCurrMonth(){
    let date = todaysTimestamp();
    let month = date.month;
    var data = database.getItem('workingData');

    let parsedData = JSON.parse(data);
    let sumHours = 0;

    for (let key in parsedData) {
        if(parsedData[key].arrival.month === month){
            
                sumHours += parsedData[key].departure.minWorked;
            
            
        }
    }

    let output = document.getElementById("output");
    output.innerHTML = sumHours;

    let time = document.getElementById("time");
    let minH = minToHours(sumHours);
    time.innerHTML = `${minH.hours}:${minH.min}`;
}

function minToHours(a){
    var hours = Math.trunc(a/60);
    var minutes = a % 60;
    return{
        "hours": hours,
        "min": minutes
    }
  }
  

// })();