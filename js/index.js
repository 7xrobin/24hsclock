var centerX = 500;
var centerY = 240;
var rHour = 190;
var rMin = 150;
var rSec = 120;
var numbMargin= 10;


var polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians;
    angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

(function(){
    var writeNumbers;
    
    writeNumbers =  function(){
      var hourNumbers= $('#hourNumbers');
      var minNumbers= $('#minNumbers');
      var svgNS = "http://www.w3.org/2000/svg";
      for(var i=0; i<24;i++){
         var hourDegree= (i * 15);
         var pos = polarToCartesian(centerX-numbMargin,centerY+numbMargin, rHour+30, hourDegree);
         var newText = document.createElementNS(svgNS,"text");
         newText.setAttributeNS(null,"x",pos.x.toString());      
         newText.setAttributeNS(null,"y",pos.y.toString());   
         newText.setAttributeNS(null,"id",i.toString());   
         var textNode = document.createTextNode(i.toString());
         newText.appendChild(textNode);
         hourNumbers.append(newText);
      }
      for(var i=0; i<60;i+=5){
         var minDegree=  i / 60 * 360;
         var pos = polarToCartesian(centerX-7,centerY+7, rMin+20, minDegree);
         var newText = document.createElementNS(svgNS,"text");
         newText.setAttributeNS(null,"x",pos.x.toString());      
         newText.setAttributeNS(null,"y",pos.y.toString());   
         newText.setAttributeNS(null,"id",i.toString());   
         var textNode = document.createTextNode(i.toString());
         newText.appendChild(textNode);
         minNumbers.append(newText);
      }
    };

    writeNumbers();
}).call(this);

(function() {
  var describeArc, setOrbits;

  describeArc = function(x, y, radius, startAngle, endAngle) {
    var arcSweep, end, start;
    start = polarToCartesian(x, y, radius, endAngle);
    end = polarToCartesian(x, y, radius, startAngle);
    arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', radius, radius, 0, arcSweep, 0, end.x, end.y].join(' ');
  };

  setOrbits = function() {
    var dot, hour, hourArc, minArc, minute, now, pos;
    now = new Date();
    hour = now.getHours();
    minute = now.getMinutes();
    second = now.getSeconds();
    hourArc = (hour * 60 + minute) / (24 * 60) * 360;
    minArc = minute / 60 * 360;
    secArc = second / 60 * 360;
    $('.clockArc.hour').attr('d', describeArc(centerX, centerY, rHour, 0, hourArc));
    $('.clockArc.minute').attr('d', describeArc(centerX, centerY, rMin, 0, minArc));
    $('.clockArc.second').attr('d', describeArc(centerX, centerY, rSec, 0, secArc));
    $('.clockDot.hour').attr('d', describeArc(centerX, centerY, rHour, hourArc , hourArc));
    $('.clockDot.minute').attr('d', describeArc(centerX, centerY, rMin, minArc , minArc));
    dot = $(".clockDot.hour");
    pos = polarToCartesian(centerX, centerY, rHour, hourArc);
    dot.attr("cx", pos.x);
    dot.attr("cy", pos.y);
    dot = $(".clockDot.minute");
    pos = polarToCartesian(centerX, centerY, rMin, minArc);
    dot.attr("cx", pos.x);
    dot.attr("cy", pos.y);
    dot = $(".clockDot.second");
    pos = polarToCartesian(centerX, centerY, rSec, secArc);
    dot.attr("cx", pos.x);
    dot.attr("cy", pos.y);
  };

 
  setOrbits();

  setInterval(function() {
    return setOrbits();
  }, 100);
}).call(this);