interface ListRowProps {
  label: string;
  items: string[];
  icon?: React.ReactNode;
}

const ListRow = ({ label, items, icon }: ListRowProps) => (
  <div className="py-3 border-b border-gray-100">
    <dt className="text-sm font-semibold text-gray-500 flex items-center">
      {icon}
      <span className={icon ? 'ml-2' : ''}>{label}</span>
    </dt>
    <dd className="mt-1 text-base text-gray-800">
      <ul className="list-disc list-inside space-y-1">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </dd>
  </div>
);

export default ListRow;
