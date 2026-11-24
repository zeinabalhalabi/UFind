import { router } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import AppScreen from "../../components/AppScreen";

export default function Home() {
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
                onPress={() => router.push("/report")}>
                <Text style={styles.lostcardTitle}>I Lost Something</Text>
                <Text style={styles.searchText}>Post details so others can return it</Text>
            </Pressable>
            <Pressable
                style={styles.card}
                onPress={() => router.push("/report")}>
                <Text style={styles.foundcardTitle}>I Found Something</Text>
                <Text style={styles.searchText}>Help return an item to its owner</Text>
            </Pressable>
            </View>
            <View style={styles.sectionHeader}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Recent Reports</Text>
                <Text style={styles.subtitle}>Live updates around campus</Text>
            </View>
            <Pressable onPress={() => router.push("/browse")}>
                    <Text style={styles.link}>See all -&gt; </Text>
                </Pressable>
            </View>

            <Pressable
                style={styles.report}
                onPress={() => router.push("/details")}>
                <Text style={styles.itemTitle}>Sony Headphones</Text>
                <Text style={styles.lost}>LOST</Text>
                <Text style={styles.grayText}>Main Library</Text>
            </Pressable>

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
        alignItems: "left",
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
    report: {
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#D1D5DF",
        marginBottom: 10
    },
    itemTitle: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#2C365E",
        marginBottom: 5
    },
    lost: {
        color: "#AF125A",
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 5
    },
    found: {
        color: "#1B7A43",
        fontWeight: "bold",
        fontSize: 12,
        marginBottom: 5
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