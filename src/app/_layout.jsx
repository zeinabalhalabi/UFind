import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: {
                backgroundColor: "#ffffff",
            },
            headerTintColor: "#2C365E",
        }}>
            <Stack.Screen name="login" options={{
                title: "Login or Sign Up"
            }} />
            <Stack.Screen name="details" options={{
                title: "Item details"
            }} />
            <Stack.Screen name="(tabs)" options={{
                headerTitle: "Ufind: Lost and Found",
                headerShown: true
            }} />
        </Stack>
    )
}
