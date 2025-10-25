export const userExit = (userName, rlInterface) => {
    console.log(' ');
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    rlInterface.close();
}