import React from 'react';
import { Avatar as AntAvatar } from 'antd';

const Avatar = ({ imageUrl, altText, size }) => {
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <AntAvatar src={imageUrl} alt={altText} style={avatarStyle} />
  );
};

export default Avatar;
