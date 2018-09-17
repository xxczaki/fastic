import test from 'ava';
import execa from 'execa';

test('Default port & directory', async t => {
  const ret = await execa.shell('node fastic.js');
  t.regex(ret.stdout, /5050/);
});

test('Custom port', async t => {
  const ret = await execa.shell('node fastic.js 8080');
  t.regex(ret.stdout, /8080/);
});

test('Custom port & directory', async t => {
  const ret = await execa.shell('node fastic.js 8080 ~/Public');
  t.regex(ret.stdout, /Press/);
});

test('Test too high port number error', async t => {
  const ret = await execa.shell('node fastic.js 999999');
  t.regex(ret.stderr, /Maximum available/);
});

test('Test not a valid port number error', async t => {
  const ret = await execa.shell('node fastic.js foo');
  t.regex(ret.stderr, /is not a port number!/);
});
