---
template: post.html
collection: posts
title: "Thoughts on CSS Frameworks"
date: 2014-09-23
---
Many developers use Foundation or Bootstrap unnecessarily, and they don't know what the output of their CSS code is. I will try to explain my viewpoint regarding these kinds of frameworks, what their flaws are, and when might be a good time to use them.

### Learning
Newbies and juniors are coming down with something similar to jQuery syndrome, whereby they first learn how to use Bootstrap and Foundation, and only later familiarize themselves with the core concepts of CSS. As my friend (Vladimir)[https://github.com/vladimirsiljkovic] recently put it:
> "It's like giving a fire hose to a kid and turning on the water".

You can learn from frameworks, since they show, for example, what effective image replacement techniques have been implemented, or how a grid has been created. You can discover other smart concepts and learn how to use them.

### Performance
These frameworks are big. In fact, they are huge. Bootstrap minified is about 100kb and Foundation is about 115kb. Yes, of course, you don't to have to include the whole framework, but maybe there is no need for the partials either.

People include only the grid module of the framework, and 90% of them are anaware of how that grid works. If they knew, they wouldn't use it, rather they would create their own. Of course, the design you're coding must use a grid, but is that really *always* the case? After all, is it hard to (create a grid)[http://css-tricks.com/dont-overthink-it-grids]?

### When to use them
There are cases when it's useful to use frameworks with ready-made components, such as when creating wireframes, presentations or admin panels. They're also helpful tools for developers who are not sufficiently familiar with CSS, in that they allow them to create a layout quickly.

### What's the alternative?
In a nutshell, use boilerplates. Create your own starter folder or boilerplate, call it what you will. Create your own set of mixins or styles that you use often. When you use frameworks you start CSS with hundreds of lines of pre-written code. Ok, thousands. And when you start with your boilerplate, you only have what's necessary for your projects.

### Conclusion
Don't get me wrong, Bootstrap and Foundation are great, and you can learn a lot from looking at their code, but don't use them for every single project because 90% of the time, you just don't need them.
