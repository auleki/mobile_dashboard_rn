﻿import {Text, StyleSheet, View} from "react-native";
import {BarChart} from "react-native-gifted-charts";

export default function PriceVolumeBarChart() {
    const data = [
        {value: 2500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Jan'},
        {value: 2400, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

        {value: 3500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Feb'},
        {value: 3000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

        {value: 4500, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Mar'},
        {value: 4000, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

        {value: 5200, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'Apr'},
        {value: 4900, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},

        {value: 3000, frontColor: '#006DFF', gradientColor: '#009FFF', spacing: 6, label:'May'},
        {value: 2800, frontColor: '#3BE9DE', gradientColor: '#93FCF8'},
    ];

    return (
        <View>
            {/*<BarChart*/}
            {/*    data={data}*/}
            {/*    barWidth={16}*/}
            {/*    initialSpacing={10}*/}
            {/*    spacing={14}*/}
            {/*    barBorderRadius={4}*/}
            {/*    showGradient*/}
            {/*    yAxisThickness={0}*/}
            {/*    xAxisType={'dashed'}*/}
            {/*    xAxisColor={'lightgray'}*/}
            {/*    yAxisTextStyle={{color: 'lightgray'}}*/}
            {/*    stepValue={1000}*/}
            {/*    maxValue={6000}*/}
            {/*    noOfSections={6}*/}
            {/*    yAxisLabelTexts={['0', '1k', '2k', '3k', '4k', '5k', '6k']}*/}
            {/*    labelWidth={40}*/}
            {/*    xAxisLabelTextStyle={{color: 'lightgray', textAlign: 'center'}}*/}
            {/*    showLine*/}
            {/*    lineConfig={{*/}
            {/*        color: '#F29C6E',*/}
            {/*        thickness: 3,*/}
            {/*        curved: true,*/}
            {/*        hideDataPoints: true,*/}
            {/*        shiftY: 20,*/}
            {/*        initialSpacing: -30,*/}
            {/*    }}*/}
            {/*/>*/}
        </View>
    )
}

const styles = StyleSheet.create({

})