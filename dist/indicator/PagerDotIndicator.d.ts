import { PureComponent } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
interface Props {
    pageCount: number;
    initialPage?: number;
    style?: StyleProp<ViewStyle>;
    dotStyle?: StyleProp<ViewStyle>;
    selectedDotStyle?: StyleProp<ViewStyle>;
}
export declare class PagerDotIndicator extends PureComponent<Props, {
    selectedIndex: number;
}> {
    static defaultProps: {
        initialPage: number;
    };
    constructor(props: any);
    render(): JSX.Element;
    onPageSelected(selectedIndex: number): void;
}
export {};
