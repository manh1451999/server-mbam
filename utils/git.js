const cmd = require("node-cmd");
const { stringToBoolean } = require(".");
module.exports.autoPushProxyGit = ()=>{
  if(!stringToBoolean(process.env.AUTO_PUSH_GIT)) return;
  console.log('node-cmd')
    cmd.run('chmod 777 autoPushGit.sh'); /* :/ Fix no perms after updating */
    cmd.run('sh autoPushGit.sh', (err, data) => {  // Run our script
      if (data) console.log(data);
      if (err) console.log(err);
    });
    cmd.run('refresh');  // Refresh project
}

module.exports.autoPullProxyGit = ()=>{
  if(!stringToBoolean(process.env.AUTO_PUSH_GIT)) return;
  console.log('node-cmd')
    cmd.run('chmod 777 autoPullGit.sh'); /* :/ Fix no perms after updating */
    cmd.run('sh autoPullGit.sh', (err, data) => {  // Run our script
      if (data) console.log(data);
      if (err) console.log(err);
    });
    cmd.run('refresh');  // Refresh project
}