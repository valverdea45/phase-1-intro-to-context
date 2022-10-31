// Your code here
// book.author = "Jane Smith";  first element gone (0,1)
// ["Gray", "Worm", "Security", 1]
// function createEmployeeRecord(employeeInfo) {
//     const objOfEmployeeInfo = {}
//     Object.assign(objOfEmployeeInfo, {firstName: employeeInfo[0]})
//     Object.assign(objOfEmployeeInfo, {familyName: employeeInfo[1]})
//     Object.assign(objOfEmployeeInfo, {title: employeeInfo[2]})
//     Object.assign(objOfEmployeeInfo, {payPerHour: employeeInfo[3]})
//     Object.assign(objOfEmployeeInfo, {timeInEvents: []})
//     Object.assign(objOfEmployeeInfo, {timeOutEvents: []})
//     return objOfEmployeeInfo
// }

function createEmployeeRecord(row){
    return{
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


function createEmployeeRecords(nestedArray){
    const loopingThroughArrays = nestedArray.map(createEmployeeRecord)
    return loopingThroughArrays
}

function createTimeInEvent(employeeRecord, timeOfPunchIn){
    const splitArray = timeOfPunchIn.split(" ")
    const objOfTimePunches = {}
    Object.assign(objOfTimePunches, {type: "TimeIn"})
    const hourInIntegers = parseInt(splitArray[1])
    Object.assign(objOfTimePunches, {hour: hourInIntegers})
    Object.assign(objOfTimePunches, {date: splitArray[0]})
    employeeRecord.timeInEvents.push(objOfTimePunches)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, timeOfPunchout){
    const splitArray = timeOfPunchout.split(" ")
    const objOfTimePunches = {}
    Object.assign(objOfTimePunches, {type: "TimeOut"})
    const hourInIntegers = parseInt(splitArray[1])
    Object.assign(objOfTimePunches, {hour: hourInIntegers})
    Object.assign(objOfTimePunches, {date: splitArray[0]})
    employeeRecord.timeOutEvents.push(objOfTimePunches)
    return employeeRecord
}
/*
const characters = [
  { name: 'Batman', team: 'Justice League' },
  { name: 'Hulk', team: 'Avengers' },
  { name: 'Flash', team: 'Justice League' },
  { name: 'Iron Man', team: 'Avengers' },
  { name: 'Deadpool', team: 'X-Force' }

];
*/
//const avengers = characters.filter(character => character.team === 'Avengers');

function hoursWorkedOnDate(employeeRecord, dateOfPunch){
    const employeeTimeInDates = employeeRecord.timeInEvents
    const employeeTimeOutDates = employeeRecord.timeOutEvents
    const timeInDate = employeeTimeInDates.find((employeeTimeInDates => {
        return employeeTimeInDates.date === dateOfPunch
    }))
    const timeOutDate = employeeTimeOutDates.find((employeeTimeOutDates) => {
        return employeeTimeOutDates.date === dateOfPunch
    })

    const diffrenceInHours = timeOutDate.hour - timeInDate.hour
    const diffrenceInHourSingleDigits = diffrenceInHours/100
    return diffrenceInHourSingleDigits
}

function wagesEarnedOnDate(employeeRecord, date) {
    const paymentOwedOnDate = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
    return paymentOwedOnDate
}

function allWagesFor(employeeRecord){
    let dates = employeeRecord.timeInEvents.map((everyIndex) => {
        return everyIndex.date
    })
    
     let addedHours = dates.reduce((previousValue, currentValue) => {
        return previousValue + wagesEarnedOnDate(employeeRecord, currentValue)
     },0)
     return addedHours
}

function calculatePayroll(employeeRecord) {
    let caculate = employeeRecord.map((individualEmployee) => {
        return allWagesFor(individualEmployee)
    })
    console.log(`we just need to add these values ${caculate}`)

    const grandTotalOfWagesOwed = caculate.reduce((accum, thingBeingLooped) => {
        return accum + thingBeingLooped
    },0)
    return grandTotalOfWagesOwed
}

// tests
/*
const employeeRecord = createEmployeeRecord(["Thor", "Odinsson", "Electrical Engineer", 45])
const updatedEmployeeRecord = createTimeInEvent(employeeRecord, "2014-02-28 900")
const trueUpdatedEmployeeRecord = createTimeOutEvent(updatedEmployeeRecord, "2014-02-28 1400")
allWagesFor(trueUpdatedEmployeeRecord)
*/