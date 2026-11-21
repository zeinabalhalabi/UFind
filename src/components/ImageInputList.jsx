import { ScrollView, StyleSheet } from "react-native";
import ImageInput from "./ImageInput";

export default function ImageInputList({ imageUris, onAddImage, onRemoveImage }) {
    return (
        <ScrollView
            horizontal
            keyboardShouldPersistTaps="handled"
            style={styles.list}
            contentContainerStyle={styles.row}>
            {imageUris.map(function (uri) {
                function removeImage() {
                    onRemoveImage(uri);
                }

                return (
                    <ImageInput
                        key={uri}
                        imageUri={uri}
                        onChangeImage={onRemoveImage ? removeImage : undefined} />
                );
            })}
            {onAddImage && <ImageInput onChangeImage={onAddImage} />}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: { flexGrow: 0, marginVertical: 8 },
    row: { gap: 10 }
})
