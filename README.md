# Vote.gov Drupal 10 installation

## Requirements

Lando: https://docs.lando.dev/

NOTE: Lando requires a specific version of docker which is loaded as part of the lando package. Do not update docker separate from lando. When you update lando docker will be updated as well.

## Getting started

### Initializing the site
```
lando start
lando composer install
```

### Importing Database

```
lando db-import <filename>
lando drush cim
lando drush cr
```

You can get the url to local url using this command.
```
lando info
```

## Additional Drupal commands

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

## Additional Lando commands

### Get container information
```
lando info
```

### Start the container
```
lando start
```

### Stop the container
```
lando stop
```

### Turn off Lando and all containers
```
lando poweroff
```
