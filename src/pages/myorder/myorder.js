import Taro, { Component } from '@tarojs/taro'
import { View, Button, Form } from '@tarojs/components'
import { AtButton, AtForm } from 'taro-ui'

import './myorder.scss'

export default class myorder extends Component {
  config = {
    navigationBarTitleText: '我的求助'
  }

  constructor() {
    super();
    this.state = {
      myOrder: [],
      isShowwarn: false
    }
  }

  componentDidShow() {
    this.getMyOrder();
  }

  getMyOrder() {
    let openId = Taro.getStorageSync('openid')
    Taro.request({
      url: 'http://localhost:3001/getMyOrder',
      data: {
        openId: openId,
      }
    }).then(res => {
      console.log(res.data);
      if (res.data === 'err') {
        Taro.showModal({
          title: '提示',
          content: '加载失败，请稍后再试或联系管理员！',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
        return;
      }
      let length = res.data.length;
      if (!length) {
        this.setState({
          isShowwarn: true,
          myOrder: res.data
        })
        return;
      }
      this.setState({
        myOrder: res.data
      })
    })
  }

  render() {
    let isShowwarn = this.state.isShowwarn;
    const TimeList = this.state.myOrder.map((priTime) => {
      return (
        <View className='priTime-container'>
          <View className='image-con'>
            <Image src={priTime.avatarUrl} mode='aspectFit' className='image-self'></Image>
          </View>
          <View className='user-con'>
            <View className='nickname-con'>
              <View>{priTime.nickName}</View>
              <View>
                <AtIcon prefixClass='icon' value={(priTime.sex === '男') ? 'nan' : 'nv'} size='20'></AtIcon>
              </View>
            </View>
            <View className='priTime-info'>
              <View className='infomation'>
                <Text style='font-weight: bold;'>姓名：</Text>
                {priTime.name}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>性别：</Text>
                {priTime.sex}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>电话：</Text>
                {priTime.telNum}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>微信号：</Text>
                {priTime.wechatNum}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>价格：</Text>
                {priTime.price}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>可替日期：</Text>
                {priTime.partimeDate}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>可替节数：</Text>
                {priTime.timeRadio}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>备注：</Text>
                {priTime.note ? priTime.note : '无'}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>寻找人姓名：</Text>
                {priTime.contactName}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>寻找人性别：</Text>
                {priTime.contactSex}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>寻找人微信：</Text>
                {priTime.contactWechatNum}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>寻找人电话：</Text>
                {priTime.contactTelNum}
              </View>
            </View>
          </View>
        </View>
      )
    })
    return (
      <View>
        {
          isShowwarn &&
          <View className='warnning-container'>
            <View style='height:20px'></View>
            <View style='text-align:center'>您还没有这类订单~~~</View>
          </View>
        }
        <View>
          {TimeList}
        </View>
      </View>
    )
  }
}