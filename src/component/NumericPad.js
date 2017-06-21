import React, { Component } from 'react';
import { create as createJss } from 'jss';
import preset from 'jss-preset-default';
import classNames from 'classnames';
import { createStyleManager, createStyleSheet } from 'jss-theme-reactor';

const themeObj = {
    fontFamily: 'Roboto',
    fontSize: 12,
    color: 'red',
    modalBackground: 'rgba(0,0,0,0.4)',
    modalContentBackground: '#fefefe',
    modalContentBorder: '#cacaca',
    padBackground: 'linear-gradient(45deg, rgb(0, 90, 156), rgba(0,90,156,0.5), rgb(0, 90, 156))',
    padBorder: 'rgba(0,0,0,0.6)',
    numberColor: 'rgba(0,0,0,1)',
    numberBorder: 'rgba(0,0,0,0.5)',
    padNumberBorder: 'rgba(0,0,0,0.6)',
    padNumberBackground: 'rgb(141, 207, 255)',
    padNumberPassiveShadow: '#444',
    padNumberActiveShadow: 'rgba(10,10,10,0.3)',

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
        backgroundColor: theme.modalBackground,
        top: 0,
        left: 0,
        display: 'none',

    },
    isOpen: {
        display: 'block',
    },
    content: {
        margin: '15% auto',
        backgroundColor: theme.modalContentBackground,
        width: '80%',
        padding: 20,
        border: '1px solid ' + theme.modalContentBorder,
    },
    pad: {
        margin: 'auto',
        padding: 5,
        background: theme.padBackground,
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        minWidth: 200,
        maxWidth: 500,
        border: '1px solid ' + theme.padBorder,
        borderRadius: '5px',
    },
    number: {
        width: '100%',
        fontSize: '2.1em',
        color: theme.numberColor,
        border: '1px solid ' + theme.numberBorder,
        margin: 5,
    },
    padNumber: {
        backgroundColor: theme.padNumberBackground,
        outline: 'none',
        margin: '5px',
        fontSize: '2em',
        border: '1px solid ' + theme.padNumberBorder,
        borderRadius: '10px',
        textAlign: 'center',
        width: 'calc(90% / 3)',
        cursor: 'pointer',
        userSelect: 'none',
        boxShadow: '0 5px ' + theme.padNumberPassiveShadow,
        '&:active': {
            transform: 'translateY(4px)',
            boxShadow: '0 2px ' + theme.padNumberActiveShadow,

        }
    }
}));

const classes = styleManager.render(styleSheet);


const numericType = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0, '.'];


class NumericPad extends Component {
    constructor(props) {
        super(props)
        this.checkToClose = this.checkToClose.bind(this);
        this.componentElement = null;
    }

    checkToClose(event) {
        if (this.props.isOpen) {
            if (!this.componentElement.contains(event.target)) {
                console.log("chiudo");
                this.props.onClose();
            }
        }
    }

    componentDidMount() {
        window.addEventListener('click', this.checkToClose);
    }

    render() {
        const props = this.props;
        console.log(this.props);
        let array = numericType;
        let maxNumber = 20;
        if (props.maxNumber) {
            maxNumber = props.maxNumber;
        }
        if (props.type && props.type !== 'numeric') {
            //I will add here more type
        }
        const onButtonClick = (value) => () => {
            if (value === "Backspace") {
                if (props.number && props.number !== '0' && Number(props.number) > 9) {
                    props.onChange(props.number.substr(0, props.number.length - 1));
                } else {
                    props.onChange('0');
                }
                return;
            }
            if (props.number.length >= maxNumber) return;
            if (value === '.') {
                if (props.number.indexOf('.') === -1) {
                    props.onChange(props.number + (value + ''))
                }
                return;
            } else {
                if (props.number !== '0') {
                    props.onChange(props.number + (value + ''));
                } else {
                    props.onChange(value);
                }
            }
        }
        return <div className={classNames(classes.root, { [classes.isOpen]: props.isOpen })}>
            <div className={classes.content} ref={(ele) => { this.componentElement = ele }}>
                <div className={classes.pad}>
                    <div className={classes.number}>{props.number}</div>
                    {array.map((item) => {
                        return <button key={"ciao" + item} className={classes.padNumber} onClick={onButtonClick(item === 'C' ? 'Backspace' : item)}>{item}</button>
                    })}
                </div>
            </div>
        </div>
    }
}

export default NumericPad;
