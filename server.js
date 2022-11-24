const express = require('express')
const multer = require('multer')
const app = express()
const path = require('path')
const rimraf = require('rimraf')
const fs = require('fs');
const { mergePdfs } = require('./merge')

const upload = multer({ dest: 'uploads/' })

if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public');
}

app.use('/static', express.static('public'))
app.use(express.static(path.join(__dirname, '/templates')))

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {

  // res.sendFile(path.join(__dirname, "templates/index.html"))

  res.send("Namaste");
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
  console.log(req.files);
  let d = await mergePdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
  res.redirect(`http://localhost:3000/static/${d}.pdf`)
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})


var publicDir = __dirname + '/public';
var uploadsDir = __dirname + '/uploads';

// fs.readdir(publicDir, function(err, files) {
//   files.forEach(function(file, index) {
//     fs.stat(path.join(publicDir, file), function(err, stat) {
//       var endTime, now;
//       if (err) {
//         return console.error(err);
//       }
//       now = new Date().getTime();
//       // endTime = new Date(stat.ctime).getTime() + 3600000;
//       //  This 600000 is 10 minutes.

//       // 1 second = 1000 mili-second

//       endTime = new Date(stat.ctime).getTime() + 600000;
//       if (now > endTime) {
//         return rimraf(path.join(publicDir, file), function(err) {
//           if (err) {
//             return console.error(err);
//           }
//           console.log('successfully deleted files from public directory');
//         });
//       }
//     });
//   });
//   console.log("MF")
// });

setInterval(() => {
  fs.readdir(publicDir, function(err, files) {
    files.forEach(function(file, index) {
      fs.stat(path.join(publicDir, file), function(err, stat) {
        var endTime, now;
        if (err) {
          return console.error(err);
        }
        now = new Date().getTime();
        // endTime = new Date(stat.ctime).getTime() + 3600000;
        //  This 600000 is 10 minutes.
  
        // 1 second = 1000 mili-second
  
        endTime = new Date(stat.ctime).getTime() + 600000;
        if (now > endTime) {
          return rimraf(path.join(publicDir, file), function(err) {
            if (err) {
              return console.error(err);
            }
            console.log('successfully deleted files from public directory');
          });
        }
      });
    });
  });
},300000);

setInterval(() => {
  fs.readdir(uploadsDir, function(err, files) {
    files.forEach(function(file, index) {
      fs.stat(path.join(uploadsDir, file), function(err, stat) {
        var endTime, now;
        if (err) {
          return console.error(err);
        }
        now = new Date().getTime();
        // endTime = new Date(stat.ctime).getTime() + 3600000;
        //  This 600000 is 10 minutes.
  
        // 1 second = 1000 mili-second
  
        endTime = new Date(stat.ctime).getTime() + 600000;
        if (now > endTime) {
          return rimraf(path.join(uploadsDir, file), function(err) {
            if (err) {
              return console.error(err);
            }
            console.log('successfully deleted files from upload directory');
          });
        }
      });
    });
  });
},100000);

