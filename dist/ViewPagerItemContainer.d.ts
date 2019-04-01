import { ReactChild } from 'react';
import { ComponentUpdateOnlyState } from "my-rn-base-component";
interface Props {
    onRender: () => ReactChild;
}
export declare class ViewPagerItemContainer extends ComponentUpdateOnlyState<Props, {
    isRendered: boolean;
}> {
    constructor(props: any);
    setRenderState(isRendered: any): void;
    render(): JSX.Element;
}
export {};
