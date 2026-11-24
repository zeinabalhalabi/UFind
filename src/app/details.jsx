import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";

import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";

import { colors } from "../constants/colors";
import { getReports, saveReports } from "../constants/reportStorage";
//code reused from (task) details

// used to determine whether the user owns the report
const currentUserId = "user1";

export default function ReportDetails() {
    const params = useLocalSearchParams();
    const id = params.id;

    const[report, setReport] = useState(null);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useFocusEffect(
        useCallback(function () {
        loadReport();
    }, [id])
    );

    const isOwner = report && report.userId === currentUserId;

    async function loadReport() {
    setLoading(true);
    setReport(null);
    setError("");

    try {
        const reports = await getReports();
        const foundReport = reports.find(function (item){
            return String(item.id) === String(id);
        });
        if (foundReport) {
            setReport(foundReport);
        }
    } catch (error) {
        console.log("Error loading report:", error);
        setError("Could not load the report.")
    } finally {
        setLoading(false);
    }
}

    function goBack() {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace("/browse");
        }
    }

    function editReport() {
        if (!isOwner) {
        return;
        }
        router.push({
            pathname: "/report",
            params: {
                id: report.id
            }
        });
    }
    function deleteReport() {
        if (!isOwner) {
            return;
        }
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
                onPress: confirmDelete
            }
        ]
    );
}

async function confirmDelete() {
    if (!isOwner) {
        return;
    }
    try {
        const reports = await getReports();

            const updatedReports = reports.filter(function (item) {
                if (
                String(item.id) !== String(report.id) && 
                item.userId === currentUserId
                ) {
                    return false;
                }
                return true;
            });
            await saveReports(updatedReports);
            router.replace("/browse");
        
    } catch (error) {
        Alert.alert("Error", "Could not delete the report.");
    }
}
    function getBadgeStyle() {
        if (report.type === "Lost") {
            return styles.lostBadge;
        }
        return styles.foundBadge;
    }
    function getBadgeTextStyle() {
        if (report.type === "Lost") {
            return styles.lostText;
        }
        return styles.foundText;
    }
    if (loading) {
        return (
            <AppScreen>
                <Text style={styles.message}>Loading report...</Text>
            </AppScreen>
        );
    }
    if (!report) {
        return (
            <AppScreen>
                <View style={styles.errorContainer}>
                    <Text style={styles.message}>
                        {error || "Report not found."}
                    </Text>
                    <AppButton text="Back to Reports" onPress={goBack} />
                </View>
            </AppScreen>
        );
    }
    return (
        <AppScreen>
            <View style={styles.header}>
                <Pressable onPress={goBack} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.primary}/>
                </Pressable>
                <Text style={styles.headerTitle}>Report Details</Text>
            </View>

            <View style={styles.imageContainer}>
                {report.image ? (
                    <Image
                        source={{ uri: report.image }}
                        style={styles.image}
                    />
                ) : (
                    <Text style={styles.imagePlaceholder}>
                        No Photo Available
                    </Text>
                )}
                <View style={getBadgeStyle()}>
                    <Text style={getBadgeTextStyle()}>{report.type}</Text>
                </View>
            </View>
            <View style={styles.card}>
                <Text style={styles.name}>{report.name}</Text>
                <Text style={styles.category}>{report.category}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Location</Text>
                <Text style={styles.text}>{report.location}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.text}>
                    {report.description || "No description provided."}
                </Text>
            </View>
            <View style={styles.buttons}>
                {isOwner && (
                    <AppButton text="Edit Report" onPress={editReport} />
                )}
                {isOwner && (
                    <AppButton text="Delete Report" onPress={deleteReport} />
                )}
            </View>
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
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        backgroundColor: "white"
    },

    imageContainer: {
        height: 220,
        backgroundColor: "#E8E8E8",
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        marginBottom: 16
    },

    headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.primary
    },

    image: {
        width: "100%",
        height: "100%"
    },

    imagePlaceholder: {
        color: colors.textMuted,
        fontSize: 14
    },

    lostBadge: {
        position: "absolute",
        top: 12,
        left: 12,
        backgroundColor: "#FCE7EF",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6
    },

    foundBadge: {
        position: "absolute",
        top: 12,
        left: 12,
        backgroundColor: "#E4F3E9",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6
    },

    lostText: {
        color: colors.pop,
        fontSize: 12,
        fontWeight: "600"
    },

    foundText: {
        color: colors.found,
        fontSize: 12,
        fontWeight: "600"
    },

    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 12,
        marginBottom: 12
    },

    name: {
        color: colors.primary,
        fontSize: 20,
        fontWeight: "600"
    },

    category: {
        color: colors.textMuted,
        fontSize: 13,
        marginTop: 4
    },

    sectionTitle: {
        color: colors.primary,
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 6
    },

    text: {
        color: "#555555",
        fontSize: 14
    },

    buttons: {
        gap: 10,
        marginTop: 8
    },

    message: {
        color: colors.primary,
        fontSize: 16,
        textAlign: "center"
    },

    errorContainer: {
        gap: 16,
        alignItems: "center"
    }
});