const blog = [
  {
    name: "Person 1",
    title: "Title 1",
    post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla a",
  },
  {
    name: "Person 2",
    title: "Title 2",
    post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla a",
  },
  {
    name: "Person 3",
    title: "Title 3",
    post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla a",
  },
  {
    name: "Person 4",
    title: "Title 4",
    post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla a",
  },
  {
    name: "Person 5",
    title: "Title 5",
    post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla a",
  },
  {
    name: "Person 6",
    title: "Title 6",
    post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla a",
  },
  {
    name: "Person 7",
    title: "Title 7",
    post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla a",
  },
  {
    name: "Person 8",
    title: "Title 8",
    post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla a",
  },
  {
    name: "Person 9",
    title: "Title 9",
    post: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla a",
  },
];

$.each(blog, function (index, item) {
  var html =
    "" +
    "<div class='blog'>" +
    "<h2>{{title}}</h2>" +
    "<p>Made By: <b>{{name}}</b></p>" +
    "{{post}}" +
    "</div>";

  $("#target").append(Mustache.render(html, item));
});
