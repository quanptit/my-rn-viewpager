import React from 'react';
import { View } from "react-native";
import { StyleUtils, PureComponentSkipFunction } from "my-rn-base-component";
import { ViewPager } from 'rn-viewpager';
import { ViewPagerItemContainer } from "./ViewPagerItemContainer";
const s = StyleUtils.getAllStyle();
const RENDER_PAGES_PACE = 2;
export class ViewPagerPerformance extends PureComponentSkipFunction {
    // private listPageIndexRender: number[];
    constructor(props) {
        super(props);
        this.pages = new Map();
        this.currentPageIndex = this.props.initialPage || 0;
    }
    componentDidMount() {
        this.updatePageRender();
    }
    setIndicator(indicator) {
        this.indicator = indicator;
    }
    setPage(selectedPage) {
        this.viewPager && this.viewPager.setPage(selectedPage);
    }
    setPageWithoutAnimation(selectedPage) {
        this.viewPager && this.viewPager.setPageWithoutAnimation(selectedPage);
    }
    /**Update tất cả các page đã được render*/
    updateChangeToAllPage() {
        this.pages.forEach((value) => {
            value && value.forceUpdate();
        });
    }
    //region process render page
    // Render it nhat trước và sau page hiện tại 2 cái. Remove nếu Trước và sau 6 cái
    updatePageRender() {
        let currentPageIndex = this.currentPageIndex;
        let length = this.props.data.length;
        let newListPageIndexRender = [];
        newListPageIndexRender.push(currentPageIndex);
        for (let i = 1; i < RENDER_PAGES_PACE; i++) {
            if (currentPageIndex + i < length)
                newListPageIndexRender.push(currentPageIndex + i);
            if (currentPageIndex - i >= 0)
                newListPageIndexRender.push(currentPageIndex - i);
        }
        // let listPageIndexRenderNeedRemove: number[] = [];
        // if (this.listPageIndexRender != null) {
        //     for (let item of this.listPageIndexRender) {
        //         if (!newListPageIndexRender.includes(item))
        //             listPageIndexRenderNeedRemove.push(item);
        //     }
        // }
        for (let item of newListPageIndexRender) {
            this._setPageRender(item, true);
        }
        // this.listPageIndexRender = newListPageIndexRender;
        // for (let item of listPageIndexRenderNeedRemove) {
        //     this._setPageRender(item, false);
        // }
    }
    _setPageRender(index, isRender) {
        let pageUI = this.pages.get(index);
        pageUI && pageUI.setRenderState(isRender);
    }
    //endregion
    _onPageSelected(e) {
        this.currentPageIndex = e.position;
        this.indicator && this.indicator.onPageSelected(this.currentPageIndex);
        this.updatePageRender();
        this.props.onPageSelected(e);
    }
    _renderListPage() {
        return this.props.data.map((value, index) => {
            return (<View style={s.flex_i} key={index}>
                    <ViewPagerItemContainer ref={(ref) => {
                if (ref == null)
                    this.pages.delete(index);
                else
                    this.pages.set(index, ref);
            }} onRender={() => this.props.renderPageItem({ item: value, index: index })}/>
                </View>);
        });
    }
    render() {
        return (<ViewPager ref={(ref) => { this.viewPager = ref; }} {...this.props} onPageSelected={this._onPageSelected.bind(this)}>
                {this._renderListPage()}
            </ViewPager>);
    }
}
