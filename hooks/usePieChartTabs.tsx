import { PieDataType } from "@/types/charts"
import { PieChartKeysType } from "@/types/components";
import { generateUniqueColors } from "@/utils/utils"
import { useEffect, useState } from "react"

type Props = {
    initialChartData: {};
    chartType: 'mor-holders' | 'power-multiplier'
}

export default function usePieChartTabs({ chartType, initialChartData }: Props) {
    const [pieDataTabs, setPieDataTabs] = useState<{ id: number; title: string }[]>([])
    const [chartData, setChartData] = useState<{}>(initialChartData)
    const [currentChartData, setCurrentChartData] = useState<any[]>([])
    const [formattedData, setFormattedData] = useState<PieDataType[]>([])
    const [activePieDataTab, setActivePieDataTab] = useState({})
    const [placeholderValue, setPlaceholderValue] = useState(0)
    const [fixedTotal, setFixedTotal] = useState<number>(0)
    const [pieChartKeysData, setPieChartKeysData] = useState<{ tabTitle: string, slug: string }[]>([])
    const [currentPieChartKeysData, setCurrentPieChartKeysData] = useState<{}[]>([])
    const [excludedChartData, setExcludedChartData] = useState([])

    useEffect(() => {
        // console.log({ initialChartData })
        setChartData(initialChartData)
        createPieDataTabs(initialChartData)
    }, [initialChartData])

    useEffect(() => {
        if (!activePieDataTab || Object.keys(activePieDataTab).length === 0) {
            return; // Return early if activePieDataTab is empty or null/undefined
        }
        createPieChartKeys(initialChartData)
    }, [activePieDataTab, initialChartData])

    // useEffect(() => createPieChartKeys(), [activePieDataTab, chartData])

    function createPieChartKeys(_chartData: {}) {
        const _keys = Object.keys(_chartData)
        // console.log('Initiate Chart Keys', { _chartData, KEYS: _keys.length, chartType });


        if (_keys.length !== 0) {
            if (chartType === 'mor-holders' || chartType === 'power-multiplier') {
                // console.log('Creating Tabs', { initialChartData, activePieDataTab, len: Object.keys(activePieDataTab).length });
                formatDataForPieChart(_chartData[activePieDataTab?.title])
            }
        }
    }

    function createPieDataTabs(_chartData: {}) {
        // console.log('Init Create Pie TABS', { activePieDataTab });

        // if (Object.keys(activePieDataTab).length === 0) return

        if (chartType === 'mor-holders') {
            const keys = Object.keys(_chartData) // giving like ALL, Ethereum, Arbitrum and co..
            //!TODO format tabs to be capitalized
            const _tabs = keys.map((key, index) => ({ title: key, id: ++index }))
            setPieDataTabs(_tabs)
            // console.log({ _tabsNOW: _tabs });

            setActivePieDataTab(_tabs[0])
        }

        if (chartType === 'power-multiplier') {
            const _dataEntries = Object.entries(_chartData)
            const _tabKeys = _dataEntries.map((data, idx) => ({ tabTitle: formatTabTitle(data[0]), title: data[0], id: ++idx }))
            // console.log('Tabs Power Multi', { _chartData, _dataEntries, _tabKeys });
            setPieDataTabs(_tabKeys)
            setActivePieDataTab(_tabKeys[0])
            // console.log({ _dataEntries, _tabKeys, })
        }
    }

    function toggleDataInclusion(
        id: number,
    ) {
        if (excludedChartData.includes(id)) {
            // data is hidden -> show the data
            const returnedData: PieDataType = formattedData.filter((cdata: PieDataType) => cdata.id === id)[0]
            setPlaceholderValue(total => Number(total) + Number(returnedData.value))
            setExcludedChartData((data: any) => excludedChartData.filter(_id => _id != id))
            setCurrentChartData((pdata: PieDataType[]) => [...pdata, returnedData])
        } else {
            // data is shown -> hide the data
            if (currentChartData && currentChartData.length === 1) return
            let _removedData = {}

            const _filteredPieData = currentChartData.filter((piedata: PieDataType) => {
                if (piedata.id === id) _removedData = piedata
                return piedata.id != id
            })

            setPlaceholderValue(total => Number(total) - Number(_removedData.value))
            setExcludedChartData(xData => [id, ...xData])
            setCurrentChartData(_filteredPieData)
        }
    }

    function changeActiveTab(tab: {}) {
        setActivePieDataTab(tab)
        setExcludedChartData([])
    }

    function formatTabTitle(title: string) {
        return title.split('_').join(' ')
    }

    function formatDataForPieChart(data: { [key: string]: any } = {}) {
        let formattedChartData: any[] = []

        const _dataEntry = Object.entries(data)
        let _placeholderValue = 0;
        const _tabKeys = _dataEntry.map((data, idx) => ({ tabTitle: formatTabTitle(data[0]), title: data[0], id: ++idx }))

        setCurrentPieChartKeysData(_tabKeys)

        if (chartType === 'mor-holders') {
            const uniqueColors = generateUniqueColors(Object.keys(data).length)
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
                _placeholderValue += Number(_dataEntry[i][1])
            }
        }

        if (chartType === 'power-multiplier') {
            // console.log({ initial: data['power_multiplier'] });
            const _data = data['power_multiplier']
            const rangeData = _data['ranges']
            // console.log({ freq: _data });
            const _chartData = rangeData.map((range, index) => ({
                range: range[1] === null ? `${range[0].toFixed(2)}+` : `${range[0].toFixed(2)}-${range[1].toFixed(2)}`,
                value: _data['frequencies'][index]
            }))
            const total = _chartData.reduce((sum, item) => sum + item.value, 0)
            const finalData = _chartData.map(item => {
                return {
                    ...item,
                    percentage: `${((item.value / total) * 100).toFixed(2)}%`
                }
            })

            const uniqueColors = generateUniqueColors(finalData.length)
            // console.log({ finalData, uniqueColors, len: finalData.length });

            for (let i = 0; i < finalData.length; i++) {
                // console.log({ [i]: finalData[i] })

                formattedChartData = [
                    {
                        value: finalData[i].percentage,
                        keyValue: finalData[i].range,
                        id: i + 1,
                        color: uniqueColors[i]
                    },
                    ...formattedChartData
                ]
            }
            // console.log({ outsideFor: formattedChartData });
        }

        setPieChartKeysData(formattedChartData.reverse())
        setFormattedData(formattedChartData)
        setCurrentChartData(formattedChartData)
        setPlaceholderValue(_placeholderValue)
        setFixedTotal(_placeholderValue)
    }

    return {
        pieDataTabs,
        toggleDataInclusion,
        currentChartData,
        formattedData,
        activePieDataTab,
        placeholderValue,
        fixedTotal,
        changeActiveTab,
        pieChartKeysData,
        currentPieChartKeysData,
        excludedChartData
    }
}
