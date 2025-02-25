import { DASH_CHART_SECTIONS } from "@/constants/Links";
import { DASHBOARD_TABS } from "@/utils/dataBank";
import { StyleSheet, View } from "react-native";
import CapitalCharts from "../charts/capital";
import CodeCharts from "../charts/code";
import StakingCharts from "../charts/staking";
import SupplyCharts from "../charts/supply";

export default function DashboardContent({ activeTabId }: { activeTabId: number }) {

    function pickActiveTab(tabId: number) {
        const activeContent = DASHBOARD_TABS.filter(tab => tab.id === tabId)[0]
        const shiftSelectedTab = [activeContent, ...DASHBOARD_TABS.filter(tab => tab.id !== tabId)]

        switch (activeContent.pathname) {
            case DASH_CHART_SECTIONS.CAPITAL:
                return <CapitalCharts />
            case DASH_CHART_SECTIONS.CODE:
                return <CodeCharts />
            case DASH_CHART_SECTIONS.STAKING:
                return <StakingCharts />
            case DASH_CHART_SECTIONS.SUPPLY:
                return <SupplyCharts />
        }
    }

    return (
        <View style={styles.container}>
            {pickActiveTab(activeTabId)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    }
})
