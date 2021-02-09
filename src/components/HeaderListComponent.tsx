import React from 'react';
import styled from "styled-components/native";
import Entypo from "react-native-vector-icons/Entypo";

import { BaseButton } from "react-native-gesture-handler";
interface INavigation {
}

const HeaderListComponent : React.FC<INavigation> = () => {

    return (
        <MarginSpace>
            <TopContainer>
                <BaseButton>
                    
                </BaseButton>
            </TopContainer>
        </MarginSpace>
    );
}

export default HeaderListComponent;

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