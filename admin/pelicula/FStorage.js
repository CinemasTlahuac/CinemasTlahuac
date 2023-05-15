  var files = [];
  var reader = new FileReader();

  var namebox = document.getElementById('namebox');
  var extlab = document.getElementById('extlab');
  var myimg = document.getElementById('myimg');
  var proglab = document.getElementById('unprogress');
  var Selectbtn = document.getElementById('Selectbtn');
  var Uploadbtn = document.getElementById('btn-save');
  var Downbtn = document.getElementById('Downbtn');

  var input = document.createElement('input');
  input.type = 'file';

  input.onchange = e =>{

      files = e.target.files;

      var extention = GetFileExt(files[0]); //only select one file
      var name = GetFileName(files[0]);

      namebox.value = name;
      extlab.innerHTML = extention;

      reader.readAsDataURL(files[0]);
  }

      reader.onload = function(){
          myimg.src = reader.result;
      }

      // ---------------SELECTION ----------------//

      Selectbtn.onclick = function(){
          input.click();
      }

      function GetFileExt(file) {
          var temp = file.name.split('.');
          var ext = temp.slice((temp.length-1),(temp.length));
          return '.' + ext[0];
      }

      function GetFileName(file) {
          var temp = file.name.split('.');
          var fname = temp.slice(0,-1).join('.');
          return fname;
      }
