import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockReports } from "./mockReports";

const REPORTS_KEY = "UFIND_REPORTS_KEY";
const INITIALIZED_KEY = "UFIND_REPORTS_INITIALIZED";

export async function getReports() {
    const storedReports = await AsyncStorage.getItem(REPORTS_KEY);
    const initialized = await AsyncStorage.getItem(INITIALIZED_KEY);

    let reports = [];

    if (storedReports !== null) {
        reports = JSON.parse(storedReports);
    }

    // Add the mock reports only once
    if (initialized === null) {
        mockReports.forEach(function (mockReport) {
            const exists = reports.some(function (item) {
                return String(item.id) === String(mockReport.id);
            });

            if (!exists) {
                reports.push(mockReport);
            }
        });

        await saveReports(reports);
        await AsyncStorage.setItem(INITIALIZED_KEY, "true");
    }

    return reports;
}

export async function saveReports(reports) {
    await AsyncStorage.setItem(
        REPORTS_KEY,
        JSON.stringify(reports)
    );
}