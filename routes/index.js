var express = require('express');
var router = express.Router();
var usr=require('dao/dbConnect');
 
 /* GET home page. */
router.get('/', function(req, res) {
      if(req.cookies.islogin){
          req.session.islogin=req.cookies.islogin;
      }
 if(req.session.islogin){
     res.locals.islogin=req.session.islogin;
 }
   res.render('index', { title: 'HOME',test:res.locals.islogin});
 });
 
 
 router.route('/login')
     .get(function(req, res) {
         if(req.session.islogin){
             res.locals.islogin=req.session.islogin;
         }
 
         if(req.cookies.islogin){
             req.session.islogin=req.cookies.islogin;
         }
         res.render('login', { title: '用户登录' ,test:res.locals.islogin});
     })
     .post(function(req, res) {
         client=usr.connect();
         result=null;
         usr.selectFun(client,req.body.password, req.body.username,function (result) {
         	//console.log(result);
            if(req.body.password==''||req.body.username==''){
                res.send('11');
            }
            else if(result[0]===undefined){
                 res.send('1');
             }else{
             	 if (result[0].powr==='1') {
             	 	req.session.islogin=req.body.username;
                     res.locals.islogin=req.session.islogin;
                     res.cookie('islogin',res.locals.islogin,{maxAge:60000});
             	 	 res.send('2');
             	 	//res.redirect('/sysadmin');

             	 }else{
             	 	 usr.insertlog(client,req.body.username, function (err) {
                      if(err) throw err;

                     });
                     req.session.islogin=req.body.username;
                     res.locals.islogin=req.session.islogin;

                     res.cookie('power',result[0].powr,{maxAge:60000});
                     res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                    
                     res.redirect('/home');

             	 }

                 // else if(result[0].password==='0'&&result[0].password==='0'){
                 //     usr.insertlog(client,req.body.username, function (err) {
                 //      if(err) throw err;

                 //     });
                 //     req.session.islogin=req.body.username;
                 //     res.locals.islogin=req.session.islogin;
                 //     res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                 //     res.redirect('/home');
                 // }else
                 //   {    
                 //      res.send("密码错误:将在2s内返回登陆页<script>setInterval(\"window.open('/login','_self')\",3000);</script>");
            
                 // 	console.log(result[0].password);
                 //     //res.redirect('/login');
                 // }
                }
         });
     });
 
 router.get('/logout', function(req, res) {
     res.clearCookie('islogin');
     req.session.destroy();
     res.redirect('/');
 });
 
 router.get('/home', function(req, res) {
     if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
     }
     if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
     }
 

     res.render('home', { title: 'Home', user: res.locals.islogin,power:req.cookies.power});
 });



router.get('/sysadmin', function(req, res) {
     if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
     }
     if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
     }
          client=usr.connect();
         usr.selectSysAll(client,function (err,results) {
               if(err) throw err;
              console.log("3");
                res.render('sysadmin',{ items:results,user: res.locals.islogin,power:req.cookies.power});


         });

         // usr.selectMessageAll(client,function (err,results) {
         //       if(err) throw err;
         //      console.log("3");
         //       // res.render('sysadmin',{ messages:results,user: res.locals.islogin });


         // });
    // res.render('sysadmin', { title: 'sysadmin', user: res.locals.islogin });
 });

