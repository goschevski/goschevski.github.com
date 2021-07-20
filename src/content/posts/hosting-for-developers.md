---
layout: pages/post.njk
collection: posts
permalink: "{{ title | slug }}/index.html"
title: "Hosting for developers"
date: 2021-05-02
tags:
  - devops
---
### Important note
This post is not sponsored by render.com anyhow. I never contacted them or talked to them. This is my honest opinion that I would like to share and help you guys. If they like what they read here - sure, they can give me some free stuff. I wouldn't mind.

### Problem
I remember back in the 2007, 15 year old me trying to setup Apache, PHP and MySQL for the first time on my machine. I wasted so many hours that I could spent on writing the actual code. When I discovered XAMPP that was revelation. Last few years I noticed that developers and devops work is overlaping more and more, and we need to know a little bit of the both worlds. I'm developing node.js apps for a few years now. Since I'm working for a big company, we have a devops team and they mostly setup infrastructure for us, so I never had a chance to setup everything I need for a node.js app.

You can find tutorials online where people buy machine, scp code to it and spin node process in the background. For me - that is a joke.
Your app will fail and you don't want manully to login to machine and restart process everytime. You also need something to let you know when it fails. You probably want to aggregate logs somewhere. You would love to deploy code on git push, and not to manully upload it everytime. You want to scale your app. For me, that's a bare minimum of requirements that you would need. If you also start thinking about  microservices, private networks, shared storages, etc. Story is starting to be more and more complex and to go beyond knowledge of a developer.

### Tools doesn't replace knowledge
I tried doing all of this things by myself, I even wrote about ansible and how it's great, but ansible won't solve your problem. It will help you do things easier, but it won't setup server for you, it doesn't know how - you need to tell it. So even if you find perfect tool like ansible, you still need to learn bunch of things that maybe you don't care about.

### [Render.com](https://render.com)
While reasearching solution for this problem, I discovered [render.com](https://render.com/). I like sites where after 3 minutes, you feel like you're using it for years.
**I deployed static site, node app, and dockerized node app in 15 minutes without any error.** You want auto scale - boom, 2 clicks. I don't care about machines, users, permissions - I just want to run apps. I know that this probably is not the cheapest solution if you know what you're doing, but I saved so many hours and nerves and I'm willing to pay more for it.
