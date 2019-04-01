import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ComponentUpdateOnlyState, StyleUtils, TextCustom } from "my-rn-base-component";
const s = StyleUtils.getAllStyle();
export class ViewPagerItemContainer extends ComponentUpdateOnlyState {
    constructor(props) {
        super(props);
        this.state = { isRendered: false };
    }
    setRenderState(isRendered) {
        if (this.state.isRendered === isRendered)
            return;
        this.setState({ isRendered: isRendered });
    }
    render() {
        if (!this.state.isRendered)
            return <TextCustom value="Loading..." style={styles.loadding}/>;
        return (<View style={s.flex_i}>
                {this.props.onRender()}
            </View>);
    }
}
const styles = StyleSheet.create({
    loadding: { marginTop: 12, textAlign: "center", textAlignVertical: "center", flex: 1, }
});
