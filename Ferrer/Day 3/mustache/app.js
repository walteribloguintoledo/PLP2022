$.Mustache.options.warnOnMissingTemplates = true;

$.Mustache.load("template.html").done(function() {
    
    function clearPanel(){
        // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
    }

    Path.map("#/users").to(function(){
        alert("Users!");

        var userData = {
            name: "Andrew",
            address: "some where"
        }

        $("#target").html("").append($.Mustache.render("template", {userData}));
    });

    Path.root("#/posts");

    Path.listen();
});