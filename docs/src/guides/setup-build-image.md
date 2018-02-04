---
title: Embed Board Images
---

# Embed Board Images
Once your first build completes EDRC will generate an image for every board file you declared. You can easily embed these board files into other webpages to quickly show people what your design looks like - without having to load it up in a CAD program.

## Get the Embed Code for your image
To get the embed code, open up your project page on EDRC and select a build for either a branch or specific build. In the file errors pane you will see a board image. Click on the board image to open the embed dialogue.

> Pro tip: if you open the Embed Build Image dialogue from a branch (e.g. `master`) it will embed the most recent image for that file from that branch. If you want to embed a file from a specific build then open that build and click the image you want to embed.

![project header](select-image.png)

This will open up the Embed Build Image dialogue which will generate your embed code. In the dialog select the appropriate embed code for your environment and copy it to your clipboard.

![embed modal](embed-modal.png)

### Add Embed Code to GitHub
To embed your build image on a GitHub repository copy the `markdown` embed code from the Embed Build Image dialogue. Next, open your `README.md` file and paste the embed code underneath the header.

```markdown
# My Project
> Your embed code here
```

### Add Embed Code to HTML File
EDRC can also generate an embed code suitable anywhere you can use HTML: .html files, .php files, jsx files, etc... To embed the code simply copy the `HTML` formatted embed code from the Embed Build Image Dialogue.

## Next Step
Now that your repository is showing off your build images, [consider embedding the status of your build on your project or Wiki](/guides/setup-build-status-image).