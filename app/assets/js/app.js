$(function() {
    
  $("#page-header").typer({
    typeSpeed: 60,
    backspaceSpeed: 20,
    backspaceDelay: 800,
    repeatDelay: 1000,
    repeat:true,
    autoStart:true,
    startDelay: 100,
    strings: [
        "High School Student looking for that first car?",
        "College student trying to drive something affordable?",
        "Single parent with dinged credit who needs better, more reliable transportation without getting gouged?",
        "Working family needing extra cash?",
        "Retiree on a fixed income that just isn't enough?"
      ]

  });

  $('.no-js').hide();

  
});