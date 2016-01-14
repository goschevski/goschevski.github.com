---
layout: pages/post.html
collection: posts
title: "Simple JavaScript Interview Exercises"
date: 2016-01-14
formattedDate: 2015-01-14
tags: javascript, interview
---
When you are interviewing someone you can learn more about them by reviewing how they did some exercises then just talking with them about specific technology. Anyone can learn theory from the blog posts, but many people never understood it. So to be sure that candidate really knows about topic (s)he is talking about, it's a good thing to test their knowledge with exercises. Exercises shouldn't take to long and they can immidiatelly tell you proficiency level of candidate.

### Context (call, apply)
This is how we want to use `someFn`. Candidate should define it.
```javascript
var result = someFn({ someProperty: 'interview' }, function () {
    console.log('This pointing to', this);
});

console.log('Result is', result);

// expected output
This pointing to { someProperty: 'interview' }
Result is 1
```

Solution:
```javascript
var someFn = function (obj, cb) {
    cb.call(obj);
    return 1;
}
```

#### Additional
You can modify function to check if candidate knows how to use `apply`.
```javascript
var result = someFn({ someProperty: 'interview' }, function (param1, param2) {
    console.log('This pointing to', this);
    console.log('Param 1 is', param1);
    console.log('Param 2 is', param2);
}, ['cool', 'interview']);

console.log('Result is', result);

// expected output
This pointing to { someProperty: 'interview' }
Param 1 is "cool"
Param 2 is "interview"
Result is 1
```

Solution:
```javascript
var someFn = function (obj, cb, params) {
    cb.apply(obj, params);
    return 1;
}
```

### Prototype and Iteration
Define native method called `each` for iterating over the array with an option to pass the context as a second argument.

```javascript
var arr = [1, 2, 3];
arr.each(function (arrayItem, counter) {
    console.log('index', counter);
    console.log('item', arrayItem);

    arr[counter] = arrayItem + 1;
}, this);
```

Solution:
```javascript
Array.prototype.each = Array.prototype.each || function (cb, context) {
    for (var i = 0; i < this.length; i++) {
        cb.call(context || this, this[i], i);
    }
};
```

### Scope
Define `someFn` which can work like this.

```javascript
var counter = someFn(1);
console.log('First call', counter(3));
console.log('Second call', counter(1));
console.log('Third call', counter(5));

// expected output
First call 4
Second call 5
Third call 10
```

Solution:
```javascript
var someFn = function (start) {
    var private = start;

    return function (increment) {
        private += increment;

        return private;
    }
}
```
