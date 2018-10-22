import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './issue.scss'

export default class issue extends Component {

    config = {
        navigationBarTitleText: '发布'
    }

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <View>
                <View className='pt-cell'>
                    <Text style='padding: 0 10px;color: #908C88'>真实姓名:</Text>
                    <Input placeholder='请输入' className='cell-input'></Input>
                </View>
            </View>
        )
    }
}