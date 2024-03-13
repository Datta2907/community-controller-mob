import { View, TextInput, Text, StyleSheet, Keyboard } from "react-native"
import CommonButton from "../components/common-button"
import { useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Variables from "../common/constants";
import SelectDropdown from "react-native-select-dropdown";
import { Entypo } from '@expo/vector-icons';

export function LoginComponent() {
    let [currentTab, setCurrentTab] = useState(0);
    function signIn(id) {
        setCurrentTab(0);
        console.log("Sign in clicked", id);
    }

    function signUp(id) {
        setCurrentTab(1);
        Keyboard.dismiss();
        console.log("SIgn up clicked", id);
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.baseText, styles.heading]}>COMGR</Text>
            <View style={styles.signInUpBox}>
                <CommonButton
                    clicked={signIn}
                    text={'SIGN IN'}
                    id={'SIGN_IN'}
                    styles={currentTab == 0 ? styles.tabSelected : styles.pressedItem}
                    textStyle={styles.baseText}
                ></CommonButton>
                <CommonButton
                    clicked={signUp}
                    text={'SIGN UP'}
                    id={'SIGN_UP'}
                    styles={currentTab == 1 ? styles.tabSelected : styles.pressedItem}
                    textStyle={styles.baseText}
                ></CommonButton>
            </View>
            {currentTab ?
                //signup using google auth else using otp then register for a particular committee
                <View style={styles.inputBox}>
                    <SelectDropdown buttonStyle={styles.dropDown} data={[{ name: "Velama Community", address: "pragathi nagar", state: "telangana" }, { name: "X community", address: "koti", state: "telanagana" }]}
                        onSelect={(selectedItem, index) => { console.log(selectedItem, index) }}
                        defaultButtonText="Select Community"
                        buttonTextAfterSelection={(selectedItem) => { return selectedItem.name }}
                        rowTextForSelection={(selectedItem) => { return selectedItem.name + selectedItem.address }}
                        search={true}
                        searchPlaceHolder="Search Here..."
                        dropdownIconPosition="left"
                        renderDropdownIcon={() => { return <Entypo name="location-pin" size={18} color="black" /> }}
                        renderSearchInputLeftIcon={() => { return <FontAwesome5 name="search-location" size={18} color="black" /> }}
                    ></SelectDropdown>
                    <MaterialIcons name="email" size={20} color="white" style={styles.icons} />
                    <TextInput
                        style={styles.credentialInputs}
                        placeholder="Email"
                        placeholderTextColor={Variables.colors.white}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect={false}
                        multiline={false}
                        selectionColor={Variables.colors.white}
                        keyboardType="email-address"
                    />
                    <CommonButton
                        clicked={signUp}
                        text={'Send Verification Code'}
                        id={'SIGN_UP'}
                        styles={styles.submitButton}
                        rippleColor={'white'}
                        textStyle={styles.baseText}
                        hideRippleEffect={styles.hideRippleEffect}
                    ></CommonButton>
                    <CommonButton
                        clicked={signUp}
                        text={'Sign Up With Google'}
                        id={'SIGN_UP'}
                        styles={styles.submitButton}
                        rippleColor={'white'}
                        textStyle={styles.baseText}
                        hideRippleEffect={styles.hideRippleEffect}
                        icon={<AntDesign name="google" size={20} color="white" />}
                    ></CommonButton>
                </View>
                :
                <View>
                    <View style={styles.inputBox}>
                        <MaterialIcons name="email" size={20} color="white" style={styles.icons} />
                        <TextInput
                            style={styles.credentialInputs}
                            placeholder="Email"
                            placeholderTextColor={Variables.colors.white}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                            multiline={false}
                            selectionColor={Variables.colors.white}
                            keyboardType="email-address"
                        />
                        <FontAwesome5 name="unlock" size={20} color="white" style={styles.icons} />
                        <TextInput
                            style={styles.credentialInputs}
                            placeholder="Password"
                            placeholderTextColor={Variables.colors.white}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                            multiline={false}
                            selectionColor={Variables.colors.white}
                        />
                    </View>
                    <CommonButton
                        clicked={signIn}
                        text={'SIGN IN'}
                        id={'SIGN_IN'}
                        styles={styles.submitButton}
                        textStyle={styles.baseText}
                        rippleColor={'white'}
                        hideRippleEffect={styles.hideRippleEffect}
                    ></CommonButton>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    baseText: {
        color: Variables.colors.white,
        fontFamily: Variables.fontStyle
    },
    heading: {
        fontSize: 50,
        textAlign: 'center'
    },
    scrollContainer: {
        flex: 1
    },
    container: {
        flex: 1,
        marginTop: 20,
        padding: 5,
        marginHorizontal: 20,
    },
    signInUpBox: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: "20%",
        marginBottom: "10%",
    },
    pressedItem: {
        opacity: 0.5,
        paddingTop: 10,
    },
    tabSelected: {
        opacity: 1,
        borderBottomWidth: 1,
        borderBottomColor: Variables.colors.white,
        paddingBottom: 3,
        paddingTop: 10,
    },
    inputBox: {
        flex: 5
    },
    credentialInputs: {
        opacity: 0.5,
        height: 70,
        borderBottomWidth: 1,
        borderColor: Variables.colors.white,
        color: Variables.colors.white,
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingLeft: 30,
    },
    icons: {
        color: Variables.colors.white,
        position: 'relative',
        top: 45,
        left: 10
    },
    submitButton: {
        backgroundColor: Variables.colors.green,
        color: Variables.colors.white,
        alignItems: "center",
        padding: 20,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    hideRippleEffect: {
        overflow: 'hidden',
        borderRadius: 30,
        marginTop: 50
    },
    dropDown: {
        width: "100%",
        borderRadius: 5
    }
})
export default LoginComponent