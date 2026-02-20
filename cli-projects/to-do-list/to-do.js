/* CLI To-Do List 

Users should be able to: 

✅ Add tasks
✅ View tasks
✅ Mark tasks as done
✅ Delete tasks
✅ Save tasks to a file

-----------------
layout idea: 
-----------------

Object: 
Making the task the key is useful here because tasks should be unique
{ 'gym' :  'incomplete' , 'clean' : complete}

Then convert for styling: 

1. [ ] Study JavaScript
2. [x] Go gym

*/

// import readline module
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Create empty to do list 
let toDo = {};

function askName() {
  rl.question("Enter a command (type help to view commands, or type exit): ", (cmd) => {

    // exit function if user types 'exit'
    if (cmd.toLowerCase() === "exit"){
      console.log("Goodbye!");
      rl.close();
      return;
    }

    if (cmd.toLowerCase() === "help"){
      console.log("Welcome to your To Do List Tracker \n 'c' - Create a new task \n 'r' - Read all active tasks \n 'u' - Update the status of a task \n 'd' - Delete a task \n 'exit' - Exits the program");
      askName();
      return;
    }

    // CRUD Operations: 

    // Create 
    if (cmd.toLowerCase() === "c"){
      rl.question("Enter your To Do list task: ", (task) => {
        toDo[task] = 'incomplete'; 
        console.log(toDo);
        askName();
      });
      return;
    }

    // Read
    else if (cmd.toLowerCase() === "r"){
      let idx = 1;
      let taskStatus = "";
      
      if (Object.entries(toDo).length !== 0){
        for (const task in toDo){
          if (toDo[task] === 'incomplete'){
            taskStatus = '[ ]';
          }
          else{
            taskStatus = '[ X ]';
          }
          console.log(`${idx}. ${taskStatus} ${task}`);
          idx += 1;
        }
        askName()
        return
      }else{
        console.log("You have no active Tasks.");
        askName();
        return;
      }
    }

    // Update
    else if (cmd.toLowerCase() === "u"){
      let idx = 1;
      let taskStatus = "";
      
      if (Object.entries(toDo).length !== 0){
        for (const task in toDo){
          if (toDo[task] === 'incomplete'){
            taskStatus = '[ ]';
          }
          else{
            taskStatus = '[ X ]';
          }
          console.log(`${idx}. ${taskStatus} ${task}`);
          idx += 1;
        }
      
      rl.question("\nEnter the index of the task to change status: ", (idxStatus) => {
        if (idxStatus > 0 && idxStatus <= Object.entries(toDo).length){
          let idx = 1;
          for (const task in toDo){
            if (idxStatus === String(idx) && toDo[task] === 'incomplete'){
              toDo[task] = 'complete';
              askName();
              return;
            }
            else if (idxStatus === String(idx) && toDo[task] === 'complete'){
              toDo[task] = 'incomplete';
              askName();
              return;
            }
            idx += 1;
          }
        }
        else{
          console.log('Index does not exist.');
          askName();
          return;
        }
      });
      }
      else{
        console.log("You have no active Tasks.")
        askName();
        return;
      }
    }

    // Delete
    else if (cmd.toLowerCase() === "d"){
      if (Object.entries(toDo).length !== 0){
        let idx = 1;
        for (const task in toDo){
          if (toDo[task] === 'incomplete'){
            taskStatus = '[ ]';
          }
          else{
            taskStatus = '[ X ]';
          }
          console.log(`${idx}. ${taskStatus} ${task}`);
          idx += 1;
        }
      }

      rl.question("\nEnter the index of the task to delete: ", (idxStatus) => {
        if (idxStatus > 0 && idxStatus <= Object.entries(toDo).length ){
          let idx = 1;
          for (const task in toDo){
            if (idxStatus === String(idx)){
              delete toDo[task];
              console.log(`${task} successfully deleted.`);
              askName();
              return;
            }
            idx += 1;
          }
        }
        else{
          console.log("Index does not exist.");
          askName();
          return;
        }
      });
      return
    }

    // this simulates an infinite question loop unless user types exit or unknown command
    console.log("unknown command")
    askName();
});
}

// This is the initial function call
askName();