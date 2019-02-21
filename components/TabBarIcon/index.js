import React from "react";
import Colors from "../../constants/Colors";
import CaiNiao from "../../components/Icon";

export default class TabBarIcon extends React.Component {
  render() {
    const { focused, name } = this.props;
    return (
      <CaiNiao
        name={name}
        size={20}
        color={ focused ? Colors.tabIconSelected : Colors.tabIconDefault }
      />
    );
  }
}
