import { View, TextInput, Text, StyleSheet, Keyboard, KeyboardAvoidingView, ScrollView } from "react-native"
import CommonButton from "../components/common-button"
import { useState } from "react";
import { MaterialIcons, Ionicons, FontAwesome5, AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import Variables from "../common/constants";
import SelectDropdown from "react-native-select-dropdown";
import SuccessAnimation from "../components/success-animation";
import { loginWithPassword, sendVerificationCode, verifyCode, registerUser } from "../services/auth";

const screens = {
    login: "login",
    enterEmail: "enterEmail",
    verifyCode: "verifyCode",
    loading: "loading",
    success: "success",
    register: "register",
    otherState: "otherState"
}

const passwordErrorMessage = 'Password Must Contain \n 1.Atleast one capital alphabet.\n 2.Atleast one lower alphabet.\n 3.Atleast one number.\n 4.Atleast one special character.\n 5.A length of range [8-15]';

export function LoginComponent() {
    let [currentTab, setCurrentTab] = useState(screens.login);
    // login screen variables
    let [loginEmail, setLoginEmail] = useState('');
    let [loginEmailError, setLoginEmailError] = useState('');
    let [loginPassword, setLoginPassword] = useState('');
    let [loginPasswordError, setLoginPasswordError] = useState('');
    //send email-otp variables
    let [community, setCommunity] = useState('');
    let [communityError, setCommunityError] = useState('');
    let [oauthEmail, setOauthEmail] = useState('');
    let [oauthEmailError, setOauthEmailError] = useState('');
    let [otp, setOtp] = useState('');
    let [otpError, setOtpError] = useState('');
    // register screen variables
    let [firstName, setFirstName] = useState('');
    let [firstNameError, setFirstNameError] = useState('');
    let [lastName, setLastName] = useState('');
    let [lastNameError, setLastNameError] = useState('');
    let [role, setRole] = useState('');
    let [roleError, setRoleError] = useState('');
    let [registerPassword, setRegisterPassword] = useState('');
    let [registerPasswordError, setRegisterPasswordError] = useState('');
    let [verifyPassword, setVerifyPassword] = useState('');
    let [passwordMatchError, setPasswordMatchError] = useState('');

    function signIn(id) {
        setCurrentTab(screens.login);
        setCommunity('');
        setCommunityError('');
        setOauthEmail('');
        setOauthEmailError('');
        setOtp('');
        setOtpError('');
        setFirstName('');
        setFirstNameError('');
        setLastName('');
        setLastNameError('');
        setRole('');
        setRoleError('');
        setRegisterPassword('');
        setRegisterPasswordError('');
        setVerifyPassword('');
        setPasswordMatchError('');
    }

    function signUp(id) {
        setCurrentTab(screens.enterEmail);
        setLoginEmail('');
        setLoginEmailError('');
        setLoginPassword('');
        setLoginPasswordError('');
    }

    function isEmailValid(newText) {
        if (newText.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            return true;
        } else {
            return false;
        }
    }

    function isPasswordValid(text) {
        if (text.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/)) {
            return true;
        } else {
            return false;
        }
    }

    function validateOnlyLetters(newText) {
        return !/^[a-z]+$/i.test(newText);
    }

    async function login() {
        Keyboard.dismiss();
        loginEmailError == '' && loginEmail ? setLoginEmailError('') : setLoginEmailError('Invalid Email');
        loginPasswordError == '' && loginPassword ? setLoginPasswordError('') : setLoginPasswordError(passwordErrorMessage);
        if (!loginEmailError && !loginPasswordError) {
            setCurrentTab(screens.loading);
            const res = await loginWithPassword(email, password);
            if (res.success) {
                setCurrentTab(screens.otherState);
            }
        }
    }

    async function register() {
        Keyboard.dismiss();
        roleError == '' && role ? setRoleError('') : setRoleError('Select a role');
        passwordMatchError == '' && verifyPassword ? setPasswordMatchError('') : setPasswordMatchError(`Passwords don't match!`);
        firstNameError == '' && firstName ? setFirstNameError('') : setFirstNameError('Invalid First Name');
        lastNameError == '' && lastName ? setLastNameError('') : setLastNameError('Invalid Last Name');
        registerPasswordError == '' && registerPassword ? setRegisterPasswordError('') : setRegisterPasswordError(passwordErrorMessage);
        if (!roleError && !passwordMatchError && !firstNameError && !lastNameError && !registerPasswordError) {
            setCurrentTab(screens.loading);
            const res = await registerUser(firstName, lastName, role, oauthEmail, registerPassword);
            if (res.success) {
                setCurrentTab(screens.success);
                setTimeout(() => {
                    setCurrentTab(screens.otherState);
                }, 2000);
            }
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
        oauthEmailError == '' && oauthEmail ? setOauthEmailError('') : setOauthEmailError('Invalid Email');
        community == '' ? setCommunityError('Select a community') : setCommunityError('');
        if (community != '' && !oauthEmailError) {
            setCurrentTab(screens.loading);
            const res = await sendVerificationCode(oauthEmail);
            if (res.success) {
                setCurrentTab(screens.verifyCode);
            }
        }
    }

    async function verifyOtp() {
        if (!otpError && otp) {
            const res = await verifyCode(oauthEmail, otp);
            setCurrentTab(screens.loading);
            if (res.success) {
                setCurrentTab(screens.register);
                setOtp('');
            }
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
                                value={loginEmail}
                                onChangeText={newText => {
                                    isEmailValid(newText) ? setLoginEmailError('') : setLoginEmailError('Invalid Email');
                                    setLoginEmail(newText);
                                }}
                            />
                            {loginEmailError.length ? <Text style={styles.errorMessage}>{loginEmailError}</Text> : <></>}
                            <FontAwesome5 name="unlock" size={20} color="white" style={styles.icons} />
                            <TextInput
                                style={styles.credentialInputs}
                                placeholder="Password"
                                placeholderTextColor={Variables.colors.white}
                                autoCapitalize="none"
                                autoComplete="off"
                                autoCorrect={false}
                                multiline={false}
                                maxLength={15}
                                selectionColor={Variables.colors.white}
                                value={loginPassword}
                                onChangeText={newText => {
                                    isPasswordValid(newText) ? setLoginPasswordError('') : setLoginPasswordError(passwordErrorMessage);
                                    setLoginPassword(newText)
                                }}
                            />
                            {loginPasswordError.length ? <Text style={styles.errorMessage}>{loginPasswordError}</Text> : <></>}
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
                                    onSelect={(selectedItem, index) => { console.log(selectedItem, index); setCommunity(selectedItem.name); setCommunityError(''); }}
                                    defaultButtonText="Select Community"
                                    buttonTextAfterSelection={(selectedItem) => { return selectedItem.name }}
                                    rowTextForSelection={(selectedItem) => { return selectedItem.name + selectedItem.address }}
                                    search={true}
                                    searchPlaceHolder="Search Here..."
                                    dropdownIconPosition="left"
                                    renderDropdownIcon={() => { return <Entypo name="location-pin" size={18} color="black" /> }}
                                    renderSearchInputLeftIcon={() => { return <FontAwesome5 name="search-location" size={18} color="black" /> }}
                                ></SelectDropdown>
                                {communityError.length ? <Text style={styles.errorMessage}>{communityError}</Text> : <></>}
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
                                    value={oauthEmail}
                                    onChangeText={newText => {
                                        isEmailValid(newText) ? setOauthEmailError('') : setOauthEmailError('Invalid Email');
                                        setOauthEmail(newText);
                                    }}
                                />
                                {oauthEmailError.length ? <Text style={styles.errorMessage}>{oauthEmailError}</Text> : <></>}
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
                                        maxLength={6}
                                        multiline={false}
                                        selectionColor={Variables.colors.white}
                                        keyboardType='number-pad'
                                        value={otp}
                                        onChangeText={code => {
                                            /^\d+$/.test(code) && code.length == 6 ? setOtpError('') : setOtpError('OTP should be 6 digit number')
                                            setOtp(code)
                                        }}
                                    />
                                    {otpError.length ? <Text style={styles.errorMessage}>{otpError}</Text> : <></>}
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
                                                    value={registerPassword}
                                                    onChangeText={newText => {
                                                        setRegisterPassword(newText);
                                                        isPasswordValid(newText) ? setRegisterPasswordError('') : setRegisterPasswordError(passwordErrorMessage)
                                                    }}
                                                />
                                                {registerPasswordError.length ? <Text style={styles.errorMessage}>{registerPasswordError}</Text> : <></>}
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
                                                    onChangeText={newText => {
                                                        setVerifyPassword(newText);
                                                        registerPassword === newText ? setPasswordMatchError('') : setPasswordMatchError(`Passwords don't match`)
                                                    }}
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
        top: 50,
        left: 20
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