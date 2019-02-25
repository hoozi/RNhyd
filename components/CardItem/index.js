import React, { Component, PureComponent } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Card } from '@ant-design/react-native';
import isString from 'lodash/isString';

export default class CardItem extends PureComponent {
  getValueByKey = key => {
    return this.props.data[key]
  }
  handleCardPress = () => {
    const { onCardPress, data } = this.props;
    onCardPress && onCardPress(data)
  }
  renderFieldItem = (data, fields) => fields.map(item => (
    item.render && !item.title ? 
    <View key={item.index}>{item.render(data)}</View>:
    <View style={styles.secondary} key={item.index}>
      <Text style={{...styles.secondaryText, color: 'rgba(0,0,0,0.45)'}}>{item.title}</Text> 
      <View style={{flex: 1,flexDirection: 'column'}}>{item.render&&item.title ? item.render(data) : <Text style={styles.secondaryText}>{data[item.index]}</Text>}</View>
    </View>
  ));
  render() {
    const { 
      fields, 
      data,
      renderTitle, 
      renderExtra, 
      renderCornerBadge,
      cardStyle,
      cardBodyStyle 
    } = this.props;
    return (
      <TouchableHighlight
        underlayColor='transparent'
        onPress={this.handleCardPress}
      >
        <Card style={[styles.card, cardStyle]}>
          <Card.Header
            title={
              isString(renderTitle) ? 
              <Text style={styles.listPrimaryColor}>{this.getValueByKey(renderTitle)}</Text> : 
              renderTitle(data)
            }
            extra={
              isString(renderExtra) ? 
              <Text style={[styles.secondaryText, {textAlign: 'right', marginBottom: 0}]}>{this.getValueByKey(renderExtra)}</Text> :  
              renderExtra(data)
            }
            style={{borderWidth: 0, paddingTop: 16}}
          />
          <Card.Body style={[styles.cardBody, cardBodyStyle]}>
            <View style={styles.fieldList}>
              {
                this.renderFieldItem(data, fields)
              }
            </View>
            {
              renderCornerBadge && renderCornerBadge(data)
            }
          </Card.Body>
        </Card>
      </TouchableHighlight>
    )
  }
}


const styles = StyleSheet.create({
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
  listPrimaryColor: {
    color: '#1d1d1d'
  },  
  secondary: {
    marginBottom:8,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  secondaryText: {
    color: 'rgba(0,0,0,0.55)',
    fontSize: 12,
    textAlign: 'right'
  }
})