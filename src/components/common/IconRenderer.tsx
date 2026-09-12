import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import { GitHubIcon, LinkedInIcon, TwitterIcon, InstagramIcon } from './BrandIcons';

interface IconRendererProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export const IconRenderer: React.FC<IconRendererProps> = ({ name, ...props }) => {
  // Check custom brand icons first
  if (name.toLowerCase() === 'github') return <GitHubIcon size={props.size ? Number(props.size) : 20} className={props.className} />;
  if (name.toLowerCase() === 'linkedin') return <LinkedInIcon size={props.size ? Number(props.size) : 20} className={props.className} />;
  if (name.toLowerCase() === 'twitter' || name.toLowerCase() === 'x') return <TwitterIcon size={props.size ? Number(props.size) : 20} className={props.className} />;
  if (name.toLowerCase() === 'instagram') return <InstagramIcon size={props.size ? Number(props.size) : 20} className={props.className} />;

  // Dynamic Lucide icon lookup with fallback
  const iconsMap = LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>;
  const IconComponent = iconsMap[name] || LucideIcons.Code;
  
  return <IconComponent {...props} />;
};
