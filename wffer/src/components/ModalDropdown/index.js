import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { gstyles } from '../../GlobalStyles';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';
export class ModalDropdownComponent extends React.Component{
    
    static propTypes = {
        defaultIndex: PropTypes.number,
         defaultValue: PropTypes.string,
    };

    static defaultProps = {
        defaultIndex: -1,
        defaultValue: 'Please select...',
     };

     constructor(props) {
        super(props);
        // alert(JSON.stringify(this.props.navigation));
        this.state = {
          selectedValue:'',
          buttonText: props.defaultValue,
          selectedIndex: props.defaultIndex
        };
      }
     componentWillReceiveProps(nextProps) {
        let {buttonText, selectedIndex} = this.state;
        const {defaultIndex, defaultValue, options} = nextProps;
        buttonText = this._nextValue == null ? buttonText : this._nextValue;
        selectedIndex = this._nextIndex == null ? selectedIndex : this._nextIndex;
        if (selectedIndex < 0) {
          selectedIndex = defaultIndex;
          if (selectedIndex < 0) {
            buttonText = defaultValue;
          }
        }
        this._nextValue = null;
        this._nextIndex = null;

        this.setState({
          loading: !options,
          buttonText,
          selectedIndex
        });
      }

      show() {
    this._updatePosition(() => {
      this.setState({
        showDropdown: true
      });
    });
  }

  hide() {
    this.setState({
      showDropdown: false
    });
  }

  select(idx) {
    const {defaultValue, options, defaultIndex, renderButtonText} = this.props;

    let value = defaultValue;
    if (idx == null || !options || idx >= options.length) {
      idx = defaultIndex;
    }

    if (idx >= 0) {
      value =  options[idx].toString();
    }

    this._nextValue = value;
    this._nextIndex = idx;

    this.setState({
      buttonText: value,
      selectedIndex: idx
    });
    // alert(this.state.buttonText)
  }
  onTagSelect(idx, data){ console.log("======== on tag selected ===========");  return (idx,data)};
  render(){
     const {buttonText} = this.state;
    // alert(this.props.options)  
      return(
        <View {...this.props}>
            <ModalDropdown 
                      style={gstyles.dropdownMainStyles}
                      animated={"fade"}
                      dropdownTextStyle={gstyles.dropdownTextStyle}
                      textStyle={gstyles.textStyle}
                      dropdownStyle={gstyles.dropdownStyles}
                      showsVerticalScrollIndicator={true}
                      defaultValue={buttonText}
                      options={this.props.options}
                      ref={(ref) => this.select = ref}
                      // onSelected={()=>{return (this.state.buttonText)}}
                      // onSelect={(index) => this.setState({selectedValue: index})} 
                      onSelect={(idx, data)=>{ return this.onTagSelect(idx, data)}} />
                      />
                     
        </View>
        )
      }
  }

   // <Text>{this.state.selectedValue}</Text>
                      // <Text>{this.state.buttonText}</Text>