# Backend

## Configuration Split

The Configuration Split module is a Drupal module that provides the ability to split configuration into different sets based on specific conditions. It allows for separating configuration settings for different environments, such as development, staging, and production, allowing each environment to have its own distinct configuration. This module can be useful when dealing with environment-specific settings that should not be shared across instances. You can find more information about the Configuration Split module in the Drupal documentation at the following link: [Drupal Configuration Split module](https://www.drupal.org/project/config_split).

### Complete Split

With Complete Split, the configuration is divided into completely separate sets for different environments. Each environment has its own distinct configuration, allowing for independent settings. This is useful when you want to ensure that configurations specific to one environment do not affect others.

**Production**

| Module Name | Reason for Split                |
| :---------- | ------------------------------- |
| auth        | future not currently configured |

**Non-Production**

| Module Name | Reason for Split                |
| :---------- | ------------------------------- |
| auth        | future not currently configured |

**Local**

| Module Name | Reason for Split                |
| :---------- | ------------------------------- |
| auth        | future not currently configured |

### Conditional Split

Conditional Split allows for more granular control over configuration based on conditions. You can define specific conditions, such as site domains, roles, or other variables, and assign configuration sets accordingly. This enables you to have different configuration variations within the same environment based on specific conditions.

**Local**

| Module Name    | Reason for Split                                      |
| :------------- | ----------------------------------------------------- |
| autologout     | Increase the timeout                                  |
| system.logging | Change logging to verbose to have backtrace in DBLogs |

### Tips on using

When you are working with config_split make sure to set the split you're working on in your local `web/sites/settings.local.php` this is the configuration array you will be adjusting `$config['config_split.config_split.local']['status'] = True;` where local is the machine name of the split.

If you like to add more splits that can be managed by drupal you will need also add their machine name to `web/sites/default/settings.php` around line 245 at time this documentation.

#### Commands

*Recommend not adding -y to any these commands. Always take the time review changes.*
Import Config: `lando drush cim`
Export Config: `lando drush cex`
