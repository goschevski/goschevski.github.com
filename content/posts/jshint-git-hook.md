---
layout: post.html
collection: posts
title: "JSHint Git Hook"
date: 2014-08-01
formattedDate: 2014-08-01
tags: javascript, tools
---
### Update
There is a module, called [pre-commit](https://www.npmjs.com/package/pre-commit), which is working really good, and it's easy to setup.

### Old way
If you want to write valid code, make sure you use a linter.
It's good practice to have some 'on save' linter to tell you immediately what errors you made.
But, beside that, it would be nice to have some tool to validate files when you try to commit them.
Git have so called [hooks](http://git-scm.com/docs/githooks.htm) (actions), which you can trigger at certain points (before you commit, after you commit, before push, etc).

My fellow [Ivan Tatic](http://simplifiedstudio.com/) created script that install hook for linting javascript files using [jshint](http://www.jshint.com/).
If you try to commit some javascript files, jshint run check on those files.
If there is file with errors, it prints where you can find those errors.

I created little demo, to show you how it works.
You can download hook [here](https://gist.github.com/goschevski/3e72b17db816c8a34a3f), just make sure you have jshint installed globally.

<iframe name='quickcast' src='http://quick.as/embed/y1jibwx' scrolling='no' frameborder='0' width='100%' allowfullscreen></iframe>
<script src='http://quick.as/embed/script/1.60'></script>
