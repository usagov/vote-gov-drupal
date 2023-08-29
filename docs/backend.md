# Backend
This site is built using Drupal and combination of modules and themes.

## Drupal
As of the writing of this document the foundation of the site is built using Drupal + Symphony + Composer. Drupal documentation can be found here: https://www.drupal.org/docs. This site follows Drupal coding standards and best practices.

## Modules
Modules are located in `/web/modules/` directory. Each module has an module page located on https://www.drupal.org/project/project_module. The modules page include documentation, versions, change details and an issue queue. Also most modules contain additional details in a README file in the module root.

### Contrib
I've included some of the non-standard Drupal contrib modules and their use below. To see all the modules in the system review the modules dashboard page located at `/admin/modules`. These modules are maintained by the Drupal community and have regular updates for enhancements and security patches.

#### Allowed formats
Adds the ability to restrict wysiwyg editor options per field.

#### Autologout
Fulfills security requirement to log user out when inactive for a designated period of time.

#### Block content template
Adds a template hook for `block_content` entities

#### Config ignore & Config split
Modules that allow organization/modification of application configuration per environment.

#### Disable language
Adds the ability to disable a language completely from anonymous users.

#### Double field
Creates a two value field such as the accordion field on the Accordion group paragraph.

#### External auth & SAML auth
Fulfills security requirement to provide SSO integration configuration.

#### Migrate plus & Migrate tools
Provides additional migration function for migration scripts.

#### File delete
Adds the ability to delete files from the system.

#### Language switcher extended
Hide links for missing pages translations.

#### Link attributes
Adds attributes to link field such as on the Registration form selector block.

#### Log stdout
Fulfills security requirement to send Drupal log messages to the stdout for Cloud.gov.

#### New Relic RPM
Adds configuration options for sending logs to New Relic.

#### Node revision delete
Adds a limit to store node revisions.

#### Remove HTTP headers
Fulfills security requirement to omit http headers identifying details of the application.

#### S3 file system
Adds connection to S3 file system in Cloud.gov.

#### Tome
Provides static site generation for the Drupal site.

#### Translatable menu link uri
Adds the ability to override a menu link per translation.

### Custom
Below is a list of custom modules created for use on Vote.gov. These modules can be found in the codebase at `/web/modules/custom`. These modules are maintained by project developers and need to be re-evaulated for each Drupal upgrade.

#### USAgov login
Adds the ability to disable the default Drupal login form and replace with a button to log in via SSO.

#### Vote migrate
Migration scripts to run to import translations from GitHub pages.cloud.gov site.

#### Vote utility
Provides custom token for use in pathauto settings. Adds the ability to limit the storage of block content revisions. Stores the source po files for importing string translations in the system.

## Module Patches
Review the details in composer.json file under `extra.patches` additionally look at the `/patches/` directory at the root. These patches need to be re-evaluated when the original module gets updated to determine if the work has been included in the latest release or if the patch needs to be rerolled.

## Migration
Instructions for updating and running migration scripts.

