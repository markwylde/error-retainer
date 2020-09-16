# error-retainer
[![Build Status](https://travis-ci.org/markwylde/error-retainer.svg?branch=master)](https://travis-ci.org/markwylde/error-retainer)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/markwylde/error-retainer)
[![GitHub package.json version](https://img.shields.io/github/package-json/v/markwylde/error-retainer)](https://github.com/markwylde/error-retainer/releases)
[![GitHub](https://img.shields.io/github/license/markwylde/error-retainer)](https://github.com/markwylde/error-retainer/blob/master/LICENSE)

Retain stack traces when breaking out of the current stack.

## Example Usage
### Simple single step
```javascript
const createErrorRetainer = require('error-retainer');

function throwOutOfStack (callback) {
  // Create a retainer that will remember the call stack until this point.
  const retainer = createErrorRetainer();

  process.nextTick(() => {
    const error = new Error('whoops');

    // Apply our retainer to the new error object.
    retainer.retain(error);

    callback(error);
  });
}
```

### Multiple call stack break outs
```javascript
const createErrorRetainer = require('error-retainer');

function throwOutOfStack (callback) {
  // Create a retainer that will remember the call stack until this point.
  const retainer = createErrorRetainer();

  process.nextTick(() => {
    // We're going to break out of the stack trace a couple of times
    // so let's add this step to our retainer.
    retainer.step();

    process.nextTick(() => {

      const error = new Error('whoops');

      // Finally let's apply our retainer to our new error object.
      retainer.retain(error);

      callback(error);
    });
  })
}
```