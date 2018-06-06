import React, {Component} from "react";
import {View, ActivityIndicator} from "react-native";
import css from "./style";
// import Color from "@common/Color";

export default class SpinnerComponent extends Component {
  render() {
    return (
      <View style={[css.spinner]}>
        <ActivityIndicator color="#ff0000" size="large"/>
      </View>
    )
  }
}
