import { useRef, useMemo, useEffect, useState } from "react";
import { Animated, Easing } from "react-native";

export default (color: string): any[] => {
  const anim = useMemo(() => new Animated.Value(0), [color]);
  const [finished, setFinished] = useState(true)
  const currentColor = useRef(color);
  const nextColor = useMemo(()=> color, [color]);

  const animColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [currentColor.current, nextColor],
  });

  useEffect(() => {
    setFinished(false)
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: false,
      speed: 100
    }).start(() => {
      currentColor.current = nextColor;
      setFinished(true)
    });
  }, [color]);

  return [animColor, finished];
};
