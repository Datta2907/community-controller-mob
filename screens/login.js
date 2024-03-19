import { View, TextInput, Text, StyleSheet, Keyboard } from "react-native"
import CommonButton from "../components/common-button"
import { useState } from "react";
import { MaterialIcons, Ionicons, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';
import Variables from "../common/constants";
import SelectDropdown from "react-native-select-dropdown";
import SuccessAnimation from "../components/success-animation";

const Tabs = {
    first_tab: 1,
    second_tab: 2,
    third_tab: 3,
    fourth_tab: 4,
    fifth_tab: 5,
}

export function LoginComponent() {
    let [currentTab, setCurrentTab] = useState(1);
    function signIn(id) {
        setCurrentTab(1);
        console.log("Sign in clicked", id);
    }

    function signUp(id) {
        setCurrentTab(2);
        Keyboard.dismiss();
        console.log("SIgn up clicked", id);
    }

    function login() {
    }

    function signUpWithGoogle() {
        setCurrentTab(4)
    }

    function sendCode() {
        setCurrentTab(3);
    }

    function verifyCode() {
        setCurrentTab(4);
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.baseText, styles.heading]}>COMGR</Text>
            <View style={styles.signInUpBox}>
                <CommonButton
                    clicked={signIn}
                    text={'SIGN IN'}
                    id={'SIGN_IN'}
                    styles={currentTab == 1 ? styles.tabSelected : styles.pressedItem}
                    textStyle={styles.baseText}
                ></CommonButton>
                <CommonButton
                    clicked={signUp}
                    text={'SIGN UP'}
                    id={'SIGN_UP'}
                    styles={currentTab > 1 ? styles.tabSelected : styles.pressedItem}
                    textStyle={styles.baseText}
                ></CommonButton>
            </View>
            {currentTab == Tabs.first_tab ?
                //signup using google auth else using otp then register for a particular committee
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
                        clicked={login}
                        text={'Login'}
                        id={'LOGIN'}
                        styles={styles.submitButton}
                        textStyle={styles.baseText}
                        rippleColor={'white'}
                        hideRippleEffect={styles.hideRippleEffect}
                    ></CommonButton>
                </View>
                : currentTab == Tabs.second_tab ?
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
                            clicked={sendCode}
                            text={'Send Verification Code'}
                            id={'SEND_CODE'}
                            styles={styles.submitButton}
                            rippleColor={'white'}
                            textStyle={styles.baseText}
                            hideRippleEffect={styles.hideRippleEffect}
                        ></CommonButton>
                        <CommonButton
                            clicked={signUpWithGoogle}
                            text={'Sign Up With Google'}
                            id={'SIGN_UP_GOOGLE'}
                            styles={styles.submitButton}
                            rippleColor={'white'}
                            textStyle={styles.baseText}
                            hideRippleEffect={styles.hideRippleEffect}
                            icon={<AntDesign name="google" size={20} color="white" />}
                        ></CommonButton>
                    </View>
                    : currentTab == Tabs.third_tab ?
                        <View style={styles.inputBox}>
                            <Ionicons name="keypad" size={20} style={styles.icons} color="white" />
                            <TextInput
                                style={styles.credentialInputs}
                                placeholder="Enter Code"
                                placeholderTextColor={Variables.colors.white}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                                multiline={false}
                                selectionColor={Variables.colors.white}
                                keyboardType='number-pad'
                            />
                            <CommonButton
                                clicked={verifyCode}
                                text={'Verify'}
                                id={'VERIFY_CODE'}
                                styles={styles.submitButton}
                                rippleColor={'white'}
                                textStyle={styles.baseText}
                                hideRippleEffect={styles.hideRippleEffect}
                            ></CommonButton>
                        </View> : currentTab == Tabs.fourth_tab ?
                            <View style={styles.scrollContainer}>
                                <SuccessAnimation
                                    path={require('../assets/success-green-circle.json')}
                                    styles={styles.emailVerified}
                                    autoPlay={true}
                                    loop={false}
                                ></SuccessAnimation>
                            </View> :
                            <Text></Text>
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
    emailVerified: {
        height: 200
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