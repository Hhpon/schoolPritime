import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Picker, Image } from '@tarojs/components'
import { AtTabBar, AtIcon } from "taro-ui"
import './index.scss'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  constructor() {
    super();
    this.state = {
      isScopeOpen: false,
      current: 0,
      priTimes: [],
      todayDate: '',
      showDate: '',
      isShow: false
    }
  }

  componentWillMount() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    this.getUserSetting();
    let todayDate = this.onInitializetime();
    this.getPritime(0, todayDate);
  }

  componentDidHide() { }

  onInitializetime() {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();
    let todayDate = year + '-' + month + '-' + day;
    let showDate = month + '-' + day;
    this.setState({
      todayDate: todayDate,
      showDate: showDate
    })
    return todayDate;
  }

  getUserSetting() {
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
            }
          })
        }
      }
    })
  }

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

  getPritime(current, todayDate) {
    Taro.request({
      url: 'http://localhost:3000/getPritime',
      method: 'POST',
      data: { current: current, todayDate: todayDate }
    }).then(res => {
      let result = res.data.length;
      if (!result) {
        this.setState({
          isShow: true
        })
        return;
      }
      console.log(res.data);
      this.setState({
        priTimes: res.data
      })
    })
  }

  ontabChange(e) {
    this.setState({
      current: e
    })
    let todayDate = this.state.todayDate;
    this.getPritime(e, todayDate);
  }

  onDateChange = e => {
    let showDate = e.detail.value.slice(5);
    this.setState({
      todayDate: e.detail.value,
      showDate: showDate
    })
    this.getPritime(0, e.detail.value);
  }

  contactHandle(e) {
    console.log(e);
  }

  render() {
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
                {priTime.checkedList}
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>价格：</Text>
                {priTime.price}元
              </View>
              <View className='infomation'>
                <Text style='font-weight: bold;'>微信号：</Text>
                {priTime.wechatNum}
              </View>
              <View onClick={this.contactHandle.bind(this, priTime)}>联系替课</View>
            </View>
          </View>
        </View>
      )
    })
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
        <AtTabBar
          tabList={[
            { title: '第一节' },
            { title: '第二节' },
            { title: '第三节' },
            { title: '第四节' },
            { title: '晚自习' }
          ]}
          onClick={this.ontabChange}
          current={this.state.current}
        />

        <View className='body-container'>
          {TimeList}
        </View>

        {
          isShow &&
          <View>
            今天还没人发布替课信息~~~
          </View>
        }

        <Picker mode='date' start={this.state.todayDate} onChange={this.onDateChange}>
          <View className='picker-container'>
            {this.state.showDate}
          </View>
        </Picker>
      </View>
    )
  }
}

