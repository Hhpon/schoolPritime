import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'

import './instructions.scss'

export default class instructions extends Component {
    config = {
        navigationBarTitleText: '使用说明'
    }

    constructor() {
        super()
        this.state = {
            userInfo: {}
        }
    }

    render() {
        return (
            <View className='container'>
                <View className='title-self'>使用说明</View>
                <View className='annotation'>
                    在此处我们把帮别人替课简称“卖时间”
                </View>
                <View className='article'>
                    <View>发单说明（卖时间）：</View>
                    <View>1、发布：发布所选时间即为您愿意帮别人上课的时间，所填信息请确保正确无误，找替课的同学会根据您所填信息挑选。</View>
                    <View>2、我的-未开始：即为您所提交却未开始的订单。</View>
                    <View>3、我的-进行中：即为您所提交并且被接单的订单。</View>
                    <View>4、我的-已完成：即为进行中的下一阶段。</View>
                    <View>5、当买时间的在东农UT里面接单后，小程序会给我们发送模板消息，接收到模板消息后请第一时间联系接单人，否则会流失用户；另外大家点击进入模板消息后可以看到用户的联系方式，届时请根据订单状态点击按钮。</View>
                </View>
                <View className='article'>
                    <View>接单说明（买时间）：</View>
                    <View>1、兼职：即发单人在相应的时间内愿意在相应的价格下帮助您上课，您点击“联系替课”按钮之后系统会通过微信的服务通知给您所选的同学发送模板消息通知，如果十分钟内未联系您，为了不耽误您上课，可重新选择订单为您替课。</View>
                    <View>2、兼职-时间选择-日期：在页面居中的下方有一按钮，默认为当天的日期，如果改变日期，可以转到其他日期选择替课订单。</View>
                    <View>3、兼职-时间选择-节数：即所选日期内的相应节数</View>
                </View>
            </View>
        )
    }
}