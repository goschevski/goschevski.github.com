---
layout: pages/post.html
collection: posts
title: "JSHint Git Hook"
date: 2014-08-01
formattedDate: 2014-08-01
tags: javascript, tools
---
### Update
There is a module, called [pre-commit](https://www.npmjs.com/package/pre-commit), which is working well, and it's easy to set up.

### Old way
If you want to write valid code, make sure you use a linter.
It's good practice to have some 'on save' linter to tell you what errors you made in the real time.
But, besides that, it would be nice to have some tool to lint files when you try to commit them.
Git has so-called [hooks](http://git-scm.com/docs/githooks.htm) (actions), which you can trigger at certain points (before you commit, after the commit, before the push, etc.).

My pal [Ivan Tatic](http://simplifiedstudio.com/) created [script](https://github.com/goschevski/fronty/blob/937539dfebee434b710d0b31d55765973318a567/hooks.sh) that install git-hook for linting javascript files using [jshint](http://www.jshint.com/).
If you try to commit some javascript files, jshint run a check on those files.
If there is a file with errors, it prints where you can find those errors.

I created a demo, to show you how it works.

<iframe name='quickcast' src='http://quick.as/embed/y1jibwx' scrolling='no' frameborder='0' width='100%' allowfullscreen></iframe>
<script src='http://quick.as/embed/script/1.60'></script>
