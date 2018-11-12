import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button, Picker, Image } from '@tarojs/components'
import { AtTabBar, AtIcon, AtButton, AtForm } from "taro-ui"
import './index.scss'
import { rejects } from 'assert';

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
      isShowForm: false,
      isShow: false,
      formId: ''
    }
  }

  componentWillMount() {
  }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() {
    this.getUserSetting();
    let todayDate = this.onInitializetime();
    let current = this.state.current;
    this.getPritime(current, todayDate);
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
          console.log('用户未授权');
          that.setState({
            isScopeOpen: true
          })
        } else {
          console.log('用户已授权');
          Taro.getUserInfo({
            success(res) {
              let userInfo = JSON.parse(res.rawData)
              let openid = Taro.getStorageSync('openid')
              if (openid) {
                // Do something with return value
                // https://weapp.hhp.im/updateUserinfo
                Taro.request({
                  url: 'https://weapp.hhp.im/updateUserinfo',
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
          console.log(res);
          Taro.request({
            url: 'https://weapp.hhp.im/onLogin',
            method: 'POST',
            data: {
              code: res.code,
              userInfo: userInfo
            }
          }).then(res => {
            console.log(res.data);
            that.setState({
              openId: res.data
            })
            Taro.setStorage({ key: 'openid', data: res.data }).then(res => {
              console.log('存储成功');
            })
          })
        }
      })
    }
  }

  getPritime(current, todayDate) {
    Taro.request({
      url: 'https://weapp.hhp.im/getPritime',
      method: 'POST',
      data: { current: current, todayDate: todayDate }
    }).then(res => {
      let result = res.data.length;
      if (!result) {
        this.setState({
          priTimes: res.data,
          isShow: true
        })
        return;
      }
      this.setState({
        isShow: false,
        priTimes: res.data.reverse()
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

  changeFormId(e) {
    this.setState({
      formId: e.detail.formId
    })
  }

  wait(timeout) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('ok')
      }, timeout);
    })
  }

  async contactHandle(e) {
    console.log(e);
    const personalInfo = Taro.getStorageSync('personalInfo');
    if (!personalInfo) {
      wx.showModal({
        title: '提示',
        content: '您还没绑定个人信息，请先绑定！',
        success(res) {
          if (res.confirm) {
            console.log('用户点击确定')
            Taro.navigateTo({
              url: '/pages/personform/personform'
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
      return;
    }
    let _id = e._id;
    const openId = Taro.getStorageSync('openid');
    Taro.showLoading({ title: '加载中' });
    await this.wait(1000);
    Taro.hideLoading();
    Taro.request({
      url: 'https://weapp.hhp.im/orderContact',
      method: 'POST',
      data: {
        _id: _id,
        openId: openId,
        formId: this.state.formId
      }
    }).then(res => {
      if (res.data === 'already') {
        Taro.showModal({
          title: '提示',
          content: '该单已经被接，请换其他的试试',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      } else if (res.data === 'same') {
        Taro.showModal({
          title: '提示',
          content: '不能接自己的单哦！',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        })
      }
      let todayDate = this.state.todayDate;
      let current = this.state.current;
      this.getPritime(current, todayDate);
    })
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
              <View className='button-con'>
                <AtForm onSubmit={this.changeFormId} reportSubmit className='form-self'>
                  <AtButton size='small' type='secondary' onClick={this.contactHandle.bind(this, priTime)} formType='submit'>联系替课</AtButton>
                </AtForm>
              </View>
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
              <View style='height:10px'></View>
              <View className='dialog-header'>提示</View>
              <View className='dialog-content'>请允许用户授权</View>
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
          <View className='warnning-container'>
            <View style='height:20px'></View>
            <View style='text-align:center'>今天还没人发布替课信息~~~</View>
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

