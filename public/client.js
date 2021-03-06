var deletedChore = [];

console.log('hello from client.js');

$(document).ready (function(){
  console.log('hello from jquery');

$('#submitChore').on('click', postChore);
getChoreDB();
$('#outputDiv').on('click', '.deleteRecord', choreDelete);
$('#outputDiv').on('click', '.choreFinished', choreComplete);

//updates the status of whether or not a chore is completed on the dom and in the DB 'tasks'
function choreComplete(){
  var completeID = $(this).data('id');
  var completeRecord = {
    "id" : completeID
  };
  $.ajax({
    type : 'POST',
    url : '/postChoreUpdate',
    data: completeRecord,
    success: function(){
      getChoreDB();
    }
  });
}

//a function to delete a chore from both the DB and the DOM via its ID in the DB 'tasks'
function choreDelete(){
  console.log($(this).attr('data-id'));
  var deleteID = $(this).attr('data-id');
  var deleteRecord = {
    "id" : deleteID
  };
  //deletedChore.push();
  $.ajax({
    type : 'POST',
    url : '/postChoreDelete',
    data: deleteRecord,
    success: function(){
      getChoreDB();
    }
  });

}

//bottleneck point for data entry and retrieval
function getChoreDB(){
    $.ajax({
      type: 'GET',
      url: '/retrieveChore',
      success: function(data){
        choreDisplay(data);
    }
  });
}
//sets up chore object to be sent to DB upon capturing data from the DOM
function postChore(){
  var enteredChore = $('#choreIn').val();
  var newChore = {
    "chore" : enteredChore,
    "completed": false
  };
    console.log('newChore ' + enteredChore);
  $.ajax({
    type: 'POST',
    url: '/sendNewChore',
    data: newChore
    });//end ajax
}//end setting up the submit to send to DB

//appends and displays chores on the DOM, in addition to chore updates and chore deletions
function choreDisplay(tasks){
  $('#addChore').val('');
  $('#outputDiv').empty();
  for( var i = 0; i<tasks.length; i++){
    //var choreData = '<p>' + tasks[i].chore + ', Completed: ' + tasks[i].completed + ', Date Assigned: ' + tasks[i].date_assigned + '</p>';
     //$('#outputDiv').append(choreData);
     $('#outputDiv').append('<p>' + tasks[i].chore + ', Completed: ' + tasks[i].completed + ', Date Assigned: ' + tasks[i].date_assigned + '</p>');
     $('#outputDiv').append('<button class="deleteRecord" data-id="' + tasks[i].id + '">Delete</button>');
     $('#outputDiv').append('<button class="choreFinished" data-id="' + tasks[i].id + '">Update Status</button>');
  }//end for loop to generate 'cells' for display
 }//function to append end

});//end jquery
