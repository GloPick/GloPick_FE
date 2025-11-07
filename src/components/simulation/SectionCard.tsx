interface SectionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

const SectionCard = ({ title, icon, children }: SectionCardProps) => (
  <section className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 p-6 border-b flex items-center bg-gray-50">
      {icon}
      <span className="ml-3">{title}</span>
    </h2>
    <div className="p-6 md:p-8">{children}</div>
  </section>
);

export default SectionCard;
