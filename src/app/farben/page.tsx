export default function ColorDemo() {
  const colors = [
    { name: "pprimary", shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
    { name: "psecondary", shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
    { name: "psubjects", shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
    { name: "pplaces", shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
    { name: "ppics", shades: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tailwind Custom Colors Preview</h1>
      <div className="grid grid-cols-5 gap-1 w-fit">
        {colors.map((color) => (
          <div key={color.name} className="flex flex-col justify-start">
            <h2 className="text-xl font-semibold mb-1">{color.name}</h2>
            <div className="grid grid-rows-10 gap-0">
              {color.shades.map((shade) => (
                <div key={shade} className={`w-20 h-20 flex items-center justify-center text-sm text-white border border-gray-200 bg-${color.name}-${shade}`}>
                  {shade}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
