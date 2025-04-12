import SkeletonLoader from "@/components/ui/loaders/SkeletonLoader";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
// import { PieChart } from 'react-native-svg-charts';
import { PieChart } from "react-native-gifted-charts";
import { Circle, G, Line, Text as SVGText } from 'react-native-svg';
import { loadChartData } from "@/backend/services/charts";
import usePieChartTabs from "@/hooks/usePieChartTabs";
import PieChartKeys from "../pie/PieChartKeys";
import CenterLabel from "../pie/CenterLabel";
import { generateUniqueColors } from "@/utils/utils";

// const data = [
//     { key: 'emissions', value: 100, svg: { fill: '#32CD32' }, label: 'Emissions' }, // LimeGreen
//     { key: 'claimed', value: 50.34, svg: { fill: '#800080' }, label: 'Claimed' },   // Purple
//     { key: 'unclaimed', value: 49.66, svg: { fill: '#1E90FF' }, label: 'Unclaimed' },  // DodgerBlue
//     { key: 'staked', value: 87.22, svg: { fill: '#FFA500' }, label: 'Staked (Unclaimed)' }, // Orange
//     { key: 'unstaked', value: 12.78, svg: { fill: '#0000CD' }, label: 'Unstaked (Unclaimed)' }, // MediumBlue
// ];

export default function CodeRewardsDistributionChart() {
    const [isLoading, setIsLoading] = useState(true)
    const [apiData, setApiData] = useState([])

    // useEffect(() => {
    //     const getChartData = async () => {
    //         const data = await loadChartData('mor_holders_by_range')
    //         setApiData(data)
    //         setIsLoading(false)
    //     }
    //     getChartData()
    // }, [])


    useEffect(() => {
        (async function getData() {
            try {
                const result = await loadChartData('capital_metrics')
                setApiData(result)
                // console.log({ result })
            } catch (error) {
                console.log('Error getting code data')
            } finally {
                setIsLoading(false)
            }
            // setApiData(transformData)
        })()
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
        chartType: 'code-rewards'
    })


    if (isLoading) return (
        <SkeletonLoader />
    )

    // useEffect(() => console.log({currentChartData}), [])

    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', gap: 5 }}>
                <Text style={styles.chartTitle}>MOR Code Rewards Distribution</Text>
                <Text style={styles.chartDetails}>Distribution of Total MOR Emissions</Text>
            </View>

            {/* <View style={styles.dataTabs}>
                {pieDataTabs.map((dataTab: { id: number, title: string }, index) => (
                    <Text
                        key={index}
                        onPress={() => changeActiveTab(dataTab)}
                        style={dataTab.id === activePieDataTab.id ? styles.dataTabActive : styles.dataTab}>
                        {dataTab.title === 'total' ? 'All' : dataTab.title}
                    </Text>
                ))}

            </View> */}
            {
                Object.keys(currentChartData).length > 0 ? (
                    <PieChart
                donut
                innerRadius={95}
                centerLabelComponent={() => (
                    <CenterLabel
                        labelText={'Total Rewards'}
                        labelValue={placeholderValue}
                    />
                )}
                data={currentChartData}
            />
                ) : (
                    <View>
                        <Text>No Pie Data</Text>
                    </View>
                )
            }
            {/* LEGEND CONTAINER */}
            <View style={styles.legendContainer}>
                <Text style={styles.chartDetails}>LEGEND</Text>
                {(pieChartKeysData && Object?.keys(pieChartKeysData)?.length )> 0 ? (
                    <PieChartKeys
                    total={fixedTotal}
                    onPress={toggleDataInclusion}
                    pieData={pieChartKeysData}
                    excludedChartData={excludedChartData}
                />
                ) : (
                    <View>
                        <Text>No keys data</Text>
                    </View>
                )}
            </View>
        </View >
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
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        color: 'gray',
        marginBottom: 10,
    },
    legendContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 10
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    legendColor: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginRight: 5,
    },
    legendText: {
        fontSize: 12,
    },
    chartDetails: {
        color: "#9E9E9EFF"
    },
    dataTabs: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    dataTab: {
        color: 'gray',
        borderStyle: 'solid',
        borderColor: 'gray',
        borderBottomWidth: 1
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
})
