import { ThemedText } from "@/components/ThemedText";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import CenterLabel from "../pie/CenterLabel";
import { useEffect, useState } from "react";
import { ProgressChart } from "react-native-chart-kit";
import { generateUniqueColors } from "@/utils/utils";
import axios from 'axios'
import { loadChartData } from "@/backend/services/charts";

const { width: screenWidth } = Dimensions.get('window')

export default function ProtocolOwnedLiquidityChart() {
    const [currentPieData, setCurrentPieData] = useState<any>([])
    const [legendData, setLegendData] = useState<any>([])
    const [isLoading, setIsLoading] = useState(false)

    // const data = [
    //     {
    //         color: 'crimson',
    //         value: 400,
    //         keyValue: 200,
    //         id: 49
    //     },
    //     {
    //         color: 'green',
    //         value: 250,
    //         keyValue: 100,
    //         id: 45
    //     }
    // ]

    // const pieData = [
    //     { value: 70, color: '#177AD5' },
    //     // { value: 30, color: 'lightgray' }
    // ];
    // const pieData2 = [
    //     { value: 130, color: '#73CD45FF' },
    //     // { value: 30, color: 'lightgray' }
    // ];

    const data = {
        labels: ["Total PoL", "ARB PoL", "BASE PoL"], // optional
        data: [1, 0.6, 0.8]
    };

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: "#fff",
        backgroundGradientToOpacity: 1,
        color: (opacity = 1) => `rgba(25, 100, 0, ${opacity})`,
        color2: 'crimson',
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    useEffect(() => {
        loadChartData('protocol_liquidity')
    }, [])

    useEffect(() => {
        generateLengendData(data.labels)
    }, [])

    function generateLengendData(data: []) {
        const colors = generateUniqueColors(data.length)
        const dataWithColors = data.map((item, index) => ({ title: item, color: colors[index] }))
        // console.log({ dataWithColors });

        setLegendData(dataWithColors)
        return dataWithColors
    }

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Protocol Owned Liquidity</Text>
            <View style={{ gap: 10 }}>
                <Text style={styles.chartDetails}>
                    Visualisation of PoL Values in USD for MOR Arbitrum Pool, Base Pool and both pools combined.
                </Text>
                <Text style={styles.chartDetails}>Total Value: $4,018,950.53</Text>

            </View>
            <ProgressChart
                data={data}
                width={screenWidth}
                height={220}
                strokeWidth={16}
                radius={32}
                // style={{ marginRight: 22, paddingRight: 10 }}
                chartConfig={chartConfig}
                hideLegend={true}
            />

            {/* LEGEND */}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20,
        overflow: 'hidden',
        paddingVertical: 20,
        fontFamily: 'Arial',
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#ddd",
        borderRadius: 13,
        justifyContent: 'center'
    },
    chartTitle: {
        fontSize: 21,
        fontWeight: 'semibold',
        color: '#1a1a1a'
    },
    chartDetails: {
        color: "#9E9E9EFF",
        textAlign: 'center'
    }
})
