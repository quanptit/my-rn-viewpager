my-rn-viewpager: Lưu trữ tham chiếu đến cái String
## Installation

##### Thêm Vào package.json
```
"my-rn-viewpager": "git+https://gitlab.com/react-native-my-libs/my-rn-viewpager.git",
```

Chạy  lệnh sau
```
yarn install
```

## Sử dụng

```javascript
    private _renderContentViewPager() {
        return (
            <View style={s.flex_i}>
                <ViewPagerPerformance
                    ref={(ref) => {this.viewPager = ref}}
                    keyboardDismissMode="on-drag"
                    style={s.flex_i}
                    initialPage={this.state.currentIndex}
                    data={this.listQuestion}
                    renderPageItem={this._renderPageItem.bind(this)}
                    onPageSelected={this._onPageSelected.bind(this)}/>

                <PagerDotIndicator
                    initialPage={this.state.currentIndex}
                    ref={(ref) => {this.viewPager && this.viewPager.setIndicator(ref)}}
                    pageCount={this.listQuestion.length}
                    style={styles.indicator}/>
            </View>
        );
    }
```
