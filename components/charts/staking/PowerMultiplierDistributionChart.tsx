import { loadChartData } from "@/backend/services/charts";
import usePieChartTabs from "@/hooks/usePieChartTabs";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import PieChartKeys from "../pie/PieChartKeys";
import CenterLabel from "../pie/CenterLabel";
import { PieChart } from "react-native-gifted-charts";

export default function PowerMultiplierDistributionChart() {
    const [apiData, setApiData] = useState([])

    useEffect(() => {
        const getChartData = async () => {
            const data = await loadChartData('get_stake_info')
            // console.log({ powerChart: data })
            setApiData(data)
        }
        getChartData()
    }, [])

    const {
        currentChartData,
        currentPieChartKeysData,
        placeholderValue,
        pieDataTabs,
        activePieDataTab,
        changeActiveTab
    } = usePieChartTabs({
        initialChartData: apiData,
        chartType: 'power-multiplier'
    })

    useEffect(() => {
        console.log({ currentChartData })
    }, [currentPieChartKeysData])

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 600 }}>Power Multiplier Chart</Text>
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
            {currentChartData.length !== 0 ? (
                // <PieChart
                //     donut
                //     innerRadius={95}
                //     centerLabelComponent={() => (
                //         <CenterLabel
                //             labelText={'Total Holders'}
                //             labelValue={currentChartData.length}
                //         />
                //     )}
                //     data={currentChartData}
                // />
                <PieChart data={currentChartData} radius={125} textSize={8} showTooltip />
            ) : (
                <View>
                    <Text>Loading Power Multiplier Chart...</Text>
                </View>
            )}
            <Text style={styles.chartDetails}>LEGEND</Text>
            {/* <PieChartKeys
                total={0}
                onPress={() => { }}
                excludedChartData={[]}
                pieData={currentPieChartKeysData}
            /> */}
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
    chartDetails: {
        color: "#9E9E9EFF"
    },
    dataTabActive: {
        color: 'green',
        borderStyle: 'solid',
        borderColor: 'green',
        borderBottomWidth: 1,
        textTransform: 'capitalize',
    },
    dataTab: {
        color: 'gray',
        borderStyle: 'solid',
        borderColor: 'gray',
        textTransform: 'capitalize',
        borderBottomWidth: 1
    },
    dataTabs: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
})
