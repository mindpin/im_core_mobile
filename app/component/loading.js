import React, { PropTypes } from 'react';

import {
    StyleSheet,
    Dimensions,
    Image,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Loading extends React.Component {

    static LOADING_WIDTH = 100;
    static LOADING_HEIGHT = 80;

    static defaultProps = {
        pointerEvents: false,
        timeout: 0,
        showText: false,
    };
    static propTypes = {
        text: PropTypes.string,
        textStyle: PropTypes.any,
        pointerEvents: PropTypes.bool,
        bottomStyle: PropTypes.any,
        loadingStyle: PropTypes.any,
        timeout: PropTypes.number,
        onLoadingTimeout: PropTypes.func,
        showText: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.isShown = false;
        this.state = {
            loading: (<View />),
        }
        this.offsetX = 0;
        this.offsetY = 0;
        this.timeout = props.timeout;
        this.onLoadingTimeout = props.onLoadingTimeout;
        this.timeoutEvent = undefined;

    }

    render() {
        return this.state.loading;
    }

    show(text, pointerEvents) {
        if (!this.isShown) {
            if (typeof(text) == 'boolean') {
                pointerEvents = text;
                text = '';
            }
            text = text ? text : this.props.text;
            this.setState({
                loading: this._getLoading({
                    ...this.props,
                    text: text,
                    pointerEvents: pointerEvents
                })
            });
            if (this.timeout > 0) {
                this.timeoutEvent = setTimeout(() => {
                    if (this.isShown) {
                        this.dismiss();
                        this.onLoadingTimeout && this.onLoadingTimeout();
                    }
                }, this.timeout);
            }
            this.isShown = true;
        }
    }

    dismiss() {
        if (this.isShown) {
            this.setState({
                loading: (<View />)
            });
            this.isShown = false;
            this.timeoutEvent && clearInterval(this.timeoutEvent);
        }
    }

    setLoadingOffset(x, y) {
        this.offsetX = x;
        this.offsetY = y;
        return this;
    }

    setLoadingTimeout(timeout, onLoadingTimeout) {
        this.timeout = timeout;
        this.onLoadingTimeout = onLoadingTimeout;
        return this;
    }

    clearLoadingTimeout() {
        this.timeout = 0;
        this.onLoadingTimeout = undefined;
    }

    isShown() {
        return this.isShown;
    }

    _getText(props){
      if(!props.showText){
        return null;
      }

      return(
        <Text style={[styles.loadingText, props.textStyle]}>
            {!!props && props.text ? props.text : '请稍后...'}
        </Text>
      )
    }

    _getLoading(props) {
        let offsetStyle = {};
        if (this.offsetY != 0 || this.offsetX != 0) {
            offsetStyle.top = SCREEN_HEIGHT / 2 + this.offsetY / 2 - Loading.LOADING_HEIGHT / 2;
            offsetStyle.left = SCREEN_WIDTH / 2 + this.offsetX / 2 - Loading.LOADING_WIDTH / 2;
        }
        return (
            <View pointerEvents={!!props && props.pointerEvents ? 'none' : 'auto'} style={styles.container}>
                <View pointerEvents={'none'} style={[styles.loadingBg, props.bottomStyle]} />
                <View style={[styles.loadingBody, offsetStyle, props.loadingStyle]}>
                    <ActivityIndicator
                        animating={true}
                        color='white'
                        style={styles.activityIndicatorCentering}
                        size='small'
                    />
                    {
                      this._getText({
                        ...this.props,
                        text: props.text,
                      })
                    }
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT
    },
    loadingBg: {
        position: 'absolute',
        top: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    loadingBody: {
        width: Loading.LOADING_WIDTH,
        height: Loading.LOADING_HEIGHT,
        position: 'absolute',
        top: SCREEN_HEIGHT / 2 - Loading.LOADING_HEIGHT / 2,
        left: SCREEN_WIDTH / 2 - Loading.LOADING_WIDTH / 2,
        borderRadius: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: 'white',
        backgroundColor: 'transparent'
    },
    activityIndicatorCentering: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 40
    }
});
