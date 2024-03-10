import { StyleSheet, View, Text, Pressable } from 'react-native';

function CommonButton(props) {
    return (
        <View style={props.hideRippleEffect}>
            <Pressable
                android_ripple={{ color: props.rippleColor }}
                onPress={props.clicked.bind(this, props.id)}
                style={({ pressed }) => pressed ? [styles.buttonPressed, props.styles] : props.styles}
            >
                <Text style={props.textStyle}>{props.text}</Text>
            </Pressable>
        </View>
    );
}

export default CommonButton;

const styles = StyleSheet.create({
    buttonPressed: {
        opacity: 0.5
    }
});