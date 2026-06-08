const skills = [
  { title: "Frontend", items: ["React", "Tailwind", "HTML", "CSS", "JS"] },
  { title: "Backend", items: ["Node.js", "Express"] },
  { title: "Database", items: ["MongoDB", "MySQL"] },
  { title: "Tools", items: ["Git", "Postman", "Vite"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">

      <h2 className="text-3xl font-semibold mb-10">Technical Skills</h2>

      <div className="grid md:grid-cols-2 gap-6">

        {skills.map((group, i) => (
          <div
            key={i}
            className="p-6 border rounded-lg dark:border-white/10 hover:shadow-lg transition"
          >
            <h3 className="font-semibold mb-4">{group.title}</h3>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm rounded-md bg-gray-100 dark:bg-white/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}