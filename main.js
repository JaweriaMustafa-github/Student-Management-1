#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class student {
    static counter = 1000;
    name;
    Id;
    courses = [];
    totalBalance;
    constructor(names) {
        this.name = names;
        this.Id = student.counter++;
        this.courses = [];
        this.totalBalance = 50000;
    }
    enrollInCourse(course) {
        this.courses.push(course);
    }
    viewBalance() {
        console.log(chalk.green(`This is your total balance: ${this.totalBalance}`));
    }
    payAmount(amount) {
        this.totalBalance -= amount;
        console.log(chalk.italic.bgBlue(`Your fees of this amount: ${amount} is paid successfully for ${this.courses}. `));
    }
    viewStatus() {
        console.log(chalk.bold.cyanBright(`Name: ${this.name}`));
        console.log(chalk.bold.grey(`Id: ${this.Id}`));
        console.log(chalk.bold.green(`Courses: ${this.courses}`));
        console.log(chalk.bold.yellow(`Balance: ${this.totalBalance}`));
    }
}
class studentManager {
    students;
    constructor() {
        this.students = [];
    }
    // Method to add new students
    addStudents(name) {
        let stdName = new student(name);
        this.students.push(stdName);
        console.log(chalk.bold.italic.bgGray(`Student: ${name} added successfully with the Student Id : ${stdName.Id}`));
    }
    // Method to enroll a student in a course
    enrollStudent(studentId, course) {
        let student = this.findstudent(studentId);
        if (student) {
            student.enrollInCourse(course);
            console.log(chalk.bold.italic.yellowBright(`Congratulations! ${student.name} enrolled in course: ${course} successfully.`));
        }
    }
    // Method to view a student's balance
    viewStudentBalance(studentId) {
        let student = this.findstudent(studentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(chalk.italic.red(`Student is not found.Please enter a correct student Id.`));
        }
    }
    // Method to pay student fees
    payStudentFees(studentId, amount) {
        let student = this.findstudent(studentId);
        if (student) {
            student.payAmount(amount);
        }
        else {
            console.log(chalk.italic.red(`Student is not found.Please enter a correct student Id.`));
        }
    }
    // Method to display student status
    showStudentStatus(studentId) {
        let student = this.findstudent(studentId);
        if (student) {
            student.viewStatus();
        }
        else {
            console.log(chalk.italic.red(`Student is not found.Please enter a correct student Id.`));
        }
    }
    // Method to find a student by student id 
    findstudent(studentId) {
        return this.students.find((std) => std.Id === studentId);
    }
}
// Main function to run the program
async function main() {
    console.log(chalk.bold.italic.bgMagenta("<<<", "-".repeat(50), ">>>"));
    console.log(chalk.bold.italic.magentaBright(`Welcome to Jaweria's Student Management system`));
    console.log(chalk.bold.italic.bgMagenta("<<<", "-".repeat(50), ">>>"));
    let manage = new studentManager();
    // Using while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt({
            name: "choices",
            message: "Choose an option.",
            type: "list",
            choices: [
                "Add Student",
                "Enroll Student",
                "View Balance",
                "Pay Student fees",
                "Show Student Status",
                "Exit"
            ]
        });
        // Using switch case statement for user choice
        switch (choice.choices) {
            case "Add Student":
                let input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student name."
                    }
                ]);
                manage.addStudents(input.name);
                break;
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "Id",
                        type: "number",
                        message: "Enter a student Id."
                    },
                    {
                        name: "course",
                        type: "list",
                        message: "Enter a course name",
                        choices: ["Typescript", "Python", "C++"]
                    }
                ]);
                manage.enrollStudent(courseInput.Id, courseInput.course);
                break;
            case "View Balance":
                let balance = await inquirer.prompt([
                    {
                        name: "Id",
                        type: "number",
                        message: "Enter a student Id."
                    }
                ]);
                manage.viewStudentBalance(balance.Id);
                break;
            case "Pay Student fees":
                let payFees = await inquirer.prompt([
                    {
                        name: "Id",
                        type: "number",
                        message: "Enter a student Id."
                    },
                    {
                        name: "amount",
                        type: "input",
                        message: "Enter amount"
                    }
                ]);
                manage.payStudentFees(payFees.Id, payFees.amount);
                break;
            case "Show Student Status":
                let studentStatus = await inquirer.prompt([
                    {
                        name: "Id",
                        type: "number",
                        message: "Enter a student Id."
                    }
                ]);
                manage.showStudentStatus(studentStatus.Id);
                break;
            case "Exit":
                console.log(chalk.bgGreen.bold(`You are exitting the student management system.`));
                console.log(chalk.bgMagenta.bold(`Thanks for using my Student Management system.`));
                process.exit();
        }
    }
}
// calling the program 
main();
