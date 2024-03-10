import { View, TextInput, Text, StyleSheet, Keyboard } from "react-native"
import CommonButton from "../components/common-button"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEnvelope, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

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
                    <FontAwesomeIcon icon={faEnvelope} style={styles.icons} />
                    <TextInput
                        style={styles.credentialInputs}
                        placeholder="Email"
                        placeholderTextColor={'#ffffff'}
                        autoCapitalize="none"
                        autoComplete="off"
                        autoCorrect={false}
                        multiline={false}
                        selectionColor={'#ffffff'}
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
                </View>
                :
                <View>
                    <View style={styles.inputBox}>
                        <FontAwesomeIcon icon={faEnvelope} style={styles.icons} />
                        <TextInput
                            style={styles.credentialInputs}
                            placeholder="Email"
                            placeholderTextColor={'#ffffff'}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                            multiline={false}
                            selectionColor={'#ffffff'}
                            keyboardType="email-address"
                        />
                        <FontAwesomeIcon icon={faUnlock} style={styles.icons} />
                        <TextInput
                            style={styles.credentialInputs}
                            placeholder="Password"
                            placeholderTextColor={'#ffffff'}
                            autoCapitalize="none"
                            autoComplete="off"
                            autoCorrect={false}
                            multiline={false}
                            selectionColor={'#ffffff'}
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
        color: '#ffffff',
        fontFamily: 'LibreFranklin_400Regular'
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
    loginButtons: {
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        fontSize: 100
    },
    pressedItem: {
        opacity: 0.5,
        paddingTop: 10,
    },
    tabSelected: {
        opacity: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
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
        borderColor: "#ffffff",
        color: '#ffffff',
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingLeft: 30,
    },
    icons: {
        color: '#ffffff',
        position: 'relative',
        top: 45,
        left: 10
    },
    submitButton: {
        backgroundColor: "green",
        color: "#ffffff",
        alignItems: "center",
        padding: 20,
        borderRadius: 10
    },
    hideRippleEffect: {
        overflow: 'hidden',
        borderRadius: 30,
        marginTop: 50
    }
})
export default LoginComponent