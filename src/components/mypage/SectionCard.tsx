const SectionCard = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <section className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 p-6 border-b bg-gray-50">{title}</h2>
      <div className="p-6 md:p-8">{children}</div>
    </section>
  );
};

export default SectionCard;
