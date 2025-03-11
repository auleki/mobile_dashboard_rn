import Animated, { useAnimatedRef } from "react-native-reanimated";
import { useBottomTabOverflow } from "../ui/TabBarBackground";
import { StyleSheet, Text, View } from "react-native";
import SupplyCharts from "./supply";
import DashboardTabs from "../navigation/DashboardTabs";
import DashboardContent from "../navigation/DashboardContent";
import StakingCharts from "./staking";
import CapitalCharts from "./capital";
import CodeCharts from "./code";
import { useEffect, useState } from "react";
import { DASHBOARD_TABS } from "@/utils/dataBank";
import { DASH_CHART_SECTIONS } from "@/constants/Links";
import Footer from "../ui/Footer";


export default function ChartList() {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
    const bottom = useBottomTabOverflow();
    const [activeTab, setActiveTab] = useState<number>(4)
    const [dashTabs, setDashTabs] = useState<any[]>([])

    useEffect(() => {
        setDashTabs(DASHBOARD_TABS)
    }, [])

    function updateActiveTabPosition() {
        const currentTab = DASHBOARD_TABS.filter(tab => tab.id === activeTab)[0]
        const shiftSelectedTab = [currentTab, ...DASHBOARD_TABS.filter(tab => tab.id !== activeTab)]
        setDashTabs(shiftSelectedTab)
    }

    useEffect(() => updateActiveTabPosition(), [activeTab])

    // Move selected tab to the first position
    const switchTab = (id: number) => setActiveTab(id)

    return (
        <Animated.ScrollView
            ref={scrollRef}
            style={styles.container}
            scrollEventThrottle={16}
            scrollIndicatorInsets={{ bottom }}
            contentContainerStyle={{ paddingBottom: bottom }}
        >
            <View style={styles.chartContainer}>
                <DashboardTabs
                    tabs={dashTabs}
                    activeTabId={activeTab}
                    onTabClick={switchTab}
                />
                <DashboardContent
                    activeTabId={activeTab}
                />
            </View>
            <Footer />
        </Animated.ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        gap: 25,
    },
    chartContainer: {
        gap: 50
    }
})
