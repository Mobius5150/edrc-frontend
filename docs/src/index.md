# EDRC
EDRC is a tool that helps you collaborate with confidence on Eagle CAD hardware designs. Eagle allows you to easily:

 - Automate running design rule checks on every change
 - Give all collaborators visibility into the status of your project and designs
 - Generate images of your designs to embed on your project site or website
 - Automatically generate CAM files when your design rules pass

If you've ever used automated software build/test systems you'll feel right at home setting up EDRC.

## Adding EDRC to your project
To start with, you'll need to ensure that your board and schematic files are committed into a git repository and uploaded to Github. [Check out our guide for using eagle with git and Github](/setup-git) if you haven't already.

To start, your directory structure probably looks something like this:
```
my-project/
  my-design.brd
  my-design.sch
```
You have your root directory which contains the Eagle .brd and .sch files. You might have other files in your repository - that's fine, they won't cause problems. If your .brd and .sch files are not in your root directory that's fine too - just remember to adjust the paths below as needed.

### Creating edrc.yml
You configure EDRC by placing an `edrc.yml` file in the root of your project. This file will tell EDRC what files to process, and what design rules to use.

To start, create `edrc.yml` in the root of your project, leaving your directory structure like this:
```
my-project/
  edrc.yml
  my-design.brd
  my-design.sch
```

Now, edit `edrc.yml` and add the following:
```yml
edrc:
  drc:
    - file: "my-design.brd"
```

This simple configuration file tells EDRC to run a design rule check (DRC) on the file `my-design.brd` in the root of the project. If your files are in subdirectories add the relative path from the root of your project.

What we have is almost enough to commit and have EDRC process the file, but we haven't told EDRC what design rules to check against. Let's do that. For now, we're going to use the design rules for OSHPark.

> EDRC maintains a list of the design rules for a number of PCB houses so there's a good chance that we already have the design rules you'll need. [You can see the full list here](/design-rules-list).

Edit `edrc.yml` and add the last line:
```yml
edrc:
  drc:
    - file: "my-design.brd"
      dru: "oshpark-2layer"
```

This will use the built-in [OSHPark 2-layer design rules](/design-rules-list#oshpark), which are configured to OSHPark's manufacturing capabilities.

Finish setting up EDRC by adding the `edrc.yml` file to git:
```bash
git add edrc.yml
git commit -m"Add EDRC configuration"
```

### Setup EDRC to automatically check your designs
Once you have your `edrc.yml` file inside your git repo and you have that pushed to Github you're ready to setup EDRC to automatically process your designs when you make a change.

**Step 1:** Start by going to EDRC and signing in with your Github account.

>TODO: ADD image/gif of signing into EDRC

**Step 2:** Once you're signed in, click the "Add Project" button.

>TODO: Replace "Add Project" button above with an image of the actual button.

**Step 3:** Select your project in the list of projects from Github.

And that's it! Sit back and relax as EDRC queues and runs your design rule check.

## Next Steps
Now that you've setup EDRC and had your first build run it's time to configure EDRC to do exactly what you want. Here's a few starting points:

 - [Configure a custom DRU file](/setup-custom-dru)
 - [Show off your build status in your repo](/setup-build-tag)
 - [Embed images from your build on a website or wiki](/setup-build-images)
 - [Automatically generate gerber files for your PCB](/setup-gerber-generation)