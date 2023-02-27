# Translations

## String Translation management
String translations are stored in `.po` files in the `vote_utilty` custom module.

New `.po` files can be added to the module for additional languages using the language code as the file name.

### Add or edit a string translation
1. Find the `.po` file with the language code you wish to edit.
2. Edit or add a new string translation in the `.po` file.
3. Run `lando drush locale-check` to check for updates to translation files in the system.
4. Run `lando drush locale-update`to import updates/additions into the system.
5. Run `lando drush cex` to check if any configuration was modified during the import.
6. Commit the modified or new files and make a PR to deploy.
