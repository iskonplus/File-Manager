import os from 'os';

const getHomeDir = () => os.homedir();

const getEOL = async() => {
    console.log(' ');
    console.log(`Default EOL is ${JSON.stringify(os.EOL)}`);
};


export { getHomeDir, getEOL };