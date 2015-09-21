---
layout: post
title: "Better Collection Iteration in Backbone.js"
date: 2014-02-03
---
This is a trivial problem, but I've seen this in many beginner tutorials, and I don't like it. People are iterating over collection and creating Item views in the same function.

{% highlight javascript %}
var CollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',

    render: function () {
        this.collection.each(function (item) {
            this.$el.append( new ItemView({ model: item}).render().el );
        }, this);
    }
});
{% endhighlight %}

I consider this bad, because you can't reuse adding ItemView code.

{% highlight javascript %}
var CollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',

    initialize: function () {
        this.listenTo(this.collection, 'add', this.addOne);
    },

    render: function () {
        this.collection.each(function (item) {
            this.$el.append( new ItemView({ model: item}).render().el );
        }, this);
    },

    addOne: function (item) {
        this.$el.append(  new ItemView({ model: item }).render().el );
    }
});
{% endhighlight %}

As you see, we need to duplicate code. A better solution is to use a different method.

{% highlight javascript %}
var CollectionView = Backbone.View.extend({
    tagName: 'ul',
    className: 'list',

    initialize: function () {
        this.listenTo(this.collection, 'add', this.addOne);
    },

    render: function () {
        this.collection.each( this.addOne, this);
    },

    addOne: function (item) {
        this.$el.append( new ItemView({ model: item }).render().el );
    }
});
{% endhighlight %}

In this way, we are more flexible and we haven't duplicated code.
