export const getUserName = () => {
    const message = 'Anonymous';

    const userName = process.argv
        .filter(arg => arg.startsWith('--username'))[0]

    return userName ? userName.split('=')[1]: message;

}