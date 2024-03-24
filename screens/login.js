import { View, TextInput, Text, StyleSheet, Keyboard, KeyboardAvoidingView, ScrollView } from "react-native"
import CommonButton from "../components/common-button"
import { useState } from "react";
import { MaterialIcons, Ionicons, FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Variables from "../common/constants";
import SelectDropdown from "react-native-select-dropdown";
import SuccessAnimation from "../components/success-animation";
import { loginWithPassword, sendVerificationCode, verifyCode } from "../services/auth";

const screens = {
    login: "login",
    enterEmail: "enterEmail",
    verifyCode: "verifyCode",
    loading: "loading",
    success: "success",
    register: "register",
    otherState: "otherState"
}

export function LoginComponent() {
    let [currentTab, setCurrentTab] = useState(screens.login);
    let [email, setEmail] = useState('');
    let [emailError, setEmailError] = useState('');
    let [firstName, setFirstName] = useState('');
    let [firstNameError, setFirstNameError] = useState('');
    let [lastName, setLastName] = useState('');
    let [lastNameError, setLastNameError] = useState('');
    let [role, setRole] = useState('');
    let [roleError, setRoleError] = useState('');
    let [password, setPassword] = useState('');
    let [verifyPassword, setVerifyPassword] = useState('');
    let [passwordMatchError, setPasswordMatchError] = useState('');
    let [otp, setOtp] = useState('');

    function signIn(id) {
        setCurrentTab(screens.login);
    }

    function signUp(id) {
        setCurrentTab(screens.enterEmail);
    }

    function validateEmail(newText) {
        if (newText.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setEmailError('')
        } else {
            setEmailError('Invalid Email');
        }
        setEmail(newText)
    }

    function validateOnlyLetters(newText) {
        return !/^[a-z]+$/i.test(newText);
    }

    async function login() {
        Keyboard.dismiss();
        setCurrentTab(screens.loading);
        const res = await loginWithPassword(email, password);
        if (res.success) {
            setCurrentTab(screens.otherState);
        }
    }

    async function register() {
        Keyboard.dismiss();
        if (role) {
            setRoleError('');
            if (password == verifyPassword) {
                setCurrentTab(screens.loading);
                setPasswordMatchError('');
                const res = await register(firstName, lastName, role, email, password);
                if (res.success) {
                    setCurrentTab(screens.success);
                    setTimeout(() => {
                        setCurrentTab(screens.otherState);
                    }, 2000);
                }
            } else {
                setPasswordMatchError(`Passwords don't match!`);
            }
        } else {
            setRoleError('Please select a role');
        }
    }

    function signUpWithGoogle() {
        setCurrentTab(screens.loading);
        setTimeout(() => {
            setCurrentTab(screens.success);
        }, 5000);
    }

    async function sendCode() {
        Keyboard.dismiss();
        setCurrentTab(screens.loading);
        const res = await sendVerificationCode(email);
        if (res.success) {
            setCurrentTab(screens.verifyCode);
        }
    }

    async function verifyOtp() {
        const res = await verifyCode(email, otp);
        setCurrentTab(screens.loading);
        if (res.success) {
            setCurrentTab(screens.register);
        }
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.scrollContainer} enabled>
            <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps={'handled'}>
                <View style={styles.container}>
                    <Text style={[styles.baseText, styles.heading]}>COMGR</Text>
                    <View style={styles.signInUpBox}>
                        <CommonButton
                            clicked={signIn}
                            text={'SIGN IN'}
                            id={'SIGN_IN'}
                            styles={currentTab == screens.login ? styles.tabSelected : styles.pressedItem}
                            textStyle={styles.baseText}
                        ></CommonButton>
                        <CommonButton
                            clicked={signUp}
                            text={'SIGN UP'}
                            id={'SIGN_UP'}
                            styles={currentTab != screens.login ? styles.tabSelected : styles.pressedItem}
                            textStyle={styles.baseText}
                        ></CommonButton>
                    </View>
                    {currentTab == screens.login ?
                        //signup using google auth else using otp then register for a particular committee
                        <View style={styles.inputBox}>
                            <MaterialIcons name="email" size={20} color="black" style={styles.icons} />
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
                                value={email}
                                onChangeText={newText =>
                                    validateEmail(newText)
                                }
                            />
                            {emailError.length ? <Text style={styles.errorMessage}>{emailError}</Text> : <></>}
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
                                value={password}
                                onChangeText={newText => setPassword(newText)}
                            />
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
                        : currentTab == screens.enterEmail ?
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
                                    value={email}
                                    onChangeText={newText => validateEmail(newText)}
                                />
                                {emailError.length ? <Text style={styles.errorMessage}>{emailError}</Text> : <></>}
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
                                    textStyle={[styles.baseText, styles.marginForIconOnLeft]}
                                    hideRippleEffect={styles.hideRippleEffect}
                                    icon={<AntDesign name="google" size={20} color="white" />}
                                ></CommonButton>
                            </View>
                            : currentTab == screens.verifyCode ?
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
                                        value={otp}
                                        onChangeText={code => setOtp(code)}
                                    />
                                    <CommonButton
                                        clicked={verifyOtp}
                                        text={'Verify'}
                                        id={'VERIFY_CODE'}
                                        styles={styles.submitButton}
                                        rippleColor={'white'}
                                        textStyle={styles.baseText}
                                        hideRippleEffect={styles.hideRippleEffect}
                                    ></CommonButton>
                                </View> : currentTab == screens.loading ?
                                    <View style={styles.scrollContainer}>
                                        <SuccessAnimation
                                            path={require('../assets/loading.json')}
                                            styles={styles.emailVerified}
                                            autoPlay={true}
                                            loop={true}
                                        ></SuccessAnimation>
                                    </View>
                                    :
                                    currentTab == screens.register ?
                                        <View>
                                            <SelectDropdown buttonStyle={styles.dropDown} data={['Developer', 'President', 'Resident', 'Non-Resident', 'NA']}
                                                onSelect={(selectedItem, index) => { setRole(selectedItem); setRoleError(''); }}
                                                defaultButtonText="Select Role"
                                                buttonTextAfterSelection={(selectedItem) => { return selectedItem }}
                                                rowTextForSelection={(selectedItem) => { return selectedItem }}
                                                search={true}
                                                searchPlaceHolder="Search Here..."
                                                dropdownIconPosition="left"
                                                renderDropdownIcon={() => { return <MaterialIcons name="work" size={18} color="black" /> }}
                                                renderSearchInputLeftIcon={() => { return <Ionicons name="search" size={18} color="black" /> }}
                                            ></SelectDropdown>
                                            {roleError.length ? <Text style={styles.errorMessage}>{roleError}</Text> : <></>}
                                            <View style={styles.inputBox}>
                                                <MaterialCommunityIcons name="account-arrow-left" size={24} color="white" style={styles.icons} />
                                                <TextInput
                                                    style={styles.credentialInputs}
                                                    placeholder="FirstName"
                                                    placeholderTextColor={Variables.colors.white}
                                                    autoCapitalize="none"
                                                    autoComplete="off"
                                                    autoCorrect={false}
                                                    multiline={false}
                                                    selectionColor={Variables.colors.white}
                                                    keyboardType="ascii-capable"
                                                    value={firstName}
                                                    onChangeText={newText => {
                                                        setFirstName(newText);
                                                        validateOnlyLetters(newText) ? setFirstNameError('Invalid First Name') : setFirstNameError('')
                                                    }}
                                                />
                                                {firstNameError.length ? <Text style={styles.errorMessage}>{firstNameError}</Text> : <></>}
                                                <MaterialCommunityIcons name="account-arrow-right" size={24} color="white" style={styles.icons} />
                                                <TextInput
                                                    style={styles.credentialInputs}
                                                    placeholder="LastName"
                                                    placeholderTextColor={Variables.colors.white}
                                                    autoCapitalize="none"
                                                    autoComplete="off"
                                                    autoCorrect={false}
                                                    multiline={false}
                                                    selectionColor={Variables.colors.white}
                                                    keyboardType="ascii-capable"
                                                    value={lastName}
                                                    onChangeText={newText => {
                                                        setLastName(newText);
                                                        validateOnlyLetters(newText) ? setLastNameError('Invalid Last Name') : setLastNameError('')
                                                    }}
                                                />
                                                {lastNameError.length ? <Text style={styles.errorMessage}>{lastNameError}</Text> : <></>}
                                                <FontAwesome5 name="unlock" size={20} color="white" style={styles.icons} />
                                                <TextInput
                                                    style={styles.credentialInputs}
                                                    placeholder="Set New Password"
                                                    placeholderTextColor={Variables.colors.white}
                                                    autoCapitalize="none"
                                                    autoComplete="off"
                                                    autoCorrect={false}
                                                    multiline={false}
                                                    selectionColor={Variables.colors.white}
                                                    keyboardType="ascii-capable"
                                                    value={password}
                                                    onChangeText={newText => setPassword(newText)}
                                                />
                                                <FontAwesome5 name="unlock" size={20} color="white" style={styles.icons} />
                                                <TextInput
                                                    style={styles.credentialInputs}
                                                    placeholder="Re-type New Password"
                                                    placeholderTextColor={Variables.colors.white}
                                                    autoCapitalize="none"
                                                    autoComplete="off"
                                                    autoCorrect={false}
                                                    multiline={false}
                                                    selectionColor={Variables.colors.white}
                                                    keyboardType="ascii-capable"
                                                    value={verifyPassword}
                                                    onChangeText={newText => setVerifyPassword(newText)}
                                                />
                                                {passwordMatchError.length ? <Text style={styles.errorMessage}>{passwordMatchError}</Text> : <></>}
                                            </View>
                                            <CommonButton
                                                clicked={register}
                                                text={'Register'}
                                                id={'REGISTER'}
                                                styles={styles.submitButton}
                                                textStyle={styles.baseText}
                                                rippleColor={'white'}
                                                hideRippleEffect={styles.hideRippleEffect}
                                            ></CommonButton>
                                        </View> : currentTab == screens.success ?
                                            <View style={styles.scrollContainer}>
                                                <SuccessAnimation
                                                    path={require('../assets/success-green-circle.json')}
                                                    styles={styles.emailVerified}
                                                    autoPlay={true}
                                                    loop={false}
                                                ></SuccessAnimation>
                                            </View> : <View></View>
                    }

                </View >
            </ScrollView>
        </KeyboardAvoidingView>
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
        height: 300
    },
    container: {
        flex: 1,
        marginTop: "5%",
        marginHorizontal: "5%",
        justifyContent: 'space-between',
        paddingTop: '25%',
        paddingHorizontal: '10%',
        marginBottom: "10%"
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
        paddingTop: '5%',
    },
    tabSelected: {
        opacity: 1,
        borderBottomWidth: 2,
        borderBottomColor: Variables.colors.white,
        paddingBottom: '5%',
        paddingTop: '5%',
    },
    inputBox: {
        flex: 5,
    },
    credentialInputs: {
        opacity: 0.5,
        height: 70,
        borderBottomWidth: 1,
        borderColor: Variables.colors.white,
        color: Variables.colors.white,
        textAlignVertical: 'center',
        textAlign: 'center',
        paddingLeft: '10%',
    },
    icons: {
        color: Variables.colors.white,
        position: 'relative',
        top: '15%',
        left: '5%'
    },
    submitButton: {
        backgroundColor: Variables.colors.green,
        color: Variables.colors.white,
        alignItems: "center",
        padding: '7%',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    hideRippleEffect: {
        overflow: 'hidden',
        borderRadius: 30,
        marginTop: '15%'
    },
    dropDown: {
        width: "100%",
        borderRadius: 5
    },
    marginForIconOnLeft: {
        marginLeft: '5%'
    },
    errorMessage: {
        color: Variables.colors.red,
        marginTop: '5%',
        marginLeft: '5%'
    }
})
export default LoginComponent