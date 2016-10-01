(function(){

    var writeNumbers;

    writeNumbers =  function(){
      for(var i=0; i<=24;i++){
        $('.clockArc.hour').after(i);
      }
    };

}).call(this);

(function() {
  var describeArc, polarToCartesian, setCaptions;

  polarToCartesian = function(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians;
    angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  describeArc = function(x, y, radius, startAngle, endAngle) {
    var arcSweep, end, start;
    start = polarToCartesian(x, y, radius, endAngle);
    end = polarToCartesian(x, y, radius, startAngle);
    arcSweep = endAngle - startAngle <= 180 ? '0' : '1';
    return ['M', start.x, start.y, 'A', radius, radius, 0, arcSweep, 0, end.x, end.y].join(' ');
  };

  setCaptions = function() {
    var dot, hour, hourArc, minArc, minute, now, pos;
    now = new Date();
    hour = now.getHours();
    minute = now.getMinutes();
    second = now.getSeconds();
    hourArc = (hour * 60 + minute) / (24 * 60) * 360;
    minArc = minute / 60 * 360;
    secArc = second / 60 * 360;
    $('.clockArc.hour').attr('d', describeArc(500, 240, 190, 0, hourArc));
    $('.clockArc.minute').attr('d', describeArc(500, 240, 150, 0, minArc));
    $('.clockArc.second').attr('d', describeArc(500, 240, 120, 0, secArc));
    $('.clockDot.hour').attr('d', describeArc(500, 240, 190, hourArc - 1 , hourArc));
    $('.clockDot.minute').attr('d', describeArc(500, 240, 150, minArc - 3, minArc));
    dot = $(".clockDot.hour");
    pos = polarToCartesian(500, 240, 190, hourArc);
    dot.attr("cx", pos.x);
    dot.attr("cy", pos.y);
    dot = $(".clockDot.minute");
    pos = polarToCartesian(500, 240, 150, minArc);
    dot.attr("cx", pos.x);
    dot.attr("cy", pos.y);
    dot = $(".clockDot.second");
    pos = polarToCartesian(500, 240, 120, secArc);
    dot.attr("cx", pos.x);
    dot.attr("cy", pos.y);
  };

 
  setCaptions();

  setInterval(function() {
    return setCaptions();
  }, 1 * 1000);
}).call(this);