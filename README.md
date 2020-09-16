# error-retainer

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