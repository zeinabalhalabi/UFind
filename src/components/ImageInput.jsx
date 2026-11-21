import * as ImagePicker from "expo-image-picker";
import { Alert, Image, Pressable, StyleSheet, Text } from "react-native";

export default function ImageInput({ imageUri, onChangeImage }) {
    async function selectImage(source) {
        try {
            let result;

            if (source === "camera") {
                const permission = await ImagePicker.requestCameraPermissionsAsync();
                if (!permission.granted) {
                    Alert.alert("Camera permission is required to take a photo.");
                    return;
                }
                result = await ImagePicker.launchCameraAsync({ mediaTypes: ["images"] });
            } else {
                result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"] });
            }

            if (!result.canceled) {
                onChangeImage(result.assets[0].uri);
            }
        } catch {
            Alert.alert("Could not open the photo picker.");
        }
    }

    function chooseSource() {
        Alert.alert("Add a photo", "Choose a source", [
            { text: "Cancel", style: "cancel" },
            { text: "Gallery", onPress: function () { selectImage("gallery"); } },
            { text: "Camera", onPress: function () { selectImage("camera"); } }
        ]);
    }

    function handlePress() {
        if (!imageUri) {
            chooseSource();
            return;
        }

        Alert.alert("Remove photo?", "Remove this photo from the task?", [
            { text: "Cancel", style: "cancel" },
            { text: "Remove", style: "destructive", onPress: function () { onChangeImage(); } }
        ]);
    }

    const photo = imageUri && <Image source={{ uri: imageUri }} style={styles.tile} />;

    if (!onChangeImage) return photo;

    return (
        <Pressable
            onPress={handlePress}
            style={styles.tile}
            accessibilityRole="button"
            accessibilityLabel={imageUri ? "Remove photo" : "Add photo"}>
            {photo || <Text style={styles.text}>+ Photo</Text>}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tile: {
        width: 90,
        height: 90,
        borderRadius: 10,
        backgroundColor: "#E5EBE4",
        alignItems: "center",
        justifyContent: "center"
    },
    text: { color: "#203B35", fontWeight: "600" }
})
