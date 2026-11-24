import { Pressable, ScrollView, StyleSheet, Text } from "react-native";
import { colors } from "../constants/colors";
//code reused from TaskFilters
export default function ReportFilters({ options, onChange, selected }) {

    function getStyle(value) {
        if (selected === value) {
            return styles.activeFilterButton;
        }
        return styles.filterButton
    }
    function getTextStyle(value) {
        if(selected === value){
            return styles.activeText;
        }
        return styles.filterText
    }
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scroll}
            contentContainerStyle={styles.filters}
        >
            {options.map(function (option) {
                return (
                    <Pressable key={option} onPress={() => onChange(option)} style={getStyle(option)}>
                        <Text style={getTextStyle(option)}>{option}</Text>
                    </Pressable>
                );
            })}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scroll: {
        flexGrow: 0,
        marginBottom: 15
    },

    filters: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    },

    activeFilterButton: {
        backgroundColor: colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8
    },

    filterButton: {
        backgroundColor: "white",
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 8
    },

    filterText: {
        fontSize: 14,
        color: colors.textMuted
    },

    activeText: {
        fontSize: 14,
        color: "white",
        fontWeight: "600"
    }
});