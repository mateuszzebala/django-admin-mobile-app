import { useRef, useMemo, useEffect, useState } from "react";
import { Animated, Easing } from "react-native";

export default (position: number): any[] => {
  const anim = useMemo(() => new Animated.Value(0), [position]);
  const [finished, setFinished] = useState(true)
  const currentPosition = useRef(position);
  const nextPosition = useMemo(() => position, [position]);

  const animPosition = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [currentPosition.current, position],
  });

  useEffect(() => {
    setFinished(false)
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: false,
      speed: 100
    }).start(() => {
        currentPosition.current = nextPosition;
      setFinished(true)
    });
  }, [position]);

  return [animPosition, finished];
};
