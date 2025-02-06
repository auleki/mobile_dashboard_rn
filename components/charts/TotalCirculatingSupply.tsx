import {Text, View, StyleSheet, Dimensions} from "react-native";
// import {Grid, StackedAreaChart, XAxis, YAxis} from "react-native-svg-charts";
// import * as shape from 'd3-shape'
// import {LineChart} from "react-native-gifted-charts";
// import {AreaChart} from "recharts";
import {useEffect, useState} from "react";
import {TOTAL_SUPPLY_CHART_DATA, TOTAL_SUPPLY_CHART_TABS} from "@/utils/dataBank";
import {StackedBarChart} from "react-native-chart-kit";

const {width} = Dimensions.get('screen')

export default function TotalCirculatingSupply() {
    const [chartTabs, setChartTabs] = useState([])
    const [activeTab, setActiveTab] = useState({})
    const [circulatingSupplyData, setCirculatingSupplyData] = useState([])
    const [totalSupplyData, setTotalSupplyData] = useState([])
    const [xAxisLabels, setXAxisLabels] = useState([])
    const [visibleCharts, setVisibleCharts] = useState()

    // function formatSupplyChartData(data: {}[]) {
    //     // the keys are the dates 
    //     // values for circulating supply are extracted as data 0
    //     // values for total supply are extracted as data 1
    //     // user can toggle between
    //     let _chartData = {}
    //
    //     const _data = data.map((item: any) => {
    //         return _chartData = {
    //             ..._chartData,
    //             totalSupply: Number(item["total_supply"]),
    //             circulatingSupply: item["circulating_supply"],
    //             date: item["date"]
    //         }
    //     })
    //     // console.log({data: _data.map(item => item.date)})
    //     setCirculatingSupplyData(_data.map(item => ({date: item.date, value: item.circulatingSupply})).splice(0, 50))
    //     setTotalSupplyData(_data.map(item => ({date: item.date, value: item.totalSupply})).splice(0, 50))
    // }

    // useEffect(() => {
    //     formatSupplyChartData(TOTAL_SUPPLY_CHART_DATA['data'])
    // }, []);

    // useEffect(() => {
    //     console.log({circulatingSupplyData, totalSupplyData})
    // }, [circulatingSupplyData, totalSupplyData]);

    // const customLabel = val => {
    //     return (
    //         <View style={{width: 70, marginLeft: 7}}>
    //             <Text style={{color: 'white', fontWeight: 'bold'}}>{val}</Text>
    //         </View>
    //     );
    // };

    // const IndicatorColorScheme = {
    //     totalSupply: {
    //         borderColor: '',
    //         backgroundColor: ''
    //     },
    //     circulatingSupply: {
    //         borderColor: '',
    //         backgroundColor: ''
    //     }
    // }

    // const ptData = [
    //     {value: 160, date: '1 Apr 2022'},
    //     {value: 180, date: '2 Apr 2022'},
    //     {value: 190, date: '3 Apr 2022'},
    //     {value: 180, date: '4 Apr 2022'},
    //     {value: 140, date: '5 Apr 2022'},
    //     {value: 145, date: '6 Apr 2022'},
    //     {value: 160, date: '7 Apr 2022'},
    //     {value: 200, date: '8 Apr 2022'},
    //
    //     {value: 220, date: '9 Apr 2022'},
    //     {
    //         value: 240,
    //         date: '10 Apr 2022',
    //         label: '10 Apr',
    //         labelTextStyle: {color: 'lightgray', width: 60},
    //     },
    //     {value: 280, date: '11 Apr 2022'},
    //     {value: 260, date: '12 Apr 2022'},
    //     {value: 340, date: '13 Apr 2022'},
    //     {value: 385, date: '14 Apr 2022'},
    //     {value: 280, date: '15 Apr 2022'},
    //     {value: 390, date: '16 Apr 2022'},
    //
    //     {value: 370, date: '17 Apr 2022'},
    //     {value: 285, date: '18 Apr 2022'},
    //     {value: 295, date: '19 Apr 2022'},
    //     {
    //         value: 300,
    //         date: '20 Apr 2022',
    //         label: '20 Apr',
    //         labelTextStyle: {color: 'lightgray', width: 60},
    //     },
    //     {value: 280, date: '21 Apr 2022'},
    //     {value: 295, date: '22 Apr 2022'},
    //     {value: 260, date: '23 Apr 2022'},
    //     {value: 255, date: '24 Apr 2022'},
    //
    //     {value: 190, date: '25 Apr 2022'},
    //     {value: 220, date: '26 Apr 2022'},
    //     {value: 205, date: '27 Apr 2022'},
    //     {value: 230, date: '28 Apr 2022'},
    //     {value: 210, date: '29 Apr 2022'},
    //     {
    //         value: 200,
    //         date: '30 Apr 2022',
    //         label: '30 Apr',
    //         labelTextStyle: {color: 'lightgray', width: 60},
    //     },
    //     {value: 240, date: '1 May 2022'},
    //     {value: 250, date: '2 May 2022'},
    //     {value: 280, date: '3 May 2022'},
    //     {value: 250, date: '4 May 2022'},
    //     {value: 210, date: '5 May 2022'},
    // ];
    //
    // const ptDataTwo = ptData.map(item => {
    //     const random = Math.floor(Math.random() * (45000 - 25000) + 25000)
    //     return {
    //         ...item,
    //         value: random
    //     }
    // })


    // const customDataPoint = () => {
    //     return (
    //         <View
    //             style={{
    //                 width: 20,
    //                 height: 20,
    //                 backgroundColor: 'white',
    //                 borderWidth: 4,
    //                 borderRadius: 10,
    //                 borderColor: '#07BAD1',
    //             }}
    //         />
    //     );
    // };

    const data = {
        labels: ["Total Circulating", "Circulating Supply", "Non-Circulating Market Cap"],
        legend: ["2022", "2023", "2024"],
        data: [
            [57829800.9329],
            [20889180.4184],
            [(57829800.9329 - 20889180.4184)]
        ],
        barColors: ["rebeccapurple", "green",]
    };

    const chartConfig = {
        backgroundGradientFrom: "rgba(0, 0, 0, 0.2)",
        backgroundGradientFromOpacity: 0.2,
        backgroundGradientTo: "rgba(0, 0, 0, 0.5)",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 20, // optional, default 3
        barPercentage: 3,
        useShadowColorFromDataset: false,
        padding: 35,
        propsForVerticalLabels: {
            fontSize: 16
        },
        propsForHorizontalLabels: {
            fontSize: 10,
            padding: 20
        },
        yLabelsOffset: 30,
        yAxisInterval: 1
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Supply Chart (Last 5 Days)</Text>

            {/*CHART DATA SECTIONS */}
            <View style={styles.chartTabs}>
                {TOTAL_SUPPLY_CHART_TABS.map((tab: {}, index) => (
                    <View style={styles.chartTab} key={index}>
                        <View style={[styles.keyIndicator, {backgroundColor: tab?.bgColor}]}/>
                        <Text style={styles.tabTitle}>{tab?.title}</Text>
                    </View>
                ))}
            </View>
            
            <StackedBarChart
                style={styles.chartContainer}
                data={data}
                width={(width - 50)}
                height={300}
                chartConfig={chartConfig}
                hideLegend
                formatYLabel={(value) => `${(value/1000000).toFixed(2)}M`}
            />
            <Text style={styles.footerTitle}>
                Distribution of Total and Circulating Supply over the last 5 days
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        textAlign: 'center',
        color: '#fff'
    },
    footerTitle: {
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        color: 'gray'
    },
    chartContainer: {
        padding: 10, 
        borderRadius: 5,
    },
    container: {
        height: 'auto',
        backgroundColor: '#333',
        borderRadius: 5,
        padding: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        shadowColor: '#000',
        overflow: 'auto',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
    },
    lineChart: {
        borderWidth: 10
    },
    chartTabs: {
        flexDirection: 'column',
        gap: 10,
        paddingVertical: 10,
    },
    tabTitle: {
        color: '#fff'
    },
    chartTab: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    keyIndicator: {
        height: 15,
        width: 15 * 3,
        borderRadius: 5
    }
})