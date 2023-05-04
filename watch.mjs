import * as fs from 'node:fs';

const n = 100;
const t = 1000;
const original = fs.readFileSync(`./src/main.ts`);

process.on('exit', reset);

for (let i = 0; i < n; i++) {
  update(i);
  await delay(t);
}

function reset() {
  fs.writeFileSync('./src/main.ts', original);
}

function update(i) {
  fs.writeFileSync('./src/main.ts', `${original}\nfoo = ${i};`);
}

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}
