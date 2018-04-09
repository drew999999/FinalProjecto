
document.addEventListener("turbolinks:load", function() {
// clear
  var instrumentImage = document.querySelector('.job-avatar');
// clear
  function handleFileSelect(evt) {
    var files = evt.target.files;
// clear
  for (var i = 0, f; f = files[i]; i++) {
// clear
    if (!f.type.match('image.*')) {
      continue;
    }
// clear
    var reader = new FileReader();
// clear getting the FileReader api image when we are rendering it
    reader.onload = (function(theFile) {
      return function(e) {
// clear
        var span = document.createElement('span');
        span.innerHTML = ['<img class="avatar-preview-thumb border-light" src="', e.target.result,
      '" title="', escape(theFile.name), '"/>'
    ].join('');
    // clear    when looking for an image will be looking for job avatar to handle a file select to insert an image tag to display in the browser
    document.getElementById('list').insertBefore(span, null);
    // clear
    };
  })(f);
// clear
      reader.readAsDataURL(f);
    }
  }
// clear
if (instrumentImage) {
  this.addEventListener('charge', handleFileSelect, false);
  }
// clear
});
// clear
