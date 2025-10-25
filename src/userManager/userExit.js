export const userExit = (userName, rlInterface) => {
    console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
    rlInterface.close();
}