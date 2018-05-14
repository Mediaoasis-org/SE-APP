'use strict';
import {Dimensions, Platform} from "react-native";
const {width, height} = Dimensions.get("window");

export default {
  Debug: true,

  AppName: "Wffer",
  Signup:"Sign Up",
  Login:"Sign In",
  forgetPassword:"Forget Password",
  // for right to left language
  RTL: false,

  fontFamily:  Platform.OS == 'android'? 'Roboto' : 'Helvetica',
  fontHeader: Platform.OS == 'android'? 'Roboto' : 'Avenir-Roman',
  fontHeaderAndroid: 'Roboto',

  // firebaseEnable: false,

  // PagingLimit: 12,

  logo: true,

  // Exclude the parent category that not show on the app, empty is mean nothing
  excludeCategories: [1],

  ProductImage: {
    small: 'thumbnail',
    medium: 'medium',
    medium_large: 'medium_large',
    large: 'large',
  },

  Animate: {
    bounce: 'bounce',
    flash: "flash",
    jello: "jello",
    pulse: "pulse",
    rotate: "rotate",
    rubberBand: "rubberBand",
    shake: "shake",
    swing: "swing",
    tada: "tada",
    wobble: "wobble",
    flipInY: "flipInY",
    flipInX: "flipInX",
    zoomIn: "zoomIn",
    fadeIn: "fadeIn",
    bounceIn: "bounceIn"
  },

  Layout: {
    card: 1,
    column: 2,
    list: 3,
    banner: 4,
    twoColumn: 5,
    advance: 6,
    mansory: 7,
    horizontal: 8,
    threeColumn: 9,
    listRight: 10,
    flexColumn: 11,
  },
  Category:{
    all:"All Categories",
    foodAndBackery:"All Foods and Bakery",
    beverages:"Beverages",
    cannedAndJared:"Canned and Jarred Foods",
    cleaner:"Cleaner",
    dairy:"Dairy",
    dryBaking:"Dry Baking Goods",
    forzenGoods:"Frozen Goods",
    grocerry:"Grocerry",
    paperDispoable:"Paper Disposable",
    personalCare:"Personal Care",
  },
  // Tags: {
  //   top: 'Top',
  //   headlight: 'Headlight',
  //   photo: 'Photos',
  //   video: 'Videos',
  // },

  Menu: {
    Scale: 0,
    Flat: 1,
    FullSize: 2,
    MenuRightBlack: 3
  },

  Window: {
    width: width,
    height: height,
    headerHeight: 45 * height / 100,
    profileHeight: 45 * height / 100
  },

  Key: {
    email: "_Email",
    user: "_User",
    posts: "_Post"
  },

  fontText: {
    size: 12,
    fontSizeMin: 12,
    fontSizeMax: 20
  },

  LeftMenu: {
    scale: 0,
    overlay: 1,
    small: 2,
    wide: 3
  },

  // switching between the category one page layout UI and list list view category UI
  CategoryListView: true,
}
