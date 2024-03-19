import LottieView from "lottie-react-native";

function SuccessAnimation(props) {
    return (
        <LottieView
            source={props.path}
            style={props.styles}
            autoPlay={props.autoPlay}
            loop={props.loop}
        />
    )
}

export default SuccessAnimation;