router.get('/sysadminmessage', function(req, res) {
     if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
     }
     if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
     }
          client=usr.connect();
       
         usr.selectMessageAll(client,function (err,results) {
               if(err) throw err;
              console.log("3");
                res.render('sysadminmessage',{ messages:results,user: res.locals.islogin });


         });
 });
 router.get('/log', function(req, res) {
     if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
     }
     if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
     }
          client=usr.connect();
       
         usr.selectlogAll(client,function (err,results) {
               if(err) throw err;
              console.log("3");
                res.render('log',{ logs:results,user: res.locals.islogin });


         });
    // res.render('sysadmin', { title: 'sysadmin', user: res.locals.islogin });
 });


  router.get('/spsys', function(req, res) {
     if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
     }
     if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
     }
          client=usr.connect();
       
         usr.selectspsys(client,function (err,results) {
               if(err) throw err;
              //console.log("3");
                res.render('spsys',{ spsys:results,user: res.locals.islogin });


         });
    // res.render('sysadmin', { title: 'sysadmin', user: res.locals.islogin });
 });

  router.get('/spsys2', function(req, res) {
     if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
     }
     if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
     }
          client=usr.connect();
       
         usr.selectspsys(client,function (err,results) {
               if(err) throw err;
              //console.log("3");
                res.render('spsys2',{ spsys:results,user: res.locals.islogin });


         });
    // res.render('sysadmin', { title: 'sysadmin', user: res.locals.islogin });
 });


  router.route('/sys')
    .get(function(req, res) {
      if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
     }
     if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
     }
     res.render('sys', { title: 'sys', user: res.locals.islogin });
     })
    .post(function(req, res) {
    	var systype = req.body.sys;
    	client=usr.connect();
        result=null;
        usr.selectSys(client,req.body.sys, function (result) {
           
             	//console.log(result[0]);
             	res.send(result);
               //res.send({tip:result[0]});
             
         });
    	
      
      
    });

 router.get('/message', function(req, res) {
     if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
     }
     if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
     }
     res.render('message', { title: 'message', user: res.locals.islogin });
 });

 router.post('/message',function(req, res) {
    	//var systype = req.body.sys;
    	client=usr.connect();
    	console.log(req.body.username);
    	console.log(req.body.name);
    	console.log(req.body.contect);
    	console.log(req.body.message);
         usr.insertMessage(client,req.body.username,req.body.name,req.body.contect,req.body.message, function (err) {
               if(err) throw err;

                res.send("留言成功:将在3s内返回主页<script>setInterval(\"window.open('/home','_self')\",3000);</script>");


         });
             
         });



    router.post('/addsys',function(req, res) {
    	
    	client=usr.connect();
    	
         usr.insertSys(client,req.body.systype,req.body.ip,req.body.info,function (err) {
               if(err) throw err;

                res.send("ssss");


         });
             
         });

       router.post('/addspsys',function(req, res) {
        
        client=usr.connect();
          
         usr.insertSpSys(client,req.body.spsysname,req.body.spip,req.body.ranid,function (err) {
               if(err) throw err;

                res.send("ssss");
     

         });
          usr.insertSys2(client,req.body.ranid,req.body.spip);
             
         });

      router.post('/deletesys',function(req, res) {
    	
    	client=usr.connect();
    	
         usr.deleteSys(client,req.body.id,function (err) {
               if(err) throw err;
                console.log(req.body.id);
                //res.send("ssss");


         });
             
         });

        router.post('/deletespsys',function(req, res) {
        
        client=usr.connect();
        
         usr.deleteSpSys(client,req.body.id,function (err) {
               if(err) throw err;
                console.log(req.body.id);
                //res.send("ssss");


         });
             
         });

     router.post('/deleteuser',function(req, res) {
    	
    	client=usr.connect();
    	
         usr.deleteUser(client,req.body.id,function (err) {
               if(err) throw err;
                console.log(req.body.id);
                //res.send("ssss");


         });
             
         });

     router.post('/upuser',function(req, res) {
    	
    	client=usr.connect();
    	
         usr.UpUser(client,req.body.id,function (err) {
               if(err) throw err;
                console.log(req.body.id);
                //res.send("ssss");


         });
             
         });

  // router.get('/sysadmin',function(req, res) {
  //   	//var systype = req.body.sys;
  //   	client=usr.connect();
  //        usr.selectSysAll(function (err,results) {
  //              if(err) throw err;
  //             console.log("3");
  //               res.render('sysadmin',{ items:results});


  //        });
             
  //        });
 
 router.route('/user')
     .get(function(req, res) {
     if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
     }
     if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
     }
          client=usr.connect();
       
         usr.selectuserAll(client,function (err,results) {
               if(err) throw err;
              console.log("3666666");
            res.render('user',{ users:results,user: res.locals.islogin });


         });
    // res.render('sysadmin', { title: 'sysadmin', user: res.locals.islogin });
    })
     // .get(function(req,res){
     // 	if(req.session.islogin){
     //     res.locals.islogin=req.session.islogin;
     // }
     //  if(req.cookies.islogin){
     //     req.session.islogin=req.cookies.islogin;
     // }
     //     res.render('user',{title:'注册',user: res.locals.islogin});
     // })
     .post(function(req,res) {
         client = usr.connect();
 
         usr.insertFun(client,req.body.username ,req.body.password2,req.body.powr, function (err) {
               if(err) throw err;
               //res.render('user',{ users:results,user: res.locals.islogin });
               //res.render('sysadmin', { title: 'sysadmin', user: res.locals.islogin });
        res.send("添加成功:将在1s内返回主页<script>setInterval(\"window.open('/sysadmin','_self')\",1000);</script>");
         });
     });
 
 module.exports = router;
