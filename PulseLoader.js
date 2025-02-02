import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import Pulse from './Pulse';
import useInterval from '@use-it/interval';

const LocationPulseLoader = (props) => {
	const {size, interval, icon, text, subText, textColor, backgroundColor} = props;
	const[counter, setCounter] = useState(1);
	const  [circles, setCircles] = useState([]);
	const [anim] = useState(new Animated.Value(1));
	useInterval(() => {
		addCircle()
	}, interval);
	useEffect(() => {
		setCircleInterval();
	}, [])
	const setCircleInterval = () => {
		addCircle();
	}

	const addCircle = () => {
		setCircles([...circles, counter])
		setCounter(counter+1)
	}

	const onPressIn = () => {
		Animated.timing(anim, {
			toValue: props.pressInValue,
			duration: props.pressDuration,
			easing: props.pressInEasing,
		}).start(() => clearInterval(setInterval));
	}

	const onPressOut = () => {
		Animated.timing(anim, {
			toValue: 1,
			duration: props.pressDuration,
			easing: props.pressOutEasing,
		}).start(setCircleInterval);
	}

	return (
		<View style={{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		}}>
			{circles.map((circle) => (
				<Pulse
					key={circle}
					{...props}
				/>
			))}
			<TouchableOpacity
				activeOpacity={1}
				onPressIn={onPressIn}
				onPressOut={onPressOut}
				style={{
					transform: [{
						scale: anim
					}]
				}}
			>
				  <View style={{ alignItems: 'center',
				  justifyContent: 'center',
				backgroundColor,
				borderRadius: size/2,
				height:size,
				width:size }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 0,
                  paddingBottom: 0
                }}
              >
                <Text
                  style={{
					   //   ...Style.fontBold,
					backgroundColor: 'transparent',
                    color: 'white',
                    alignItems: 'center',
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}
                >
                  {icon}
                  {text}
                </Text>
              </View>
              {subText?  <Text
        style={{
        //   ...Style.fontBold,
          fontSize: 10,
          color: textColor,
          backgroundColor: 'transparent',
          lineHeight: 10
        }}
      >{`${subText}`}</Text>: null}
            </View>
			</TouchableOpacity>
		</View>
	);
}

LocationPulseLoader.propTypes = {
  interval: PropTypes.number,
  size: PropTypes.number,
  pulseMaxSize: PropTypes.number,
  avatar: PropTypes.string.isRequired,
  avatarBackgroundColor: PropTypes.string,
  pressInValue: PropTypes.number,
  pressDuration: PropTypes.number,
  borderColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  getStyle: PropTypes.func,
};

LocationPulseLoader.defaultProps = {
  interval: 2000,
  size: 100,
  pulseMaxSize: 250,
  avatar: undefined,
  avatarBackgroundColor: 'white',
  pressInValue: 0.8,
  pressDuration: 150,
  pressInEasing: Easing.in,
  pressOutEasing: Easing.in,
  borderColor: '#D8335B',
  backgroundColor: '#ED225B55',
  getStyle: undefined,
};

export default LocationPulseLoader;