import os from 'os';

const getHomeDir = () => os.homedir();

const getEOL = async () => {
    console.log(' ');
    console.log(`Default EOL is ${JSON.stringify(os.EOL)}`);
};

const cpuInfo = async () => {
    console.log(' ');
    const cpus = os.cpus();
    console.log(`Overall amount of CPUs: ${cpus.length}`);

    cpus.forEach((cpu, index) => {
        const { model, speed } = cpu;
        console.log(`CPU ${index + 1}: ${model}, ${(speed / 1000).toFixed(2)} GHz`);
    });

}

const systemUserName = async () => {
  console.log(' ');
  console.log(`System user name: ${os.userInfo().username}`);
};
const systemArchitecture = async () => {
  console.log(' ');
  console.log(`CPU architecture: ${os.arch()}`);
};



export { getHomeDir, getEOL, cpuInfo, systemUserName , systemArchitecture};