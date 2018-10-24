import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input } from '@tarojs/components'
import './pickerCon.scss'

export default class issue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dateSel: ''
        }
    }

    componentWillMount() {
        let d = new Date();
        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();
        this.setState({
            dateSel: year + '-' + month + '-' + day
        })
    }

    onDateChange(e) {
        this.setState({
            dateSel: e.detail.value
        })
    }

    render() {
        return (
            <View>
                <Picker mode='date' start={this.state.dateSel} onChange={this.onDateChange}>
                    <View className='picker'>
                        兼职日期：{this.state.dateSel}
                    </View>
                </Picker>
            </View>
        )
    }
}