import { ReactChild } from 'react';
import { PureComponentSkipFunction } from "my-rn-base-component";
import { ViewPagerProps } from 'rn-viewpager';
interface Props extends ViewPagerProps {
    data: any[];
    renderPageItem: (info: {
        item: any;
        index: number;
    }) => ReactChild;
}
export declare class ViewPagerPerformance extends PureComponentSkipFunction<Props> {
    private viewPager;
    private pages;
    private currentPageIndex;
    private indicator;
    constructor(props: any);
    componentDidMount(): void;
    setIndicator(indicator: IIndicator): void;
    setPage(selectedPage: number): void;
    setPageWithoutAnimation(selectedPage: number): void;
    /**Update tất cả các page đã được render*/
    updateChangeToAllPage(): void;
    private updatePageRender;
    private _setPageRender;
    private _onPageSelected;
    private _renderListPage;
    render(): JSX.Element;
}
interface IIndicator {
    onPageSelected(selectedIndex: number): any;
}
export {};
