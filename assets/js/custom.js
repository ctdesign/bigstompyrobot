
// Hero mouse-parallax
// Subtly shifts the background image position based on cursor location.
(function () {
  var hero = document.querySelector('.hero');
  var bg = document.querySelector('.hero__bg');
  if (!hero || !bg) return;
 
  var strength = 18; // max px the image shifts in any direction
 
  hero.addEventListener('mousemove', function (e) {
    var rect = hero.getBoundingClientRect();
    var x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
    var y = (e.clientY - rect.top) / rect.height - 0.5;  // -0.5 to 0.5
    bg.style.transform =
      'translate(' + (x * -strength) + 'px, ' + (y * -strength) + 'px)';
  });
 
  hero.addEventListener('mouseleave', function () {
    bg.style.transform = 'translate(0, 0)';
  });
})();