import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './order.scss'

export default class order extends Component {
  config = {
    navigationBarTitleText: '订单管理'
  }

  constructor() {
    super();
    this.state = {
      isShowwarn: false,
      navigatorType: '',
      priTimes: []
    }
  }

  componentDidShow() {
    let navigatorType = this.$router.params.type;
    this.getOrder(navigatorType);
  }

  getOrder(navigatorType) {
    let openid = Taro.getStorageSync('openid')
    Taro.request({
      url: 'http://localhost:3001/getOrder',
      data: {
        openid: openid,
        navigatorType: navigatorType
      }
    }).then(res => {
      console.log(res.data);
      let length = res.data.length;
      if (!length) {
        this.setState({
          navigatorType: navigatorType,
          isShowwarn: true,
          priTimes: res.data
        })
        return;
      }
      this.setState({
        navigatorType: navigatorType,
        priTimes: res.data
      })
    })
  }

  completeHandle(e) {
    console.log(e);
    let _id = e._id;
    Taro.request({
      url: 'http://localhost:3001/editOrder',
      data: {
        _id: _id,
        editType: 'complete'
      }
    })
    let navigatorType = this.state.navigatorType;
    this.getOrder(navigatorType);
  }

  returnHandle(e) {
    console.log(e);
    let _id = e._id;
    Taro.request({
      url: 'http://localhost:3001/editOrder',
      data: {
        _id: _id,
        editType: 'return'
      }
    })
    let navigatorType = this.state.navigatorType;
    this.getOrder(navigatorType);
  }

  delHandle(e) {
    console.log(e);
    let _id = e._id;
    Taro.request({
      url: 'http://localhost:3001/editOrder',
      data: {
        _id: _id,
        editType: 'del'
      }
    })
    let navigatorType = this.state.navigatorType;
    this.getOrder(navigatorType);
  }

  render() {
    let isShowwarn = this.state.isShowwarn;
    let navigatorType = this.state.navigatorType;
    const TimeList = this.state.priTimes.map((priTime) => {
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
                <Text style='font-weight: bold;'>可替节数：</Text>
                {priTime.timeRadio}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>价格：</Text>
                {priTime.price}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>微信号：</Text>
                {priTime.wechatNum}
              </View>
              {
                navigatorType === 'onGoing' &&
                <View>
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
              }
              <View className='button-con'>
                <AtButton size='small' type='secondary' onClick={this.delHandle.bind(this, priTime)}>删除</AtButton>
                {
                  navigatorType === 'onGoing' &&
                  <View className='isshow-button'>
                    <AtButton size='small' type='secondary' onClick={this.returnHandle.bind(this, priTime)}>接单失败</AtButton>
                  </View>
                }
                {
                  navigatorType !== 'onCompleting' &&
                  <View className='isshow-button'>
                    <AtButton size='small' type='secondary' onClick={this.completeHandle.bind(this, priTime)}>完成</AtButton>
                  </View>
                }
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