import React from 'react';

export function SkillIcon({ Icon, hoverColor }: { Icon: React.ElementType, hoverColor: string }) {
  return (
    <div className={`text-[16px] transition-colors duration-300 text-current opacity-85 hover:opacity-100 ${hoverColor} cursor-pointer flex items-center justify-center`}>
      <Icon className="w-4 h-4" />
    </div>
  );
}
