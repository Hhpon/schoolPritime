import Taro, { Component } from '@tarojs/taro'
import { View, Form } from '@tarojs/components'
import { AtButton } from 'taro-ui'

import './order.scss'

export default class order extends Component {
  config = {
    navigationBarTitleText: '订单管理'
  }

  constructor() {
    super()
    this.state = {
      isShowwarn: false,
      navigatorType: '',
      formId: '',
      priTimes: []
    }
  }

  componentDidShow() {
    let navigatorType = this.$router.params.type
    this.getOrder(navigatorType)
  }

  getOrder(navigatorType) {
    let openid = Taro.getStorageSync('openid')
    Taro.request({
      url: 'https://weapp.hhp.im/getOrder',
      data: {
        openid: openid,
        navigatorType: navigatorType
      }
    }).then(res => {
      console.log(res.data)
      let length = res.data.length
      if (!length) {
        this.setState({
          navigatorType: navigatorType,
          isShowwarn: true,
          priTimes: res.data
        })
        return
      }
      this.setState({
        navigatorType: navigatorType,
        priTimes: res.data.reverse()
      })
    })
  }

  completeHandle(e) {
    console.log(e)
    let _id = e._id
    Taro.request({
      url: 'https://weapp.hhp.im/editOrder',
      data: {
        _id: _id,
        editType: 'complete'
      }
    })
    let navigatorType = this.state.navigatorType
    this.getOrder(navigatorType)
  }

  returnHandle(e) {
    Taro.showLoading({
      title: '加载中',
    })
    setTimeout(() => {
      let formId = this.state.formId
      let _id = e._id
      Taro.request({
        url: 'https://weapp.hhp.im/editOrder',
        data: {
          _id: _id,
          editType: 'return',
          formId: formId
        }
      })
      let navigatorType = this.state.navigatorType
      this.getOrder(navigatorType)
      Taro.hideLoading()
    }, 1000)
  }

  changeFormId(e) {
    this.setState({
      formId: e.detail.formId
    })
  }

  delHandle(e) {
    console.log(e)
    let _id = e._id
    Taro.request({
      url: 'https://weapp.hhp.im/editOrder',
      data: {
        _id: _id,
        editType: 'del'
      }
    })
    let navigatorType = this.state.navigatorType
    this.getOrder(navigatorType)
  }

  onMakePhoneCall(e) {
    Taro.makePhoneCall({
      phoneNumber: e
    })
  }

  onSetClipboardData(e) {
    Taro.setClipboardData({
      data: e,
      success(res) {
        Taro.showToast({
          title: '复制成功！',
          icon: 'success',
          duration: 1000
        })
      }
    })
  }

  render() {
    let isShowwarn = this.state.isShowwarn
    let navigatorType = this.state.navigatorType
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
                <Text style='font-weight: bold;'>可替日期：</Text>
                {priTime.partimeDate}
              </View>
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
                {
                  navigatorType !== 'onGoing' &&
                  <AtButton size='small' type='secondary' onClick={this.delHandle.bind(this, priTime)}>删除</AtButton>
                }
                {
                  navigatorType === 'onGoing' &&
                  <View className='button-con'>
                    <Form className='form-self'>
                      <AtButton size='small' type='secondary' onClick={this.onSetClipboardData.bind(this, priTime.contactWechatNum)}>复制微信</AtButton>
                    </Form>
                    <Form className='form-self'>
                      <AtButton size='small' type='secondary' onClick={this.onMakePhoneCall.bind(this, priTime.contactTelNum)}>拨打电话</AtButton>
                    </Form>
                    <Form onSubmit={this.changeFormId} reportSubmit className='form-self'>
                      <AtButton size='small' type='secondary' onClick={this.returnHandle.bind(this, priTime)} formType='submit'>接单失败</AtButton>
                    </Form>
                    <Form className='form-self'>
                      <AtButton size='small' type='secondary' onClick={this.completeHandle.bind(this, priTime)}>完成</AtButton>
                    </Form>
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
            <View style='height:20px;'></View>
            <View style='text-align:center;'>您还没有这类订单~~~</View>
          </View>
        }
        <View>
          {TimeList}
        </View>
      </View>
    )
  }
}