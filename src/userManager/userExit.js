const userExit  = (userName, rlInterface) => {
    console.log(' ');
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    rlInterface.close();
}

const printGreetings = (userName, currentPath) => {
    console.log(' ');
console.log(`Welcome to the File Manager, ${userName}!`);
console.log(`You are currently in ${currentPath}`);
console.log(' ');
}

export {userExit, printGreetings}