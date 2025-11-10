import React from 'react';

interface InfoRowProps {
  label: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const InfoRow = ({ label, icon, children }: InfoRowProps) => (
  <div className="py-3 border-b border-gray-100">
    <dt className="text-sm font-semibold text-gray-500 flex items-center">
      {icon}
      <span className={icon ? 'ml-2' : ''}>{label}</span>
    </dt>
    <dd className="mt-1 text-base text-gray-800">{children}</dd>
  </div>
);

export default InfoRow;
