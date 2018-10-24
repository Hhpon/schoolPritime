import Taro, { Component } from '@tarojs/taro'
import { View, Text, Checkbox } from '@tarojs/components'
import { AtNoticebar } from 'taro-ui'
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
            CheckboxList: [
                {
                    value: '第一节',
                    text: '第一节',
                },
                {
                    value: '第二节',
                    text: '第二节',
                },
                {
                    value: '第三节',
                    text: '第三节',
                },
                {
                    value: '第四节',
                    text: '第四节',
                },
                {
                    value: '晚自习',
                    text: '晚自习',
                },
            ]
        }
    }

    render() {
        return (
            <View>
                <AtNoticebar icon='volume-plus'>
                    请认真填写，兼职时间提交之后不能修改！
                </AtNoticebar>
                <ptCell title='真实姓名：' placeholder='必填项'></ptCell>
                <ptCell title='手机号码：' placeholder='必填项'></ptCell>
                <ptCell title='性别：' placeholder='必填项'></ptCell>
                <pickerCon></pickerCon>
                <View className='checkList-container'>
                    {this.state.CheckboxList.map((item, i) => {
                        return (
                            <Label className='checkbox-list__label' for={i} key={i}>
                                <Checkbox className='checkbox-list__checkbox' value={item.value}>{item.text}</Checkbox>
                            </Label>
                        )
                    })}
                </View>
            </View>
        )
    }
}