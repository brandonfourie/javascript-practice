// This file is an updated version of the To-Do List CLI project that incorporates 
// important concepts from Object Oriented Programming. 

class myToDo{
    // constructor intializes this scope's requirements upon class instance 
    constructor(){
        const readline = require("readline");
        const rl = readline.createInterface({
            input : process.stdin,
            output : process.stdout
        })
        // Tasks to be used as keys to ensure unique restrictions 
        this.toDo = {};
        this.rl = rl;
        this.welcome = false;
        this.welcomeMessage = `
--------------------------------------\n
     Welcome to your To-Do List\n
--------------------------------------\n
Enter 'help' to see a list of commands\n
Enter 'exit' to terminate the program\n  
--------------------------------------\n  
            `
    }

    // Getters 
    get toDoLength(){
        return Object.entries(this.toDo).length; 
    }

    // Setters

    createTask(){
        this.rl.question(">>> Enter the task you want to add: ", (task) => {
            this.toDo[task] = "incomplete";
            if (task){
                this.readTask();
            }
        })
    }

    // Display tasks method
    readTask(){
        if (this.toDoLength !== 0){
            let idx = 1;
            let taskStatus = '';
            console.log("\n--------------------------------------\n");
            console.log(`              To-Do List                \n`);
            console.log("--------------------------------------\n");
            for (const task in this.toDo){
                if (this.toDo[task] === "incomplete"){
                    taskStatus = "[ ]";
                }
                else {
                    taskStatus = " [ X ]";
                }
                console.log(`${idx}. ${taskStatus} : ${task}`);
                idx += 1;
            }
            console.log("\n--------------------------------------\n");
            this.commandControl();
        } 
        else {
            console.log("\n--------------------------------------\n");
            console.log(`     You do not have any active tasks     `);
            console.log("\n--------------------------------------\n");
            this.commandControl();
        }
    }

    updateTask(){
        if (this.toDoLength !== 0){
            this.readTask()
            console.log("\n-------------------------------------------------------------\n");
            this.rl.question("Enter the index of the task you want to update the status for: \n", (taskIndex) => {
                console.log("\n-------------------------------------------------------------\n");
                let idx = 1;
                for (const task in this.toDo){
                    if (taskIndex === String(idx)){
                        this.toDo[task] = "complete";
                        console.log(`${taskIndex}. ${task} Successfully updated`)
                        this.readTask();
                        return
                    }
                }
                console.log("Index is either invalid or out of range");
                this.updateTask();
                return;
            });
        }
        else {
            this.readTask();
        }
    }

    deleteTask(){
        if (this.toDoLength !== 0){
            
        }
        else {
            this.readTask();
        }
    }

    // Main control 
    commandControl(){

        if (this.welcome === false){
            console.log(this.welcomeMessage)
            this.welcome = true;
        }

        this.rl.question(`>>> Type a command to manage your tasks: `, 
            (cmd) => {

                // command operations 
                if (cmd.toLowerCase() === "exit"){
                    console.log("Goodbye!");
                    this.rl.close();
                    exit();
                }

                else if (cmd.toLowerCase() === "c"){
                    this.createTask();
                }

                else if (cmd.toLowerCase() === "r"){
                    this.readTask();
                }

                else if (cmd.toLowerCase() === "u"){
                    this.updateTask();
                }

                else if (cmd.toLowerCase() === "d"){

                }
            }
        )
    }

}

const test = new myToDo();
test.commandControl();


/* 

What I learnt from this project: 

- The value and importance of getters and setters and that they are not functions, 
  you do not call them as a function 

- how constructors work and how they are used to initialize and keep track of instances 

- 'this'

*/