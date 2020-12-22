---
layout: pages/post.njk
collection: posts
title: "Better Collection Iteration in Backbone.js"
permalink: "{{ title | slug }}/index.html"
date: 2014-02-03
tags:
  - javascript
  - backbone.js
---
It's a trivial problem, but I've seen this in beginner tutorials, and I don't like it. People are iterating over collections and creating Item views in the same function.

```javascript
var CollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',

    render: function () {
        this.collection.each(function (item) {
            this.$el.append(new ItemView({ model: item}).render().el);
        }, this);
    }
});
```

I consider this wrong because you can't reuse adding ItemView code.

```javascript
var CollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',

    initialize: function () {
        this.listenTo(this.collection, 'add', this.addOne);
    },

    render: function () {
        this.collection.each(function (item) {
            this.$el.append(new ItemView({ model: item}).render().el);
        }, this);
    },

    addOne: function (item) {
        this.$el.append(new ItemView({ model: item }).render().el);
    }
});
```

As you see, we need to duplicate code. A better solution is to use a different method.

```javascript
var CollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',

    initialize: function () {
        this.listenTo(this.collection, 'add', this.addOne);
    },

    render: function () {
        this.collection.each(this.addOne, this);
    },

    addOne: function (item) {
        this.$el.append(new ItemView({ model: item }).render().el);
    }
});
```

In this way, we are more flexible, and we haven't duplicated code.
