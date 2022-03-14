
 	$.Mustache.options.warnOnMissingTemplates = true;
	$.Mustache.load("template.html").done(function() {
 		
		var info = {
		    name: "luke"
		}

 		function clearPanel(){
    // You can put some code in here to do fancy DOM transitions, such as fade-out or slide-in.
		}
/*
		Path.map("#/users").to(function(){
		    alert("Users!");
		    $("#target").html("").append($.Mustache.render("template", info));
		});

		Path.map("#/signup").to(function(){
			$("#target").html("").append($.Mustache.render("template", info));
		});
*/
		Path.map("#/login").to(function(){
					    alert("Users!");
			$("#target").html("").append($.Mustache.render("template", info));
		});

		Path.map("#/homepage").to(function(){
			$("#target").html("").append($.Mustache.render("homepage", info));

		});


		Path.root("#/login");

		Path.listen();
	});

