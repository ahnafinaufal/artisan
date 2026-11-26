import { AvatarGroup, Tooltip } from "@heroui/react";
import { UserAvatar } from "../atoms";

export interface AvatarMember {
  id: string;
  name: string;
  fallback: string;
  src?: string;
}

export interface AvatarStackProps {
  members: AvatarMember[];
  size?: "sm" | "md" | "lg";
}

/**
 * Molecule: AvatarStack
 * Menggabungkan AvatarGroup, UserAvatar (atom), dan Tooltip.
 */
export function AvatarStack({ members, size = "sm" }: AvatarStackProps) {
  return (
    <AvatarGroup>
      {members.map((member) => (
        <Tooltip key={member.id}>
          <Tooltip.Trigger>
            <UserAvatar
              size={size}
              src={member.src}
              alt={member.name}
              fallback={member.fallback}
            />
          </Tooltip.Trigger>
          <Tooltip.Content>{member.name}</Tooltip.Content>
        </Tooltip>
      ))}
    </AvatarGroup>
  );
}
