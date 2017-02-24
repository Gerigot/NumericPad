import React from 'react';
import { create as createJss } from 'jss';
import preset from 'jss-preset-default';
import classNames from 'classnames';
import { createStyleManager, createStyleSheet } from 'jss-theme-reactor';

const themeObj = {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: 'red',
};

const styleManager = createStyleManager({
    jss: createJss(preset()),
    theme: themeObj,
});

const styleSheet = createStyleSheet('numericPad', (theme) => ({
    root: {
        color: theme.color,
        fontSize: theme.fontSize,
        fontFamily: theme.fontFamily,
        zIndex: 20000,
        width: '100%',
        height: '100%',
        position: 'fixed',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(0,0,0,0.4)',
        top: 0,
        left: 0,
        display: 'none',

    },
    isOpen: {
        display: 'block',
    },
    content: {
        margin: '15% auto',
        backgroundColor: '#fefefe',
        width: '80%',
        padding: 20,
        border: '1px solid #cacaca',
        borderRadius: '50px',
    },
    pad: {
        margin: 'auto',
        background: 'linear-gradient(45deg, rgb(250,250,250), rgb(205,205,205), rgb(250,250,250))',
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        minWidth: 200,
        maxWidth: 500,
        border: '1px solid rgba(0,0,0,0.6)',
        borderRadius: 5,
    },
    number: {
        width: '100%',
        fontSize: '2.1em',
        color: 'rgba(0,0,0,0.3)',
        border: '1px solid rgba(0,0,0,0.5)',
        margin: 5,
    },
    padNumber: {
        margin: '5px',
        fontSize: '2em',
        border: '1px solid rgba(0,0,0,0.4)',
        borderRadius: 25,
        textAlign: 'center',
        width: 'calc(90% / 3)',
        cursor: 'pointer',
        userSelect: 'none',
    }
}));

const classes = styleManager.render(styleSheet);

let numPad = null;

const NumericPad = (props, context) => {
    if (props.isOpen) {
        window.onclick = (event) => {
            if (event.target === numPad) {
                if (props.onClose) props.onClose();
            }
        }
    } else {
        window.onclick = null;
    }
    const onButtonClick = (value) => () => {
        if (value === "c") {
            if (props.number && props.number !== '0' && Number(props.number) > 9) {
                props.onChange(props.number.substr(0, props.number.length - 1));
            } else {
                props.onChange('0');
            }
        } else if (value === '.') {
            if (props.number.indexOf('.') === -1) {
                props.onChange(props.number + (value + ''))
            }
        } else {
            if (props.number !== '0') {
                props.onChange(props.number + (value + ''));
            } else {
                props.onChange(value);
            }
        }
    }
    return <div className={classNames(classes.root, { [classes.isOpen]: props.isOpen })} ref={(pad) => { numPad = pad }}>
        <div className={classes.content}>
            <div className={classes.pad}>
                <div className={classes.number}>{props.number}</div>
                <div className={classes.padNumber} onClick={onButtonClick(1)}>1</div>
                <div className={classes.padNumber} onClick={onButtonClick(2)}>2</div>
                <div className={classes.padNumber} onClick={onButtonClick(3)}>3</div>
                <div className={classes.padNumber} onClick={onButtonClick(4)}>4</div>
                <div className={classes.padNumber} onClick={onButtonClick(5)}>5</div>
                <div className={classes.padNumber} onClick={onButtonClick(6)}>6</div>
                <div className={classes.padNumber} onClick={onButtonClick(7)}>7</div>
                <div className={classes.padNumber} onClick={onButtonClick(8)}>8</div>
                <div className={classes.padNumber} onClick={onButtonClick(9)}>9</div>
                <div className={classes.padNumber} onClick={onButtonClick('c')}>C</div>
                <div className={classes.padNumber} onClick={onButtonClick(0)}>0</div>
                <div className={classes.padNumber} onClick={onButtonClick('.')}>.</div>
            </div>
        </div>
    </div>
}

export default NumericPad;