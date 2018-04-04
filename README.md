# Time Tracker
Hour tracking for contract work, made in Electron with React. Mostly designed as a test-project, but I'll be using it personally to track my own projects instead of paying for other ones.

### For development

For the main app:

You'll need `electron-forge` primarily, most everything else is included with the package installation. I'll update the README if anything acts screwy.

Then the usual `git clone $URL $DIRECTORY` and `yarn || npm install` then `yarn || npm start`.

For the express server (will be more important info here after it actually _does_ something ;) ):

`cd $DIRECTORY/server` then `yarn || npm install` followed by `yarn || npm start`.

### For releases

See [The release timeline](https://github.com/time-tracker/time-tracker/releases) for specifics, but I've currently got binaries out for Debian-Based Linux and OSX. I plan to have Windows support soon, but it hasn't been as critical for as getting solid base features developed :)
