import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './mine.scss'

export default class mine extends Component {
    config = {
        navigationBarBackgroundColor: '#6190E8',
        navigationBarTitleText: '我的'
    }

    constructor() {
        super();
        this.state = {
            userInfo: {}
        }
    }

    componentWillMount() {
        this.getUserinfo();
    }

    getUserinfo() {
        const openId = Taro.getStorageSync('openid');
        console.log(openId);
        Taro.request({
            // https://weapp.hhp.im
            url: 'http://localhost:3001/getUserinfo',
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

    onStarting() {
        Taro.navigateTo({
            url: '/pages/order/order?type=onStarting'
        })
    }
    
    onGoing(){
        Taro.navigateTo({
            url: '/pages/order/order?type=onGoing'
        })
    }

    onCompleting(){
        Taro.navigateTo({
            url: '/pages/order/order?type=onCompleting'
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
                    <View className='mine-order'>
                        <View className='order-top'>
                            <Text>我的记录</Text>
                            <View className='ordertop-right'>
                                <AtIcon value='chevron-right' size='15' color='#868281'></AtIcon>
                            </View>
                        </View>
                        <View className='order-bottom'>
                            <View className='order-icon' onClick={this.onStarting}>
                                <AtIcon prefixClass='icon' value='daifukuan' color='#6190E8' size='24'></AtIcon>
                                <Text>待开始</Text>
                            </View>
                            <View className='order-icon' onClick={this.onGoing}>
                                <AtIcon prefixClass='icon' value='daifahuo' color='#6190E8' size='24'></AtIcon>
                                <Text>进行中</Text>
                            </View>
                            <View className='order-icon' onClick={this.onCompleting}>
                                <AtIcon prefixClass='icon' value='yishouhuo' color='#6190E8' size='24'></AtIcon>
                                <Text>已完成</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View></View>
                <View></View>
            </View>
        )
    }
}