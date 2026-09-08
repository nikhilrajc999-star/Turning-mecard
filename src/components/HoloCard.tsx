import React, { useRef, useState } from 'react';

interface HoloCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  shockwaveOnClick?: boolean;
}

export const HoloCard: React.FC<HoloCardProps> = ({
  children,
  className = '',
  onClick,
  shockwaveOnClick = false
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isShockwave, setIsShockwave] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -8;
    const rotY = ((x - centerX) / centerX) * 8;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) translateY(-4px)`
    );
    setGlarePos({
      x: Math.round((x / rect.width) * 100),
      y: Math.round((y / rect.height) * 100)
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)');
  };

  const handleClick = () => {
    if (shockwaveOnClick) {
      setIsShockwave(false);
      requestAnimationFrame(() => {
        setIsShockwave(true);
        setTimeout(() => setIsShockwave(false), 550);
      });
    }
    if (onClick) onClick();
  };

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`holo-3d-card relative ${isShockwave ? 'pulse-shockwave' : ''} ${className}`}
      style={{
        transform: transformStyle,
        ['--mouse-x' as string]: `${glarePos.x}%`,
        ['--mouse-y' as string]: `${glarePos.y}%`
      }}
    >
      <div
        className="holo-glare-layer"
        style={{ opacity: isHovered ? 1 : 0 }}
      />
      {children}
    </div>
  );
};
