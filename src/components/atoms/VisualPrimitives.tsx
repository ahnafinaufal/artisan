import { Avatar, ColorSwatch, ProgressBar, Separator, Skeleton } from "@heroui/react";
import type {
  AvatarProps,
  ColorSwatchProps,
  ProgressBarProps,
  SeparatorProps,
  SkeletonProps,
} from "@heroui/react";

export interface UserAvatarProps extends Omit<AvatarProps, "children"> {
  src?: string;
  alt: string;
  fallback: string;
}

/**
 * Atom: UserAvatar
 * Avatar dengan gambar dan fallback inisial.
 */
export function UserAvatar({ src, alt, fallback, size = "md", ...props }: UserAvatarProps) {
  return (
    <Avatar size={size} {...props}>
      {src ? <Avatar.Image src={src} alt={alt} /> : null}
      <Avatar.Fallback>{fallback}</Avatar.Fallback>
    </Avatar>
  );
}

export function Divider(props: SeparatorProps) {
  return <Separator {...props} />;
}

export function LoadingSkeleton(props: SkeletonProps) {
  return <Skeleton {...props} />;
}

export function ProgressIndicator({ value, ...props }: ProgressBarProps) {
  return (
    <ProgressBar value={value} {...props}>
      <ProgressBar.Track>
        <ProgressBar.Fill />
      </ProgressBar.Track>
    </ProgressBar>
  );
}

export function SwatchPreview(props: ColorSwatchProps) {
  return <ColorSwatch {...props} />;
}
