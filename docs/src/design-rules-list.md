---
title: Built-In Design Rules
---

# Built-In EDRC Design Rules
The following is a list of design rules that EDRC has built in from popular PCB manufacturers.

| Manufacturer | Rule Set Name | Description |
| ------------ | ------------- | ----------- |
| <a name="oshpark"></a>Oshpark | `oshpark-2layer` | Two layer prototype and small run boards. [link](http://docs.oshpark.com/design-tools/eagle/design-rules-files/)|
| Oshpark | `oshpark-4layer` | Four layer prototype and small run boards [link](http://docs.oshpark.com/design-tools/eagle/design-rules-files/) |

>TODO: Use a proper link icon above for the outgoing links to the manufacturer docs.

To use one of the built-in rule sets specify the value from the rule set name in the table as the `dru` field for the file in your `edrc.yml`. [See here for more information](/setup-custom-dru).

## Using custom design rules
Don't see your manufacturer in the list above? Don't fret! You can use any custom set of design rules to check your designs. [See our guide here](/setup-custom-dru).

## Suggest new design rules for EDRC
Are you a PCB manufacturer with a published set of Eagle design rules? Would you like to see your designs built into EDRC? Drop us a line at [dru@edrc.me](mailto:dru@edrc.me).

>TODO: Create a proper feedback form for accepting DRU submissions.