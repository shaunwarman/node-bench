
module.exports = {
  format: (options) => {
    const opts = {};
    options.forEach(option => {
      const [key, values] = option.split('=');
      const value = (values.indexOf(',')) ? values.split(',') : values;
      opts[key] = value;
    });
    return opts;
  },
  parse: (output) => {
    return output;
  }
}
