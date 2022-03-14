$.Mustache.options.warnOnMissingTemplates = true;

$.Mustache.load("templates.html").done(function () {
    Path.map("#/login").to(function () {
        $("#target").html("").append($.Mustache.render("login"));
    });

    Path.map("#/signup").to(function () {
        $("#target").html("").append($.Mustache.render("signup"));
    });

    Path.map("#/home").to(function () {
        $("#target").html("").append($.Mustache.render("home"));
    });

    Path.root("#/");

    Path.rescue(function () {
        alert('Page not found!');

        window.location.replace("http://soriano.com/day-3/mustache/#/login");
    });

    Path.listen();
})
