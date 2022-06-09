const { spawn } = require("child_process");
const express = require("express");
const route = express.Router();
const multer = require('multer')
const path = require('path')
const fs = require('fs'); 
var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database : 'eduhelp'
});

const summaryFolder = './summarized_doc/';
const fullFolder = './documents/';

const storage = multer.diskStorage({
    destination: "./Videos",
    filename: (req, file,cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: storage
}).single('video')

const storage1 = multer.diskStorage({
    destination: "./Docs",
    filename: (req, file,cb) => {
        cb(null, file.originalname)
    }
})

const storage2 = multer.diskStorage({
    destination: "./Images",
    filename: (req, file,cb) => {
        cb(null, file.originalname)
    }
})

const upload1 = multer({
    storage: storage2
}).single('image')


const upload2 = multer({
    storage: storage1
}).single('document')

const docFolder = './Docs';
const docFolderN = './Docs/notices';
const docFolder10 = './Docs/grade10';
const docFolder11 = './Docs/grade11';

route.post('/video', upload,(req, res) =>{
    res.send("success");
})

route.post('/getDoc', (req, res) =>{
    var files_list = []
    folderPath =""
    if(req.body.id ==0){
        folderPath = fullFolder
    }else{
        folderPath = summaryFolder
    }

    fs.readdir(folderPath, (err, files) => {
        files.forEach(file => {
            fn = file.split("_");
            if(fn[0] == req.body.type)
                files_list.push(file.split('.')[0])     
        });
        res.send(files_list);
      });
})

route.post('/getDocData', function(req, res){
    console.log(req.body)
    folderPath =""
    if(req.body.folder ==0){
        folderPath = fullFolder
    }else{
        folderPath = summaryFolder
    }

    fs.readFile(folderPath+'/'+req.body.id+'.txt', { encoding: 'utf8' } , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
      //  values = data.match(/.{1,15}/g);
        res.send(data);
      })
})

route.post('/login', function(request, response) {
	var username = request.body.uname;
	var password = request.body.pwd;
	if (username && password) {
		con.query('SELECT utype FROM users WHERE uname = ? AND pwd = ?', [username, password], function(error, results, fields) {

            if (results.length > 0) {
				response.send(results);
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

////// compoenet 03 /////////////////
route.post('/doc', upload2, function(req, res) {
    console.log(req.file.originalname)
   // await sleep(10);
    var content = ""
    fs.readFile(docFolder+"/"+req.file.originalname, { encoding: 'utf8' } , (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        console.log(data)
        content = data

        const { spawn } = require('child_process');
        const pyProg = spawn('python', ['categorize.py', req.file.originalname, data]);
    
        pyProg.stdout.on('data', function(data) {
    
            console.log(data.toString());
            // res.write(data);
            // res.end('end');
        });
        res.send("success");
    })
})

route.post('/getDocs', function(req, res){
    var id = req.body.id;
    var path;

    if(id == 1){
        path = docFolderN
    }else if(id == 10){
        path = docFolder10
    }else{
        path = docFolder11
    }
 
    var files_list = []
    fs.readdir(path, (err, files) => {
        files.forEach(file => {
            files_list.push(file.split('.')[0])     
        });
        console.log(files_list)
        res.send(files_list);
      });
})

route.post('/getDocsData', function(req, res){
    var id = req.body.id;
    var folder = req.body.folder;

    var path;

    if(folder == 1){
        path = docFolderN
    }else if(folder == 10){
        path = docFolder10
    }else{
        path = docFolder11
    }

    fs.readFile(path+'/'+req.body.id+'.txt', { encoding: 'utf8' } , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        res.send(data);
    })
})

////// compenet 04 ///////////////////

route.post('/image', upload1,function(req, res){
    res.send("success");
})

route.get('/getDetails', function(request, response) {
	console.log("awa")
	var values = []
	con.query('SELECT * FROM payment', function(error, results, fields) {
            if (results.length > 0) {
				for (var i=0; i<results.length; i++){				
					var v = results[i]["reg_no"]
					var v1 = results[i]["amount"]
					var v2 = results[i]["course"]
					var v3 = results[i]["slip_name"]
					values.push([v3,v,v1,v2])
				}
				console.log(values)
				response.send(values);
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
});


module.exports = route;