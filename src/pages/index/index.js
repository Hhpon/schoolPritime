import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import { AtModal, AtModalHeader, AtModalContent, AtModalAction } from "taro-ui"
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super();
    this.state = {
      isScopeOpen: false
    }
  }

  componentWillMount() {
    const that = this;
    Taro.getSetting({
      success(res) {
        if (!res.authSetting['scope.userInfo']) {
          that.setState({
            isScopeOpen: true
          })
        } else {
          Taro.getUserInfo({
            success(res) {
              try {
                let userInfo = JSON.parse(res.rawData)
                let openid = wx.getStorageSync('openid')
                if (openid) {
                  // Do something with return value
                  Taro.request({
                    url: 'http://localhost:3000/updateUserinfo',
                    method: 'POST',
                    data: {
                      openid: openid,
                      userInfo: userInfo
                    }
                  }).then(res => {
                    console.log(res);
                  })
                }
              } catch (e) {
                // Do something when catch error

              }
            }
          })
        }
      }
    })
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }


  getUserinfomation(e) {
    const userInfo = e.detail.userInfo;
    console.log(userInfo);
    const that = this;
    if (e.detail.errMsg === 'getUserInfo:ok') {
      this.setState({
        isScopeOpen: false
      })
      Taro.login({
        success(res) {
          Taro.request({
            url: 'http://localhost:3000/onLogin',
            method: 'POST',
            data: {
              code: res.code,
              userInfo: userInfo
            }
          }).then(res => {
            console.log(res);
          })
          that.setState({
            openId: res.code
          })
          Taro.setStorage({ key: 'openid', data: res.code }).then(res => {
            console.log('存储成功');
          })
        }
      })
    }
  }

  render() {
    return (
      <View className='index'>
        {
          isScopeOpen &&
          <View className='model-container'>
            <View style='height:30%'></View>
            <View className='dialog-container'>
              <View className='dialog-header'>提示</View>
              <View className='dialog-content'>请允许用户授权完成</View>
              <View className='dialog-handle'>
                <Button hover-stop-propagation className='dialog-button' openType='getUserInfo' onGetUserInfo={this.getUserinfomation}>确定</Button>
              </View>
            </View>
          </View>
        }
      </View>
    )
  }
}

