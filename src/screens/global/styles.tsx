import styled from "styled-components/native";
import { StyleSheet } from "react-native";

export const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background: rgb(71, 71, 71);
`;

export const GlobalStyles = StyleSheet.create({
    NeonText: {
        textShadowColor: 'rgba(47, 214, 224, 1)',
        textShadowOffset: {
            width: -1,
            height: 1
        },
        textShadowRadius: 16,
        color: "#fff",
        elevation: 4,
        fontSize: 18,
        fontWeight: "800"
    },
    NeonIcon: {
        textShadowColor: 'rgba(47, 214, 224, 1)',
        textShadowOffset: {
            width: 0,
            height: 0
        },
        textShadowRadius: 16,
        color: "#6ef6ff",
        elevation: 4,
        fontWeight: "800"
    }
});