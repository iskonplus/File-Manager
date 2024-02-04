export const getUserName = () => {

    let userName = '';
    process.argv.forEach(el => {
        el.startsWith('--') && (userName = `${el.split('=')[1]}`);
    });

    return userName;
}

getUserName();

