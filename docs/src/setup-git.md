# Setup Git and Gitlab
This tutorial will show you how to use git and Github to store, version, and collaborate on Eagle CAD designs.

## Step 0: Assumptions and Setup
To start, you probably already have a directory that contains your design files. In this tutorial we'll assume the following directory structure:

```
my-project/
  my-design.brd
  my-design.sch
```

## Step 1: Initialize Git
Firstly, you'll want to initialize git in your directory. Ensure that you have git installed ([see here for instructions](https://git-scm.com/downloads)). Then open a terminal such as `cmd` or `powershell` on Windows. Then run the following commands:

```bash
cd my-project
git init .
```

This will setup an empty git repository inside the `my-project` directory.

Next, add your design files to git:
```bash
git add my-design.brd my-design.sch
```

>Note: You may have automatic backups of your design files created by Eagle. This will have extensions such as `.b#9`. You should not commit these files to git. See here for information on setting up a gitignore file.

Now, commit those files to git:
```bash
git commit -m"Add Eagle design files"
```

## Step 2: Sign up for Github
Next, you'll need a Github account. You can skip this step if you already have an account.

To sign up go to [https://github.com/join](https://github.com/join) and create an account. Be sure to verify the email on the account.

## Step 3: Create your Github repo
In Github, create a new repository by clicking the `+` button at the top of the site.

![Create a Github repository](add-github-repository.png)

Give your repository a simple but descriptive name (ours would be "my-project"). Don't initialize with a README, license, or gitignore for now.

## Step 4: Push to your Github repo
Use the instructions on your now-empty repository to push to your repo. This will look something like:

```bash
git remote add origin git@github.com:/<your-username>/<your-repo>
git push -u origin master
```

## That's It! You're Done!
That was easy. In this quick tutorial we initialized a git repository with your design files and pushed that repository up to Github where EDRC will be able to find it. When you subsequently make changes be sure to add and commit the changed files like in Step 1.

Next step: [Setup EDRC](/)