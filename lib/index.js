const Http = require('http');

const {EventEmitter} = require('events');
const {format, parse} = require('./util');

class Bench extends EventEmitter {
  constructor(options = {}) {
    super();

    const opts = format(options);

    if (!opts.hostname) throw new Error('hostname not defined!');

    this.hostname = opts.hostname[0];
    this.interval = opts.interval || 500;
    this.ports = opts.ports;
    this.timeout = opts.timeout || 50;
    this.output = {};

    this.on('exit', () => {
      this._write(parse(this.output));
    });
  }

  start() {
    let count = 0;
    let running = true;

    setInterval(() => {
      this.ports.forEach(port => {
        const req = Http.request({hostname: this.hostname, port, timeout: this.timeout}, (res) => {
          res.setEncoding('utf8');

          res.on('data', (chunk) => {
            console.log(`${count}: ${chunk}`);
            this.output[count] = chunk;
            count++;
          });

          res.on('end', () => {});
        });

        req.on('error', (e) => {
          count++;
          console.log(`error: ${e.message}`);
        });

        req.end();
      });
    }, this.interval);
  }

  _write(output) {
    console.log(output);
    process.exit(0);
  }


}

module.exports = Bench;
