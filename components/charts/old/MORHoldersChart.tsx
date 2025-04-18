﻿import { Text, View, StyleSheet } from "react-native";
import { PieChart } from 'react-native-gifted-charts'
import { useEffect, useState } from "react";
import { generateUniqueColors } from "@/utils/utils"
import PieChartKeys from "@/components/charts/pie/PieChartKeys";
import { PieDataType } from "@/types/charts";
import { API_PIE_DATA } from "@/utils/dataBank";
import CenterLabel from "@/components/charts/pie/CenterLabel";
// import {GetData} from "@/services/dashboard.services";
// import {QueryClient} from "@tanstack/react-query";
// import {CurrentRenderContext} from "@react-navigation/core";

export default function MORHoldersChart() {
    const [pieData, setPieData] = useState<any>([])
    const [currentPieData, setCurrentPieData] = useState<any>([])
    const [excludedData, setExcludedData] = useState<number[]>([])
    const [pieDataTabs, setPieDataTabs] = useState<string[]>([])
    const [activePieDataTab, setActivePieDataTab] = useState('')
    const [pieChartKeysData, setPieChartKeysData] = useState<any>([])
    const [chartBackupData, setChartBackupData] = useState<any>([]);
    const [totalMORHolders, setTotalMORHolders] = useState(0)

    // useEffect(() => {
    // generatePieData();
    // const url = 'https://morpheus-ai-metrics-a9febnfedac6a6fx.centralus-01.azurewebsites.net/get_stake_info'
    // const data = useFetch(url)
    // console.log({gotData: data})
    // }, []);

    // setCurrentPieData(formattedChartData)
    // setPieChartKeysData(formattedChartData)
    // setChartBackupData(formattedChartData)

    const chartData = {
        pieData: [
            { id: 1, value: 3350, color: 'rgb(154,162,255)', keyValue: '0-50' },
            { id: 2, value: 205, color: '#f3455a', keyValue: '50-100' },
            { id: 3, value: 168, color: '#736bee', keyValue: '100-200' },
            { id: 4, value: 147, color: '#cc88c0', keyValue: '200-500' },
            { id: 5, value: 80, color: '#b1d273', keyValue: '500-1000' },
            { id: 6, value: 116, color: '#615f7a', keyValue: '1000-10000' },
        ],
        onPress: toggleDataInclusion
    }

    function formatDataForPieChart(data = {}) {
        let formattedChartData: any[] = []
        const uniqueColors = generateUniqueColors(Object.keys(data).length)
        const _dataEntry = Object.entries(data)
        let _totalMORHolders = 0;
        // console.log({_dataEntry})
        for (let i = 0; i < _dataEntry.length; i++) {
            if (_dataEntry[i][1] <= 0) continue

            formattedChartData = [
                {
                    value: _dataEntry[i][1],
                    keyValue: _dataEntry[i][0],
                    id: i + 1,
                    color: uniqueColors[i]
                },
                ...formattedChartData
            ]
            _totalMORHolders += Number(_dataEntry[i][1])
        }

        setTotalMORHolders(_totalMORHolders)
        setCurrentPieData(formattedChartData)
        setPieChartKeysData(formattedChartData)
        setChartBackupData(formattedChartData)
    }

    function changeActiveTab(key: string) {
        if (key === activePieDataTab) return // don't switch tabs if key matches active
        // console.log('Changing tab to ' + key)
        setActivePieDataTab(key)

        // change the pie chart data as well
        formatDataForPieChart(API_PIE_DATA[key])

        // clear excluded data when switching tabs
        setExcludedData([])
    }

    function createPieDataTabs(pieData: {}) {
        // get the keys of the data
        const keys = Object.keys(pieData)
        // console.log({keys})

        // set the pie data tabs &&
        // ensure a key has data above 0 else it should not be visible in the chart
        setPieDataTabs(keys)

        // pick an active tab
        setActivePieDataTab(keys[0])
        const [all] = keys
        formatDataForPieChart(API_PIE_DATA[all])
    }

    // function updateChartData() {
    //     // loop through current data & excluded data
    //     let chartdata = [...currentPieData]
    // }

    useEffect(() => {
        // const url = 'https://morpheus-ai-metrics-a9febnfedac6a6fx.centralus-01.azurewebsites.net/get_stake_info'
        createPieDataTabs(API_PIE_DATA)
    }, []);

    function toggleDataInclusion(
        id: number,
        _setExcludedData: Function,
        _setCurrentPieData: Function,
        _excludedData: number[],
        _currentPieData: {}[],
        _chartBackupData: {}[]
    ) {
        if (excludedData.includes(id)) {
            // data is hidden -> show the data
            const returnedData: PieDataType[] = chartBackupData.filter((cdata: PieDataType) => cdata.id === id)[0]
            setTotalMORHolders(total => total + returnedData.value)
            setExcludedData((data: any) => excludedData.filter(_id => _id != id))
            setCurrentPieData((pdata: PieDataType[]) => [...pdata, returnedData])
        } else {
            // data is shown -> hide the data
            if (currentPieData.length === 1) return
            let _removedData = {}
            const _filteredPieData = currentPieData.filter((piedata: PieDataType) => {
                if (piedata.id === id) _removedData = piedata
                return piedata.id != id
            })
            setTotalMORHolders(total => total - _removedData.value)
            setExcludedData(xData => [id, ...xData])
            setCurrentPieData(_filteredPieData)
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Number of MOR Holders by Range</Text>
            <View style={styles.dataTabs}>
                {pieDataTabs.map((dataTab: string, index) => (
                    <Text
                        key={index}
                        onPress={() => changeActiveTab(dataTab)}
                        style={dataTab === activePieDataTab ? styles.dataTabActive : styles.dataTab}>
                        {dataTab === 'total' ? 'All' : dataTab}
                    </Text>
                ))}
            </View>
            <PieChart
                data={currentPieData}
                radius={110}
                centerLabelComponent={() => (
                    <CenterLabel
                        labelText={'Total Holders'}
                        labelValue={totalMORHolders}
                    />
                )}
                donut
                isAnimated
                innerRadius={90}
                backgroundColor={'#333'}
                textSize={8}
                showTooltip
            />
            <PieChartKeys
                onPress={chartData.onPress}
                pieData={pieChartKeysData}
                excludedChartData={excludedData}
            />
            <Text
                style={styles.footerTitle}>
                Distribution of MOR holders by Amount of MOR Held
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
    dataTabs: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    centerLabel: {
        alignItems: 'center'
    },
    centerLabelText: {
        color: '#fff',
        fontSize: 21
    },
    centerLabelValue: {
        color: '#fff',
        fontSize: 35,
        fontWeight: '800'
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
    container: {
        height: 'auto',
        backgroundColor: '#333',
        borderRadius: 5,
        padding: 20,
        display: 'flex',
        gap: 25,
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
    }
})
