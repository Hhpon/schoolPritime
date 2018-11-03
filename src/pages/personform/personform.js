import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './personform.scss'

export default class personform extends Component {
    config = {
        navigationBarTitleText: '个人信息'
    }

    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <View>
                123
            </View>
        )
    }
}