var exec = require('child_process').exec;

check();
function check(){
  last = exec('lsof -i:8008');
  last.on('exit',function(code){
  	if (code !='0') {
  		console.log('主机服务正在重启');
  		run();
  	}else{
  		console.log('正在运行');
  	}
  });
setTimeout(check,5000);

}

function run(){
last = exec('npm start');
last.on('exit',function(code){
if (code =='0') {
	console.log('主机服务已经重启');

}else{
	console.log('主机服务重启失败');

}

});

}