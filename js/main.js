var __awesome_qr_base_path = "js"; 
var logoUrl = "";

$(document).ready(function() {
  $("#generate").on("click", function() {
    var data = $("#data").val();
    var arrData = data.split("\n");

    var qrcodeContainer = $(".qrcode-container > div");
    qrcodeContainer.empty();  
    
    require([__awesome_qr_base_path + '/awesome-qr'], function (AwesomeQR) {
      var logo = new Image();
      logo.crossOrigin = "Anonymous";
      logo.onload = () => {
        for (let i = 0 ; i < arrData.length ; i++) {
          var text = arrData[i].trim();
          if (text !== "") {
            qrcodeContainer.append(`<div class="col-3"><div class='qrcode' id='qrcode${i}'></div></div>`);
            AwesomeQR.create({
              text: arrData[i],
              size: 800,
              margin: 0,
              bindElement: `qrcode${i}`,
              logoImage: logo
            });
          }
        }
      }    
      logo.src=logoUrl;
    });
  });

  $("#download").on("click", function() {
    var qrcodes = $(".qrcode");
    var index = 0;
    var timestamp = Date.now();
    var timer = setInterval(() => {
      var qrcode = qrcodes[index];
      var dataUrl = $(qrcode).css('background-image');
      dataUrl = dataUrl.substr(5, dataUrl.length-7);    
      downloadQrcode(dataUrl, timestamp, index);
      index++;
      if (index == qrcodes.length) clearInterval(timer);
    }, 100);
  });

  function downloadQrcode(dataUrl, timestamp, index) {
    var link = document.createElement('a')
    link.setAttribute('href', dataUrl);
    link.setAttribute('download', `${timestamp}-${index}.jpg`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        logoUrl = e.target.result;
      }      
      reader.readAsDataURL(input.files[0]);
    }
  }
  
  $("#logo").change(function() {
    readURL(this);
  });
});