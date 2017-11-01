Progress bar component
======================

[![build status](https://img.shields.io/travis/spasdk/component-progress-bar.svg?style=flat-square)](https://travis-ci.org/spasdk/component-progress-bar)
[![npm version](https://img.shields.io/npm/v/spa-component-progress-bar.svg?style=flat-square)](https://www.npmjs.com/package/spa-component-progress-bar)
[![dependencies status](https://img.shields.io/david/spasdk/component-progress-bar.svg?style=flat-square)](https://david-dm.org/spasdk/component-progress-bar)
[![devDependencies status](https://img.shields.io/david/dev/spasdk/component-progress-bar.svg?style=flat-square)](https://david-dm.org/spasdk/component-progress-bar?type=dev)
[![Gitter](https://img.shields.io/badge/gitter-join%20chat-blue.svg?style=flat-square)](https://gitter.im/DarkPark/spasdk)


Progress bar is a component to build user interface, an instance of [Component](https://github.com/spasdk/component) module.


## Installation ##

```bash
npm install spa-component-progress-bar
```


## Usage ##

Add the constructor to the scope:

```js
var ProgressBar = require('spa-component-progress-bar');
```

Create progress bar instance:

```js
var progressBar = new ProgressBar({
    $node: window.pmProgressBar,
    min: -100,
    max:  200,
    events: {
        done: function () {
            console.log('ProgressBar: done');
        },
        change: function ( data ) {
            console.log('ProgressBar: change to ' + data.curr + ' from ' + data.prev);
        }
    }
});
```


## Development mode ##

> There is a global var `DEVELOP` which activates additional consistency checks and protection logic not available in release mode.


## Contribution ##

If you have any problems or suggestions please open an [issue](https://github.com/spasdk/component-progress-bar/issues)
according to the contribution [rules](.github/contributing.md).


## License ##

`spa-component-progress-bar` is released under the [MIT License](license.md).
