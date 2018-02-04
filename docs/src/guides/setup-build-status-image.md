---
title: Setup Build Status Images
---

# Setup Build Status Images
<p class="left-align">![build status sample](passed.svg)</p>

Once you have setup EDRC you can embed the live status of your builds onto other websites such as GitHub or your company or project website. This simple picture tells the world that your designs are properly checked and links back to your build page in case there are problems.

## Get the Embed Code for your Build Image
To get the embed code, open up your project page on EDRC and click the build status image next to the name of your project.

![project header](project-header.png)

This will open up the Embed Build Status dialogue which will generate your embed code. In the dialog select the appropriate embed code for your environment and copy it to your clipboard. You can also choose to generate a more compact image.

![embed modal](embed-modal.png)

### Add Embed Code to GitHub
To embed your build status on a GitHub repository copy the `markdown` embed code from the Embed Build Status dialogue. Next, open your `README.md` file and paste the embed code underneath the header.

```markdown
# My Project
> Your embed code here
```

### Add Embed Code to HTML File
EDRC can also generate an embed code suitable anywhere you can use HTML: .html files, .php files, jsx files, etc... To embed the code simply copy the `HTML` formatted embed code from the Embed Build Status Dialogue.

## Next Step
Now that your repository is showing off the status of your builds, [consider embedding board images that EDRC generates on your website or wiki](/guides/setup-build-image).
