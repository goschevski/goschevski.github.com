---
layout: pages/post.html
collection: posts
title: "Fixed and Fluid Columns"
date: 2014-05-02
formattedDate: 2014-05-02
tags: css
---
We can create "one column fixed and one column fluid" layout using different techniques, but most of these solutions are kind of hacky and have some flaws like magic numbers, hard coded values, etc.

We had a discussion on this topic in our office, and we tried to find the best solution. We googled it and tried different ways, but our colleague [Šilja](https://github.com/vladimirsiljkovic) came out with the best one.

### Solution

```html
<main>
    <aside>
        This is the fixed sidebar.
    </aside>

    <section>
        This is fluid main section.
    </section>
</main>
```

And the CSS:

```css
main:after {
    content: "";
    display: table;
    clear: both;
}

aside {
    float: left;
    max-width: 200px;
}

section {
    overflow: hidden;
}
```

This solution works in IE6+ browsers, and it has one flaw, and that is evident when you need to use overflow in a different way in the fluid section. No need for magic numbers or fixed values. Of course, this is the best solution until browsers start supporting flexbox.

You can check out the demo on [CodePen](http://codepen.io/goschevski/pen/zDGvh).
