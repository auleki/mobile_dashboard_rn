import { StyleSheet, View, Text } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import CenterLabel from "../pie/CenterLabel";
import usePieChartTabs from "@/hooks/usePieChartTabs";
import { useEffect, useState } from "react";
import { API_PIE_DATA, STAT_CARD_DATA } from "@/utils/dataBank";
import PieChartKeys from "../pie/PieChartKeys";
import { DataTabType, PieDataType } from "@/types/charts";
import useTabbedStats from "@/hooks/useTabbedStats";
import { loadChartData } from "@/backend/services/charts";
import SkeletonLoader from "@/components/ui/loaders/SkeletonLoader";

export default function MORHoldersChart() {
    const [apiData, setApiData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getChartData = async () => {
            const data = await loadChartData('mor_holders_by_range')
            setApiData(data)
            setIsLoading(false)
        }
        getChartData()
    }, [])

    const {
        pieDataTabs,
        activePieDataTab,
        changeActiveTab,
        formattedData: chartData,
        currentChartData,
        placeholderValue,
        fixedTotal,
        toggleDataInclusion,
        excludedChartData,
        pieChartKeysData
    } = usePieChartTabs({
        initialChartData: apiData,
        chartType: 'mor-holders'
    })

    // const { statTabs } = useTabbedStats(STAT_CARD_DATA)

    if (isLoading) return (
        <SkeletonLoader height={50} />
    )

    return (
        <View style={styles.container}>
            <Text style={styles.chartTitle}>Number of MOR Holders By Range</Text>
            {/* <Text style={styles.chartDetails}>
                Visualisation of PoL Values in USD for MOR Arbitrum Pool, Base Pool and both pools combined.
                Total Value: $4,018,950.53
            </Text> */}
            <View style={styles.dataTabs}>
                {pieDataTabs.map((dataTab: { id: number, title: string }, index) => (
                    <Text
                        key={index}
                        onPress={() => changeActiveTab(dataTab)}
                        style={dataTab.id === activePieDataTab.id ? styles.dataTabActive : styles.dataTab}>
                        {dataTab.title === 'total' ? 'All' : dataTab.title}
                    </Text>
                ))}

            </View>
            <PieChart
                donut
                innerRadius={95}
                centerLabelComponent={() => (
                    <CenterLabel
                        labelText={'Total Holders'}
                        labelValue={placeholderValue}
                    />
                )}
                data={currentChartData}
            />
            {/* LEGEND CONTAINER */}
            <View style={styles.legendContainer}>
                <Text style={styles.chartDetails}>LEGEND</Text>
                <PieChartKeys
                    total={fixedTotal}
                    onPress={toggleDataInclusion}
                    pieData={pieChartKeysData}
                    excludedChartData={excludedChartData}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#ddd",
        borderRadius: 13,
        justifyContent: 'center'
    },
    dataTab: {
        color: 'gray',
        borderStyle: 'solid',
        borderColor: 'gray',
        borderBottomWidth: 1
    },
    dataTabs: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    dataTabActive: {
        color: 'green',
        borderStyle: 'solid',
        borderColor: 'green',
        borderBottomWidth: 1
    },
    chartTitle: {
        fontSize: 21,
        fontWeight: 'semibold',
        color: '#1a1a1a',
    },
    chartDetails: {
        color: "#9E9E9EFF"
    },
    legendContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
    }
})
