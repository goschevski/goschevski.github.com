---
layout: post
title: "Vim Tips and Bindings"
date: 2015-01-14
---
I'm using Vim as main editor for more than a year now, and I would like to share some cool tips and bindings I collected or created so far.

### Space as Leader
Idea behind the "Leader key" is brilliant.

> The "Leader key" is a way of extending the power of Vim's shortcuts by using sequences of keys to perform a command.

The default leader key is backslash. Therefore, if you have a map of <Leader>Q, you can perform that action by typing \Q. As meny developers I remaped leader to comma ','. I didn't knew if that's good for me, I just saw that in every vimrc.

I read somewhere about Space as Leader. I tried it and results were awesome. Now I'm able to hit Leader with both of my thumbs. It is the biggest key on the keyboard so it's hard to miss. It is easier and faster.

### Ctrl + Z
This is the feature that I like the most. If you're using Vim from terminal, try hiting `Ctrl+z`. Vim will be 'paused'. You can work normally in the terminal, and than type `fg<Enter>` to return to Vim.

This is very usefull. I used it every day mostly for git commands, but you can run every command you need.

### Remove trailing spaces on save
If you're like me and you hate trailing spaces this function will make you happy. When you hit save, it will delete all trailing spaces in the file.

{% highlight vim %}
function! StripTrailingWhitespaces()
    let l = line(".")
    let c = col(".")
    %s/\s\+$//e
    call cursor(l, c)
endfunction

autocmd BufWritePre * :call StripTrailingWhitespaces()"
{% endhighlight %}

<p class="note">This might hurt your git history. It's maybe better to create 2 commits. First for clearing whitespaces and second with code changes.</p>

### Syntastic Errors list
[Syntastic](https://github.com/scrooloose/syntastic) is the best code checker/linter for Vim. It has support for many languages and it's very customizable.

What I really like is errors list. The thing with it is that it shows list on every save. And sometimes you want to ignore some errors. This function and bindings will show list only when you want.

{% highlight vim %}
function! ShowErrorsList()
    let g:syntastic_auto_loc_list=1
    :SyntasticCheck
    let g:syntastic_auto_loc_list=0
endfunction

nnoremap <Leader>c :call ShowErrorsList()<CR>
nnoremap <Leader>x :lclose<CR>
{% endhighlight %}

Function enables list, run the check and disables it. You can open it using `<Leader>c`, and close it using `<Leader>x`.

### My vimrc
Here is my [vimrc](https://github.com/goschevski/dotfiles/blob/master/homefiles/vimrc). Feel free to copy and modify anything from it. Checkout plugins that I'm using and you may found something that will fit you.
