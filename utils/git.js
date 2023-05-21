const cmd = require("node-cmd");
module.exports.autoPushProxyGit = ()=>{
  if(process.env.AUTO_PUSH_GIT=='false') return;
  console.log('node-cmd')
    cmd.run('chmod 777 autoPushGit.sh'); /* :/ Fix no perms after updating */
    cmd.run('sh autoPushGit.sh', (err, data) => {  // Run our script
      if (data) console.log(data);
      if (err) console.log(err);
    });
    cmd.run('refresh');  // Refresh project
}