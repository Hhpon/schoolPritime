import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './mine.scss'

export default class mine extends Component {
    config = {
        navigationBarBackgroundColor: '#5FC768'
    }

    constructor() {
        super();
        this.state = {
            userInfo: {}
        }
    }

    componentWillMount() {
        const openId = Taro.getStorageSync('openid');
        console.log(openId);
        Taro.request({
            url: 'http://localhost:3000/getUserinfo',
            data: {
                openId: openId
            }
        }).then(res => {
            this.setState({
                userInfo: res.data
            })
            console.log(res);
        })
    }

    render() {
        return (
            <View>
                <View className='message-container'>
                    <View className='image-container'>
                        <View style='height:10px;'></View>
                        <View className='avatar-con'>
                            <View className='avatar'>
                                <Image src={this.state.userInfo.avatarUrl} style='width:70px;height:70px;'></Image>
                            </View>
                        </View>
                        <View className='name-con'>{this.state.userInfo.nickName}</View>
                    </View>
                </View>
            </View>
        )
    }
}