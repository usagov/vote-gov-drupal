# Vote.gov Drupal 10 installation

## Requirements

Lando: https://docs.lando.dev/

NOTE: Lando requires a specific version of docker which is loaded as part of the lando package. Do not update docker separate from lando. When you update lando docker will be updated as well.

## Developer documentation

Reference the developer documentation in to `docs` directory.

## Getting started

### Initializing the site
```
lando start
lando composer install
lando set
```

### Importing Database

```
lando db-import <filename>
lando retune
```

You can get the local site urls using this command.
```
lando info
```

### Build the theme compiled files
See the README file located in the `vote_gov` custom theme for a quick start.

## Drush commands

### Clearing cache

```
lando drush cr
```

### Log in as Superuser locally
```
lando drush uli
```

### Managing site configuration

#### Import configuration from `/config/`

```
lando drush cim
```

#### Export configuration to `/config/`
```
lando drush cex
```

## Lando commands

| **Command**      | **Use case**                                                                      |
|------------------|-----------------------------------------------------------------------------------|
| `lando info`     | Get info on a lando container include url links.                                  |
| `lando start`    | Start the container                                                               |
| `lando stop`     | Stop the container                                                                |
| `lando poweroff` | Turn off lando and all containers                                                 |
| `lando rebuild`  | Rebuild the container (retains your db, use when there are updates to .lando.yml) |
| `lando destroy`  | Destroys container and your db (when all else fails)                              |

## Custom Lando commands
| **Command**    | **Use case**                                                                                                |
|----------------|-------------------------------------------------------------------------------------------------------------|
| `lando retune` | Runs a list of commands to sync changes when pulling commits or checking out different branches             |
| `lando set`    | Copies development versions of services.yml and settings.php to sites directory to initialize db connection |
| `lando static` | Manually recompiles static site and assets                                                                  |
