import {convertSinglesToDoubles, daysInMonth} from "./dateHelpers";

export function getPayweekDays(date){
    const daysInGivenMonth = daysInMonth(date.getMonth(), date.getFullYear());
    const startDateDay = date.getUTCDate();
    let expectedEndDate = startDateDay+14;
    let daysPassedCounter = 0;
    let payweekDates = [];

    for (let i = startDateDay; i < expectedEndDate; i++) {
        daysPassedCounter++;
        if (i > daysInGivenMonth){
            i = 1;
            expectedEndDate = 16-daysPassedCounter;
        }
        if (payweekDates.length === 7){
            break;
        }

        const newPayweekDate = new Date(date.getFullYear(), date.getMonth(), i);

        payweekDates.push(
            {
                id: daysPassedCounter,
                date: newPayweekDate,
                dayString: i.toString(),
                dayNumber: i,
                weekday: newPayweekDate.toLocaleDateString('en-US',{weekday: 'long'}).slice(0,2),
            }
        );
    }

    return payweekDates;
}
export function getPayweekDates(date) {
    const daysInGivenMonth = daysInMonth(date.getMonth(), date.getFullYear());
    const startDateDay = date.getUTCDate();
    let expectedEndDate = startDateDay+14;
    let daysPassedCounter = 0;
    let payweekDates = [];

    for (let i = startDateDay; i < expectedEndDate; i++) {
        daysPassedCounter++;
        if (i > daysInGivenMonth){
            i = 1;
            expectedEndDate = 16-daysPassedCounter;
        }

        const newPayweekDate = new Date(date.getFullYear(), date.getMonth(), i);

        payweekDates.push(
            {
                id: daysPassedCounter,
                date: newPayweekDate,
                dayString: i.toString(),
                dayNumber: i,
                weekday: newPayweekDate.toLocaleDateString('en-US',{weekday: 'long'}).slice(0,2),
            }
        );
    }

    return payweekDates;
}
export function getPayweekCalendarRows(payweekDates, payFrequency){
    let paycheckRow1 =[];
    let paycheckRow2=[];
    let calendarDateRows = [];

    //get payweekDates
    switch (payFrequency) {
        case 'weekly':
            paycheckRow1 = payweekDates ? payweekDates.slice(0,7) : [];
            paycheckRow1 = convertSinglesToDoubles(paycheckRow1);
            break;
        case 'bi-weekly':
            paycheckRow1 = payweekDates ? payweekDates.slice(0,7) : [];
            paycheckRow1 = convertSinglesToDoubles(paycheckRow1);

            paycheckRow2 = payweekDates ? payweekDates.slice(7,14) : [];
            paycheckRow2 = convertSinglesToDoubles(paycheckRow2);
            break;
        default:
            paycheckRow1 = payweekDates ? payweekDates.slice(0,7) : [];
            paycheckRow1 = convertSinglesToDoubles(paycheckRow1);
            break;
    }

    calendarDateRows.push(paycheckRow1);
    calendarDateRows.push(paycheckRow2);

    return calendarDateRows;
}

export function getDefaultSelectedDate(){

}

export function getSelectedDateExpenses(selectedDate, payweekDates, date, payments) {

    console.log("selectedDate: ", selectedDate)
    console.log("payweekDates: ", payweekDates)
    console.log("date: ", date)
    console.log("payments: ", payments)

    // if (!selectedDate) {
    //     return [];
    // }

    let payweek = payweekDates ? payweekDates : getPayweekDates(date);
    let allPayments = payments;
    let allPaymentsForPayweekDates = [];
    let allPaymentsForSelectedDate = [];

    for (let i = 0; i < allPayments.length; i++) {
        payweek.forEach(pd => {
            if (allPayments[i].expense_due_date === pd.dayNumber) {
                allPaymentsForPayweekDates.push(allPayments[i]);
            }
        })
    }

    if (!selectedDate){

        for (let i = 0; i < allPaymentsForPayweekDates.length; i++) {
            if (allPaymentsForPayweekDates[i].expense_due_date === payweek[0].dayNumber) {
                allPaymentsForSelectedDate.push(allPaymentsForPayweekDates[i]);
            }
        }
        return allPaymentsForSelectedDate;
    }

    for (let i = 0; i < allPaymentsForPayweekDates.length; i++) {
        if (allPaymentsForPayweekDates[i].expense_due_date === parseInt(selectedDate)) {
            allPaymentsForSelectedDate.push(allPaymentsForPayweekDates[i]);
        }
    }

    return allPaymentsForSelectedDate;

}

export function getPayweekExpenseTotal(payweekDates, repeatingExpenseAmount, date, payments) {
    let payweek = payweekDates ? payweekDates : getPayweekDates(date);
    let paymentTotals = 0;
    let allPayments = payments;
    console.log(allPayments)

    for (let i = 0; i < allPayments.length; i++) {
        payweek.forEach(pd => {
            if (allPayments[i].expense_due_date === pd.dayNumber) {
                paymentTotals = paymentTotals + allPayments[i].expense_amount;
            }
        })
    }

    return paymentTotals + repeatingExpenseAmount;
}
export function getPayweekRemainingAmount(incomeAmount, expenseAmount) {
    return incomeAmount - expenseAmount;
}

// export function getPaycheckCalculations(payweekDates, payFrequency, selectedDate, payments) {
    // let paycheckCalculations = [];

    // switch (payFrequency) {
    //     case 'weekly':
    //         paycheckCalculations.push(getPaycheckCalculationsWeekly(payweekDates, selectedDate, payments));
    //         break;
    //     case 'bi-weekly':
    //         paycheckCalculations.push(getPaycheckCalculationsBiWeekly(payweekDates, selectedDate, payments));
    //         break;
    //     default:
    //         paycheckCalculations.push(getPaycheckCalculationsWeekly(payweekDates, selectedDate, payments));
    //         break;
    // }

    // return paycheckCalculations;
// }