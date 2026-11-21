import { Pressable, StyleSheet, Text } from "react-native";

export default function AppButton(props) {
    return (
        <Pressable onPress={props.onPress} style={[styles.button, props.style]}>
            <Text style={styles.buttonText}>
                {props.text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#285548", padding: 12, borderRadius: 12, marginVertical: 6, alignItems: "center", minHeight: 44
    },
    buttonText: {
        color: "white", fontSize: 16, fontWeight: "600"
    },
})