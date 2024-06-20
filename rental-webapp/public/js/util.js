exports.todaysdate = function () {
    var d = new Date(),
        month = '' + (d.getMonth()+1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

exports.jsontolist = function(jsonlist) {
    var result = [];
    for(var i in jsonlist){
        result.push([i, jsonlist[i]]);
    }
    return result;
} //record.details