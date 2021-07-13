import React, { useEffect, useState, memo } from 'react';
import { StatusBar, InteractionManager, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import styled from "styled-components/native";

import NeonIcon from "./NeonIcon";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

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
                    <TouchableWithoutFeedback onPress={navAction}>
                        <View>
                            <NeonIcon icon={
                                <FontAwesome5 
                                    name="arrow-left" 
                                    size={36} 
                                    style={styles.NeonText}
                                />
                            }/>
                        </View>
                    </TouchableWithoutFeedback>

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

const TopContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const styles = StyleSheet.create({
    NeonText: {
        textShadowColor: 'rgba(255, 51, 235, 1)',
        textShadowOffset: {
            width: 0,
            height: 0
        },
        textShadowRadius: 16,
        elevation: 4,
    }
});