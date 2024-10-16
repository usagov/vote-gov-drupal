# Frontend
This site is built using Drupal and Tome with a USWDS theme.

## Theme commands
These commands should be run inside web/themes/custom/votegov
| **Command**      | **Use case**                                                                      |
|------------------|-----------------------------------------------------------------------------------|
| `npm run build`  | Aggregates, compiles and minifies frontend assets into the dist directory for deployment                                                            |
| `npm run dev`    | Starts watching for changes to scss/js/twig files and compiles frontend assets into the dist directory                                                                   |

## Theme file structure
```
web/
├── core
├── modules
├── profiles
├── sites
└── themes/
    └── custom/
        └── votegov/
            ├── dist
            ├── fonts
            ├── img
            ├── json
            ├── php-includes
            └── src/
                ├── js
                └── sass
            └── templates
```

**dist** - All files generated by the gulp process and contains all image/font assets, minified css, and minified js. Changes made in these files will be overridden.

**fonts** - Custom fonts such as Navajo that compile into dist

**img** - All favicons and logos that compile into dist

**json** - Number translation mapping json for frontend utility replacement

**php-includes** - Preprocess and theme functions organized by use type

**src/js** - Javascript files that compile into dist

**src/sass** - SCSS files that compile into dist

**templates** - Vote.gov theme templates and template overrides. Templates inside the /templates/partial directory are being included or extended by other templates.

