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
        // defaultValue: 'Please select...',
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

        // let {buttonText, selectedIndex} = this.state;
        const {defaultIndex, defaultValue, options} = nextProps;
        // buttonText = this._nextValue == null ? buttonText : this._nextValue;
        // selectedIndex = this._nextIndex == null ? selectedIndex : this._nextIndex;
        // if (selectedIndex < 0) {
        //   selectedIndex = defaultIndex;
        //   if (selectedIndex < 0) {
        //     buttonText = defaultValue;
        //   }
        // }
        // this._nextValue = null;
        // this._nextIndex = null;

          // console.log(nextProps.givenValue)
          const optionsValue = this.props.options;
          if(this.props.givenValue){
              if(this.props.givenValue !=='' || this.props.givenValue != null){
                Object.keys(optionsValue).forEach((key,index) => {
                  // console.log(key)  
                  //           console.log(optionsValue[key]) 
                    if(optionsValue[key].includes(this.props.givenValue)){
                       // console.log("work")
                                       
                        this.setState({buttonText : this.props.options[index]});
                        this.setState({selectedIndex : key});
                        // this._nextValue = optionsValue[index];
                        // this._nextIndex = index
                        
                        // defaultValue = optionsValue[key];
                        // defaultIndex = key;
                    }
                    
                })  
              }
          }
          
          // console.log(this.state)
        // this.setState({
        //   loading: !options,
        //   buttonText,
        //   selectedIndex
        // });
      }

  //     show() {
  //   this._updatePosition(() => {
  //     this.setState({
  //       showDropdown: true
  //     });
  //   });
  // }

  // hide() {
  //   this.setState({
  //     showDropdown: false
  //   });
  // }

  // select(idx) {
  //   const {defaultValue, options, defaultIndex, renderButtonText} = this.props;

  //   let value = defaultValue;
  //   if (idx == null || !options || idx >= options.length) {
  //     idx = defaultIndex;
  //   }

  //   if (idx >= 0) {
  //     value =  options[idx].toString();
  //   }

  //   this._nextValue = value;
  //   this._nextIndex = idx;

  //   this.setState({
  //     buttonText: value,
  //     selectedIndex: idx
  //   });
  //   // alert(this.state.buttonText)
  // }
  onTagSelect(idx, data){ 
      // console.log("======== on tag selected ==========="); 
      // console.log(idx,data); 
      this.props.onChange(idx,data,this.props.defaultValue)
 };
  render(){
     const {buttonText} = this.state;
    // alert(this.props.options)  
      return(
        <View {...this.props}>
            <ModalDropdown 
                      style={gstyles.dropdownMainStyles}
                      
                      dropdownTextStyle={gstyles.dropdownTextStyle}
                      textStyle={gstyles.textStyle}
                      dropdownStyle={gstyles.dropdownStyles}
                      defaultIndex={this.props.defaultIndex}
                      showsVerticalScrollIndicator={true}
                      defaultValue={this.state.buttonText}
                      options={this.props.options}
                      ref={(ref) => this.select = ref}
                      // onSelected={()=>{return (this.state.buttonText)}}
                      // onSelect={(index) => this.setState({selectedValue: index})} 
                      onSelect={(idx, data)=>{ this.onTagSelect(idx, data)}} 
                      select={(idx)=>{this.select(idx)}}
                      />
                      
                     
        </View>
        )
      }
  }

 // // <Text>{this.state.selectedValue}</Text>
                      // <Text>{this.state.buttonText}</Text>