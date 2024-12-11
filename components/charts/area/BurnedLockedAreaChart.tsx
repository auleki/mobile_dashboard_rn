import {View, StyleSheet, Text, Dimensions, Pressable} from "react-native";
import {LineChart} from 'react-native-chart-kit'
import * as shape from 'd3-shape'
import {BURNED_LOCKED_MOR_CHART_DATA, BURNED_LOCKED_TABS} from "@/utils/dataBank";
import {useEffect, useState} from "react";
import {Colors} from "@/constants/Colors";
import {BurnedLockedTabsType} from "@/types/charts";
const screenWidth = Dimensions.get("window").width;

type Props = {
    chartData?: []
}


export default function BurnedLockedAreaChart({chartData}: Props) {
    const [chartTabs, setChartTabs] = useState<string[]>()
    const [activeTab, setActiveTab] = useState<BurnedLockedTabsType>({} as BurnedLockedTabsType)
    const [areaChartData, setAreaChartData] = useState<any>([])
    const [areaChartLabels, setAreaChartLabels] = useState([])
    const [totalMORData, setTotalMORData] = useState<number>(0)
    const [chartYAxisMax, setChartYAxisMax] = useState('')

    function formatAreaChartData() {
        const tabs = Object.keys(BURNED_LOCKED_MOR_CHART_DATA)
        const existingTabs = BURNED_LOCKED_TABS.map((tab: BurnedLockedTabsType, index) => ({
            ...tab,
            accessor: tabs[index]
        }))
        const tabIndex = 0
        if (activeTab.id) {

        }
        const defaultTab = BURNED_LOCKED_MOR_CHART_DATA[tabs[tabIndex]]
        const [cumulativeAccessor, totalAccessor] = Object.keys(defaultTab)
        const _chartData = defaultTab[cumulativeAccessor]
        const totalBurntMOR = defaultTab[totalAccessor]
        // console.log({_chartData, tabs, defaultTab, totalBurntMOR, existingTabs})
        const _dataKeys = Object.keys(_chartData),
            _dataValues = Object.values(_chartData)
        // console.log({_dataValues, _dataKeys, totalBurntMOR})
        _dataKeys.splice(15) // change method of splicing 
        _dataValues.splice(15) // > maybe arrange the data based on value
        setAreaChartData(_dataValues)
        setTotalMORData(totalBurntMOR.toFixed(2))
        setAreaChartLabels(_dataKeys)
        return {tabs: existingTabs}
    }

    function isTabActive(tab: BurnedLockedTabsType) {
        return activeTab.id === tab.id
    }

    function updateChartData(data: {}) {
        const [cumulativeAccessor, totalAccessor] = Object.keys(data)
        const labels = Object.keys(data[cumulativeAccessor]).splice(15)
        const newData = Object.values(data[cumulativeAccessor]).splice(15)
        // console.log({data, newData, labels})
        return {
            cumulativeAccessor,
            totalAccessor,
            labels,
            newData
        }
    }

    useEffect(() => {
        setupAreaChart()
    }, []);

    useEffect(() => {
        // console.log({areaChartData})
    }, [areaChartData]);

    function setupAreaChart(tab?: BurnedLockedTabsType) {
        if (activeTab.id) {
            // only update the data within chart, leave tabs as is
            // console.log('Chart already setup', {tab})

        } else { // first time load, setup area chart
            const {tabs} = formatAreaChartData()
            // console.log('Chart Not already setup', tabs)
            setChartTabs(tabs)
            setActiveTab(tabs[0])
        }

    }

    function switchMainTab(tab: BurnedLockedTabsType) {
        setActiveTab(tab)
        // change the data for the chart
        // setupAreaChart(tab)
        const DATA = BURNED_LOCKED_MOR_CHART_DATA[tab.accessor]
        const {cumulativeAccessor, totalAccessor, newData, labels} = updateChartData(DATA)
        const totalData = DATA[totalAccessor]
        // console.log({ BURNED_LOCKED_MOR_CHART_DATA, tab, newData: DATA[cumulativeAccessor], cumulativeAccessor, totalAccessor, labels})
        // console.log({ BURNED_LOCKED_MOR_CHART_DATA, tab, newData: DATA[cumulativeAccessor], cumulativeAccessor, totalAccessor, labels, totalData})
        setAreaChartData(newData)
        setAreaChartLabels(labels)
        setTotalMORData(totalData)
    }

    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(0, 255, 10, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ],
        legend: ["Burned MOR"] // optional
    };

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0.4,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.8,
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View style={styles.container}>
            <View>
                {chartTabs?.length ? (
                    <View style={styles.chartTabs}>
                        {chartTabs.map((tab: BurnedLockedTabsType) => (
                            <Pressable key={tab.id} onPress={() => switchMainTab(tab)}>
                                <View
                                    style={[styles.chartTab, {backgroundColor: isTabActive(tab) ? Colors.dark.green : Colors.dark.background}]}
                                    key={tab.id}
                                >
                                    <Text
                                        style={[styles.chartTabText, {color: isTabActive(tab) ? Colors.light.text : Colors.dark.text}]}>{tab.title}</Text>
                                </View>
                            </Pressable>
                        ))}
                    </View>
                ) : (
                    <View>
                        <Text>No Taabs</Text>
                    </View>

                )}
            </View>
           
            <LineChart
                data={data}
                width={Dimensions.get('screen').width - 50} // from react-native
                height={350}
                // yAxisLabel="$"
                yAxisSuffix="M"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={chartConfig}
                bezier
                style={{
                    marginVertical: 10,
                    borderRadius: 5,

                }}
            />
            <Text style={styles.footerTitle}>Total {activeTab.title === 'Burned' ? 'Burned' : 'Locked'} MOR till now: {totalMORData} MOR</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // height: 400, // substract some pixels from screen height
        flexDirection: 'column',
        width: '100%',
        fontFamily: 'Arial',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingHorizontal: 20,
        padding: 45
    },
    chartTabs: {
        borderWidth: 2,
        padding: 10,
        borderColor: Colors.dark.green,
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    activeTab: {
        backgroundColor: 'green',
    },
    chartTab: {
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        borderRadius: 3,
    },
    chartTabText: {
        fontSize: 16,
        fontWeight: '600'
    },
    footerTitle: {
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'gray'
    },
})