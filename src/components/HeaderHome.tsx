import React, { memo } from 'react';
import { View, Text, StatusBar } from "react-native";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";


import NeuMorph from "./NeuMorph";
import { GlobalStyles } from "../screens/global/styles";

const black = "#000";
const { currentHeight } = StatusBar;

function HeaderHome({ navigation } : any) {
    return (
        <MarginSpace>
            <TopContainer>
                <TouchableWithoutFeedback onPress={navigation}>
                    <NeuMorph size={48}>
                    </NeuMorph>
                </TouchableWithoutFeedback>
                

                <View>
                    <Text style={{...GlobalStyles.NeonText}}>PLAYING NOW</Text>
                </View>
               
                <NeuMorph size={48}>
                    
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
`