import { StyleSheet, TextInput } from "react-native";

export default function AppTextInput(props) {
    return (
        <TextInput
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            secureTextEntry={props.secureTextEntry}
            onChangeText={props.onChangeText}
            onSubmitEditing={props.onSubmitEditing}
            value={props.value}
            autoCapitalize={props.autoCapitalize}
            autoComplete={props.autoComplete}
            autoCorrect={props.autoCorrect}
            style={[styles.input, props.style]}

        />
    )
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: "white",
        padding: 14,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#A9BCAF",
        marginVertical: 8,
        fontSize: 17,
        color: "#203B35"
    },
})
