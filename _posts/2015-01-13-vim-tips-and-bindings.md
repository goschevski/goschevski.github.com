---
layout: post
title: "Vim Tips and Bindings"
date: 2015-01-13
---
I've been using Vim as my main editor for more than a year now, and I would like to share some cool tips and bindings that I've collected or created so far.

### Space as Leader
The idea behind the "Leader key" is brilliant.

> The "Leader key" is a way of extending the power of Vim's shortcuts by using sequences of keys to perform a command.

The default leader key is backslash. Therefore, if you have a map of <Leader>Q, you can perform that action by typing \Q. Like many developers I remaped leader to a comma ','. I didn't know if that was the best thing to do, I'd just seen it in every other vimrc.

I read somewhere about Space as Leader. I tried it and results were awesome. Now I'm able to hit Leader with both of my thumbs. It is the biggest key on the keyboard so it's hard to miss. This makes things easier and faster.

### Ctrl + Z
This is the feature that I like the most. If you're using Vim from a terminal, try hitting `Ctrl+z`. Vim will be 'paused'. You will be able to execute commands normally inside the terminal, and than type `fg<Enter>` to return to Vim.

This is very useful. I use it every day, mostly for git commands, but you can execute all the commands you need.

### Remove trailing spaces on save
If you're like me and you hate trailing spaces, this function will make you happy. When you hit save, it will delete all trailing spaces in the file.

{% highlight vim %}
function! StripTrailingWhitespaces()
    let l = line(".")
    let c = col(".")
    %s/\s\+$//e
    call cursor(l, c)
endfunction

autocmd BufWritePre * :call StripTrailingWhitespaces()"
{% endhighlight %}

<p class="note">This might hurt your git history. For that reason it might be better to create 2 commits, the first for clearing whitespaces and the second with code changes.</p>

### Syntastic Errors list
[Syntastic](https://github.com/scrooloose/syntastic) is the best code checker/linter for Vim. It has support for many languages and it's highly customisable.

What I really like is the errors list. The thing with this is that it shows the list on every save, and sometimes you might want to ignore some errors. This function, and bindings, will show the list only when you want.

{% highlight vim %}
function! ShowErrorsList()
    let g:syntastic_auto_loc_list=1
    :SyntasticCheck
    let g:syntastic_auto_loc_list=0
endfunction

nnoremap <Leader>c :call ShowErrorsList()<CR>
nnoremap <Leader>x :lclose<CR>
{% endhighlight %}

Function enables list, runs the check and disables it. You can open it using `<Leader>c`, and close it using `<Leader>x`.

### My vimrc
Here is my [vimrc](https://github.com/goschevski/dotfiles/blob/master/homefiles/vimrc). Feel free to copy and modify anything from it. Check out the plugins I'm using and you might find something to fit.
