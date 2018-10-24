// 测试父子组件之间传值

import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import child from '../child/child'

export default class abc extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: 'hhpone@163.com'
        };
    }
    add(event) {
        console.log(event);
        this.setState({ email: event.target.value }, function () {
            console.log(this.state.email);
        });
    }

    handle() {
        console.log('abc');
    }

    changeHandle(){
        this.setState({
            email: 'lishhp@163.com'
        })
    }

    render() {
        return (
            <View>
                <View>
                    {this.state.email}
                    <child email={this.state.email} onchangeHandle={this.changeHandle.bind(this)}></child>
                </View>
            </View>
        );
    }
}