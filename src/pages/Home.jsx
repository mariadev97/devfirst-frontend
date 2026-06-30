import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="font-mono-tag text-xs text-mint bg-ink inline-block px-3 py-1 rounded-full mb-6">
            console.log("primer_empleo_it")
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] tracking-tight">
            Tu falta de experiencia no es un obstáculo.
            <span className="text-violet"> Es el punto de partida.</span>
          </h1>
          <p className="text-ink-soft text-lg mt-6 leading-relaxed">
            DevFirst conecta a recién titulados IT con empresas que valoran
            el potencial, no solo el historial. Demuestra lo que sabes con
            retos técnicos, no con años de experiencia que aún no tienes.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Link
              to="/registro"
              className="bg-violet text-white font-semibold px-6 py-3 rounded-full hover:bg-ink transition-colors"
            >
              Crear mi perfil
            </Link>
            <Link
              to="/ofertas"
              className="border border-ink/15 font-semibold px-6 py-3 rounded-full hover:border-violet hover:text-violet transition-colors"
            >
              Ver ofertas
            </Link>
          </div>
        </div>

        <div className="bg-ink rounded-2xl p-6 font-mono-tag text-sm text-mint-soft shadow-xl">
          <div className="flex gap-1.5 mb-4">
            <span className="w-3 h-3 rounded-full bg-coral/70" />
            <span className="w-3 h-3 rounded-full bg-mint/70" />
            <span className="w-3 h-3 rounded-full bg-violet/70" />
          </div>
          <p className="text-white/40"># perfil_candidato.json</p>
          <p className="mt-2">
            <span className="text-violet">"stack"</span>:{" "}
            <span className="text-mint">["React", "Node", "MongoDB"]</span>,
          </p>
          <p>
            <span className="text-violet">"experiencia"</span>:{" "}
            <span className="text-mint">"0 años"</span>,
          </p>
          <p>
            <span className="text-violet">"retos_superados"</span>:{" "}
            <span className="text-mint">3</span>,
          </p>
          <p>
            <span className="text-violet">"estado"</span>:{" "}
            <span className="text-mint">"listo para el primer empleo"</span>
          </p>
        </div>
      </section>

      <section className="bg-paper-dim py-20">
        <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-8">
          <Feature
            title="Demuestra, no declares"
            text="Retos técnicos integrados en tu perfil que las empresas pueden ver directamente, sin filtros de experiencia mínima."
          />
          <Feature
            title="Salario siempre visible"
            text="Todas las ofertas publican su rango salarial. Sin sorpresas, sin procesos a ciegas."
          />
          <Feature
            title="Ofertas 'Fórmate y trabaja'"
            text="Empresas que se comprometen a formarte en la tecnología que necesitan, antes de tu incorporación."
          />
        </div>
      </section>
    </div>
  );
}

function Feature({ title, text }) {
  return (
    <div>
      <h3 className="font-display font-semibold text-lg">{title}</h3>
      <p className="text-ink-soft text-sm mt-2 leading-relaxed">{text}</p>
    </div>
  );
}
