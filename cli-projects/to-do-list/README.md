## CLI To-Do List

At first glance, a CLI To-Do List seemed like a bad recommendation as a beginner vanilla javascript project. 
However, after researching about python input() equivalents to JavaScript, I came across synchronous vs 
asynchronous operations (asynchronous means javascript does not wait for the user to type). In my head 
synchronous makes sense for a CLI because you are provided with the option to enter a command, the system 
then performs an operation based on the user input and the process repeats. This process does not seem like 
it would make sense in an asynchronous environment. 

The following showcases the difference between python and javascript:

Python: 

```
while True:
    user_input = input("Enter a command or enter 'q' to quit: ") #Program stops here until input is provided 
    if user_input.lower() == 'q':
        break
    print(f"Your input: {user_input}")
```

JavaScript:

Think of it as the entire code block continuously running therefore we do not need to declare a while loop

```
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askName() {
  rl.question("Enter your name (or type exit): ", (answer) => {

    if (answer.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      return;
    }

    console.log(`Hello, ${answer}`);

    // Ask again
    askName();
  });
}

askName();
```