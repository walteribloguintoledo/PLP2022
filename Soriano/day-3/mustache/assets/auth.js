var currentUser = JSON.parse(localStorage.getItem('user')), 
    routeHome = "http://soriano.com/day-3/mustache/#/home";

if (currentUser !== null) window.location.replace(routeHome);
