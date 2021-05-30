/*all code backedup in dummy.js*/

const fs = require("fs");
const http = require("http");
const qs = require('querystring');

function admin(data) {
  var username = data.username;
  var password = data.password;
  var fdata = fs.readFileSync("database.txt");
  var s = fdata.toString();
  var data = JSON.parse(s);
  var duname = data.admin.username;
  var dpass = data.admin.password;
  if(username == duname && dpass == password){
    return true;
  }else{
    return false;
  }
}

function newslatter(data){
  var email = data.email;
  var fdata=fs.readFileSync("database.txt");
  var s=fdata.toString();
  var data = JSON.parse(s);
  var id=data.newslatter.length;
  for (var x=0; x<id; x++){
    if(email == data.newslatter[x]){
      return;
    }
  }
  data.newslatter.push(email);
  var p = JSON.stringify(data);
  fs.writeFile("database.txt", p , (err)=>{
    if(err)console.log(err);
  });
}

function quote(data) {
  var email = data.email;
  var name = data.name;
  var massage = data.massage;
  var fdata = fs.readFileSync("database.txt");
  var s = fdata.toString();
  var data = JSON.parse(s);
  var id = data.quote.length;
  for (var x = 0; x < id; x++) {
    if (massage == data.quote[x].massage) {
      return;
    }
  }
  data.quote[id]={email : email, name : name, massage : massage};
  var p = JSON.stringify(data);
  fs.writeFile("database.txt", p, (err) => {
    if (err) console.log(err);
  });
}


const server = http.createServer((req,res)=>{
  var file = req.url.substring(1);
  var a=(req.url.substring(1)).split("/");
  if (file.length == 0){
    file = "index.html";
  }
    if(a[0]=="post"){
      switch(a[1]){
        case "admin":
          
          if (req.method == 'POST') {
            var body = '';
            req.on('data', (data) => {
              body += data;
              if (body.length > 1e6)
                req.connection.destroy();
            });
          
            req.on('end', () => {
              var post = qs.parse(body);
              var admint=admin(post);
              console.log("Someone logged in as admin.");
              if(admint){
                res.writeHead(200, { 'Conten-type': 'text/html' });
                var newslatter = "";
                var fdata = fs.readFileSync("database.txt");
                var s = fdata.toString();
                var data = JSON.parse(s);
                var id = data.newslatter.length;
                for (var x=0; x<id; x++){
                  newslatter += data.newslatter[x] + "</br>";
                }
                
                var fdata = fs.readFileSync("database.txt");
                var s = fdata.toString();
                var data2 = JSON.parse(s);
                var id2 = data.quote.length;
                var quotes = "";
                for(var y=0; y<id2;y++){
                  quotes+="<br>name:"+data2.quote[y].name+"<br>email:"+data2.quote[y].email+"<br>massage:"+data2.quote[y].massage+"<br>";
                }
                res.end("<h1>subscriptions :</h1></br>"+newslatter+"<br><br><h1>quotes:</h1><br>"+quotes);
              }
            });
          }
          
          break;
        case "newslatter":
          if (req.method == 'POST') {
            var body = '';
            req.on('data', (data) => {
              body += data;
              if (body.length > 1e6)
                req.connection.destroy();
            });
          
            req.on('end', () => {
              var post = qs.parse(body);
              newslatter(post);
            });
          }
          
          break;
        case "quote":
          if (req.method == 'POST') {
            var body = '';
            req.on('data', (data) => {
              body += data;
              if (body.length > 1e6)
                req.connection.destroy();
            });
          
            req.on('end', () => {
              var post = qs.parse(body);
              quote(post);
            });
          }
          break;
        default:
          res.end("404 invalid link");
      }
    }
  if (a[0] != "post"){
    try{
      if (file == "favicon.ico") {
        res.writeHead(204);
      }else{
      var data = fs.readFileSync(file);
      res.writeHead(200, { 'Conten-type': 'text/html' });
      res.write(data);
      res.end();
      }
    }
    catch(err){
      console.log(err);
    }
      
  }
});

server.listen(3000);
console.log("listening to post 3000");