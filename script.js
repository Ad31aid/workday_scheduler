// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.

//formating as class single slot 

let schedule = []


window.addEventListener("load", (event) => {
        schedule = JSON.parse(localStorage.getItem('schedule'))
        console.log(schedule)
        for(let i = 9; i < 18; i ++){
                logSlots(i)
                populateTextArea(i)
                populateSaveButton(i)
        
        }
        //populate timeslots
      });
      
class Slot{
	constructor(state, time){
		this.state = state;
		this.time = time;
		this.templet = `
      <div id="hour-${time}" class="row time-block ${this.state}">
      <div class="col-2 col-md-1 hour text-center py-3">${this.time}:00 </div>
      <textarea id="text-hour-${time}" class="col-8 col-md-10 description" rows="3"> </textarea>
      <button id="btn-hour-${time}" class="btn saveBtn col-2 col-md-1" onclick ="clickNSave(${this.time})"aria-label="save">
      <i class="fas fa-save" aria-hidden="true"></i>
      </button>
      </div>`
                this.text = ""
		}
        
}


//date: hour
const d = new Date();
function stateCheck(i){
        let difference = i - d.getHours()
        //check if it's past for future
        if(difference == 0){
                return 'present'
        }else if (difference <= 0){
                return 'past'
        }else{
                return 'future'
        }
}

function logSlots(i){
        let slotOne = new Slot(stateCheck(i), i)
        schedule.push(slotOne)
        //push it into the array
        timeSlots_placeHold.innerHTML += slotOne.templet
}

const timeSlots_placeHold = document.querySelector('#timeslots')



function populateTextArea(i){
        console.log('working on populating texts')
        document.getElementById(`text-hour-${i}`).innerHTML = schedule[i - 9].text
}

//populate save with clicknsave function
function populateSaveButton (i){
        let saveBtn = document.querySelector(`#hour-${i}`).children[2]
        saveBtn.addEventListener('click', clickNSave)
}

function clickNSave (i) {
        console.log(`lets do it ${i}`)
        // finish up the clickNSave
        let text = document.getElementById(`text-hour-${i}`).value
        console.log(text)
        schedule[i - 9].text = text
        console.log(schedule[ i - 9 ].text )
        localStorage.setItem('schedule',JSON.stringify(schedule))
}

