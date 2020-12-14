import React, { memo } from 'react';
import { View, Text, StatusBar } from "react-native";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from '@react-navigation/native';


import NeuMorph from "./NeuMorph";
import { GlobalStyles } from "../screens/global/styles";

const { currentHeight } = StatusBar;

function HeaderHome() {

    const navigation = useNavigation();

    const handleNavigation = () => {
        
    }

    return (
        <MarginSpace>
            <TopContainer>
                <NeuMorph size={48} handlePress={handleNavigation} bgColor="#626262">

                </NeuMorph>

                <View>
                    <Text style={{...GlobalStyles.NeonText}}>PLAYING NOW</Text>
                </View>

                <NeuMorph size={48} handlePress={handleNavigation} bgColor="#626262">

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