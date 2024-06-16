export function daysInMonth(month, year) { // Use 1 for January, 2 for February, etc.
    return new Date(year, month+1, 0).getDate();
}
export function getCorrectDate(date){
    let strInputValue = date; // <-- get my date string
    let dteCurrent;

    strInputValue = strInputValue.replace(/-/, '/')  // replace 1st "-" with "/"
        .replace(/-/, '/'); // replace 2nd "-" with "/"

    dteCurrent = new Date(strInputValue);
    return dteCurrent;
}
export function formatDate(date){
    if(date.getUTCDate() < 10 && date.getMonth()+1 < 10){
        return date.getFullYear() + "-" + "0" + (date.getMonth()+1) + "-" + "0" + date.getUTCDate();
    }else if(date.getMonth()+1 < 10){
        return date.getFullYear() + "-" + "0" + (date.getMonth()+1) + "-" + date.getUTCDate();
    }else if(date.getUTCDate() < 10){
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + '0' + date.getUTCDate().toString();
    }else{
        return date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getUTCDate();
    }
}
export function convertSinglesToDoubles(dates) {
    let newDateArray = [];
    dates.forEach(date => {
        if (date.dayString.length < 2){
            newDateArray.push('0'+date.dayString);
        }else {
            newDateArray.push(date.dayString);
        }
    })
    return newDateArray;
}
export const AddDueDateSuffix = (dueDate) => {

    if (dueDate === '' || dueDate === null){return null;}

    if (dueDate.toString().endsWith("1") && dueDate.toString().length < 2){
        return dueDate+"st";
    }
    else if (dueDate.toString().endsWith("2") && !dueDate.toString().startsWith("1")){
        return dueDate+"nd";
    }
    else if (dueDate.toString().endsWith("3") && !dueDate.toString().startsWith("1")){
        return dueDate+"rd";
    }
    else {
        return dueDate+"th";
    }
}