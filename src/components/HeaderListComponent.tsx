import React, { memo } from 'react';
import styled from "styled-components/native";
import Entypo from "react-native-vector-icons/Entypo";

import { BaseButton } from "react-native-gesture-handler";
import { GlobalStyles } from "../screens/global/styles";

interface INavigation {
    toggleNavigation: Function
}

function HeaderListComponent({ toggleNavigation } : INavigation) {

    const handleNavigation = () => toggleNavigation();
    
    return (
        <MarginSpace>
            <TopContainer>
                <BaseButton onPress={handleNavigation}>
                    <BtnAccessible accessible>
                        <Entypo 
                            style={{ color: "#fff" }}
                            name="menu" 
                            size={32} 
                        />
                    </BtnAccessible>
                </BaseButton>
            </TopContainer>
        </MarginSpace>
    );
}

export default memo(HeaderListComponent);

const BtnAccessible = styled.View``;

const MarginSpace = styled.View`    
    width: 100%;
    height: 64px;
    justify-content: center;
    align-items: flex-end;
    padding: 0 24px;
    background-color: #808080;
`;

const TopContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;