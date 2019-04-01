import React, {Component, PureComponent} from 'react'
import {ScrollView, StyleProp, StyleSheet, View, ViewPropTypes, ViewStyle} from 'react-native'
import {CommonUtils} from "my-rn-base-utils";
import {getColorsCommon} from "my-rn-common-resource";

const DEFAULT_DOT_RADIUS = 6;

interface Props {
    pageCount: number
    initialPage?:number
    style?: StyleProp<ViewStyle>
    dotStyle?: StyleProp<ViewStyle>
    selectedDotStyle?: StyleProp<ViewStyle>
}

export class PagerDotIndicator extends PureComponent<Props, { selectedIndex: number }> {
    static defaultProps = {
        initialPage: 0
    };
    constructor(props) {
        super(props);
        this.state = {selectedIndex: this.props.initialPage};
    }

    render() {
        let {pageCount, dotStyle, selectedDotStyle} = this.props;
        if (pageCount <= 0) return null;
        if (CommonUtils.getScreenW() < getWidth(this.props.pageCount) + 27)
            return null;

        let dotsView = [];
        for (let i = 0; i < pageCount; i++) {
            let isSelect = i === this.state.selectedIndex;
            dotsView.push(
                <View
                    style={[styles.dot, isSelect ? styles.selectDot : null, isSelect ? selectedDotStyle : dotStyle]}
                    key={i}
                />
            )
        }

        return (
            <View {...this.props} style={[styles.container, this.props.style]}>
                {dotsView}
            </View>
        )
    }

    onPageSelected(selectedIndex: number) {
        this.setState({selectedIndex: selectedIndex})
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    dot: {
        width: DEFAULT_DOT_RADIUS,
        height: DEFAULT_DOT_RADIUS,
        borderRadius: 3,
        backgroundColor: '#BBBBBB',
        margin: 3,
    },
    selectDot: {
        backgroundColor: getColorsCommon().primaryColor
    }
});

function getWidth(pageCount: number) {
    return (2 * pageCount - 1) * DEFAULT_DOT_RADIUS;
}
