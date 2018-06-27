$(function() {

  //check if the timer even exists
  if($('.js-timer-div').length) {
    
    function getTimeRemaining(endtime) {
      //endtime is passed in Unix millisecond format, so subtract now in Unix millisecond as well
      var t = endtime - moment().tz('America/Chicago').format('x');
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    }

    function initializeClock(target, endtime) {
      var $clock = $(target);
      var $daysSpan = $clock.find('.js-days');
      var $hoursSpan = $clock.find('.js-hours');
      var $minutesSpan = $clock.find('.js-mins');
      var $secondsSpan = $clock.find('.js-secs');

      function updateClock() {
        var t = getTimeRemaining(endtime);
        
        $daysSpan.html(('0' + t.days).slice(-2));
        $hoursSpan.html(('0' + t.hours).slice(-2));
        $minutesSpan.html(('0' + t.minutes).slice(-2));
        $secondsSpan.html(('0' + t.seconds).slice(-2));
    
        //if we hit zero time remaining…
        if (t.days <= 0 && t.hours <= 0 && t.minutes <= 0 && t.seconds <= 0) {
          clearInterval(timeinterval);
        }
      }

      updateClock();
      var timeinterval = setInterval(updateClock, 1000);
    }

    function setToZero(target) {
      var $clock = $(target);
      var $daysSpan = $clock.find('.js-days');
      var $hoursSpan = $clock.find('.js-hours');
      var $minutesSpan = $clock.find('.js-mins');
      var $secondsSpan = $clock.find('.js-secs');

      //set them all to zero
      $daysSpan.html('00');
      $hoursSpan.html('00');
      $minutesSpan.html('00');
      $secondsSpan.html('00');
    }

    //get the passed expiry time from DEFCON
    var timeFromPage = $('.js-timer-div').data('endTime');
    
    //convert to Unix milliseconds
    var endTime = moment.tz(timeFromPage, 'YYYY-MM-DD HH:mm:ss', 'America/Chicago').format('x');
    var today = moment().tz('America/Chicago').format('x');

    //check if the time has passed, if so - just show zeros,
    //else populate the timer!
    if(today >= endTime) {
      setToZero('.js-timer-div');
    } else {
      initializeClock('.js-timer-div', endTime);
    }
  
  }
});