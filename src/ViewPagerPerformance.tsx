import React, {ReactChild} from 'react';
import {ViewPagerAndroidOnPageScrollEventData, View} from "react-native";
import {StyleUtils, PureComponentSkipFunction} from "my-rn-base-component";
import {ViewPager, ViewPagerProps} from 'rn-viewpager';
import {ViewPagerItemContainer} from "./ViewPagerItemContainer";

const s = StyleUtils.getAllStyle();
const RENDER_PAGES_PACE = 2;

interface Props extends ViewPagerProps {
    data: any[]
    renderPageItem: (info: { item, index: number }) => ReactChild
}

export class ViewPagerPerformance extends PureComponentSkipFunction<Props> {
    private viewPager: ViewPager;
    private pages: Map<number, ViewPagerItemContainer>;
    private currentPageIndex: number;
    private indicator: IIndicator;

    // private listPageIndexRender: number[];

    constructor(props) {
        super(props);
        this.pages = new Map();
        this.currentPageIndex = this.props.initialPage || 0;
    }

    componentDidMount() {
        this.updatePageRender();
    }

    setIndicator(indicator: IIndicator) {
        this.indicator = indicator;
    }

    setPage(selectedPage: number): void {
        this.viewPager && this.viewPager.setPage(selectedPage)
    }

    setPageWithoutAnimation(selectedPage: number): void {
        this.viewPager && this.viewPager.setPageWithoutAnimation(selectedPage)
    }

    /**Update tất cả các page đã được render*/
    updateChangeToAllPage() {
        this.pages.forEach((value) => {
            value && value.forceUpdate();
        })
    }

    //region process render page
    // Render it nhat trước và sau page hiện tại 2 cái. Remove nếu Trước và sau 6 cái
    private updatePageRender() {
        let currentPageIndex = this.currentPageIndex;
        let length = this.props.data.length;
        let newListPageIndexRender: number[] = [];

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

    private _setPageRender(index: number, isRender: boolean) {
        let pageUI = this.pages.get(index);
        pageUI && pageUI.setRenderState(isRender);
    }

    //endregion


    private _onPageSelected(e: ViewPagerAndroidOnPageScrollEventData) {
        this.currentPageIndex = e.position;
        this.indicator && this.indicator.onPageSelected(this.currentPageIndex);
        this.updatePageRender();
        this.props.onPageSelected(e);
    }

    private _renderListPage() {
        return this.props.data.map((value, index: number) => {
            return (
                <View style={s.flex_i} key={index}>
                    <ViewPagerItemContainer
                        ref={(ref) => {
                            if (ref == null)
                                this.pages.delete(index);
                            else
                                this.pages.set(index, ref)
                        }}
                        onRender={() => this.props.renderPageItem({item: value, index: index})}
                    />
                </View>
            );
        })
    }

    render() {

        return (
            <ViewPager
                ref={(ref) => {this.viewPager = ref}}
                {...this.props}
                onPageSelected={this._onPageSelected.bind(this)}>
                {this._renderListPage()}
            </ViewPager>
        )
    }

    //region utils

    //endregion
}

interface IIndicator {
    onPageSelected(selectedIndex: number)
}
