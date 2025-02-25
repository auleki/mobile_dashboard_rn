import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { DashTab } from "../tabs/dashboard/DashTab";
import { DASHBOARD_TABS } from "@/utils/dataBank";
import { useState } from "react";

const { width } = Dimensions.get('window')

type Props = {
    onTabClick: (id: number) => void;
    activeTabId: number;
    tabs: any[]
}

export default function DashboardTabs({ onTabClick, activeTabId, tabs }: Props) {

    function handleTabClick(tabId: number) {
        onTabClick(tabId)
    }

    return (
        <View>
            <View style={styles.tabs}>
                {/* TABS */}
                {tabs.map(tab => (
                    <DashTab
                        onClick={handleTabClick}
                        key={tab.id}
                        id={tab.id}
                        pathname={tab.pathname}
                        isActive={activeTabId === tab.id}
                        title={tab.title}
                    />
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        gap: 10,
        paddingVertical: 10,
        overflowX: 'scroll'
    },
    tab: {
        backgroundColor: '#1a1a1a',
        padding: 10,
        borderRadius: 12,
        width: width / 4,
        color: '#fff',
        fontFamily: 'Helvetica'
    }
})
