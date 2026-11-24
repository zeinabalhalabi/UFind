import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AppScreen from "../../components/AppScreen";
import ReportItem from "../../components/ReportItem";
import { colors } from "../../constants/colors";
import { getReports } from "../../constants/reportStorage";

export default function Home() {
    const [reports, setReports] = useState([]);
const [error, setError] = useState("");

useFocusEffect(
    useCallback(function () {
        loadReports();
    }, [])
);

async function loadReports() {
    setError("");

    try {
        const savedReports = await getReports();
        setReports(savedReports);
    } catch (error) {
        setError("Could not load reports.");
    }
}
const recentReports = reports.slice(0, 3);

function openReport(id) {
    router.push({
        pathname: "/details",
        params: { id: id }
    });
}
    return (
        <AppScreen>
            <View style={styles.header}>
                <Text style={styles.title}>Ufind</Text>
                <Text style={styles.subtitle}>Haigazian University</Text>
            </View>

            <Text style={styles.welcome}>Welcome, Zeinab!</Text>
            <Pressable
                style={styles.search}
                onPress={() => router.push("/browse")}>
                <Text style={styles.searchText}>Search campus items...</Text>
            </Pressable>

            <View style={styles.row}>
            <Pressable
                style={styles.card}
                onPress={() => router.push({
                    pathname: "/report",
                    params: { id: "", type: "Lost" }})}>
                <Text style={styles.lostcardTitle}>I Lost Something</Text>
                <Text style={styles.searchText}>Post details so others can return it</Text>
            </Pressable>
            <Pressable
                style={styles.card}
                onPress={() => router.push({
                    pathname: "/report",
                    params: { id: "", type: "Found" }})
                }>
                <Text style={styles.foundcardTitle}>I Found Something</Text>
                <Text style={styles.searchText}>Help return an item to its owner</Text>
            </Pressable>
            </View>
            <View style={styles.sectionHeader}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Recent Reports</Text>
                <Text style={styles.subtitle}>Latest lost and foud items</Text>
            </View>
            <Pressable onPress={() => router.push("/browse")}>
                    <Text style={styles.link}>See all -&gt; </Text>
                </Pressable>
            </View>
            {error !== "" && (
                <Text color={colors.mutedText}>{error}</Text>
            )}

            {error === "" && recentReports.length === 0 && (
                <Text color={colors.mutedText}>No reports yet.</Text>
            )}

            {recentReports.map(function (item) {
                return (
                    <ReportItem
                        key={item.id}
                        report={item}
                        onOpen={openReport}
                        isOwner={false}
                    />
                );
            })}

            <View style={styles.tip}>
                <Text style={styles.tipTitle}>Safe Campus Hand-off</Text>
                <Text style={styles.grayText}>
                    Meet at the Campus Information Desk or Student Services
                    Center during open hours.
                </Text>
            </View>
        </AppScreen>
    );
}
const styles = StyleSheet.create({
    header: {
        alignItems: "flex-start",
        marginBottom: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#2C365E"
    },
    subtitle: {
        fontSize: 13,
        color: "#777777",
        textAlign: "left",
    },
    link: {
        color: "#AF125A",
        fontWeight: "bold" 
    },
    welcome: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#2C365E",
        marginBottom: 20,
    },
    search: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D1D5DF",
        marginBottom: 20,
    },
    searchText: {
        color: "#777777",
        fontSize: 13,
    },
    row: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 25,
    },
    card: {
        flex: 1,
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D1D5DF"
    },
    lostcardTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#AF125A",
        marginBottom: 5,
    },
    foundcardTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1B7A43",
        marginBottom: 5,
    },
    sectionHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#2C365E",
    },
    tip: {
        backgroundColor: "#E8DDB5",
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20
    },
    tipTitle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#2C365E",
        marginBottom: 5
    }
})