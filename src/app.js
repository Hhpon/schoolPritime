import Taro, { Component } from '@tarojs/taro'
import Index from './pages/index'

import './app.scss'

class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/issue/issue'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#8a8a8a',
      selectedColor: '#39B54A',
      backgroundColor: '#FFF',
      list: [
        {
          pagePath: 'pages/issue/issue',
          text: '发布',
          iconPath: './pages/asset/tabBar/issue.png',
          selectedIconPath: './pages/asset/tabBar/issued.png'
        },
        {
          pagePath: 'pages/index/index',
          text: '兼职',
          iconPath: './pages/asset/tabBar/part-time.png',
          selectedIconPath: './pages/asset/tabBar/part-timed.png'
        },
        {
          pagePath: 'pages/index/index',
          text: '兼职',
          iconPath: './pages/asset/tabBar/issue.png',
          selectedIconPath: './pages/asset/tabBar/issued.png'
        }
      ]
    }
  }

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  componentCatchError() { }

  render() {
    return (
      <Index />
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
