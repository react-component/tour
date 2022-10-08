import React from 'react';

const TourContext = React.createContext<{
  currentStep: number;
  setCurrentStep: (currentStep: number) => void;
  mergedMask: boolean;
  setMergedMask: (mergedMask: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}>({
  currentStep: 0,
  setCurrentStep: () => {},
  mergedMask: false,
  setMergedMask: () => {},
  open: true,
  setOpen: () => {},
});

export const { Provider: TourProvider, Consumer: TourConsumer } = TourContext;

export default TourContext;
