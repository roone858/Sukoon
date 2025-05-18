export type CloudinaryTransformationOptions = {
  width?: number | string;
  height?: number | string;
  crop?: string;
  quality?: number | string;
  format?: string;
  gravity?: string;
  [key: string]: string | number | undefined;
};

export type ResponsiveSize = {
  width: number;
  height?: number;
  crop?: string;
  quality?: number | string;
};

export type ResponsiveSizes = {
  [key: string]: ResponsiveSize;
};