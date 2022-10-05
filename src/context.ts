import React from 'react';
// TODO 删除any
const TourContext = React.createContext<{
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  mergeMask: boolean;
  setMergeMask: (mergeMask: boolean) => void;
}>({
  currentStep: 0,
  setCurrentStep: () => {},
  mergeMask: false,
  setMergeMask: () => {},
});

export const { Provider: TourProvider, Consumer: TourConsumer } = TourContext;

export default TourContext;
