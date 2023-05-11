export default function preventInspects() {
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key == '123' || e.key == 'F12') {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
      e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
      e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
      e.preventDefault();
    }
  })
}