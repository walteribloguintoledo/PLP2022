$("#canvas").children().remove();

const posts = [
    {
        title: "Blog 1",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, nobis error vel enim velit architecto ratione nemo recusandae. Eum, rerum?",
        image: "https://picsum.photos/500/400"
    },
    {
        title: "Blog 2",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, nobis error vel enim velit architecto ratione nemo recusandae. Eum, rerum?",
        image: "https://picsum.photos/500/401"
    },
    {
        title: "Blog 3",
        description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem, nobis error vel enim velit architecto ratione nemo recusandae. Eum, rerum?",
        image: "https://picsum.photos/500/402"
    },
];

$.each(posts, function (index, item) {
    var html = `
        <div class="card p-0 shadow" style="width: 18rem;">
            <img src="{{image}}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">{{title}}</h5>
                <p class="card-text">{{description}}</p>
            </div>
        </div>`

    $("#canvas").append(Mustache.render(html, item));
});