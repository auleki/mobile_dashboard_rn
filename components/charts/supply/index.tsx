import { StyleSheet, Text, View } from "react-native";
import ProtocolOwnedLiquidityChart from "./ProtocolOwnedLiquidityChart";
import MORHoldersChart from "./MORHoldersChart";
import StatCardTab from "@/components/StatCardTab";
import TabbedStatCard from "@/components/TabbedStatCard";
import { LIQUIDITY_STATS, STAT_CARD_DATA } from "@/utils/dataBank";
import LockedBurnedMORChart from "./LockedBurnedMORChart";
import DailyMOREmissions from "./DailyMOREmissions";
import { useEffect, useState } from "react";
import { loadChartData } from "@/backend/services/charts";

export default function SupplyCharts() {
    const [supplyCapData, setSupplyCapData] = useState<any[]>([])
    const [positionsData, setPositionsData] = useState<any[]>([])
    const [capIsLoading, setCapIsLoading] = useState<boolean>(true)
    const [liquidityIsLoading, setLiquidityIsLoading] = useState<boolean>(false)

    async function initializeSupplyCharts() {
        setCapIsLoading(true)
        const supplyCapStats = await loadChartData('get_market_cap');
        const positionStats = await loadChartData('protocol_liquidity')

        const formattedSupplyStats = Object.entries(supplyCapStats).map(([title, value]) => {
            const tabTitle = title.split('_').join(' ')
            return { title: tabTitle, tabTitle: tabTitle.split(' ')[0], value }
        })

        const formattedPositionData = LIQUIDITY_STATS.map(stat => ({
            ...stat,
            value: positionStats[stat.key]
        }))
        // console.log({ positionStats, formattedPositionData });
        setSupplyCapData(formattedSupplyStats)
        setPositionsData(formattedPositionData)
        setCapIsLoading(false)
    }

    useEffect(() => {
        initializeSupplyCharts();
    }, [])

    return (
        <View style={styles.container}>

            {/* SUPPLY CAP */}
            {/* <TabbedStatCard
                isLoading={capIsLoading}
                stats={supplyCapData}
            /> */}

            {/* <TabbedStatCard
                isLoading={capIsLoading}
                stats={positionsData}
            /> */}

            <MORHoldersChart />

            {/* LIQUIDITY VALUES */}
            <ProtocolOwnedLiquidityChart />

            {/* BURNED & LOCKED */}
            <LockedBurnedMORChart />

            {/* DAILY MOR EMISSIONS */}
            <DailyMOREmissions />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 20
    }
})
