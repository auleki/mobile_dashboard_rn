import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useEffect, useState } from "react";
import { generateDates, includeDateWithData } from "@/utils/utils";
import { Colors } from "@/constants/Colors";
import BurnedLockedAreaChart from '@/components/charts/area/BurnedLockedAreaChart'

const { width, height } = Dimensions.get('screen')

export default function BurnedLockedMOR() {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        // const _chartData = includeDateWithData(lockedData)
        // setChartData(_chartData)
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Burned / Locked MOR </Text>
            {/*{chartData.length ? (*/}
            {/*   <BurnedLockedAreaChart />*/}
            {/*) : (*/}
            {/*    <View>*/}
            {/*        <Text>Loading chart...</Text>*/}
            {/*    </View>*/}
            {/*) }*/}
            <BurnedLockedAreaChart />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: Colors.dark.text
    },
    footerTitle: {
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'gray'
    },
    container: {
        backgroundColor: Colors.dark.cardBackground,
        borderRadius: 5,
        color: '#fff',
        padding: 20,
        justifyContent: 'space-between',
        display: 'flex',
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    }
})
