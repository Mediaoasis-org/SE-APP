import React, {StyleSheet, Platform, Dimensions, PixelRatio} from "react-native";
// import {Color, Constants} from '@common';

const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export const css =  StyleSheet.create({
    "spinner": {
        "width": width,
        "alignItems": "center"
    }
});