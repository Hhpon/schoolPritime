import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtInput, AtRadio, AtTextarea } from 'taro-ui'

import './personform.scss'

export default class personform extends Component {
    config = {
        navigationBarTitleText: '个人信息'
    }

    constructor() {
        super();
        this.state = {
            personInfomation: {
                name: '',
                telNum: '',
                sex: '男',
                wechatNum: '',
                note: '',
            }
        }
    }

    onSexChange = e => {
        console.log(e);
        let personInfomation = this.state.personInfomation;
        personInfomation.sex = e;
        this.setState({
            personInfomation: personInfomation
        })
    }

    onNameChange(e) {
        let personInfomation = this.state.personInfomation;
        personInfomation.name = e;
        this.setState({
            personInfomation: personInfomation
        })
    }

    onTelChange(e) {
        console.log(e);
        let personInfomation = this.state.personInfomation;
        personInfomation.telNum = e;
        this.setState({
            personInfomation: personInfomation
        })
    }

    onwechatNumChange(e) {
        console.log(e);
        let personInfomation = this.state.personInfomation;
        personInfomation.wechatNum = e;
        this.setState({
            personInfomation: personInfomation
        })
    }

    onNoteChange(e) {
        console.log(e.detail.value);
        let personInfomation = this.state.personInfomation;
        personInfomation.note = e.detail.value;
        this.setState({
            personInfomation: personInfomation
        })
    }

    submitHandle(e) {
        console.log(e.detail);
        let personInfomation = this.state.personInfomation;
        const openId = Taro.getStorageSync('openid');

        for (let item in personInfomation) {
            if (item !== 'note') {
                let length = personInfomation[item].length;
                if (!length) {
                    wx.showModal({
                        title: '提示',
                        content: '请填写完整再提交',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                    return;
                }
            }
        }

        Taro.request({
            url: 'https://weapp.hhp.im/addUserInfo',
            method: 'POST',
            data: {
                personInfomation: this.state.personInfomation,
                openId: openId
            }
        }).then(res => {
            if (res.data === 'no') {
                wx.showModal({
                    title: '提示',
                    content: '请填写完整再提交',
                    showCancel: false,
                    success(res) {
                        if (res.confirm) {
                            console.log('用户点击确定')
                        } else if (res.cancel) {
                            console.log('用户点击取消')
                        }
                    }
                })
            } else {
                Taro.showToast({
                    title: '绑定成功！',
                    icon: 'success',
                    duration: 2000
                }).then(res => {
                    setTimeout(() => {
                        Taro.navigateBack({
                            delta: 1
                        })
                    }, 1000);
                })
                Taro.setStorage({ key: 'personalInfo', data: true }).then(res => {
                    console.log('存储成功');
                })
            }
        })
    }

    render() {
        return (
            <View className='form-container'>
                <Form onSubmit={this.submitHandle} reportSubmit>
                    <AtInput
                        name='value1'
                        title='真实姓名'
                        type='text'
                        placeholder='必填项'
                        value={this.state.personInfomation.name}
                        onChange={this.onNameChange.bind(this)}
                    />
                    <AtInput
                        name='value1'
                        title='电话号码'
                        type='number'
                        placeholder='必填项'
                        value={this.state.personInfomation.telNum}
                        onChange={this.onTelChange.bind(this)}
                    />
                    <AtInput
                        name='value1'
                        title='微信号'
                        type='text'
                        placeholder='必填项'
                        value={this.state.personInfomation.wechatNum}
                        onChange={this.onwechatNumChange.bind(this)}
                    />
                    <AtRadio
                        options={[
                            { label: '男', value: '男', },
                            { label: '女', value: '女' },
                        ]}
                        value={this.state.personInfomation.sex}
                        onClick={this.onSexChange}
                    />
                    <AtTextarea
                        count={false}
                        value={this.state.personInfomatin.note}
                        onChange={this.onNoteChange.bind(this)}
                        maxlength='100'
                        placeholder='备注信息(选填)'
                    />
                    <Button form-type='submit' className='button-self'>提交</Button>
                </Form>
            </View>
        )
    }
}