import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import AppButton from "../../components/AppButton";
import AppScreen from "../../components/AppScreen";
import AppTextInput from "../../components/AppTextInput";
import ImageInput from "../../components/ImageInput";
import ReportFilters from "../../components/ReportFilters";

import { categories } from "../../constants/categories";
import { colors } from "../../constants/colors";
import { getReports, saveReports } from "../../constants/reportStorage";

const currentUserId = "user1";

export default function Report() {
    const params = useLocalSearchParams();
    const id = params.id;

    const [reportType, setReportType] = useState("Lost");
    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [imageUri, setImageUri] = useState(null);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [canEdit, setCanEdit] = useState(false);

    // Load the existing report if an ID is provided
    useEffect(function () {
        resetForm();
        setCanEdit(false);

        if (id) {
            loadReport();
        } else if (params.type === "Found"){
            setReportType("Found");
        }
    }, [id, params.type]);

    async function loadReport() {
        setLoading(true);

        try {
            const reports = await getReports();
            const foundReport = reports.find(function (item){
                return String(item.id) === String(id);
            });

                if (foundReport && foundReport.userId === currentUserId) {
                    setReportType(foundReport.type);
                    setItemName(foundReport.name);
                    setCategory(foundReport.category);
                    setLocation(foundReport.location);
                    setDescription(foundReport.description || "");
                    setImageUri(foundReport.image || null);
                    setCanEdit(true);
                } else {
                    setError("You cannot edit this report.");
                }
            
            } catch (error) {
                setError("Could not load the report.");
            } finally {
                setLoading(false);
            }
    }

    function resetForm() {
        setReportType("Lost");
        setItemName("");
        setCategory("");
        setLocation("");
        setDescription("");
        setImageUri(null);
        setError("");
    }

    function showLost() {
        setReportType("Lost");
    }

    function showFound() {
        setReportType("Found");
    }

    function getTypeStyle(value) {
        if (reportType === value) {
            if (value === "Lost") {
                return [styles.typeButton, styles.lostButton];
            }

            return [styles.typeButton, styles.foundButton];
        }

        return styles.typeButton;
    }

    function getTypeTextStyle(value) {
        if (reportType === value) {
            return styles.activeText;
        }

        return styles.typeText;
    }

    function getHeading() {
        if (id) {
            return "Edit Report";
        }

        return "Create Item Report";
    }

    function getButtonText() {
        if (saving) {
            return "Saving...";
        }

        if (id) {
            return "Save Changes";
        }

        return "Post Report";
    }
    //add or update a report
    async function saveReport() {
        if (loading || saving) {
            return;
        }
        if (id && !canEdit) {
            return;
        }

        setError("");

        if (itemName.trim() === "") {
            setError("Please enter an item name.");
            return;
        }

        if (!categories.includes(category)) {
            setError("Please select a category.");
            return;
        }

        if (location.trim() === "") {
            setError("Please enter a location.");
            return;
        }
        setSaving(true);

        try {
            const reports = await getReports();
            let reportId = Date.now();

            if (id) {
                const existingReport = reports.find(function (item) {
                    return String(item.id) === String(id);
                });

                if (!existingReport ||
                    existingReport.userId !== currentUserId) {
                    setError("You cannot edit this report.");
                    return;
                }

                reportId = existingReport.id;
            } else {
                while (reports.some(function (item) {
                    return String(item.id) === String(reportId);
                })) {
                    reportId = reportId + 1;
                }
            }

            const newReport = {
                id: reportId,
                userId: currentUserId,
                type: reportType,
                name: itemName.trim(),
                category: category,
                location: location.trim(),
                description: description.trim(),
                image: imageUri
            };

            let updatedReports;

            if (id) {
                // replace the existing report
                updatedReports = reports.map(function (item) {
                    if (String(item.id) === String(id)) {
                        return newReport;
                    }

                    return item;
                });
            } else {
                // add the new report at the beginning
                updatedReports = [newReport, ...reports];
            }

            await saveReports(updatedReports);
            resetForm();
            router.setParams({ id: ""});
            router.replace("/browse");

        } catch (error) {
            setError("Could not save the report.");
        } finally {
            setSaving(false);
        }
    }

    function cancelReport() {
        if (saving) {
            return;
        }
        resetForm();
        router.setParams({ id: ""})
        router.replace("/browse");
    }

    if (loading) {
        return (
            <AppScreen>
                <Text style={styles.subtitle}>Loading report...</Text>
            </AppScreen>
        );
    }

    if (id && !canEdit) {
        return (
            <AppScreen>
                <Text style={styles.error}>{error}</Text>
                <AppButton
                    text="Back to Reports"
                    onPress={cancelReport}
                />
            </AppScreen>
        );
    }

    return (
        <AppScreen>
            <Text style={styles.heading}>{getHeading()}</Text>

            <Text style={styles.subtitle}>
                Help your campus find lost belongings.
            </Text>

            <Text style={styles.label}>Report Type</Text>

            <View style={styles.typeSelector}>
                <Pressable
                    style={getTypeStyle("Lost")}
                    onPress={showLost}>
                    <Text style={getTypeTextStyle("Lost")}>
                        I Lost an Item
                    </Text>
                </Pressable>

                <Pressable
                    style={getTypeStyle("Found")}
                    onPress={showFound}>
                    <Text style={getTypeTextStyle("Found")}>
                        I Found an Item
                    </Text>
                </Pressable>
            </View>

            <Text style={styles.label}>Item Name *</Text>

            <AppTextInput
                style={styles.input}
                placeholder="e.g. Sony Headphones"
                value={itemName}
                onChangeText={setItemName}
            />
            <Text style={styles.label}>Category *</Text>

            <ReportFilters
                options={categories}
                selected={category}
                onChange={setCategory}
            />

            <Text style={styles.label}>Location *</Text>

            <AppTextInput
                style={styles.input}
                placeholder="e.g. Main Library"
                value={location}
                onChangeText={setLocation}
            />

            <Text style={styles.label}>Description</Text>

            <TextInput
                style={[styles.input, styles.description]}
                placeholder="Describe the item..."
                placeholderTextColor={colors.textMuted}
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <Text style={styles.label}>Item Photo (Optional)</Text>

            <ImageInput
                imageUri={imageUri}
                onChangeImage={setImageUri}
            />

            <View style={styles.notice}>
                <Text style={styles.noticeTitle}>
                    Stored Locally
                </Text>

                <Text style={styles.noticeText}>
                    Your report is saved on this device
                    and will appear in Browse Reports.
                </Text>
            </View>

            {error !== "" && (
                <Text style={styles.error}>{error}</Text>
            )}

            <AppButton
                text={getButtonText()}
                onPress={saveReport}
            />

            <Pressable
                style={styles.cancelButton}
                onPress={cancelReport}
            >
                <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: "600",
        color: colors.primary,
        marginBottom: 6
    },

    subtitle: {
        fontSize: 14,
        color: colors.textMuted,
        marginBottom: 20
    },

    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.primary,
        marginTop: 12,
        marginBottom: 8
    },

    typeSelector: {
        flexDirection: "row",
        gap: 10,
        marginBottom: 8
    },

    typeButton: {
        flex: 1,
        backgroundColor: "white",
        padding: 12,
        borderRadius: 10,
        alignItems: "center"
    },

    lostButton: {
        backgroundColor: colors.pop
    },

    foundButton: {
        backgroundColor: colors.found
    },

    typeText: {
        color: colors.textMuted,
        fontWeight: "600",
        fontSize: 13
    },

    activeText: {
        color: "white",
        fontWeight: "600",
        fontSize: 13
    },

    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: "#D1D5DF",
        borderRadius: 10,
        padding: 12,
        fontSize: 14,
        color: colors.primary,
        marginBottom: 8
    },

    description: {
        height: 100,
        textAlignVertical: "top"
    },

    notice: {
        backgroundColor: "#E8EEF5",
        padding: 14,
        borderRadius: 10,
        marginVertical: 16,
        gap: 4
    },

    noticeTitle: {
        color: colors.primary,
        fontWeight: "600",
        fontSize: 14
    },

    noticeText: {
        color: colors.textMuted,
        fontSize: 12
    },

    error: {
        color: "#A03026",
        fontSize: 13,
        marginVertical: 10
    },

    cancelButton: {
        padding: 12,
        alignItems: "center"
    },

    cancelText: {
        color: colors.primary,
        fontWeight: "600"
    }
});
