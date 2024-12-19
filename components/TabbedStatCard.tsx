import {Pressable, StyleSheet, Text, View} from "react-native";
import {Colors} from "@/constants/Colors";
import StatCardTab from "@/components/StatCardTab";
import StatCardTabHead from "@/components/StatCardTabHead";
import {useEffect, useState} from "react";

const STAT_CARD_DATA = [
    {
        title: 'Total Supply Market Cap',
        value: 57829800.9329,
        tabTitle: 'Total Supply'
    },
    {
        title: 'Circulating Supply Market Cap',
        value: 20889180.4184,
        tabTitle: 'Circulating Supply'
    }
]

// {
//     "total_supply_market_cap": 57829800.9329,
//     "circulating_supply_market_cap": 20889180.4184
// }

export default function TabbedStatCard() {
    const [activeTab, setActiveTab] = useState({})
    
    function switchTab(tab: {}) {
        setActiveTab(tab)
    }

    useEffect(() => {
        setActiveTab(STAT_CARD_DATA[1])
    }, []);
    
    return (
        <View style={styles.container}>
            <View style={styles.tabHeads}>
                {/*<Text style={{fontSize: 14, color: '#525252'}}>Total Supply Market Cap</Text>*/}
                {/*<Text style={{fontSize: 21, color: '#fff'}}>Circulating Supply Market Cap</Text>*/}
                {STAT_CARD_DATA.map((tab, index) =>
                    <Pressable key={index} onPress={() => switchTab(tab)} style={{paddingVertical: 5}}>
                        <StatCardTabHead isActive={tab.title === activeTab?.title} title={tab.title} value={tab.value} tabTitle={tab.tabTitle} />
                    </Pressable>
                )}
            </View>
            <View style={styles.tabContent}>
                {/*{STAT_CARD_DATA.map((tab, index) => (*/}
                {/*    <StatCardTab title={tab.title} value={tab.value.toLocaleString()} suffix={'MOR'} key={index} />*/}
                {/*))}*/}
                {activeTab && <StatCardTab title={activeTab?.title} value={activeTab?.value?.toLocaleString()} suffix={'MOR'} />}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.dark.cardBackground,
        padding: 10,
        borderRadius: 5
    },
    tabHeads: {
        flexDirection: 'row',
        justifyContent: "center",
        gap: 10,
        marginBottom: 20
    },
    tabContent: {
        flexDirection: 'column',
        justifyContent: "center",
        gap: 10,
    }
})