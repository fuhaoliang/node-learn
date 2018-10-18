<template>
  <div class="about">
    <div class="box">
      <img ref='image' src="../assets/koalas.jpg" alt="">
    </div>
    <div class="small">

    </div>
    <input type="file" id="change" accept="image" @change="change">      
    <button type="button" id="button" @click="crop">确定</button>
  </div>
</template>
<script>
  import Cropper from 'cropperjs'
  export default{
    data (){
      return {
        headerImage:'',  
        picValue:'',  
        cropper:'',  
        croppable:false,  
        panel:false,  
        url:''  
      }
    },
    mounted () {
      let self = this
      let imageDOM = this.$refs.image
      this.cropper  = new Cropper(imageDOM, {
        aspectRatio: 1 / 1,
        viewMode:1,
        zoomable: false,
        crop: function (e) {
            console.log(e.detail.x);
            console.log(e.detail.y);
            console.log(e.detail.width);
            console.log(e.detail.height);
            console.log(e.detail.rotate);
            console.log(e.detail.scaleX);
            console.log(e.detail.scaleY);
        },
        ready: function () {  
          self.croppable = true;  
        },
        preview:".small"
      });
    },
    methods: {
      getObjectURL (file) {  
        var url = null ;   
        if (window.createObjectURL!=undefined) { // basic  
          url = window.createObjectURL(file) ;  
        } else if (window.URL!=undefined) { // mozilla(firefox)  
          url = window.URL.createObjectURL(file) ;  
        } else if (window.webkitURL!=undefined) { // webkit or chrome  
          url = window.webkitURL.createObjectURL(file) ;  
        }  
        return url ;  
      },  
      change (e) {  
        let files = e.target.files || e.dataTransfer.files;  
        if (!files.length) return;  
        this.panel = true;  
        this.picValue = files[0];  

        this.url = this.getObjectURL(this.picValue);  
        //每次替换图片要重新得到新的url  
        if(this.cropper){  
          this.cropper.replace(this.url);  
        }  
        this.panel = true;  

      },  
      crop () {
          let a = $('div')
          console.info('a', a);  
          this.panel = false;  
          var croppedCanvas;  
          var roundedCanvas;  

          if (!this.croppable) {  
            return;  
          }  
          // Crop  
          croppedCanvas = this.cropper.getCroppedCanvas();  
          console.log(this.cropper)  
          // Round  
          console.info('croppedCanvas', croppedCanvas);
          roundedCanvas = this.getRoundedCanvas(croppedCanvas);  
          this.headerImage = roundedCanvas.toDataURL();  
          this.postImg()
          console.info('headerImage-->', this.headerImage);  
          console.info('sumitImageFile', sumitImageFile(this.headerImage));
      },  
      getRoundedCanvas (sourceCanvas) { 
        console.info('sourceCanvas', sourceCanvas); 
        var canvas = document.createElement('canvas');  
        var context = canvas.getContext('2d');  
        var width = sourceCanvas.width;  
        var height = sourceCanvas.height;  

        canvas.width = width;  
        canvas.height = height;  

        context.imageSmoothingEnabled = true;  
        context.drawImage(sourceCanvas, 0, 0, width, height);  
        context.globalCompositeOperation = 'destination-in';  
        context.beginPath();  
        context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);  
        context.fill();  

        return canvas;  
      },  
      postImg () {  
        //这边写图片的上传  
      }
    }  
  }
  
  function convertBase64UrlToBlob(urlData){
    var bytes=window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob( [ab] , {type : 'image/png'});
  }
  function sumitImageFile(base64Codes){
    var formData = new FormData();   //这里连带form里的其他参数也一起提交了,如果不需要提交其他参数可以直接FormData无参数的构造函数
    //convertBase64UrlToBlob函数是将base64编码转换为Blob
    console.info('convertBase64UrlToBlob(base64Codes)', convertBase64UrlToBlob(base64Codes));
    formData.append("imageName",convertBase64UrlToBlob(base64Codes));
    return formData
  }
</script>
<style>
  .box{
    width: 400px;
    height: 400px;
  }
  .small{
    width: 100px;
    height: 100px;
    border-radius:50px;
    border-radius: 1px solid #000;
    overflow: hidden;
  }
</style>

