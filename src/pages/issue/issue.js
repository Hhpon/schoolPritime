import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Button } from '@tarojs/components'
import { AtNoticebar, AtInput, AtForm, AtRadio, AtCheckbox } from 'taro-ui'
import { ptCell } from '../ptCell/ptCell'
import { pickerCon } from '../pickerCon/pickerCon'
import './issue.scss'

export default class issue extends Component {

    config = {
        navigationBarTitleText: '发布'
    }

    constructor() {
        super();
        this.state = {
            dateSel: '',
            checkboxOption: [
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
                checkedList: []
            }
        }
    }



    onDateChange = e => {
        let personInfomation = this.state.personInfomation;
        personInfomation.partimeDate = e.detail.value;
        this.setState({
            personInfomation: personInfomation
        })
    }

    onSexChange = e => {
        let personInfomation = this.state.personInfomation;
        personInfomation.sex = e;
        this.setState({
            personInfomation: personInfomation
        })
    }

    onCheckChange = e => {
        console.log(e);
        let personInfomation = this.state.personInfomation;
        personInfomation.checkedList = e;
        this.setState({
            personInfomation: personInfomation
        })
    }

    render() {
        return (
            <View>
                <AtNoticebar icon='volume-plus'>
                    请认真填写，兼职时间提交之后不能修改！
                </AtNoticebar>
                <AtForm reportSubmit>
                    <Picker mode='date' onChange={this.onDateChange}>
                        <View className='picker'>
                            兼职日期：{this.state.personInfomation.partimeDate}
                        </View>
                    </Picker>
                    <AtInput
                        name='value1'
                        title='真实姓名'
                        type='text'
                        placeholder='必填项'
                        value={this.state.personInfomation.name}
                    />
                    <AtInput
                        name='value1'
                        title='电话号码'
                        type='number'
                        placeholder='必填项'
                        value={this.state.personInfomation.telNum}
                    />
                    <AtInput
                        name='value1'
                        title='微信号'
                        type='text'
                        placeholder='必填项'
                        value={this.state.personInfomation.wechatNum}
                    />
                    <AtRadio
                        options={[
                            { label: '男', value: '男', },
                            { label: '女', value: '女' },
                        ]}
                        value={this.state.personInfomation.sex}
                        onClick={this.onSexChange}
                    />
                    <AtCheckbox
                        options={this.state.checkboxOption}
                        selectedList={this.state.personInfomation.checkedList}
                        onChange={this.onCheckChange.bind(this)}
                    />
                    <Button form-type='submit'>提交</Button>
                </AtForm>
            </View>
        )
    }
}