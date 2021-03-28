import React, { useEffect, useState, memo } from 'react';
import { StatusBar, InteractionManager } from "react-native";
import styled from "styled-components/native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import NeuMorph from "./NeuMorph";
import { GlobalStyles } from "../screens/global/styles";

const { currentHeight } = StatusBar;

interface INavigation {
    handleNavigation: Function
}

const HeaderHome : React.FC<INavigation> = ({ handleNavigation }) => {

    const [renderCompleted, setRenderCompleted] = useState(false);

    console.log("Home");

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            setRenderCompleted(true);
        })
    }, []);


    const navAction = () => handleNavigation();

    if(renderCompleted) {
        return (
            <MarginSpace>
                <TopContainer>
                    <NeuMorph size={48} bgColor="#626262">
                        <FontAwesome 
                            onPress={navAction}
                            style={{...GlobalStyles.NeonIcon}}
                            name="arrow-left" 
                            size={24} 
                        />
                    </NeuMorph>   
                    
                </TopContainer>
            </MarginSpace>
        );
    }

    return null;
    
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