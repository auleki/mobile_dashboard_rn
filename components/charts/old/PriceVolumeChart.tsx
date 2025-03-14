﻿// import {StyleSheet, Text, View} from "react-native";
// import {BarChart, Combine} from "react-native-gifted-charts";
// import {StackedAreaChart} from "react-native-svg-charts";
//
// export default function PriceVolumeChart() {
//     const barData = [
//         {value: 10, label: 'M'},
//         {value: 500, label: 'T', frontColor: '#177AD5'},
//         {value: 900, label: 'W', frontColor: '#177AD5'},
//         {value: 320, label: 'T'},
//         {value: 600, label: 'F', frontColor: '#177AD5'},
//         {value: 256, label: 'S'},
//         {value: 300, label: 'S'},
//     ];
//     return (
//         <View style={styles.chartContainer}>
//             <Text style={styles.title}>Price and Volume Chart</Text>
//             {/*<StackedAreaChart data={barData} />*/}
//             <BarChart
//                 rulesConfigArray={[]}
//                 barWidth={20}
//                 noOfSections={3}
//                 barBorderRadius={4}
//                 frontColor="black"
//                 data={barData}
//                 yAxisThickness={2}
//                 xAxisThickness={0}
//             />
//             <Text style={styles.footerTitle}>Note: The right Y-axis represents Volume</Text>
//         </View>
//     )
// }
//
// const styles = StyleSheet.create({
//     title: {
//         fontSize: 25,
//         textAlign: 'center',
//         color: '#333',
//         // paddingBottom: 20
//     },
//     footerTitle: {
//         fontSize: 16,
//         textAlign: 'center',
//         fontStyle: 'italic',
//         color: 'gray'
//     },
//     chartContainer: {
//         backgroundColor: '#ddd',
//         marginRight: 10,
//         display: 'flex',
//         gap: 20,
//         paddingTop: 20,
//         paddingLeft: 10,
//         paddingBottom: 20,
//         marginLeft: 10,
//         borderRadius: 10,
//         width: '90%'
//     }
// })

import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions, Dimensions} from 'react-native';
import {BarChart, LineChart} from 'react-native-gifted-charts';
import PriceVolumeBarChart from "@/components/charts/bar/PriceVolumeBarChart";
import {ColorSpace} from "react-native-reanimated";
import {Colors} from "@/constants/Colors";

const {width} = Dimensions.get('window')

export default function PriceVolume() {
    // Data for the bar chart
    const barData = [
        {value: 250, label: 'Jan', frontColor: '#4ABFF4'},
        {value: 300, label: 'Feb', frontColor: '#4ABFF4'},
        {value: 200, label: 'Mar', frontColor: '#4ABFF4'},
        {value: 350, label: 'Apr', frontColor: '#4ABFF4'},
        {value: 400, label: 'May', frontColor: '#4ABFF4'},
        {value: 280, label: 'Jun', frontColor: '#4ABFF4'},
    ];

    // Data for the line chart
    const lineData = [
        {value: 250},
        {value: 300},
        {value: 350},
        {value: 400},
        {value: 280},
        {value: 400},
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Price and Volume Chart</Text>

            {/* Legend */}
            <View style={styles.legend}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColor, {backgroundColor: '#4ABFF4'}]}/>
                    <Text style={styles.legendText}>Volume</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendColor, {backgroundColor: '#FF7F50'}]}/>
                    <Text style={styles.legendText}>Price</Text>
                </View>
            </View>

            <View style={styles.chartContainer}>
                <PriceVolumeBarChart/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 30,
        paddingLeft: 20,
        paddingRight: 50,
        backgroundColor: Colors.dark.cardBackground,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20, // remove this
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: Colors.dark.text
    },
    chartContainer: {
        position: 'relative',
    },
    lineChartContainer: {
        position: 'absolute',
        marginLeft: -22,
        zIndex: 1,
    },
    legend: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    legendColor: {
        width: 12,
        height: 12,
        borderRadius: 6,
        marginRight: 5,
    },
    legendText: {
        color: 'gray',
        fontSize: 12,
    },
});