import { loadChartData } from "@/backend/services/charts";
import TabbedStatCard from "@/components/TabbedStatCard";
import SkeletonLoader from "@/components/ui/loaders/SkeletonLoader";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

const CODE_TABS = [
    {
        title: 'active contributors',
        tabTitle: 'Active',
        key: 'active_contributors'
    },
    {
        title: 'total contributors',
        tabTitle: 'Total',
        key: 'unique_contributors'
    }
]

interface ICodeMetrics {
    active_contributors: number;
    unique_contributors: number;
    total_weights_assigned: number;
}

export default function ContributorStats() {
    const [isLoading, setIsLoading] = useState(true)
    const [codeMetricsData, setCodeMetricsData] = useState<ICodeMetrics>({} as ICodeMetrics)
    const [tabbedData, setTabbedData] = useState<[]>([])

    function formatCodeTabs(tabs: {}[]) {
        const updatedTabs = tabs.map((tab, idx) => {
            return {
                ...tab,
                id: +idx,
                value: codeMetricsData[tab.key] ?? null
            }
        })
        updatedTabs && setTabbedData(updatedTabs)
        console.log({ changedMetrics: updatedTabs });
    }

    useEffect(() => {
        if (codeMetricsData && Object.keys(codeMetricsData).length !== 0) {
            formatCodeTabs(CODE_TABS)
        }
    }, [codeMetricsData])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const codeMetrics: ICodeMetrics = await loadChartData('code_metrics');
                setCodeMetricsData(codeMetrics)
            } catch (error) {
                console.log('Error w/code contributors')
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    if (isLoading) return (
        <SkeletonLoader />
    )

    return (
        <View style={styles.container}>
            <View style={styles.infoTab}>
                {/* <Text>Number of Active Code Contributors</Text>
                <Text>231</Text> */}
                <TabbedStatCard prefix={'🧑🏽‍💻'} isLoading={isLoading} stats={tabbedData} />
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
        justifyContent: 'center'
    },
    infoTab: {
        flexDirection: 'column',
        width: '100%'
    }
})
