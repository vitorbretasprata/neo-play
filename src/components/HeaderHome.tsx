import React, { memo } from 'react';
import { View, Text, StatusBar } from "react-native";
import styled from "styled-components/native";
import Entypo from "react-native-vector-icons/Entypo";

import NeuMorph from "./NeuMorph";
import { GlobalStyles } from "../screens/global/styles";

const { currentHeight } = StatusBar;

interface INavigation {
    toggleNavigation: Function
}

function HeaderHome({ toggleNavigation } : INavigation) {

    const handleNavigation = () => toggleNavigation();
    
    return (
        <MarginSpace>
            <TopContainer>
                <WhiteSpace />

                <View>
                    <Text style={{...GlobalStyles.NeonText}}>PLAYING NOW</Text>
                </View>

                <NeuMorph size={48} handlePress={handleNavigation} bgColor="#626262">
                    <Entypo 
                        style={{...GlobalStyles.NeonIcon}}
                        name="menu" 
                        size={24} 
                    />
                </NeuMorph>
            </TopContainer>
        </MarginSpace>
    );
}

export default memo(HeaderHome);

const MarginSpace = styled.View`    
    margin: ${props => (currentHeight || 24)  + 32}px 32px 0 32px;
`;

const WhiteSpace = styled.View`    
    width: 48px;
`;

const TopContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;