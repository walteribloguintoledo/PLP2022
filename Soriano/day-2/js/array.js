//indexed
const indexed = ["One", "Two", "Three"];

console.log(indexed[0]);

//associative
const associative = new Array();
associative["one"] = 1;
associative["two"] = 2;
associative["three"] = 3;

console.log(associative.one + " or " + associative["one"]);

//multi dimensional
const multi_dimensional = new Array();
multi_dimensional["numbers"] = ["hey one" , "two", "three"];
multi_dimensional["letters"] = ["a" , "b", "c"];

console.log(multi_dimensional["numbers"][0]);