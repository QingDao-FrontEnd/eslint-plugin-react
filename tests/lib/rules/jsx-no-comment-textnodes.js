/**
 * @fileoverview Tests for jsx-no-comment-textnodes
 * @author Ben Vinegar
 */
'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/jsx-no-comment-textnodes');
var RuleTester = require('eslint').RuleTester;

var parserOptions = {
  ecmaVersion: 8,
  sourceType: 'module',
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true
  }
};

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester({parserOptions});
ruleTester.run('jsx-no-comment-textnodes', rule, {

  valid: [
    {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return (',
        '      <div>',
        '        {/* valid */}',
        '      </div>',
        '    );',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return (<div>{/* valid */}</div>);',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    const bar = (<div>{/* valid */}</div>);',
        '    return bar;',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'var Hello = createReactClass({',
        '  foo: (<div>{/* valid */}</div>),',
        '  render() {',
        '    return this.foo;',
        '  },',
        '});'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return (',
        '      <div>',
        '        {/* valid */}',
        '        {/* valid 2 */}',
        '        {/* valid 3 */}',
        '      </div>',
        '    );',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return (',
        '      <div>',
        '      </div>',
        '    );',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        'var foo = require(\'foo\');'
      ].join('\n'),
      parser: 'babel-eslint'
    }, {
      code: [
        '<Foo bar=\'test\'>',
        '  {/* valid */}',
        '</Foo>'
      ].join('\n'),
      parser: 'babel-eslint'
    },
    {
      code: [
        '<strong>',
        '  &nbsp;https://www.example.com/attachment/download/1',
        '</strong>'
      ].join('\n'),
      parser: 'babel-eslint'
    },

    // inside element declarations
    {
      code: [
        '<Foo /* valid */ placeholder={\'foo\'}/>'
      ].join('\n'),
      parser: 'babel-eslint'
    },
    {
      code: [
        '<Foo title={\'foo\' /* valid */}/>'
      ].join('\n'),
      parser: 'babel-eslint'
    }
  ],

  invalid: [
    {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return (<div>// invalid</div>);',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{message: 'Comments inside children section of tag should be placed inside braces'}]
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return (<div>/* invalid */</div>);',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{message: 'Comments inside children section of tag should be placed inside braces'}]
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return (',
        '      <div>',
        '        // invalid',
        '      </div>',
        '    );',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{message: 'Comments inside children section of tag should be placed inside braces'}]
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return (',
        '      <div>',
        '        asdjfl',
        '        /* invalid */',
        '        foo',
        '      </div>',
        '    );',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{message: 'Comments inside children section of tag should be placed inside braces'}]
    }, {
      code: [
        'class Comp1 extends Component {',
        '  render() {',
        '    return (',
        '      <div>',
        '        {\'asdjfl\'}',
        '        // invalid',
        '        {\'foo\'}',
        '      </div>',
        '    );',
        '  }',
        '}'
      ].join('\n'),
      parser: 'babel-eslint',
      errors: [{message: 'Comments inside children section of tag should be placed inside braces'}]
    }
  ]
});
