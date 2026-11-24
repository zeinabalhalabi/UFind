
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import AppScreen from "../components/AppScreen";
import ReportItem from "../components/ReportItem";

import { colors } from "../constants/colors";
import { getReports, saveReports } from "../constants/reportStorage";

const currentUserId = "user1";

export default function MyReports() {
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

    const myReports = reports.filter(function (item) {
        return item.userId === currentUserId;
    });

    function goBack() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/profile");
        }
    }

    function openReport(id) {
        router.push({
            pathname: "/details",
            params: { id: id }
        });
    }

    function editReport(id) {
        router.push({
            pathname: "/report",
            params: { id: id }
        });
    }

    function deleteReport(id) {
        Alert.alert(
            "Delete Report",
            "Are you sure you want to delete this report?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: function () {
                        confirmDelete(id);
                    }
                }
            ]
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

    return (
        <AppScreen>
            <View style={styles.header}>
                <Pressable
                    onPress={goBack}
                    style={styles.backButton}
                    accessibilityLabel="Go back"
                    accessibilityRole="button"
                >
                    <Ionicons
                        name="arrow-back"
                        size={24}
                        color={colors.primary}
                    />
                </Pressable>

                <Text style={styles.heading}>My Reports</Text>
            </View>

            <Text style={styles.subtitle}>
                Total reports: {myReports.length}
            </Text>

            {error !== "" && (
                <Text style={styles.emptyText}>{error}</Text>
            )}

            {error === "" && myReports.length === 0 && (
                <Text style={styles.emptyText}>
                    You haven't posted any reports yet.
                </Text>
            )}

            {myReports.map(function (item) {
                return (
                    <ReportItem
                        key={item.id}
                        report={item}
                        onOpen={openReport}
                        onEdit={editReport}
                        onDelete={deleteReport}
                        isOwner={true}
                    />
                );
            })}
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 20
    },

    backButton: {
        width: 44,
        height: 44,
        backgroundColor: "white",
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center"
    },

    heading: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.primary
    },

    subtitle: {
        color: colors.textMuted,
        fontSize: 14,
        marginBottom: 16
    },

    emptyText: {
        color: colors.textMuted,
        textAlign: "center",
        marginTop: 20
    }
});
