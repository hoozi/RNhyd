import React, { Component } from 'react';
import {  
  View,
  Text, 
  StyleSheet, 
  StatusBar, 
  FlatList,
  Platform,
  RefreshControl
} from 'react-native';
import {
  WingBlank,
  ActivityIndicator
} from '@ant-design/react-native';
import SvgUri from 'react-native-svg-uri';
import isNil from 'lodash/isNil';
import { connect } from 'react-redux';
import Layout from '../../layouts/Layout';
import CardItem from '../../components/CardItem';
import { mapEffects, mapLoading } from '../../utils/reduxHelpers';

const svg = `
  <svg width="64" height="41" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0 1)" fill="none" fill-rule="evenodd">
      <ellipse fill="#f2f2f2" cx="32" cy="33" rx="32" ry="7"/>
      <g fill-rule="nonzero" stroke="#D9D9D9">
        <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"/>
        <path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#FAFAFA"/>
      </g>
    </g>
  </svg>
`

const mapStateToProps = ({task}) => ({
  ...task,
  ...mapLoading('task', {
    fetchTasking: 'fetchTask'
  })
});

const mapDispatchToProps = ({task}) => ({
  ...mapEffects(task, ['fetchTask'])
});

const CARD_HEIGHT = 208;

@connect(mapStateToProps, mapDispatchToProps)
class TaskScreen extends Component {
  static navigationOptions ={
    title: '作业',
    headerBackTitle: null
  }
  state = {
    data: [],
    fetching: false,
    loadMore: false
  }
  page = 1
  getCardProps = item => {
    const { truckType } = this.props;
    const getStatusView = (data, statusMap) => {
      const colors = {
        7: '#fa8c16',
        10: '#389e0d',
        14: '#389e0d'
      }
      return (
        <View style={{flexDirection: 'row', marginTop: 4}}>
          <View style={{...styles.status, backgroundColor: colors[data.status] ? colors[data.status] : '#1890ff'}}>
            <Text style={{fontSize:12,color:'#fff'}}>{statusMap[data.status]}</Text>
          </View>
        </View>
      );
    }
    const props = {
      1: {
        renderCornerBadge: data => (
          data.operateType === 'CX' ? 
          <Text style={styles.ctnType}>拆箱</Text>:
          <Text style={[styles.ctnType, styles.ctnTypeOther]}>装箱</Text>
        ),
        fields: [
          {
            title: '收货人',
            index: 'consigneeName'
          },
          {
            title: '收货地址',
            index: 'consigneeAddress'
          },
          {
            title: '联系电话',
            index: 'consigneeMobile'
          },
          {
            title: '提箱点',
            index: 'suitcaseAddress'
          },
          {
            title: '还箱点',
            index: 'returnAddress'
          },
          {
            title: '预计到厂时间',
            index: 'planStuffingTime'
          },
          {
            index: '_',
            render: data => {
              const statusMap = {
                7: '新任务',
                8: '进行中',
                9: '进行中',
                10: '已进港',
                11: '进行中',
                12: '进行中',
                13: '进行中',
                14: '已还空'
              }
              return getStatusView(data, statusMap);
            }
          }
        ]
      }, 
      2: {
        renderCornerBadge: data => <Text style={[styles.ctnType, styles.ctnTypeOther]}>散货</Text>,
        fields: [
          {
            title: '货物名称',
            index: 'cargoName'
          },
          {
            title: '收货人',
            index: 'consigneeName'
          },
          {
            title: '收货地址',
            index: 'consigneeAddress'
          },
          {
            title: '联系电话',
            index: 'consigneeMobile'
          },
          {
            title: '提货地',
            index: 'sourceAddress'
          },
          {
            title: '送货地',
            index: 'targetAddress'
          },
          {
            index: '_',
            render: data => {
              const statusMap = {
                7: '新任务',
                8: '进行中',
                9: '进行中',
                10: '已完成'
              }
              return getStatusView(data, statusMap);
            }
          }
        ]
      }
    }
    return props[truckType];
  }
  getItemLayout = (data, index) => ({
    length: CARD_HEIGHT, offset: CARD_HEIGHT*index+10, index
  })
  saveRef = name => value => {
    return this[name] = value;
  }
  componentDidMount() {
    this.props.fetchTask({current: this.page},data => {
      this.setState({ data });
    });
  }
  componentWillUnmount() {
    this.setState = () => {
      return;
    }
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.fetchTasking !== this.props.fetchTasking;
  }
  handleListRefresh = () => {
    this.setState({
      fetching: true
    });
    this.page = 1;
    this.props.fetchTask({current: this.page}, data => {
      this.setState({
        fetching: false,
        data
      });
    });
  }
  handleListLoadMore = () => {
    const { pages } = this.props;
    if(this.page >= pages || this.state.loadMore) return;
    this.setState({
      loadMore: true
    });
    this.page++
    this.props.fetchTask({current: this.page}, data => {
      this.setState({
        loadMore: false,
        data: [...this.state.data, ...data]
      });
    })
  }
  renderListItem = ({item}) => (
    <WingBlank size='md' key={item.id}>
      <CardItem
        onCardPress={() => {
          this.props.navigation.navigate('Detail', {id: item.id, hasOperate: true})
        }}
        renderTitle='operateNo'
        renderExtra='confirmOrderTime'
        data={item}
        {...this.getCardProps()}
      />
    </WingBlank>
  )
  renderListFooter = () => (
    <View style={{
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 16,
      paddingBottom: 24
    }}>
      {
        this.state.loadMore ?  
        <ActivityIndicator text='加载更多...'/> :
        this.page === this.props.pages ? 
        <Text style={{color: 'rgba(0,0,0,0.15)', fontSize: 13}}>———— 没有更多任务了 ————</Text> : null
      }
    </View>
  )
  renderListEmpty = () => (
    <View style={{flex: 1,alignItems: 'center', justifyContent: 'center'}}>
      <SvgUri svgXmlData={svg} />
      <Text style={{fontSize:14, marginTop: 8, color: '#ccc'}}>暂无数据</Text>
    </View>
  )
  render() {
    const { fetching, data, loadMore } = this.state;
    const { fetchTasking } = this.props
    return (
      <Layout>
        <StatusBar
          barStyle='light-content'
        />
        {
          fetchTasking && !loadMore && !fetching ? 
          <View style={{flexDirection: 'column', flex: 1, alignItems: 'center', justifyContent: 'center'}}><ActivityIndicator text='加载中...'/></View> :
          !isNil(data) && data.length > 1 ? 
          <FlatList 
            style={styles.container} 
            contentContainerStyle={{paddingTop: 10}}
            data={data}
            renderItem={this.renderListItem}
            getItemLayout={this.getItemLayout}
            refreshControl={
              <RefreshControl 
                title={!fetching? '下拉刷新' : '刷新中...'} 
                refreshing={fetching}
                onRefresh={this.handleListRefresh}
              />
            }
            ListFooterComponent={this.renderListFooter}
            onEndReached={this.handleListLoadMore}
            onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 0.001}
            keyExtractor={item => item.id+''}
          /> :
          this.renderListEmpty()
        }
      </Layout>
    )
  }
}

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  ctnType: {
    width: 72,
    paddingTop: 1,
    paddingBottom: 1,
    transform: [
      {
        rotate: '-45deg',
      },
    ],
    position: 'absolute',
    right: -20,
    bottom: 8,
    backgroundColor: '#fa541c',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    overflow: 'hidden',
  },
  ctnTypeOther: {
    backgroundColor: '#13c2c2'
  },
  status: {
    paddingLeft: 8,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 8,
    borderRadius: 10
  }
})