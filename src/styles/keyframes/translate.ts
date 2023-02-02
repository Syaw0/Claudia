const keyframe: Keyframe[] = [
  { transform: "translate(0)" },
  { transform: "translate(-18rem)" },
];

const timing: KeyframeAnimationOptions = {
  duration: 1000,
  fill: "both",
  easing: "ease",
};

const keyframeTranslateToRight: Keyframe[] = [
  { transform: "translate(0)" },
  { transform: "translate(21rem)" },
];

const timingTranslateToRight: KeyframeAnimationOptions = {
  duration: 1000,
  fill: "both",
  easing: "ease",
};

const keyframeFadeIn: Keyframe[] = [{ opacity: 1 }, { opacity: 0 }];

const timingFadeIn: KeyframeAnimationOptions = {
  duration: 1000,
  fill: "both",
  easing: "ease",
};

export {
  timing,
  keyframe,
  keyframeTranslateToRight,
  timingTranslateToRight,
  keyframeFadeIn,
  timingFadeIn,
};
