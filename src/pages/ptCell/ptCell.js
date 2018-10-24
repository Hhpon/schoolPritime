import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './ptCell.scss'

export default class issue extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    cb(msg) {
        this.props
    }

    render() {
        return (
            <View>
                <View className='pt-cell'>
                    <View className='cell-text'>{this.props.title}</View>
                    <Input placeholder={this.props.placeholder} className='cell-input'></Input>
                </View>
            </View>
        )
    }
}