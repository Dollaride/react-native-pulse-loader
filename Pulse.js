import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');


const  Pulse = (props) => {
	const [anim] = useState(new Animated.Value(0));

	useEffect(()=> {
		Animated.timing(anim, {
			toValue: 1,
			duration: props.interval,
			easing: Easing.in,
		})
		.start();
	}, [])
	const { size, pulseMaxSize, borderColor, backgroundColor, getStyle } = props;

	return (
		<View style={[styles.circleWrapper, {
			width: pulseMaxSize,
			height: pulseMaxSize,
			marginLeft: -pulseMaxSize/2,
			marginTop: -pulseMaxSize/2,
		}]}>
			<Animated.View
				style={[styles.circle, {
					borderColor,
					backgroundColor,
					width: anim.interpolate({
						inputRange: [0, 1],
						outputRange: [size, pulseMaxSize]
					}),
					height: anim.interpolate({
						inputRange: [0, 1],
						outputRange: [size, pulseMaxSize]
					}),
					borderRadius: pulseMaxSize/2,
					opacity: anim.interpolate({
						inputRange: [0, 1],
						outputRange: [1, 0]
					})
				}, getStyle && getStyle(anim)]}
			/>
		</View>
	);
}

export default Pulse;


const styles = StyleSheet.create({
	circleWrapper: {
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		left: width/2,
		top: height/2,
	},
	circle: {
		borderWidth: 4 * StyleSheet.hairlineWidth,
	},
});