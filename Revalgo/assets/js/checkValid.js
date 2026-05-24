
(function () {
  const pages = [
    'create-quote.html',
    'dashboard.html',
    'existing-quote.html',
    'global.html',
    'recent-quote.html'
  ];

  const current = location.pathname.split('/').pop().split('?')[0];
  const loginDetails = JSON.parse(localStorage.getItem("loginDetails"));

  if (pages.includes(current) && !loginDetails) {
    location.replace("index.html");
  }

})();