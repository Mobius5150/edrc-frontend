---
title: YAML Reference
---

# EDRC YAML Reference
EDRC uses YAML to configure how we check your files for design rule problems because YAML is easily read by humans. It's also somewhat standard for configuring build systems.

If you want to learn more about YAML, check out these docs.

## EDRC YAML
A full EDRC configuration looks like this:

```yaml
version: 1
eagle:
  drc:
    - file: "my-design.brd"
      dru: "oshpark-2layer"
	  version: 8.4.1
	- file: "path/another-design.brd"
	  dru:
	    file: "path/custom.dru"
	    layers: "-ALL 5"
	  version: 8.0.0
	- file: "path/third-design.brd"
	  dru:
	    file: "path/custom.dru"
	    layers:
		  - ALL
		  - -TOP
		  - 5
	  version: 8.1.0
```

Let's break that down. This configuration will tell EDRC to check design rules on three files: `my-design.brd`, `path/another-design.brd`, and `path-third-design.brd`. From the configuration we can also tell that this project must have the following directory structure:

```
project/
  my-design.brd
  path/
    another-design.brd
	custom.dru
	third-design.brd
```

Next, let's look at what each of the options do:

### Version
```yaml
version: 1
```
The `version` directive is for forward compatibility. It's optional.

### File
```yaml
 - file: "my-design.brd"
```
The `file` directive specifies the path, from the root of the git repo, to the file that EDRC should process. It is required. Paths must use only forward slashes, and should NOT begin with a slash.

### DRU
The `DRU` directive specifies the set of design rules that should be used when processing the file. It has two forms: single line and advanced.

**Single Line:** The single line config is great when you want to use one of the built-in design rule sets. ([You can see the list of built-in design rules here](/reference/design-rules-list)).
```yaml
 - dru: "<drufile>"
```

**Advanced:** The advanced form allows you to specify both the DRU file that should be used, as well as the layers that should be enabled while processing the rules. The `file` sub-directive can specify the relative path to a DRU file within the repository or it can specify one of the [built-in design rules](/reference/design-rules-list).
```yaml
 - dru:
   file: "<drufile>"
   layers: "<layers>"
```

#### DRU Layers
When specifing DRU layers you can either specify a flat list as a single string or using the below list syntax:
```yaml
 - dru:
   file: "<drufile>"
   layers:
     - 1
	 - 2
	 - 3
```

The above layers definition would be equivalent to the following:
```yaml
 - dru:
   file: "<drufile>"
   layers: "1 2 3"
```

Any valid [Eagle layer name or layer number](http://web.mit.edu/xavid/arch/i386_rhel4/help/56.htm) can be used here. Notably, the `layers` definition matches the Eagle [`DISPLAY` command syntax](http://web.mit.edu/xavid/arch/i386_rhel4/help/41.htm): so you can also use `??` to specify that some layers are optional.

### Version
The `version` directive specifies the version of Eagle to use in checking design rules. The version must be specified with all three version numbers, and the default version is always the latest version. The available versions are:

 - 8.4.1 (default)
 - 8.4.0
 - 8.3.2
 - 8.3.1
 - 8.3.0
 - 8.2.2
 - 8.2.1
 - 8.2.0
 - 8.1.1
 - 8.1.0
 - 8.0.2
 - 8.0.1
 - 8.0.0
 - 7.7.0
 - 7.5.0