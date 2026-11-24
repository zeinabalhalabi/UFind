
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import ReportItem from "../../components/ReportItem";

import { colors } from "../../constants/colors";
import { getReports } from "../../constants/reportStorage";

const currentUserId = "user1";
const currentUserName = "Zeinab Halabi";
const currentUserEmail = "student@haigazian.edu.lb";

export default function Profile() {
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

    const recentReports = myReports.slice(0, 3);

    function openReport(id) {
        router.push({
            pathname: "/details",
            params: { id: id }
        });
    }

    function seeAllReports() {
        router.push("/myReports");
    }

    function logout() {
        router.replace("/login");
    }

    return (
        <AppScreen>
            <View style={styles.header}>
                <Text style={styles.heading}>Profile</Text>

                <Pressable
                    style={styles.logout}
                    onPress={logout}
                >
                    <Ionicons
                        name="log-out-outline"
                        size={22}
                        color={colors.pop}
                    />
                    <Text style={styles.logoutText}>Log Out</Text>
                </Pressable>
            </View>

            <View style={styles.profileCard}>
                <View style={styles.avatar}>
                    <Ionicons
                        name="person-outline"
                        size={28}
                        color="white"
                    />
                </View>

                <View style={styles.info}>
                    <Text style={styles.name}>
                        {currentUserName}
                    </Text>

                    <Text style={styles.email}>
                        {currentUserEmail}
                    </Text>
                </View>
            </View>

            <Text style={styles.section}>My Reports</Text>

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

            <AppButton
                text="See All My Reports"
                onPress={seeAllReports}
            />
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

    heading: {
        fontSize: 22,
        fontWeight: "600",
        color: colors.primary
    },

    logout: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },

    logoutText: {
        color: colors.pop,
        fontWeight: "600",
        fontSize: 14
    },

    profileCard: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 16,
        flexDirection: "row",
        alignItems: "center",
        gap: 14,
        marginBottom: 24
    },

    avatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.primary,
        alignItems: "center",
        justifyContent: "center"
    },

    info: {
        flex: 1
    },

    name: {
        color: colors.primary,
        fontSize: 18,
        fontWeight: "600"
    },

    email: {
        color: colors.textMuted,
        fontSize: 13,
        marginTop: 4
    },

    section: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.primary,
        marginBottom: 4
    },

    subtitle: {
        fontSize: 13,
        color: colors.textMuted,
        marginBottom: 16
    },

    emptyText: {
        color: colors.textMuted,
        textAlign: "center",
        marginVertical: 20
    }
});
