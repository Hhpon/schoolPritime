import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Form, Button } from '@tarojs/components'
import { AtNoticebar, AtInput, AtRadio, AtTextarea } from 'taro-ui'
import './issue.scss'

export default class issue extends Component {

    config = {
        navigationBarTitleText: '发布'
    }

    constructor() {
        super()
        this.state = {
            dateSel: '',
            nowDate: '',
            timeRadio: [
                {
                    value: '第一节',
                    label: '第一节',
                },
                {
                    value: '第二节',
                    label: '第二节',
                },
                {
                    value: '第三节',
                    label: '第三节',
                },
                {
                    value: '第四节',
                    label: '第四节',
                },
                {
                    value: '晚自习',
                    label: '晚自习',
                },
            ],
            personInfomation: {
                name: '',
                telNum: '',
                sex: '',
                partimeDate: '',
                wechatNum: '',
                price: '',
                note: '',
                timeRadio: ''
            }
        }
    }

    componentWillMount() {
    }

    componentDidShow() {
        this.getPersonalInfo()
        this.onChangetime()
        this.getUserRecord()
    }

    getPersonalInfo() {
        const personalInfo = Taro.getStorageSync('personalInfo')
        if (!personalInfo) {
            Taro.showModal({
                title: '提示',
                content: '您还没绑定个人信息，请先绑定！',
                success(res) {
                    if (res.confirm) {
                        Taro.navigateTo({
                            url: '/pages/personform/personform'
                        })
                    } else if (res.cancel) {
                        Taro.switchTab({
                            url: '/pages/index/index'
                        })
                    }
                }
            })
            return
        }
    }

    getUserRecord() {
        const openId = Taro.getStorageSync('openid')
        Taro.request({
            url: 'https://weapp.hhp.im/getUserRecord',
            data: {
                openId: openId
            }
        }).then(res => {
            let result = res.data
            if (result === '无用户记录') {
                console.log(result)
                return
            }
            let personInfomation = this.state.personInfomation
            personInfomation.name = result.name
            personInfomation.telNum = result.telNum
            personInfomation.wechatNum = result.wechatNum
            personInfomation.sex = result.sex
            personInfomation.price = result.price
            personInfomation.timeRadio = ''
            this.setState({
                personInfomation: personInfomation
            })
        })
    }

    onChangetime() {
        let year = new Date().getFullYear()
        let month = new Date().getMonth() + 1
        let day = new Date().getDate()
        let personInfomation = this.state.personInfomation
        let nowDate = year + '-' + month + '-' + day
        personInfomation.partimeDate = nowDate
        this.setState({
            personInfomation: personInfomation,
            nowDate: nowDate
        })
    }

    onDateChange = e => {
        let personInfomation = this.state.personInfomation
        personInfomation.partimeDate = e.detail.value
        this.setState({
            personInfomation: personInfomation
        })
    }

    onSexChange = e => {
        let personInfomation = this.state.personInfomation
        personInfomation.sex = e
        this.setState({
            personInfomation: personInfomation
        })
    }

    onTimeChange = e => {
        console.log(e)
        let personInfomation = this.state.personInfomation
        personInfomation.timeRadio = e
        this.setState({
            personInfomation: personInfomation
        })
    }


    onNameChange(e) {
        let personInfomation = this.state.personInfomation
        personInfomation.name = e
        this.setState({
            personInfomation: personInfomation
        })
    }

    onPriceChange(e) {
        let personInfomation = this.state.personInfomation
        personInfomation.price = e
        this.setState({
            personInfomation: personInfomation
        })
    }

    onTelChange(e) {
        let personInfomation = this.state.personInfomation
        personInfomation.telNum = e
        this.setState({
            personInfomation: personInfomation
        })
    }

    onwechatNumChange(e) {
        let personInfomation = this.state.personInfomation
        personInfomation.wechatNum = e
        this.setState({
            personInfomation: personInfomation
        })
    }

    onNoteChange(e) {
        let personInfomation = this.state.personInfomation
        personInfomation.note = e.detail.value
        this.setState({
            personInfomation: personInfomation
        })
    }

    // 点击提交按钮后上传表单内容
    submitHandle(e) {
        console.log(e.detail.formId)
        let personInfomation = this.state.personInfomation
        let formId = e.detail.formId
        const openId = Taro.getStorageSync('openid')

        for (let item in personInfomation) {
            if (item !== 'note') {
                let length = personInfomation[item].length
                if (!length) {
                    Taro.showModal({
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
                    return
                }
            }
        }

        Taro.request({
            url: 'https://weapp.hhp.im/issuePritime',
            method: 'POST',
            data: {
                personInfomation: this.state.personInfomation,
                openId: openId,
                formId: formId
            }
        }).then(res => {
            if (res.data === 'no') {
                Taro.showModal({
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
                    title: '发布成功！',
                    icon: 'success',
                    duration: 2000
                }).then(res => {
                    setTimeout(() => {
                        Taro.switchTab({
                            url: '/pages/index/index'
                        })
                    }, 1000)
                })
            }
        })
    }

    render() {
        return (
            <View className='container'>
                <AtNoticebar icon='volume-plus' marquee>
                    填写即代表您同意在您所选择的时间里帮别人上课！
                </AtNoticebar>
                <Form onSubmit={this.submitHandle} reportSubmit className='form-container'>
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
                        title='替课价格'
                        type='text'
                        placeholder='必填项'
                        value={this.state.personInfomation.price}
                        onChange={this.onPriceChange.bind(this)}
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
                    <Picker mode='date' start={this.state.nowDate} onChange={this.onDateChange}>
                        <View className='picker-container'>
                            <View className='picker-title'>兼职日期</View>
                            <View>{this.state.personInfomation.partimeDate}</View>
                        </View>
                    </Picker>
                    <AtRadio
                        options={[
                            { label: '男', value: '男', },
                            { label: '女', value: '女' },
                        ]}
                        value={this.state.personInfomation.sex}
                        onClick={this.onSexChange}
                    />
                    <AtRadio
                        options={this.state.timeRadio}
                        value={this.state.personInfomation.timeRadio}
                        onClick={this.onTimeChange}
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