import React from 'react';
import { CloudinaryTransformationOptions, ResponsiveSizes } from '../../util/cloudinaryUtils/cloudinaryTypes';
import { getCloudinaryImage, getResponsiveSrcSet } from '../../util/cloudinaryUtils';


interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  className?: string;
  width: number;
  height?: number;
  transformations?: CloudinaryTransformationOptions;
  responsiveSizes?: ResponsiveSizes;
  loading?: 'eager' | 'lazy';
}

const CloudinaryImage: React.FC<CloudinaryImageProps> = ({
  publicId,
  alt,
  className,
  width,
  height,
  transformations = {},
  responsiveSizes,
  loading = 'lazy'
}) => {
  const defaultImg = getCloudinaryImage(publicId, {
    width,
    height,
    ...transformations
  });

  const defaultResponsiveSizes: ResponsiveSizes = {
    sm: { width: Math.floor(width * 0.5) },
    md: { width },
    lg: { width: Math.floor(width * 1.5) }
  };

  const srcSet = getResponsiveSrcSet(
    publicId,
    responsiveSizes || defaultResponsiveSizes
  );

  return (
    <img
      src={defaultImg}
      srcSet={srcSet}
      sizes={`(max-width: 768px) ${Math.floor(width * 0.5)}px, ${width}px`}
      alt={alt}
      className={className}
      loading={loading}
      width={width}
      height={height}
    />
  );
};

export default CloudinaryImage;