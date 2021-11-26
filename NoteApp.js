// If user add a note, add into a localStorage
let addBtn = document.getElementById('addBtn');
 addBtn.addEventListener('click', function(e){
 let addTxt = document.getElementById('addTxt');
 let notes = localStorage.getItem('notes'); //blank notes obj to link
 if(notes==null){
  notesObj=[];
 }
 else{
  notesObj = JSON.parse(notes);   //here notes which is stored in localStorage is brougth and parsed from string to back into an array.
 }
 if(addTxt.value==""){
  return;
 }
 //Now we have either blank notesObj[] via if statement or filled notesObj[] via else statement.
 notesObj.push(addTxt.value);             //adding the notes from localStorage into the notesObj
 localStorage.setItem('notes',JSON.stringify(notesObj)); //Again save this key value pair to localStorage
 addTxt.value="";                                //To clear textbox again for the next time usage.
 showNotes();
});

//showNotes is a function which collects data from localStorage and display on the screen in card.

function showNotes(){
 let notes = localStorage.getItem('notes');
 if(notes==null){
  notesObj = [];
 }
 else{
  notesObj = JSON.parse(notes);
 }
 let html = "";
 notesObj.forEach(function(element, index){
   html+=` 
          <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
           <div class="card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
            </div>`;
 });
 let notesElm = document.getElementById('notes');
 if(notesObj.length!=0){
  notesElm.innerHTML = html;
 }
 else{
  notesElm.innerHTML = '<p>Nothing to show! Use "Add Note" section above to add notes.</p>';
 }
}

//function to delete a note
function deleteNote(index){
 let notes = localStorage.getItem('notes');
  if(notes==null){
  notesObj = [];
 }
 else{
  notesObj = JSON.parse(notes);
 }
 notesObj.splice(index,1);
 localStorage.setItem('notes',JSON.stringify(notesObj));
 showNotes();;
}

//function to search in note

let search = document.getElementById('searchTxt');
search.addEventListener("input", function(){

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})