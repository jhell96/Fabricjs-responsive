(function(){

  var board = new fabric.Canvas(document.getElementById('annotator'));
  window.addEventListener('resize', resizeCanvas, false);
  board.isDrawingMode = true;

  var annotationList = [];

  function Annotation(obj, x, y, width, height, vpW, vpH) {
    this.obj = obj;
    this.xCoord = x;
    this.yCoord = y;
    this.widthVal = width;
    this.heightVal = height;
    this.viewportWidth = vpW;
    this.viewportHeight = vpH;
  }  
  
  function resizeCanvas() {
    vpW = window.innerWidth;
    vpH = window.innerHeight;
    board.setHeight(vpH);
    board.setWidth(vpW);

    board.forEachObject(function(obj){
      if (objInArray(obj, annotationList) <0){
        var x = obj.get('left'),
            y = obj.get('top'),
            width = obj.getWidth(),
            height = obj.getHeight();

        var newAnnotation = new Annotation(obj, x, y, width, height, vpW, vpH);
        annotationList.push(newAnnotation);
      }

      var annotation = annotationList[objInArray(obj, annotationList)];

      var scaleW = (vpW/annotation.viewportWidth);
      var scaleH = (vpH/annotation.viewportHeight);
      var scaleX = annotation.xCoord * scaleW;
      var scaleY = annotation.yCoord * scaleH;

      obj.set('scaleX', scaleW);
      obj.set('scaleY', scaleH);
      obj.set('left', scaleX);
      obj.set('top', scaleY);

      obj.setCoords();
    }); 


    board.renderAll();
  }

  function objInArray(obj, annotationArray){
    for (var i = 0; i < annotationArray.length; i++) {
      if (annotationArray[i].obj === obj){
        return i;
      }
    } 
    return -1;
  }

  // resize on init
  resizeCanvas();
})();
