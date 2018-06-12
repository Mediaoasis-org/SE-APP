import PropTypes from 'prop-types';
import React, {Component} from "react";
import {View, TextInput, Text, } from "react-native";
import { gstyles } from '../../GlobalStyles';

// import Color from "@common/Color";

export class TextInputComponent extends Component {
	static propTypes = {
	    attributes: PropTypes.object,
	    theme: PropTypes.object,
	    updateValue: PropTypes.func,
	    onSummitTextInput: PropTypes.func,
	    ErrorComponent: PropTypes.func,
	}
	getInitState(fields) {
	  const state = {};
	  _.forEach(fields, (field) => {
	    const fieldObj = field;
	    fieldObj.error = false;
	    fieldObj.errorMsg = '';
	    if (!field.hidden && field.type) {
	      fieldObj.value = getDefaultValue(field);
	      state[field.name] = fieldObj;
	    }
	  });
	  return state;
	}
	// onChange(text,name){
 //     	var state = name;
 //     	var val = text;
 //     	// console.log(state);
 //     	// console.log(val);   
 //     	var obj1  = {}
 //     	obj1[state] = val;
 //     	// console.log(obj1)
 //     	this.setState(obj1);
     	
 //     }
     onSummitTextInput(name) {
	    const index = Object.keys(this.state).indexOf(name);
	    if (index !== -1 && this[Object.keys(this.state)[index + 1]]
	    && this[Object.keys(this.state)[index + 1]].textInput) {
	      this[Object.keys(this.state)[index + 1]].textInput._root.focus();
	    } else {
	      Keyboard.dismiss();
	    }
	  }
	  	//get keyboard type
	   getKeyboardType(textType) {
	   	// alert(textType);
		  switch (textType) {
		    case 'email':
		      return 'email-address';
		    case 'number':
		      return 'numeric';
		    default:
		      return 'default';
		  }
		}
		handleChange(text) {
    		this.props.updateValue(this.props.attributes.name, text);
  		}
  render() {
    return (
      <View>
			<TextInput name={this.props.name} 
			   style={gstyles.textInputStyle} 
			   ref={(input) => {this.props.name = input; }}	    
			   onSummitTextInput={()=>this.props.onSummitTextInput(this.props.attributes.name)}
			   placeholder={this.props.placeholder} 
			   underlineColorAndroid="#fff" 
			   
			   editable={true}
			   keyboardType={this.getKeyboardType(this.props.keyboardType)}
			   secureTextEntry={this.props.secureTextEntry === 'Password'}
			/>
      </View>
    )
  }
}
