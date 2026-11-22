import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import * as z from "zod";
import AppButton from "../components/AppButton";
import AppScreen from "../components/AppScreen";
import AppTextInput from "../components/AppTextInput";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [signup, setSignup] = useState(false);
    const [error, setError] = useState("");

    const mockEmail = "student@haigazian.edu.lb";
    const mockPassword = "password2026";

    //form validation using zod
    const loginSchema = z.object({
    email: z.email("Enter a valid email address."),
    password: z.string().min(6, "Use at least 6 characters for the password")
    })

    const signupSchema = z.object({
        name: z.string().min(2, "Enter your full name."),
        email: z.email("Enter a valid email address."),
        password: z.string().min(6, "Password must be at least 6 characters."),
        confirmPassword: z.string()
    }).refine(
        (data) => data.password === data.confirmPassword, {
            message: "Passwords don't match"
        }
    );

    {/*this is to have active tab ui */}
    let loginTabStyle;
    let signupTabStyle;
    let headingText;
    let buttonText;

    if (signup === true){
        loginTabStyle = styles.inactiveTab;
        signupTabStyle = styles.activeTab;
        headingText = "Create an account";
        buttonText = "Create Account";
    }
    else {
        loginTabStyle = styles.activeTab;
        signupTabStyle = styles.inactiveTab;
        headingText = "Log in with existing account";
        buttonText = "Continue to Ufind";
    }   
    function handleSubmit() {
        setError("");
        let result;
        if (signup === true){
            result = signupSchema.safeParse({
                name: name,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            });
        } else {
            result = loginSchema.safeParse({
            email: email,
            password: password
        });
    }

        if (result.success === false) {
            setError(result.error.issues[0].message);
            return;
        }
        if (signup === true) {
            console.log("Sign Up");
        } else {
            if (email !== mockEmail || password !== mockPassword) {
            setError("Email or password is incorrect.")
            return;
            }
        }
        router.replace("/(tabs)")
    }

    return (
        <AppScreen>
            <Text style={styles.logo}>UFind</Text>
            <Text style={styles.description}>Report and recover lost belongings across your campus.</Text>
            {/* login and signup tabs */}
            <View style={styles.tabs}>
                {/* login tab */}
                <Text
                    style={loginTabStyle}
                    onPress={() => {
                        setSignup(false);
                        setError("");
                    }}>
                        Log In
                </Text>
                {/* signup tab */}
                <Text
                    style={signupTabStyle}
                    onPress={() => {
                        setSignup(true);
                        setError("");
                    }}>
                        Sign Up
                </Text>
            </View>
            
            <Text style={styles.heading}>{headingText}</Text>
            {signup === true && (
                <>
                <Text style={styles.label}>Full Name</Text>
                <AppTextInput 
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter your full name"/>
                </>
            )}
            <Text style={styles.label}>University Email</Text>
            <AppTextInput
                value={email}
                autoComplete="email"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={setEmail}
                placeholder="student@haigazian.edu.lb"
                keyboardType="email-address" 
            />
            <Text style={styles.label}>Password</Text>
            <AppTextInput
                value={password}
                autoComplete="current-password"
                autoCapitalize="none" autoCorrect={false}
                secureTextEntry
                onChangeText={setPassword}
                placeholder="Please enter your password"
            />
            {signup === true && (
            <>
                <Text style={styles.label}>Confirm Password</Text>
                <AppTextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirm your password"
                    secureTextEntry
                />
            </>
            )}
            {/* Show form errors for all fields */}
            {error.length > 0 &&
                <Text style={styles.error}>{error}</Text>
            }
            <AppButton text="Submit" onPress={handleSubmit} />
        </AppScreen>
    );
}
const styles = StyleSheet.create({
    logo: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#2C365E",
        textAlign: "center"
    },
    description: {
        color: "#777D89",
        textAlign: "center",
        marginVertical: 12
    },
    tabs: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#EFF2F7",
        padding: 5,
        borderRadius: 10,
        marginVertical: 20
    },
    activeTab: {
        flex: 1,
        backgroundColor: "#2C365E",
        color: "white",
        textAlign: "center",
        padding: 10,
        borderRadius: 8
    },
    inactiveTab: {
        flex: 1,
        color: "#777D89",
        textAlign: "center",
        padding: 10
    },
    heading: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#2C365E",
        marginBottom: 15
    },
    label: {
        color: "#2C365E",
        marginTop: 12,
        marginBottom: 5
    },
    error: {
        color: "red",
        marginVertical: 10
    },
});