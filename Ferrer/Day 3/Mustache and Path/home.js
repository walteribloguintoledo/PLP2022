$("#canvas").children().remove();

var newHtml = `
    <div class="col-lg-6 p-3">
        <h1 class="display-5 fw-bold lh-1 mb-3">Welcome to <span class="primary-color">un</span>Blog</h1>
        <p class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cumque officia voluptas atque molestiae rem ducimus quod reprehenderit nam. Voluptatem suscipit, id quod pariatur, ratione delectus reiciendis tempore eos corporis error dolorem doloremque nulla nostrum ducimus? Itaque placeat beatae nesciunt tempore mollitia at illo qui suscipit sequi eligendi. Perferendis, repellat nesciunt.</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
            <a class="btn btn-primary btn-lg px-4 me-md-2 shadow" href="#/posts" >View Posts</a>
        </div>
    </div>
    <div class="col-10 col-sm-8 col-lg-6 p-3">
        <img src="https://picsum.photos/500/300" class="d-block mx-lg-auto img-fluid shadow-lg" alt="Bootstrap Themes" width="700" height="500" loading="lazy">
    </div>`;

$("#canvas").html(newHtml);