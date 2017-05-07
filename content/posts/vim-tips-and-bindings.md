---
layout: pages/post.html
collection: posts
title: "Vim Tips and Bindings"
date: 2015-01-13
formattedDate: 2015-01-13
tags: vim, tools
---
I've been using Vim as my editor for more than a year now, and I would like to share some cool tips and bindings that I've collected or created so far.

### Space as Leader
The idea behind the "Leader key" is brilliant.

> The "Leader key" is a way of extending the power of Vim's shortcuts by using sequences of keys to perform a command.

The default leader key is the backslash. Thus, if you have a map of `<Leader>q`, you can perform that action by typing \q. Like other developers, I remapped leader to a comma. I didn't know if that was the best thing to do, I'd just seen it in every other vimrc. I read somewhere about Space as Leader. I tried it and results were awesome. Now I'm able to hit Leader with both of my thumbs. Space is the biggest key on the keyboard, so it's hard to miss. This makes things easier and faster.

### Ctrl + Z
This is not feature of Vim, but since I'm using Vim from the terminal, I will explain how this is useful. While you're in Vim, try hitting `Ctrl+z`. Shell will pause the Vim. You will be able to run commands inside the terminal, and then type `fg<Enter>` to return to Vim. I use it for git commands, but you can run all the commands you need.

### Remove trailing spaces on save
If you're like me and you don't like trailing spaces, this function will help you. When you hit save, it will delete all trailing spaces in the file.

```vim
function! StripTrailingWhitespaces()
    let l = line(".")
    let c = col(".")
    %s/\s\+$//e
    call cursor(l, c)
endfunction

autocmd BufWritePre * :call StripTrailingWhitespaces()"
```

<p class="Note">This might hurt your git history. For that reason, it might be better to create two commits, the first for clearing whitespaces and the second with code changes.</p>

### Extract variable (javascript)

WebStorm refactoring options inspired me, so I tried to create something similar in Vim. This function extracts variables in javascript. Select the word you want to extract as a variable (with visual mode). Hit `<Leader>var` and Vim will prompt for the variable name. When you enter the name, a variable will be extracted in the row above. With my limited knowledge of vim script, this is best I can do.

```vim
function! ExtractLocalVariable()
    let name = input("Variable name: ")

    if (visualmode() == "")
        normal! viw
    else
        normal! gv
    endif

    exec "normal! c" . name
    exec "normal! Ovar " . name . " = "
    exec "normal! pa;"
endfunction

vnoremap <Leader>var :call ExtractLocalVariable()<CR>
```

### My vimrc
Here is my [vimrc](https://github.com/goschevski/dotfiles/blob/master/homefiles/vimrc). Feel free to copy and change anything from it. Check out the plugins I'm using, and you might find something to fit.
