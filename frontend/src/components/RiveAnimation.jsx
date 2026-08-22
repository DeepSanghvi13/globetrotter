import React from 'react';
import { useRive, Layout, Fit, Alignment } from '@rive-app/react-canvas';

const RiveAnimation = ({ src, width = '100%', height = '100%', stateMachines, autoplay = true }) => {
  const { RiveComponent } = useRive({
    src,
    stateMachines,
    autoplay,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  return (
    <div className="rive-container" style={{ width, height }}>
      <RiveComponent style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default RiveAnimation;
