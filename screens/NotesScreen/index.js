import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, TouchableHighlight } from 'react-native';
import {
  Card,
  ActivityIndicator,
  WingBlank
} from '@ant-design/react-native';
import Layout from '../../layouts/Layout';

export default class NotesScreen extends Component {
  static navigationOptions = {
    title: '记录'
  }
  setStatusVisable = flag => StatusBar.setHidden(!!flag, 'fade');
  render() {
    return (
      <Layout>
        <ScrollView 
          style={styles.container} 
          contentContainerStyle={{paddingTop:10}}
        >
          {/* <View style={{flex:1 , alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size='small' text='加载中...'/>
          </View> */}
          
          <WingBlank size='md'>
            <TouchableHighlight>
              <Card style={styles.card}>
                <Card.Header
                  title={
                    <Text style={styles.listPrimaryColor}>TEMU1604002</Text>
                  }
                  extra={
                    <Text style={[styles.secondary, {textAlign: 'right', marginBottom: 0}]}>2012-01-01</Text>
                  }
                  style={{borderWidth: 0, paddingTop: 16}}
                />
                <Card.Body style={styles.cardBody}>
                  <View style={styles.fieldList}>
                    <Text style={styles.secondary}>到厂时间: 2012-01-01 22:22:22</Text>
                    <Text style={styles.secondary}>地　　址: 宁波北仑北极星路178号</Text>
                    <Text style={[styles.status, styles.statusOver]}>已完成</Text>
                  </View>
                  <Text style={styles.ctnType}>拆</Text>
                </Card.Body>
              </Card>
            </TouchableHighlight>
          </WingBlank>
          
          <WingBlank size='md'>
            <Card style={styles.card}>
              <Card.Header
                title={
                  <Text style={styles.listPrimaryColor}>TEMU1604002</Text>
                }
                extra={
                  <Text style={[styles.secondary, {textAlign: 'right', marginBottom: 0}]}>2012-01-01</Text>
                }
                style={{borderWidth: 0, paddingTop: 16}}
              />
              <Card.Body style={styles.cardBody}>
                <View style={styles.fieldList}>
                  <Text style={styles.secondary}>到厂时间: 2012-01-01 22:22:22</Text>
                  <Text style={styles.secondary}>地　　址: 宁波北仑北极星路178号</Text>
                  <Text style={[styles.status, styles.statusOver]}>已完成</Text>
                </View>
                <Text style={[styles.ctnType, styles.ctnTypeOther]}>装</Text>
              </Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size='md'>
            <Card style={styles.card}>
              <Card.Header
                title={
                  <Text style={styles.listPrimaryColor}>TEMU1604002</Text>
                }
                extra={
                  <Text style={[styles.secondary, {textAlign: 'right', marginBottom: 0}]}>2012-01-01</Text>
                }
                style={{borderWidth: 0, paddingTop: 16}}
              />
              <Card.Body style={styles.cardBody}>
                <View style={styles.fieldList}>
                  <Text style={styles.secondary}>到厂时间: 2012-01-01 22:22:22</Text>
                  <Text style={styles.secondary}>地　　址: 宁波北仑北极星路178号</Text>
                  <Text style={[styles.status, styles.statusOver]}>已完成</Text>
                </View>
                <Text style={[styles.ctnType, styles.ctnTypeOther]}>装</Text>
              </Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size='md'>
            <Card style={styles.card}>
              <Card.Header
                title={
                  <Text style={styles.listPrimaryColor}>TEMU1604002</Text>
                }
                extra={
                  <Text style={[styles.secondary, {textAlign: 'right', marginBottom: 0}]}>2012-01-01</Text>
                }
                style={{borderWidth: 0, paddingTop: 16}}
              />
              <Card.Body style={styles.cardBody}>
                <View style={styles.fieldList}>
                  <Text style={styles.secondary}>到厂时间: 2012-01-01 22:22:22</Text>
                  <Text style={styles.secondary}>地　　址: 宁波北仑北极星路178号</Text>
                  <Text style={[styles.status, styles.statusOver]}>已完成</Text>
                </View>
                <Text style={[styles.ctnType, styles.ctnTypeOther]}>装</Text>
              </Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size='md'>
            <Card style={styles.card}>
              <Card.Header
                title={
                  <Text style={styles.listPrimaryColor}>TEMU1604002</Text>
                }
                extra={
                  <Text style={[styles.secondary, {textAlign: 'right', marginBottom: 0}]}>2012-01-01</Text>
                }
                style={{borderWidth: 0, paddingTop: 16}}
              />
              <Card.Body style={styles.cardBody}>
                <View style={styles.fieldList}>
                  <Text style={styles.secondary}>到厂时间: 2012-01-01 22:22:22</Text>
                  <Text style={styles.secondary}>地　　址: 宁波北仑北极星路178号</Text>
                  <Text style={[styles.status, styles.statusOver]}>已完成</Text>
                </View>
                <Text style={[styles.ctnType, styles.ctnTypeOther]}>装</Text>
              </Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size='md'>
            <Card style={styles.card}>
              <Card.Header
                title={
                  <Text style={styles.listPrimaryColor}>TEMU1604002</Text>
                }
                extra={
                  <Text style={[styles.secondary, {textAlign: 'right', marginBottom: 0}]}>2012-01-01</Text>
                }
                style={{borderWidth: 0, paddingTop: 16}}
              />
              <Card.Body style={styles.cardBody}>
                <View style={styles.fieldList}>
                  <Text style={styles.secondary}>到厂时间: 2012-01-01 22:22:22</Text>
                  <Text style={styles.secondary}>地　　址: 宁波北仑北极星路178号</Text>
                  <Text style={[styles.status, styles.statusOver]}>已完成</Text>
                </View>
                <Text style={[styles.ctnType, styles.ctnTypeOther]}>装</Text>
              </Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size='md'>
            <Card style={styles.card}>
              <Card.Header
                title={
                  <Text style={styles.listPrimaryColor}>TEMU1604002</Text>
                }
                extra={
                  <Text style={[styles.secondary, {textAlign: 'right', marginBottom: 0}]}>2012-01-01</Text>
                }
                style={{borderWidth: 0, paddingTop: 16}}
              />
              <Card.Body style={styles.cardBody}>
                <View style={styles.fieldList}>
                  <Text style={styles.secondary}>到厂时间: 2012-01-01 22:22:22</Text>
                  <Text style={styles.secondary}>地　　址: 宁波北仑北极星路178号</Text>
                  <Text style={[styles.status, styles.statusOver]}>已完成</Text>
                </View>
                <Text style={[styles.ctnType, styles.ctnTypeOther]}>装</Text>
              </Card.Body>
            </Card>
          </WingBlank>
          <WingBlank size='md'>
            <Card style={styles.card}>
              <Card.Header
                title={
                  <Text style={styles.listPrimaryColor}>TEMU1604002</Text>
                }
                extra={
                  <Text style={[styles.secondary, {textAlign: 'right', marginBottom: 0}]}>2012-01-01</Text>
                }
                style={{borderWidth: 0, paddingTop: 16}}
              />
              <Card.Body style={styles.cardBody}>
                <View style={styles.fieldList}>
                  <Text style={styles.secondary}>到厂时间: 2012-01-01 22:22:22</Text>
                  <Text style={styles.secondary}>地　　址: 宁波北仑北极星路178号</Text>
                  <Text style={[styles.status, styles.statusOver]}>已完成</Text>
                </View>
                <Text style={[styles.ctnType, styles.ctnTypeOther]}>装</Text>
              </Card.Body>
            </Card>
          </WingBlank>
          
        </ScrollView>
      </Layout>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  card: {
    borderWidth:0,
    borderRadius: 3, 
    marginBottom: 10, 
    paddingBottom: 0
  },
  cardBody: {
    borderTopWidth: 0, 
    paddingTop: 4,
    paddingBottom: 12, 
    overflow: 'hidden'
  },
  fieldList: {
    paddingLeft: 16,
    paddingRight: 16
  },  
  ctnType: {
    width: 72,
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
  listPrimaryColor: {
    color: '#1d1d1d'
  },  
  secondary: {
    color: '#768893',
    fontSize: 12,
    marginBottom:4
  },
  status: {
    marginTop: 5,
    color: '#108ee9'
  },
  statusOver: {
    color: '#389e0d'
  }
})