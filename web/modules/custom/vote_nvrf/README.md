# Vote NVRF custom module
This module has 3 functions:
1. Contains a custom field type for **NVRF field** data per state
2. Contains a custom route and controller for the **NVRF page**
3. Initiates a custom library for loading the **NVRF app** from a separate repository

## NVRF field
The custom field is combination of an entity reference field and a boolean checkbox. It comes with a set of custom field formatter types.

## NVRF page
The nvrf app lives on a custom route page:
* **path:** `/register/<STATE_NAME>/form`
* **path for es:** `/registrar/<STATE_NAME>/form`

## NVRF app
### Data
The app pulls data from the internal endpoints generated from Drupal

### Helpful commands
Run these commands in the module root directory.

`npm install` to install all the dependencies

`npm run build` to transfer nvrf files from node_modules into the dist directory and root theme data directory

`npm install github:usagov/vote-gov-nvrf-app#<TAG_VERSION_NUMBER>` to update to the latest release.

**example:** `npm install github:usagov/vote-gov-nvrf-app#v0.15.0`
