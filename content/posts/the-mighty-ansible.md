---
layout: pages/post.html
collection: posts
title: "The Mighty Ansible"
date: 2017-05-05
formattedDate: 2017-05-05
tags: ansible, devops
---
I was always interested in automation tools, but they all seemed complicated. When a [friend](https://www.hcg.ninja/) explained me in 5 minutes how [Ansible](https://www.ansible.com/) works and how easy is to setup new project, I was amazed.

### What are the automation tools?
Automation tools are used to automate machine or cluster of machines (infrastructure) setup. Imagine yourself SSHing to 100 servers and executing same or similar commands to each one of them. Those tools like Ansible could help you setup multiple servers at once in parallel.

### How does Ansible works?
Ansible connects to your machines over SSH and executes tasks that you defined. After executing it, it removes these tasks, so your machine stays clean and looks like you manually executed commands. It's using Python in the background, which most (if not all) systems have installed by default, so it does not requires any pre-installation on the machines and that's what makes Ansible so great.

Tasks that you write are just text files (YAML), which means that you can store them on git. This is so cool because then you have a history of changes you made on your machines.

### How should I try it?
You can install ansible on your machine and setup few VMs using Vagrant. That's all you need to start. The good thing about this approach is that you can 'develop' your infrastructure locally and then when you're ready, just replace IPs of VMs to production machines inside config file.

### Tutorial
I'm pretty sure you can find a bunch of tutorials so I won't write one. I will just share some useful links:

- [Ansible Docs](http://docs.ansible.com/ansible/intro.html)
- [Ansible roles (tasks created by others)](https://galaxy.ansible.com/explore#/)
- [Simple ansible examples](https://github.com/ansible/ansible-examples)
- [Cool youtube tutorial](https://www.youtube.com/watch?v=tNCDsnQvbHI)
