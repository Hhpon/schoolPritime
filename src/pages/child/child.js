import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'

export default class container extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handle(e) {
        console.log(this.props.email);
    }

    render() {
        return (
            <View>
                <Input onFocus={this.handle} onInput={this.props.onchangeHandle}></Input>
            </View>
        );
    }
}