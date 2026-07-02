
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

// Comic page viewer
// Only runs on pages where <body> has the "layout-comic-single" class.
// Pulls all images out of the comic content column and presents them
// in a full-screen reader, triggered by a link with class
// "comic-viewer-open". Click the left half of the image to go back,
// the right half to advance. Prev/next controls also live in the bar.
(function () {
  if (!document.body.classList.contains('layout-comic-single')) return;

  var contentImages = Array.prototype.slice.call(
    document.querySelectorAll('.grid-column-two-thirds img')
  );
  if (!contentImages.length) return;

  var current = 0;
  var mode = 'fit'; // 'fit' or 'full'

  var viewer = document.createElement('div');
  viewer.className = 'comic-viewer';
  viewer.innerHTML =
    '<div class="comic-viewer__bar">' +
      '<button type="button" class="comic-viewer__mode">Zoom in</button>' +
      '<div class="comic-viewer__pagenav">' +
        '<button type="button" class="comic-viewer__pagebtn comic-viewer__prev" aria-label="Previous page">&lsaquo;</button>' +
        '<span class="comic-viewer__count"></span>' +
        '<button type="button" class="comic-viewer__pagebtn comic-viewer__next" aria-label="Next page">&rsaquo;</button>' +
      '</div>' +
      '<button type="button" class="comic-viewer__close" aria-label="Close">&times;</button>' +
    '</div>' +
    '<div class="comic-viewer__stage comic-viewer__stage--fit">' +
      '<img class="comic-viewer__image" src="" alt="">' +
    '</div>';
  document.body.appendChild(viewer);

  var stage = viewer.querySelector('.comic-viewer__stage');
  var imageEl = viewer.querySelector('.comic-viewer__image');
  var countEl = viewer.querySelector('.comic-viewer__count');
  var modeBtn = viewer.querySelector('.comic-viewer__mode');
  var closeBtn = viewer.querySelector('.comic-viewer__close');
  var prevBtn = viewer.querySelector('.comic-viewer__prev');
  var nextBtn = viewer.querySelector('.comic-viewer__next');

  function setMode(newMode) {
    mode = newMode;
    stage.classList.toggle('comic-viewer__stage--fit', mode === 'fit');
    stage.classList.toggle('comic-viewer__stage--full', mode === 'full');
    modeBtn.textContent = mode === 'fit' ? 'Zoom in' : 'Zoom out';
  }

  function show(index) {
    current = (index + contentImages.length) % contentImages.length;
    imageEl.setAttribute('src', contentImages[current].getAttribute('src'));
    imageEl.setAttribute('alt', contentImages[current].getAttribute('alt') || '');
    countEl.textContent = (current + 1) + ' / ' + contentImages.length;
    stage.scrollTop = 0;
  }

  function open(index) {
    setMode('fit');
    show(index);
    viewer.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    viewer.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // link(s) that open the viewer, e.g. <a href="#" class="comic-viewer-open">Read now</a>
  var openLinks = document.querySelectorAll('.comic-viewer-open');
  openLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      open(0);
    });
  });

  // clicking an inline page image also opens the viewer, at that page
  contentImages.forEach(function (img, index) {
    img.classList.add('comic-viewer-trigger');
    img.addEventListener('click', function () { open(index); });
  });

  // click left half of the viewer image = previous, right half = next
  imageEl.addEventListener('click', function (e) {
    var rect = imageEl.getBoundingClientRect();
    var isLeftHalf = (e.clientX - rect.left) < rect.width / 2;
    show(current + (isLeftHalf ? -1 : 1));
  });
  imageEl.addEventListener('mousemove', function (e) {
    var rect = imageEl.getBoundingClientRect();
    var isLeftHalf = (e.clientX - rect.left) < rect.width / 2;
    imageEl.style.cursor = isLeftHalf ? 'w-resize' : 'e-resize';
  });

  modeBtn.addEventListener('click', function () {
    setMode(mode === 'fit' ? 'full' : 'fit');
  });
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', function () { show(current - 1); });
  nextBtn.addEventListener('click', function () { show(current + 1); });

  // click on the backdrop or stage padding (not the image or bar) closes it
  viewer.addEventListener('click', function (e) {
    if (e.target === viewer || e.target === stage) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!viewer.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();