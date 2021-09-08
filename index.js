/* Your Code Here */
function createEmployeeRecord([name1, name2, title, payPerHour]){
    let newRecord = {
        firstName: name1,
        familyName: name2,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
    return newRecord;
}

function createEmployeeRecords(arrays){
    return arrays.map(array => createEmployeeRecord(array));
}

function createTimeInEvent(dateStr/*MUST BE IN 'YYYY-MM-DD HHMM' FORMAT */){
    let timeInEvent = {
        type: 'TimeIn',
        hour: parseInt(dateStr.slice(11)),
        date: dateStr.slice(0,10)
    }
    this.timeInEvents.push(timeInEvent)
    return this;
}

function createTimeOutEvent(dateStr/*MUST BE IN 'YYYY-MM-DD HHMM' FORMAT */){
    let timeOutEvent = {
        type: 'TimeOut',
        hour: parseInt(dateStr.slice(11)),
        date: dateStr.slice(0,10)
    }
    this.timeOutEvents.push(timeOutEvent)
    return this;
}

 function hoursWorkedOnDate(dateStr/*'YYYY-MM-DD' FORMAT HERE, NO HOUR*/){
    let a = 0;
    let b = 0;
    this.timeInEvents.forEach(event => {
        if (event.date === dateStr){
            a = event.hour;
        }
    })
    this.timeOutEvents.forEach(event =>{
        if (event.date === dateStr){
            b = event.hour;
        }
    })
    return (b-a)/100;
}

function wagesEarnedOnDate(dateStr/*YYYY-MM-DD*/){
    return this.payPerHour * hoursWorkedOnDate.call(this, dateStr);
}

function findEmployeeByFirstName(srcArray, firstName){
    let result;
    srcArray.forEach(record => {
        if (record.firstName === firstName){
            result = record;
        }
    })
    return result;
}

function calculatePayroll(srcArray){
    let result = 0;
    srcArray.forEach(record => result += allWagesFor.call(record))
    return result;
}


/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

