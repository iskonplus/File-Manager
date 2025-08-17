import os from 'os';

const getEOL = () => {
    return JSON.stringify(os.EOL);
}
const getHomeDir = () => {
    return os.homedir();
}

const cpuInfo = () => {
    return JSON.stringify(os.cpus()[0]);
}
const getUser = () => {
    return os.userInfo().username;
}
const getCpuArchitecture = () => {
    return os.arch();
}

export { getEOL, getHomeDir, cpuInfo, getUser, getCpuArchitecture };
