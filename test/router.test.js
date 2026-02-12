const assert = require('assert');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    passed++;
  } catch (e) {
    console.error(`FAIL: ${name} — ${e.message}`);
    failed++;
  }
}

const rrd = require('react-router-dom');

test('Switch exists in v5', () => {
  assert(rrd.Switch, 'Switch should exist');
});

test('Route exists', () => {
  assert(rrd.Route);
});

test('Redirect exists in v5', () => {
  assert(rrd.Redirect, 'Redirect should exist');
});

test('useHistory exists in v5', () => {
  assert(typeof rrd.useHistory === 'function');
});

test('useParams exists', () => {
  assert(typeof rrd.useParams === 'function');
});

test('useLocation exists', () => {
  assert(typeof rrd.useLocation === 'function');
});

test('useRouteMatch exists in v5', () => {
  assert(typeof rrd.useRouteMatch === 'function');
});

test('withRouter HOC exists in v5', () => {
  assert(typeof rrd.withRouter === 'function');
});

test('NavLink exists', () => {
  assert(rrd.NavLink);
});

test('Link exists', () => {
  assert(rrd.Link);
});

test('BrowserRouter exists', () => {
  assert(rrd.BrowserRouter);
});

test('React is at v18', () => {
  const React = require('react');
  assert(React.version.startsWith('18.'));
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
