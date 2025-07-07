/* eslint-disable @typescript-eslint/no-unused-vars */
import { CLOUDINARY_CLOUD_NAME } from "../urls";
import {
  CloudinaryTransformationOptions,
  ResponsiveSizes,
} from "./cloudinaryTypes";

const CLOUD_NAME = CLOUDINARY_CLOUD_NAME;

/**
 * Generate a Cloudinary URL with transformations
 * @param publicId - The public ID of the image
 * @param options - Transformation options
 * @returns Transformed Cloudinary URL
 */
export function getCloudinaryImage(
  publicId: string,
  options: CloudinaryTransformationOptions = {}
): string {
  // Default transformations
  const defaults: CloudinaryTransformationOptions = {
    width: "auto",
    height: "auto",
    quality: "auto",
    crop: "fill",
    format: "auto",
  };

  // Merge defaults with provided options
  const transformations = { ...defaults, ...options };

  // Build transformation string
  const transformationParams = Object.entries(transformations)
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}_${value}`)
    .join(",");

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformationParams}/${publicId}`;
}
 export function resizeCloudinaryImage(originalUrl :string, width = 400) {
  return originalUrl.replace('/upload/', `/upload/w_${width}/`);
}
/**
 * Get responsive image srcSet for different screen sizes
 * @param publicId - The public ID of the image
 * @param sizes - Different size options
 * @returns srcSet string
 */
export function getResponsiveSrcSet(
  publicId: string,
  sizes: ResponsiveSizes = {}
): string {
  const defaultSizes: ResponsiveSizes = {
    small: { width: 480 },
    medium: { width: 768 },
    large: { width: 1024 },
    xlarge: { width: 1440 },
  };

  const finalSizes = { ...defaultSizes, ...sizes };

  return Object.entries(finalSizes)
    .map(([_, { width, ...options }]) => {
      const url = getCloudinaryImage(publicId, { width, ...options });
      return `${url} ${width}w`;
    })
    .join(", ");
}

/**
 * Extract public ID from Cloudinary URL
 * @param url - Cloudinary URL
 * @returns Public ID
 */
export function extractPublicId(url: string): string {
  if (!url.includes("cloudinary.com")) return url;

  const parts = url.split("/");
  const uploadIndex = parts.findIndex((part) => part === "upload");
  return parts.slice(uploadIndex + 2).join("/");
}

/**
 * Image presets for common use cases
 */
export const ImagePresets = {
  thumbnail: (publicId: string): string =>
    getCloudinaryImage(publicId, {
      width: 150,
      height: 150,
      crop: "thumb",
      gravity: "face",
    }),
  cardImage: (publicId: string): string =>
    getCloudinaryImage(publicId, {
      width: 400,
      height: 300,
      crop: "fill",
    }),
  heroImage: (publicId: string): string =>
    getCloudinaryImage(publicId, {
      width: 1600,
      height: 900,
      crop: "fill",
      quality: "80",
    }),
  optimizedWeb: (publicId: string): string =>
    getCloudinaryImage(publicId, {
      quality: "auto",
      fetch_format: "auto",
    }),
};
