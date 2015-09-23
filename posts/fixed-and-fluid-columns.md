---
template: post.html
title: "Fixed and Fluid Columns"
date: 2014-05-02
---
There are few ways to make one column fixed and one column fluid, but all of these solutions are kind of hacky and have some flaws (magic numbers, hardcoded values, etc.).

A few days ago we had a discussion on this topic in our office and we tried to find the best solution. We googled it and tried various ways, but our colleague [Šilja](https://github.com/vladimirsiljkovic) came out with the best one.

### Solution

{% highlight html %}
<main>
    <aside>
        This is the fixed sidebar.
    </aside>

    <section>
        This is fluid main section.
    </section>
</main>
{% endhighlight %}

And the css (scss):

{% highlight sass %}
main {
    @extend %clearfix;
}

aside {
    float: left;
    max-width: 200px;
}

section {
    overflow: hidden;
}
{% endhighlight %}

This solution works in IE6+ browsers and it has only one flaw, and that is evident when you need to use overflow in a different way in the fluid section. There is no need for magic numbers or fixed values. Of course this is maybe the best solution only until flexbox is supported in all browsers.

You can check out the demo on [CodePen](http://codepen.io/goschevski/pen/zDGvh).
