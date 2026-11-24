import { Ionicons } from "@expo/vector-icons";
import { Alert, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

export default function ReportItem({ report, onOpen, onEdit, onDelete, isOwner }) {
    
    function openReport() {
        onOpen(report.id);
    }
    function editReport() {
        onEdit(report.id);
    }
    function deleteReport() {
        Alert.alert(
            "Delete Report",
            "Are you sure you want to delete this report?",
            [{
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: function () {
                    onDelete(report.id);
                }
            }
        ]);
        
    }
    function getBadgeStyle() {
        if (report.type === "Lost"){
            return styles.lostBadge;
        }
        return styles.foundBadge;
    }
    function getBadgeTextStyle(){
        if (report.type === "Lost"){
            return styles.lostText;
        }
        return styles.foundText;
    }

    return (
        <View style={styles.card}>
            <Pressable onPress={openReport} style={styles.reportContent} >
                <View style={styles.imageContainer}>
                    {report.image 
                    ? <Image source={{ uri: report.image}} style={styles.image}/> 
                    : <Text style={styles.imagePlaceholder}>No Photo</Text>}
                </View>

                <View style={styles.info}>
                    <View style={getBadgeStyle()}>
                        <Text style={getBadgeTextStyle()}>{report.type}</Text>
                    </View>

                    <Text style={styles.name} numberOfLines={1}>{report.name}</Text>
                    <Text style={styles.category}>{report.category}</Text>
                    <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">{report.location}</Text>
                </View>
            </Pressable>
        {isOwner && (
            <View style={styles.actions}>

            <Pressable onPress={editReport} style={styles.editButton}>
                <Ionicons name="create-outline" size={22} color="#777777" />
            </Pressable>

            <Pressable onPress={deleteReport} style={styles.deleteButton}>
                <Ionicons name="trash-outline" size={22} color="#A03026" />
            </Pressable>

            </View>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 12,
        marginBottom: 12,
    },

    imageContainer: {
        width: 90,
        height: 90,
        borderRadius: 12,
        backgroundColor: "#E8E8E8",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden"
    },

    image: {
        width: "100%",
        height: "100%"
    },

    imagePlaceholder: {
        color: colors.textMuted,
        fontSize: 12
    },

    info: {
        flex: 1,
        gap: 4
    },

    lostBadge: {
        backgroundColor: "#FCE7EF",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: "flex-start"
    },

    foundBadge: {
        backgroundColor: "#E4F3E9",
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: "flex-start"
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
    
    reportContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },
    actions: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        marginTop: 10
    },
    editButton: {
        backgroundColor: colors.light,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8
    },
    deleteButton: {
        backgroundColor: "#FCE7EF",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8
    },

    name: {
        color: colors.primary,
        fontSize: 16,
        fontWeight: "600"
    },

    category: {
        color: "#777777",
        fontSize: 12
    },

    location: {
        color: "#555555",
        fontSize: 13
    }

});