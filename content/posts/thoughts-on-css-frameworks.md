---
layout: pages/post.html
collection: posts
title: "Thoughts on CSS Frameworks"
date: 2014-09-23
formattedDate: 2014-09-23
tags: css
---
Developers use Foundation or Bootstrap unnecessarily, and they don't know what the output of their CSS code is. I will try to explain my viewpoint about these kinds of frameworks, what their flaws are, and when might be a good time to use them.

### Learning
Newbies and juniors are coming down with something like jQuery syndrome, whereby they first learn how to use Bootstrap and Foundation, and later familiarize themselves with the core concepts of CSS. As my friend [Vladimir](https://github.com/vladimirsiljkovic) put it:
> "It's like giving a fire hose to a kid and turning on the water."

You can learn from frameworks, since they show, for example, useful image replacement techniques, grid setup. You can discover other smart concepts and learn how to use them.

### Performance
These frameworks are big. In fact, they are huge. Bootstrap minified is about 100kb, and Foundation is about 115kb. Yes, of course, you don't to have to include the whole framework, but probably there is no need for the partials either.

People include the grid module of the framework, and 90% of them are unaware of how that grid works. If they knew, they wouldn't use it. Rather they would create their own. Of course, the design you're coding must use a grid, but is that *always* the case? After all, is it hard to [create a grid](http://css-tricks.com/dont-overthink-it-grids)?

### When to use them
In some cases, it's useful to use frameworks with ready-made components, such as when creating wireframes, presentations or admin panels. They're also helpful tools for developers who are not sufficiently familiar with CSS, in that they allow them to create a layout quickly.

### What's the alternative?
In a nutshell, use boilerplates. Create your starter folder or boilerplate, call it what you will. Create your set of mixins or styles that you use often. When you use frameworks, you start CSS with hundreds of lines of pre-written code. Ok, thousands. And when you initiate with your boilerplate, you only have what's necessary for your projects.

### Conclusion
Don't get me wrong, Bootstrap and Foundation are great, and you can learn a lot from looking at their code, but don't use them for every single project because 90% of the time, you don't need them.
