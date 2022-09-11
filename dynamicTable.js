exams=new Array()
// Get exam data from json
$(document).ready(function(){
    $.getJSON("examData.json",function(result){
        exams=result.exams;
        // draw table
        for(i in exams){
            startTime=new Date(exams[i].start).toLocaleTimeString().substring(0,5);
            endTime=new Date(exams[i].end).toLocaleTimeString().substring(0,5);
            $("tbody").append("\
                <tr class=\"subjectTime\"s>\
                    <td class=\"text-center\">"+exams[i].subject+"</td>\
                    <td class=\"text-center\">"+startTime+"~"+endTime+"</td>\
                </tr>\
            ")
        }
        updateTable();
    });
});

function isDuringDate(beginDateStr,endDateStr){
    var curDate=new Date(),
        beginDate=new Date(beginDateStr),
        endDate=new Date(endDateStr);
    if(curDate>=beginDate && curDate<=endDate)
        return 1 //之间
    if(curDate>=endDate)
        return 2; //已结束
    return 0; //未到
}

// update table class
function updateTable(){
    $(".subjectTime").each(function(i,value){
        ret=isDuringDate(exams[i].start,exams[i].end);
        if(ret==1)
            $(this).addClass("table-primary");
        else if(ret==2)
            $(this).addClass("table-success");
    })
}
setInterval(updateTable,30000);