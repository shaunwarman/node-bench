#!/usr/bin/env node

const Bench = require('..');

const args = process.argv.slice(2);

const bench = new Bench(args);

bench.start();

process.on('SIGINT', () => {
  process.exit(0);
});
