import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import AppScreen from "../../components/AppScreen";
import ReportFilters from "../../components/ReportFilters";
import ReportItem from "../../components/ReportItem";

import { categories } from "../../constants/categories";
import { colors } from "../../constants/colors";
import { getReports, saveReports } from "../../constants/reportStorage";

const currentUserId = "user1";

export default function Browse() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [category, setCategory] = useState("All");
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    
    useFocusEffect(
    useCallback(function () {
        loadReports();
    }, [])
);

async function loadReports() {
    setLoading(true);
    setError("");

    try {
        const savedReports = await getReports();
        setReports(savedReports);
    } catch (error) {
        console.log("Error loading reports:", error);
        setError("Could not load reports.")
    } finally {
        setLoading(false);
    }
}
    function openReport(id) {
        router.push({
            pathname: "/details",
            params: { id: id }
        });
    }
    function postReport() {
        router.push({
            pathname: "/report",
            params: { id: "" }
        });
    }
    function ownsReport(id) {
        const report = reports.find(function (item) {
            return String(item.id) === String(id);
        });

        if (report && report.userId === currentUserId) {
            return true;
        }

        return false;
    }
    function editReport(id) {
        if (!ownsReport(id)) {
            return;
        }
        router.push({
            pathname: "/report",
            params: { id: id }
        });
    }
    function deleteReport(id) {
        if (!ownsReport(id)) {
            return;
        }

        Alert.alert(
            "Delete Report",
            "Are you sure you want to delete this report?",
        [{
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: function () {
                    confirmDelete(id);
                }
            }]
    );
}

async function confirmDelete(id) {
    try {
        const savedReports = await getReports();

        const updatedReports = savedReports.filter(function (item) {
            if (
                String(item.id) === String(id) &&
                item.userId === currentUserId
            ) {
                return false;
            }
            return true;
        });

        await saveReports(updatedReports);
        await loadReports();

    } catch (error) {
        Alert.alert("Error", "Could not delete the report.");
    }
}
    const filteredReports = reports.filter(function (item) {
    const searchText = search.trim().toLowerCase();

    const matchesType =
        filter === "All" || item.type === filter;

    const matchesCategory =
        category === "All" || item.category === category;

    const matchesSearch =
        item.name.toLowerCase().includes(searchText) ||
        item.location.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText);

    return matchesType && matchesCategory && matchesSearch;
});
    return (
        <AppScreen>
            <View style={styles.header}>
                <Text style={styles.title}>Browse Reports</Text>

                <Pressable onPress={() => router.push("/report")}>
                    <Text style={styles.link}>+ Post</Text>
                </Pressable>
            </View>

            <TextInput
                style={styles.search}
                placeholder="Search items or locations..."
                placeholderTextColor={colors.textMuted}
                value={search}
                onChangeText={setSearch}
            />
            <ReportFilters
                options={["All", "Lost", "Found"]}
                selected={filter}
                onChange={setFilter}
            />
            <Text style={styles.label}>Categories</Text>
            <View style={styles.filterContainer}>
            <ReportFilters
                options={["All", ...categories]}
                selected={category}
                onChange={setCategory}
            />
            </View>

            <Text style={styles.section}>Recent Reports</Text>
            {loading && (
                <Text style={styles.emptyText}>
                    Loading reports...
                </Text>
            )}
            {error !== "" && (
                <Text style={styles.emptyText}>{error}</Text>
            )}
            {!loading && error === "" && filteredReports.length === 0 && (
                <Text style={styles.emptyText}>
                    No reports found.
                </Text>
            )}

            {filteredReports.map(function (item) {
                return (
                    <ReportItem
                        key={item.id}
                        report={item}
                        onOpen={openReport}
                        onEdit={editReport}
                        onDelete={deleteReport}
                        isOwner={item.userId === currentUserId}
                    />
                );
            })}
        </AppScreen>
    );
}
const styles = StyleSheet.create({

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20
    },

    title: {
        fontSize: 22,
        fontWeight: "600",
        color: colors.primary
    },

    link: {
        color: colors.primary,
        fontWeight: "600",
        fontSize: 15
    },

    search: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#D1D5DF",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15
    },
    filterContainer: {
        flexGrow: 0
    },
    label: {
        color: colors.primary,
        fontSize: 14,
        fontWeight: "600",
        marginBottom: 8
    },
    section: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.primary,
        marginTop: 8,
        marginBottom: 12
    },
    emptyText: {
        color: colors.textMuted,
        textAlign: "center",
        marginTop: 20
    }
});
        
    