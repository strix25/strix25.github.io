(function () {

const table = $("#table");
const chart = $("#chart");
let jan, feb, mar, apr, may, jun;

let employeeName;

for (x in people.Employees) {
    $("tbody").append("<tr><th scope='row'>"+x+"</th><td>"+people.Employees[x].name+"</td><td>"+people.Employees[x].Position+"</td><td>"+people.Employees[x].StartDate+"</td></tr>");
}

$("tbody td").click(function() {
    
    employeeName = $(this).html();
    
    chart.show();
    table.hide();
   
    
    
    for(i = 0; i < people.Employees.length;i++){
        if(people.Employees[i].name == employeeName){
            jan = people.Employees[i].hoursJanuary;
            feb = people.Employees[i].hoursFebruary;
            mar = people.Employees[i].hoursMarch;
            apr = people.Employees[i].hoursApril;
            may = people.Employees[i].hoursMay;
            jun = people.Employees[i].hoursJune;
            
            break;
        }
    }
    charterino();
});

$("#back").click(function(){
    chart.hide();
    table.show();
});

var massPopChart;
function charterino(){
    
    let myChart = document.getElementById('myChart').getContext('2d');
    
        // Global Options
        Chart.defaults.global.defaultFontFamily = 'Lato';
        Chart.defaults.global.defaultFontSize = 18;
        Chart.defaults.global.defaultFontColor = '#FFF';
    
        if (massPopChart) {
          massPopChart.destroy();
        }

        massPopChart = new Chart(myChart, {
          type:'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
          data:{
            labels:['January', 'February', 'March', 'April', 'May', 'June'],
            datasets:[{
              label:'Hours',
              data:[
                jan,
                feb,
                mar,
                apr,
                may,
                jun
              ],
              //backgroundColor:'green',
              backgroundColor:[
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(255, 99, 132, 0.6)'
              ],
              borderWidth:1,
            //borderColor:'#777',
              hoverBorderWidth:3,
              hoverBorderColor:'#000'
            }]
          },
          
          options:{
            title:{
              display:true,
              text:`Hours worked per month for: ${employeeName}`,
              fontSize:25
            },
            legend:{
              display:true,
              position:'right',
              labels:{
                fontColor:'#000'
              }
            },
            layout:{
              padding:{
                left:50,
                right:0,
                bottom:0,
                top:0
              }
            },
            tooltips:{
              enabled:true
            },
            scales: {
                
                yAxes: [{
                    ticks: {
                        suggestedMin: 140
                        
                    }
                }]
            }
          }
        });
        massPopChart.update();
      };

})();