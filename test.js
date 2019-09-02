function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}

var a = ['a', 1, 'a', 2, '1'];
var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']

console.log(unique)
