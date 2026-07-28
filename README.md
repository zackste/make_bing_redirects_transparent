# One-off Browser Extensions

This project is a small collection of one-off browser extensions written to handle issues and small annoyances.

# Building

There may be some necessary steps to prepare before building. These will be converted to a script in the future.

## Pre-requisites

* Node.js
    * Although the extensions may not use Node.js, they may require it for building or for its modules. Confirmed with v24.16.0 but any later version should work.

## Initialization steps

* Run the following
```sh
npm -i
node ./node_modules/recursive-install/recursive-install.js
```