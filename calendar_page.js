var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var d = new Date();
var month = d.getMonth();
var year = d.getFullYear();
var data = "";
var eventFormShown = false;
var notificationFormShown = false;

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

function setDays(month){
    var max = daysInMonth(month+1,year);
    
    var day = 1;
    var days = day;
    var d1 = new Date(year, month, 1);
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();
    var j = d1.getDay();
    var p = d1.getDay();
    
    var i;
    
    for(i = 0; i < j; i++){
        var x = document.getElementById("table").rows[0].cells;
        x[i].innerHTML = null;
    }
    
    for(i = 0; i < 7; i++){
        while(j < 7){
            var x = document.getElementById("table").rows[i].cells;
            x[j].innerHTML = day;
            x[j].style.backgroundColor= "#f5f5f5";
            if(((i*7)+j == d.getDate() + p-1) && month == currentMonth && year == currentYear) x[j].style="background-color:rgb(230, 230, 230); border-radius:5px;";  
            day++;
            days++;
            if(days > max){
                day = null;
            }
            j++;
        }
        j=0;
    }
}

function getMonth() {
    data = monthNames[month] + " " + year;
    document.getElementById("month").innerHTML = data;
    setDays(month);
}

function nextMonth() {
    month++;
    if(month>11){
        month = 0;
        year++;
    }
    
    data = monthNames[month] + " " + year;
    document.getElementById("month").innerHTML = data;
    setDays(month);
}

function lastMonth() {
    month--;
    if(month < 0) {
        month = 11;
        year--;
    }
    
    data = monthNames[month] + " " + year;
    document.getElementById("month").innerHTML = data;
    setDays(month);
}

function expandDay(i, j){
    var max = daysInMonth(month+1,year);
    var d1 = new Date(year, month, 1);
    var k = d1.getDay();
    if(((((i*7)+j)+1) > k) && ((((i*7)+j)+1)-k) <= max)
        showEventForm(year, month, (((i*7)+j)+1)-k);
}

function showEventForm(year, month, day){
    document.getElementById("eventForm").style.display = "flex";
    var da = monthNames[month] + " " + day.toString() + ", " + year.toString();
    document.getElementById("date").innerHTML = da;
    document.getElementById('body').onclick = function(e) {
        if(eventFormShown){
            if(e.target != document.getElementById('eventForm')) {   
            } else {
                eventForm_hide(); 
            }
        }
        eventFormShown = true;
    }
}

function eventForm_hide() {
    document.getElementById("eventForm").style.display = "none";
    document.getElementById("eventName").value=null;
    eventFormShown = false;
}

function notifForm_hide(){
    document.getElementById("notification").style.display="none";
}

function drop_notifications(){
    document.getElementById("notification").style.display = "flex";
    document.getElementById('body').onclick = function(e) {
        if(notificationFormShown){
            if(e.target != document.getElementById('notification')) {   
            } else {
                notifForm_hide(); 
            }
        }
        notificationFormShown = true;
    }
}