function createRetainer () {
  let retainer = (new Error('error-retainer'))
    .stack
    .split('\n')
    .slice(2)
    .join('\n');

  function retain (error) {
    error.stack = error.stack + '\n    ----\n' + retainer;
    return error;
  }

  function step () {
    const stepStackTrace = (new Error('error-retainer'))
      .stack
      .split('\n')
      .slice(2)
      .join('\n');

    retainer = stepStackTrace + '\n    ----\n' + retainer;
  }

  return {
    step,
    retain
  };
}

module.exports = createRetainer;
