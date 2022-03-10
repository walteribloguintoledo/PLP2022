var currentUser = JSON.parse(localStorage.getItem('user')), 
    routeHome = "http://soriano.com/day-3/localstorage/credentials/homepage.html";

if (currentUser !== null) window.location.replace(routeHome);
