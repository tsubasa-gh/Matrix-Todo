declare module 'react-swipeable-views' {
    import * as React from 'react';
  
    export interface SwipeableViewsProps {
      index?: number;
      onChangeIndex?: (index: number, indexLatest: number) => void;
      enableMouseEvents?: boolean;
      children?: React.ReactNode;
      axis?: 'x' | 'x-reverse' | 'y' | 'y-reverse';
      resistance?: boolean;
      ignoreNativeScroll?: boolean;
      animateHeight?: boolean;
      animateTransitions?: boolean;
      springConfig?: object;
      containerStyle?: React.CSSProperties;
      style?: React.CSSProperties;
      slideStyle?: React.CSSProperties;
      disabled?: boolean;
      hysteresis?: number;
      threshold?: number;
    }
  
    const SwipeableViews: React.ComponentType<SwipeableViewsProps>;
    export default SwipeableViews;
  }
  