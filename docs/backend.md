# Backend
This site is built using Drupal and combination of modules and themes.

## Drupal
As of the writing of this document the foundation of the site is built using Drupal + Symphony + Composer. Drupal documentation can be found here: https://www.drupal.org/docs. This site follows Drupal coding standards and best practices.

### Drupal & Module Discovering Available Updates via Composer
Part of managing Drupal is keeping Drupal Core and Modules updated with latest versions to help alleviate potential security issues as well as providing users with the best experience offered.

To perform a simple audit of available updates you can use `composer outdated "drupal/*"` to see what updates are available by referring to the section, "Direct dependencies required in composer.json" located at the top of the output from the issued command. These are modules/pakages which we have specifically required as part of our project. The other listings under the section, "Transitive dependencies not required in composer.json" are dependencies added via our required modules.

If you ever need to track where a "Transitive dependency" is coming from you can issue the command `composer why {project/package}`. From there you will be given the package(s) which require this dependency.

### Updating Drupal via Composer
Drupal projects managed through Composer typically use `drupal/core-recommended`, which ensures that Drupal core and its dependencies are installed with secure and tested versions.

For ongoing updates we use the following command `composer update drupal/core-* -W` which will take care of both updating Drupal core and any dependencies that it may require. This will result in an updated `composer.lock` file which will be committed to the repository once the update has been tested locally.

Once updated, the following drush command should be issued, `drush updatedb && drush cr`. This will check for any pending database updates followed up by a clearing of the cache.

Run `drush cex`, to export and review any related configuration changes that is related to the update. Updates could affect other configurations such as field settings or other aspects of the site, so review carefully, test, and verify that the changes are valid.

Finally, use `git status` and `git diff {file_name}` to reveal and review both file and configuration changes before comitting them to your branch.

## Modules
Modules are located in `/web/modules/` directory. Each module has an module page located on https://www.drupal.org/project/project_module. The modules page include documentation, versions, change details and an issue queue. Also most modules contain additional details in a README file in the module root.

### Installing modules via Composer
To add modules, use the Composer `require` command. For example, to add the **Admin Toolbar** module:

`composer require drupal/admin_toolbar`

This will download the module and ensure it is included in your `composer.json` file, allowing it to be version-controlled and managed by Composer. Additionally this will update your `composer.lock` file which will reflect the details of installed packages and dependencies as it relates to the module being installed. These changes will, again, require you to commit the files to the repository once testing has been done locally.

### Updating modules via Composer
To update a specific module, for example, **Admin Toolbar**:

`composer update drupal/admin_toolbar`

This ensures that both the module and its dependencies are updated according to Drupal's compatibility guidelines.

Once updated, the following drush command should be issued, `drush updatedb && drush cr`. This will check for any pending database updates followed up by a clearing of the cache.

Run `drush cex`, to export and review any related configuration changes that is related to the module. Updates could affect other configurations such as field settings or other aspects of the site, so review carefully, test, and verify that the changes are valid.

Finally, use `git status` and `git diff {config_file.yml}` to reveal and review configuration changes that are located in `config/...` directory before comitting them to your branch.

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

#### Embedded Content - Placeholder
Provides replacement placeholder for Ckeditor5 embedded content.

#### Embedded Content - Touchpoints survey
A CKEditor5 Embedded Content plugin that provides a means for embedding a Touchpoints survey in the wysiwyg.

#### Embedded Content - USWDS
Provides USWDS components for Ckeditor5 embedded content.

#### USAgov login
Adds the ability to disable the default Drupal login form and replace with a button to log in via SSO.

#### Vote Fields
Adds custom field types to use across content types and/or block types.

#### Vote NVRF
Provides custom functionality and handlers as it relates to the NVRF app.

#### Vote Users
Provides custom functionality regarding user accounts. Currently this simply enables or blocks users who have the Site Builder role when installed or uninstalled, respectively.

#### Vote utility
Provides custom token for use in pathauto settings. Adds the ability to limit the storage of block content revisions. Stores the source po files for importing string translations in the system.

## Module Patches
Review the details in composer.json file under `extra.patches` additionally look at the `/patches/` directory at the root. These patches need to be re-evaluated when the original module gets updated to determine if the work has been included in the latest release or if the patch needs to be rerolled.

## Repositories
In addition to Module Patches, it is worth reviewing the `repositories` section of the composer.json file. Here we can choose/define where a package is installed from (its source code). This can be used to reference another source which could serve as an alternative to the project's public main repository. So three may be instances where this section will need to be updated to add or remove a repository source for a given module or package.

## Database - Mysql
The site utilizes Mysql for its database.

### Limitations
Through its implementation via Cloud.gov there are limitations over what is configurable for Mysql.

#### Setting the MySQL transaction isolation level
Issue: The recommended database transaction isolation level is READ COMMITTED vs REPEATABLE READ.
Description: In addition to being unable to configure Mysql, the alternate solution of setting the isolation level via the database configuration within the settings.php file is not a recommended approach as it sets the isolation level upon each page load which isn't optimal.
Impact: Low
Source: https://www.drupal.org/docs/getting-started/system-requirements/setting-the-mysql-transaction-isolation-level#s-other-methods-to-change-the-transaction-isolation-level
