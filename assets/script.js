
var timeDisplayEl = $('#time-display');
var projectDisplayEl = $('#project-display');
var projectModalEl = $('#project-modal');
var projectFormEl = $('#project-form');
var projectNameInputEl = $('#project-name-input');
var projectTypeInputEl = $('#project-type-input');
var projectDueDateEl = $('#due-date-input');
var projectHourlyRateEl = $('#hourly-rate-input');


// displaying the time
function displayTime() {
    var rightNow = moment().format('DD MMM YYYY [at] hh:mm:ss a');
    timeDisplayEl.text(rightNow);
}
setInterval (displayTime, 1000)

// printing project data to the page. From the modal to the table 
function printData(name, type, hourlyRate, dueDate) {
    //create new table 
    var projectRowEl = $('<tr>');

    //add class and first row of project name
    var projectNameTableEl = $('<td>').addClass('p-2').text(name);

    //add class and second row of project type
    var projectTypeTableEl = $('<td>').addClass('p-2').text(type);

    //add class and third row of project hourly rate
    var projectHourlyRateTableEl = $('<td>').addClass('p-2').text(hourlyRate);

    //add class and 4th row
    var projectDueDateTableEL = $('<td>').addClass('p-2').text(dueDate);

    //calculates the difference of now and until due date 
    var daysUntilDue = moment(dueDate, 'DD/MM/YY').diff(moment(), 'days');

    //places how many days left into table
    var daysLeftTableEl = $('<td>').addClass('p-2').text(daysUntilDue);

    //calculation of total earnings
    var totalEarnings = calculateTotalEarnings(hourlyRate, daysUntilDue).toFixed(2);

    //total for table earnings
    var totalTableEarnings = $('<td>').addClass('p-2').text('$' + totalEarnings)

    //adding a delete button which deletes the project 
    var deleteButton = $ ('<td>').addClass('p-2 delete-project-btn text center').text('x')

    //appending the child element to the parent. The parent element is projectRowEL
    projectRowEl.append(
        projectNameTableEl,
        projectTypeTableEl,
        projectHourlyRateTableEl,
        projectDueDateTableEL,
        daysUntilDue,
        totalEarnings,
        deleteButton
    )

    //append the projectRowEL to the parent projectDisplayEL
    projectDisplayEl.append(projectRowEl)

    //hide the modal
    projectModalEl.modal('hide')
}

//calculation for total earning split over the week
function calculateTotalEarnings(rate, days) {
    var dailyTotal = rate * 8;
    var total = dailyTotal * days;
    return total;
}


 //function when the delete button is clicked it removes the tr button.
 function deleteProjectButton (event) {
    console.log(event.target)
    var btnClicked = $(event.target)
    btnClicked.parent('tr').remove()
}

//Form submission button, so when the submmit button is clicked it puts the data on to the 
function handleProjectFormSubmitButton (event){
    event.preventDefault() //clears out the form

    // this 
    var projectName = projectNameInputEl.val().trim()
    var projectType = projectTypeInputEl.val().trim()
    var hourlyRate = projectHourlyRateEl.val().trim()
    var dueDate = projectDueDateEl.val().trim()

    //prints the data into the form from the modal
    printData(projectName, projectType, hourlyRate, dueDate)

    //resets the modal 
    projectFormEl[0].reset()
}

projectFormEl.on('submit', handleProjectFormSubmitButton)
projectDisplayEl.on('click', '.delete-project-btn', deleteProjectButton)
projectDueDateEl.datepicker({minDate: 1})

