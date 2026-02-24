

class MyToDo{
    // Sets up readline interface and initializes app state
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


    toDoExit(){
        console.log("Goodbye!");
        this.rl.close();
    }

    // Displays a list of valid commands 
    toDoHelp(){
        console.log("--------------------\n");
        console.log("To Do List Commands");
        console.log("\n--------------------\n");
        console.log("'exit' : Terminate program\n 'c' : Create a new task\n 'r' : Display active Tasks\n 'u' : Update task status\n 'd' : Delete a task\n");
        this.commandControl();
    }


    createTask(){
        this.rl.question(">>> Enter the task you want to add: ", (task) => {
            // prevents duplicate tasks 
            if (task.toLowerCase().trim() in this.toDo){
                console.log(`'${task}' already exists`);
                this.commandControl();
                return
            }
            this.toDo[task.toLowerCase().trim()] = "incomplete";
            console.log(`Task: '${task}' successfully added`)
            if (task){
                this.readTask();
            }
        })
    }

    readTask(clean = ""){
    // parameter allows read task to display active tasks without recursive command control call
        if (this.toDoLength !== 0){
            let idx = 1;
            let taskStatus = '';
            console.log("\n--------------------------------------\n");
            console.log(`              To-Do List                \n`);
            console.log("--------------------------------------\n");
            // task formatting 
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
            if (clean === ""){
                this.commandControl();
            }
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
            this.readTask("clean")
            console.log("\n-------------------------------------------------------------\n");
            this.rl.question("Enter the index of the task you want to update the status for: \n", (taskIndex) => {
                console.log("\n-------------------------------------------------------------\n");
                if (taskIndex.toLowerCase().trim() === "exit"){
                    console.log("exit");
                    this.toDoExit();
                    return;
                }
                let idx = 1;
                for (const task in this.toDo){
                    if (taskIndex.trim() === String(idx)){
                        this.toDo[task] = "complete";
                        console.log(`${taskIndex}. ${task} Successfully updated`)
                        this.readTask();
                        return
                    }
                    idx += 1;
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
            this.readTask("clean")
            console.log("\n---------------------------------------------------\n");
            this.rl.question("Enter the index of the task you want to delete: \n", (taskIndex) => {
                console.log("\n---------------------------------------------------\n");
                if (taskIndex.toLowerCase().trim() === "exit"){
                    console.log("exit");
                    this.toDoExit();
                    return;
                }
                let idx = 1;
                for (const task in this.toDo){
                    if (taskIndex.trim() === String(idx)){
                        delete this.toDo[task];
                        console.log(`${taskIndex}. ${task} Successfully deleted`)
                        this.readTask();
                        return
                    }
                    idx += 1;
                }
                console.log("Index is either invalid or out of range");
                this.deleteTask();
                return;
            });
            
        }
        else {
            this.readTask();
        }
    }

    // Main control 
    commandControl(){

        // One time welcome message
        if (this.welcome === false){
            console.log(this.welcomeMessage)
            this.welcome = true;
        }

        this.rl.question(`>>> Type a command to manage your tasks: `, 
            (cmd) => {

                // command operations 
                if (cmd.toLowerCase().trim() === "exit"){
                    this.toDoExit();
                }

                else if (cmd.toLowerCase().trim() === "help"){
                    this.toDoHelp();
                }

                else if (cmd.toLowerCase().trim() === "c"){
                    this.createTask();
                }

                else if (cmd.toLowerCase().trim() === "r"){
                    this.readTask();
                }

                else if (cmd.toLowerCase().trim() === "u"){
                    this.updateTask();
                }

                else if (cmd.toLowerCase().trim() === "d"){
                    this.deleteTask();
                }

                // Invalid commands handler
                else{
                    console.log(`'${cmd}' is an unknown command\n`);
                    this.toDoHelp();
                    this.commandControl();
                }
            }
        )
    }

}

const test = new MyToDo();
test.commandControl();

