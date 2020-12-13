import React, { memo } from 'react';
import { View, Text, StatusBar } from "react-native";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';


import NeuMorph from "./NeuMorph";
import { GlobalStyles } from "../screens/global/styles";

const black = "#000";
const { currentHeight } = StatusBar;

const navigation = useNavigation();

function HeaderHome() {

    const handleNavigation = () => {
        console.log(navigation.canGoBack());
    }

    return (
        <MarginSpace>
            <TopContainer>
                <NeuMorph size={48} handlePress={handleNavigation}>

                </NeuMorph>

                <View>
                    <Text style={{...GlobalStyles.NeonText}}>PLAYING NOW</Text>
                </View>

                <NeuMorph size={48} handlePress={handleNavigation}>

                </NeuMorph>
            </TopContainer>
        </MarginSpace>
    );
}

export default memo(HeaderHome);

const MarginSpace = styled.View`    
    margin: ${props => (currentHeight || 24)  + 32}px 32px 0 32px;
`;

const TopContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;