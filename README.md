# Good Calculator
Good Calculator for planning and building the perfect production line.

## Requirements
- node.js
- yarn

## Installation
- `git clone https://github.com/barraudf/GoodCalculator.git`
- `yarn install` to install dependencies
- `yarn downloadData` to fetch official game data files
- `yarn parseDocs` to parse data files and generate local data used by the app
- Set up a virtual host pointing to `/www` directory (using e.g. Apache or ngnix)

## Contributing
Any pull requests are welcome, though some rules must be followed:
- try to follow current coding style (there's `tslint` and `.editorconfig`, those should help you with that)
- one PR per feature
- all PRs must target `dev` branch

## Development
Run `yarn start` to start the automated build process. It will watch over the code and rebuild it on change.
You can also use `yarn start:dev` to start a local webserver for debugging purposes.
