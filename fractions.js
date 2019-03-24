
var pizzaChart;

var hasShownNo = false;

function input_handler(event) {
    return (event.charCode === 8 || event.charCode === 0 || event.charCode === 13) ? null : event.charCode >= 48 && event.charCode <= 57;
}

function updatePizza(amount, n, d) {
    pizzaChart.data.datasets[0].data = [];
    for(var i = 0; i < d; i++) {
        pizzaChart.data.datasets[0].data[i] = (1 / d);
        pizzaChart.data.datasets[0].borderColor[i] = 'rgba(64, 64, 64, 1)';
        if(i < n) {
            pizzaChart.data.datasets[0].backgroundColor[i] = 'rgba(0, 0, 0, 0)';
            
        } else {
            pizzaChart.data.datasets[0].backgroundColor[i] = 'rgba(242, 235, 164, 1)';
        }
    }
 
    $("#chart-background").show();
    if(amount === 0) {
        $("#chart-background").hide();
    }
    pizzaChart.update();
}

function updateBar(n, d) {
    $("#progressbar").empty();
    n = d - n;
    for(var i = 1; i <= d; i++) {
        var div = document.createElement("div");
        if(i <= n)
            div.classList.add("progressbar-off");
        else
            div.classList.add("progressbar-on");
        div.style.height = ((1 / d) * 100) + "%";
        $("#progressbar")[0].appendChild(div);
    }
}

function updateHeights() {
    var cw = $("#chart-div").width();
    $('#chart-div').css({'height':cw+'px'});
    $("#bar-chart-div").css({ 'height' : cw + 'px' });
    $("#both-chart-div").css({ 'height' : cw + 'px' });
    if(pizzaChart)
        pizzaChart.update();
}

$( window ).resize(updateHeights);
$(function() {
    $( ".fraction-part" ).spinner({ min: 0, max: 40, step: 1 });
    $("#denominator").spinner("option", "min", 1);
    $('.ui-spinner a.ui-spinner-button').css('display','none');
    $( ".fraction-part").keypress(input_handler);
    $( ".fraction-part").bind('keyup mouseup', function() {
        console.log("Change");
        var n = parseInt($("#numerator").val());
        var d = parseInt($("#denominator").val());
        
        console.log(n + " " + d);
        if(isNaN(n) || isNaN(d))
            return;
        if(n > d) {
            if(!hasShownNo) {
                hasShownNo = true;
                $("#noDialog").dialog({ modal: true });
            }
            $("#numerator").val(d);
            n = d;
        }
        if(d < 1) {
            d = 1;
            $("#denominator").val(d);
        }
        if(d > 40) {
            d = 40;
            $("#denominator").val(d);
        }
        $("#numerator").spinner("option", "max", d);
        
        updatePizza(n / d, n, d);
        updateBar(n, d);
    });
    $("#numerator").spinner("option", "max", $("#denominator").val());
    $("#denominator").spinner("option", "max", 40);
    updateHeights();
    var ctx = document.getElementById('myChart').getContext('2d');
    document.getElementById('myChart').style.backgroundColor = 'rgba(0, 0, 0, 0)';
    pizzaChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [0.5, 0.5],
                backgroundColor: [
                    'rgba(0, 0, 0, 0)',
                    'rgba(242, 235, 164, 1)'
                ],
                borderColor: [
                    'rgba(0, 0, 0, 1)',
                    'rgba(0, 0, 0, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            tooltips: {
                enabled: false
            },
            hover: {
                mode: null
            }
        }
    });
    updatePizza(0.5, 1, 2);
    updateBar(1, 2);
    $("#helpDialog").dialog({ modal: true });
});
