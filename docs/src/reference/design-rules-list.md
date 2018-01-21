---
title: Built-In Design Rules
---

# Built-In Design Rules
The following is a list of design rules that EDRC has built in from popular PCB manufacturers.

| Manufacturer | Rule Set Name | Description |
| ------------ | ------------- | ----------- |
| DirtyPCBs | `dirtypcbs` | Two layer PCBs [<span class="ion-link"></span>](https://dirtypcbs.com/store/pcbs/about#cam) |
| <a name="oshpark"></a>Oshpark | `oshpark-2layer` | Two layer prototype and small run boards [<span class="ion-link"></span>](http://docs.oshpark.com/design-tools/eagle/design-rules-files/)|
| Oshpark | `oshpark-4layer` | Four layer prototype and small run boards [<span class="ion-link"></span>](http://docs.oshpark.com/design-tools/eagle/design-rules-files/) 
| SparkFun | `sparkfun` | Two layer PCBs [<span class="ion-link"></span>](https://www.sparkfun.com/tutorials/115) |

To use one of the built-in rule sets specify the value from the rule set name in the table as the `dru` field for the file in your `edrc.yml`. [See here for more information](/guides/setup-custom-dru).

## Using custom design rules
Don't see your manufacturer in the list above? Don't fret! You can use any custom set of design rules to check your designs. [See our guide here](/guides/setup-custom-dru).

## Suggest new design rules for EDRC
Are you a PCB manufacturer with a published set of Eagle design rules? Would you like to see your designs built into EDRC? [Click here to drop us a line](/reference/design-rules-list/suggest-new-rules).