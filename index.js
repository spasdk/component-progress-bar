/**
 * @license The MIT License (MIT)
 * @copyright Stanislav Kalashnik <darkpark.main@gmail.com>
 */

/* eslint no-path-concat: 0 */

'use strict';

var Component = require('spa-component');


/**
 * Base progress bar implementation.
 *
 * @constructor
 * @extends Component
 *
 * @param {Object} [config={}] init parameters (all inherited from the parent)
 * @param {number} [config.value=0] initial value
 * @param {number} [config.max=100] max progress value
 * @param {number} [config.min=0] min progress value
 */
function ProgressBar ( config ) {
    // sanitize
    config = config || {};

    if ( DEVELOP ) {
        if ( typeof config !== 'object' ) { throw new Error(__filename + ': wrong config type'); }
        // init parameters checks
        if ( config.className && typeof config.className !== 'string' ) { throw new Error(__filename + ': wrong or empty config.className'); }
    }

    /**
     * Max progress value.
     *
     * @type {number}
     */
    this.max = 100;

    /**
     * Min progress value.
     *
     * @type {number}
     */
    this.min = 0;

    /**
     * Initial progress position.
     *
     * @type {number}
     */
    this.value = 0;

    /**
     * Value of the one percent step
     *
     * @type {number}
     */
    this.step = 1;

    // can't accept focus
    config.focusable = config.focusable || false;

    // set default className if classList property empty or undefined
    //config.className = 'progressBar ' + (config.className || '');

    // parent constructor call
    Component.call(this, config);

    // insert bar line
    this.$value = this.$body.appendChild(document.createElement('div'));

    // correct CSS class name
    this.$value.className = 'value';

    // component setup
    this.init(config);
}


// inheritance
ProgressBar.prototype = Object.create(Component.prototype);
ProgressBar.prototype.constructor = ProgressBar;

// set component name
ProgressBar.prototype.name = 'spa-component-progress-bar';


/**
 * Set position of the given value.
 * Does nothing in case when progress is end and passed value is more than max value.
 *
 * @param {number} value new value to set
 * @return {boolean} operation result
 *
 * @fires module:stb/ui/progress.bar~ProgressBar#done
 * @fires module:stb/ui/progress.bar~ProgressBar#change
 */
ProgressBar.prototype.set = function ( value ) {
    var prevValue = this.value;

    if ( DEVELOP ) {
        if ( arguments.length !== 1  ) { throw new Error(__filename + ': wrong arguments number'); }
        if ( Number(value) !== value ) { throw new Error(__filename + ': value must be a number'); }
    }

    // value changed but in the given range
    if ( this.value !== value && value <= this.max && value >= this.min ) {
        // set new value
        this.value = value;

        // get value in percents
        value = Math.abs(this.value - this.min) / this.step;

        if ( value === 100 ) {
            // there are some listeners
            if ( this.events['done'] ) {
                /**
                 * Set progress to its maximum value.
                 *
                 * @event module:stb/ui/progress.bar~ProgressBar#done
                 */
                this.emit('done');
            }
        }

        // set progress bar width
        this.$value.style.width = value + '%';

        // there are some listeners
        if ( this.events['change'] ) {
            /**
             * Update progress value.
             *
             * @event module:stb/ui/progress.bar~ProgressBar#change
             *
             * @type {Object}
             * @property {number} prev old/previous progress value
             * @property {number} curr new/current progress value
             */
            this.emit('change', {curr: this.value, prev: prevValue});
        }

        return true;
    }

    // nothing was done
    return false;
};


/**
 * Init or re-init current max or/and min or/and value.
 *
 * @param {Object} config init parameters (subset of constructor config params)
 */
ProgressBar.prototype.init = function ( config ) {
    if ( DEVELOP ) {
        if ( arguments.length !== 1 ) { throw new Error(__filename + ': wrong arguments number'); }
        if ( typeof config !== 'object' ) { throw new Error(__filename + ': wrong config type'); }
    }

    // set max progress value
    if ( config.max !== undefined ) {
        if ( DEVELOP ) {
            if ( Number(config.max) !== config.max ) { throw new Error(__filename + ': config.max value must be a number'); }
        }

        // apply
        this.max = config.max;
    }

    // set min progress value
    if ( config.min !== undefined ) {
        if ( DEVELOP ) {
            if ( Number(config.min) !== config.min ) { throw new Error(__filename + ': config.min value must be a number'); }
        }

        // apply
        this.min = config.min;
    }

    if ( DEVELOP ) {
        if ( this.min >= this.max ) { throw new Error(__filename + ': this.min value must be less than this.max'); }
    }

    // set actual progress value
    if ( config.value !== undefined ) {
        if ( DEVELOP ) {
            if ( Number(config.value) !== config.value ) { throw new Error(__filename + ': config.value must be a number'); }
            if ( config.value > this.max ) { throw new Error(__filename + ': config.value more than config.maximum'); }
            if ( config.value < this.min ) { throw new Error(__filename + ': config.value less than config.minimum'); }
        }

        // apply
        this.value = config.value;
    }

    this.step = Math.abs(this.max - this.min) / 100;

    // init bar size, (this.min - this.value) - calculate distance from start
    this.$value.style.width = (Math.abs(this.min - this.value) / this.step) + '%';
};


// public
module.exports = ProgressBar;
