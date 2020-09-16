const createErrorRetainer = require('../');
const test = require('tape');

function throwOutOfStack (callback) {
  const retainer = createErrorRetainer();

  process.nextTick(() => {
    retainer.step();

    const error = new Error('whoops');
    retainer.retain(error);

    callback(error);
  });
}

test('adds retainer to stacktrace', t => {
  t.plan(1);

  throwOutOfStack(function (error) {
    t.ok(error.stack.includes('test/index.js:20'), 'includes correct line number');
  });
});
