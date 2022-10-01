import React from 'react';
// TODO 删除any
const TourContext = React.createContext<{}>({});

export const { Provider: TourProvider, Consumer: TourConsumer } = TourContext;

export default TourContext;
