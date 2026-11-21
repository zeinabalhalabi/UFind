import { ScrollView, StyleSheet, View } from "react-native";

export default function AppScreen(props) {
    const contentStyle = [styles.content, props.contentStyle];
    if (props.centered === true) contentStyle.push(styles.centered);
    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={contentStyle}
                keyboardShouldPersistTaps="handled">
                {props.children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F5F3EE" },
    content: { flexGrow: 1, padding: 20, paddingBottom: 40 },
    centered: { justifyContent: "center", padding: 24 }
})