import { loadChartData } from "@/backend/services/charts";
import StatCardTabHead from "@/components/StatCardTabHead";
import SimpleTab from "@/components/tabs/common/SimpleTab";
import useSimpleTab from "@/hooks/useSimpleTab";
import { TabDataType } from "@/types/charts";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import { VictoryChart, VictoryLine, VictoryTheme, } from 'victory-native'

const CHART_DATA = {
    "BURNED_MOR": {
        title: "Burned MOR Chart",
        data: [],
        moreInfo: "Total Burned MOR till now: 422226.88 MOR",
        id: 1
    },
    "LOCKED_MOR": {
        title: "Locked MOR Chart",
        data: [],
        moreInfo: "Total LOCKED MOR till now: 422226.88 MOR",
        id: 2
    }
}

const TABS_DATA = [
    {
        tabTitle: "Burned",
        id: 1,
        accessor: "burnt_mor",
        deepaccessor: "cumulative_mor_burnt",
        totalaccessor: "total_burnt_till_now"
    },
    {
        tabTitle: "Locked",
        id: 2,
        accessor: "locked_mor",
        deepaccessor: "cumulative_mor_locked",
        totalaccessor: "total_locked_till_now"
    }
]

export default function LockedBurnedMORChart() {
    const [chartData, setChartData] = useState([])
    const [currentChartData, setCurrentChartData] = useState<{}[]>([])
    const [currentChartInfo, setCurrentChartInfo] = useState<{}>({})
    const [activeChart, setActiveChart] = useState<null | number>(null)
    const [chartCurrentTab, setChartCurrentTab] = useState<TabDataType | null>(null)
    const { activeTab, switchActiveTab, tabs, updateTabs, currentTab } = useSimpleTab(TABS_DATA)

    function formatText(_activeTab: number | null, _value: number) {
        if (!_activeTab) return "No Active Tab"
        const _currentTab = tabs.filter(tab => tab.id === _activeTab)[0]
        return `Total ${_currentTab.tabTitle} MOR till now: ${_value} MOR`
    }

    useEffect(() => {
        const getChartData = async () => {
            try {
                const result = await loadChartData('locked_and_burnt_mor')

                const updatedTabs: TabDataType[] = tabs.map(tab => {
                    if (tab.tabTitle === "Burned")
                        return ({
                            ...tab,
                            value: result["burnt_mor"]["total_burnt_till_now"],
                        })

                    if (tab.tabTitle === "Locked")
                        return ({
                            ...tab,
                            value: result["locked_mor"]["total_locked_till_now"],
                        })
                })
                let _currentTab = tabs[0]
                const _updatedCurrentTab = updateTabs(updatedTabs, _currentTab.id)
                setChartCurrentTab(_updatedCurrentTab)

                switchActiveTab(_currentTab.id)
                setChartData(result)

                if (Object.keys(result).length) {
                    const _currentChartData = result?.[_currentTab?.accessor][_currentTab?.deepaccessor]

                    const _newChartData = Object.entries(_currentChartData).map(([key, value]) => {
                        return { x: key, y: value }
                    })

                    const _currentChartInfo = {
                        total: result?.[_currentTab?.accessor][_currentTab?.totalaccessor],
                        chartData: _newChartData
                    }

                    setCurrentChartInfo(_currentChartInfo)
                    const slicedData = _newChartData.splice(0, 5)
                    setCurrentChartData(slicedData)
                    return result
                }
            } catch (error) {
                console.log('Error while loading Locked & Burned Chart', { error })
            }
        }

        getChartData()
    }, [])

    const switchTab = (id: number) => {
        switchActiveTab(id)
        const _currentTab = tabs.filter(tab => tab.id === activeTab)[0]
        const dataToFormat = chartData?.[_currentTab?.accessor][_currentTab?.deepaccessor]

        const _currentChartData = Object.entries(dataToFormat).map(([key, value]) => {
            return { x: key, y: value }
        })

        const _currentChartInfo = {
            total: chartData?.[_currentTab?.accessor][_currentTab?.totalaccessor],
            chartData: _currentChartData
        }

        setCurrentChartInfo(_currentChartInfo)

        const splicedData = _currentChartData.splice(0, 5)
        setCurrentChartData(splicedData)
    }

    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: 600, marginBottom: 5 }}>Locked & Burned MOR</Text>
            {activeTab ? (
                <SimpleTab
                    activeTab={activeTab}
                    data={tabs}
                    switchActiveTab={switchTab}
                />
            ) : null}

            <VictoryChart theme={VictoryTheme.material}>
                <VictoryLine
                    data={currentChartData}
                    x="x"
                    y="y"
                    animate={{
                        duration: 2000,
                        onLoad: { duration: 1000 }
                    }}
                    style={{
                        data: { stroke: "#0D6733FF" },
                        parent: { border: "1px solid #1a1a1a" }
                    }}
                />
            </VictoryChart>

            <Text style={{ color: '#999' }}>
                {currentChartInfo.total !== undefined && formatText(activeTab, Number(currentChartInfo.total).toFixed(2))}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: 20,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#ddd",
        borderRadius: 13,
        justifyContent: 'center'
    },
})
