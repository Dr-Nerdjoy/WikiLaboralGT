import { useState, useRef } from "react";
import {
  Scale,
  Calculator,
  Search,
  Star,
  ChevronDown,
  ChevronUp,
  Info,
  CheckCircle,
  Users,
  FileText,
  MessageCircle,
  Phone,
  Shield,
  TrendingUp,
  X,
  Menu,
  ArrowRight,
  Clock,
  Award,
  MapPin,
} from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const LAWYERS = [
  {
    id: 1,
    name: "Lic. Mariela Flores",
    specialty: "Despidos & Liquidaciones",
    tags: ["Despidos", "Indemnización", "IGSS"],
    rating: 4.9,
    reviews: 312,
    price: 150,
    avatar: "MF",
    color: "#1B4F8A",
    location: "Ciudad de Guatemala",
    experience: "12 años",
    badge: "Top Rated",
  },
  {
    id: 2,
    name: "Lic. Carlos Ajú",
    specialty: "Contratos & Relaciones Laborales",
    tags: ["Contratos", "Horas Extra", "Demandas"],
    rating: 4.8,
    reviews: 198,
    price: 150,
    avatar: "CA",
    color: "#1B4F8A",
    location: "Mixco, Guatemala",
    experience: "8 años",
    badge: "Verificado",
  },
  {
    id: 3,
    name: "Lic. Sofía Pérez",
    specialty: "IGSS & Seguridad Social",
    tags: ["IGSS", "Pensiones", "Accidentes"],
    rating: 4.7,
    reviews: 245,
    price: 150,
    avatar: "SP",
    color: "#1B4F8A",
    location: "Villa Nueva, Guatemala",
    experience: "10 años",
    badge: "Verificado",
  },
  {
    id: 4,
    name: "Lic. Roberto Xón",
    specialty: "Acoso Laboral & Discriminación",
    tags: ["Acoso", "Discriminación", "Derechos"],
    rating: 4.9,
    reviews: 167,
    price: 150,
    avatar: "RX",
    color: "#1B4F8A",
    location: "Quetzaltenango",
    experience: "15 años",
    badge: "Top Rated",
  },
  {
    id: 5,
    name: "Lic. Ana García",
    specialty: "Mujeres Trabajadoras & Maternidad",
    tags: ["Maternidad", "Discriminación", "IGSS"],
    rating: 5.0,
    reviews: 89,
    price: 150,
    avatar: "AG",
    color: "#1B4F8A",
    location: "Ciudad de Guatemala",
    experience: "6 años",
    badge: "Nuevo",
  },
  {
    id: 6,
    name: "Lic. Pedro Choc",
    specialty: "Sectores Agrícola & Maquila",
    tags: ["Maquila", "Agrícola", "Contratos"],
    rating: 4.6,
    reviews: 134,
    price: 150,
    avatar: "PC",
    color: "#1B4F8A",
    location: "Escuintla",
    experience: "9 años",
    badge: "Verificado",
  },
];

const FAQS = [
  {
    q: "¿Me pueden despedir sin pagarme indemnización?",
    a: "No. El Art. 82 del Código de Trabajo establece que si eres despedido sin causa justificada, tienes derecho a un mes de salario por cada año laborado. Si llevas menos de un año, se calcula proporcional.",
    cat: "Despidos",
  },
  {
    q: "¿Cuándo me deben pagar el Aguinaldo?",
    a: "El Aguinaldo debe pagarse en dos partes: el 50% antes del 15 de diciembre y el otro 50% antes del 15 de enero del año siguiente. Es equivalente a un salario mensual (Art. 102 inc. j Constitución y Decreto 76-78).",
    cat: "Prestaciones",
  },
  {
    q: "¿Qué es el Bono 14 y cuándo se paga?",
    a: "El Bono 14 (Decreto 42-92) es una bonificación anual equivalente a un salario mensual. Debe pagarse durante la primera quincena de julio de cada año.",
    cat: "Prestaciones",
  },
  {
    q: "¿Cuántos días de vacaciones me corresponden?",
    a: "Según el Art. 130 del Código de Trabajo, tienes derecho a 15 días hábiles de vacaciones remuneradas por cada año de trabajo continuo. Si no las tomaste, te deben pagar su equivalente en dinero.",
    cat: "Vacaciones",
  },
  {
    q: "¿Mi empleador puede descontarme el IGSS de mi salario?",
    a: "Sí, es legal. Tu aportación al IGSS es del 4.83% de tu salario. El empleador debe retenerla y pagar además su parte patronal del 12.67%. Este descuento es obligatorio por ley.",
    cat: "IGSS",
  },
  {
    q: "¿Qué hago si no me pagan horas extra?",
    a: "Las horas extra deben pagarse al 150% de tu salario ordinario (Art. 121 CT). Si no te las pagan, puedes presentar denuncia ante la Inspección General de Trabajo (IGT) sin costo.",
    cat: "Salarios",
  },
  {
    q: "¿Puedo renunciar y cobrar mis prestaciones igualmente?",
    a: "Si renuncias voluntariamente, pierdes el derecho a indemnización pero conservas: aguinaldo proporcional, Bono 14 proporcional y vacaciones no gozadas. Tienes 30 días para tramitarlo.",
    cat: "Despidos",
  },
  {
    q: "¿Cuánto tiempo tengo para demandar a mi ex empleador?",
    a: "Según el Art. 258 del Código de Trabajo, la prescripción de las acciones laborales es de 2 años. Después de ese tiempo, puedes perder el derecho a reclamar. Actúa cuanto antes.",
    cat: "Legal",
  },
  {
    q: "¿Qué es el periodo de prueba y cómo afecta mis derechos?",
    a: "El periodo de prueba no puede exceder 2 meses. Durante ese tiempo el empleador puede despedirte sin pagar indemnización, pero sí debe pagarte salario completo y afiliarte al IGSS desde el primer día.",
    cat: "Contratos",
  },
  {
    q: "¿Tengo derecho a descanso los días feriados?",
    a: "Sí. Guatemala tiene feriados nacionales reconocidos. Si trabajas en un feriado, debes recibir doble salario. El 1 de mayo (Día del Trabajo) es irrenunciable y pagado siempre.",
    cat: "Salarios",
  },
];

const TOOLTIPS = {
  indemnizacion:
      "Art. 82 Código de Trabajo: Un mes de salario por cada año laborado en caso de despido injustificado. Fracción de año se paga proporcional.",
  aguinaldo:
      "Decreto 76-78 y Art. 102 CPRG: Equivalente a un salario completo al año. Se calcula sobre el salario base promedio de los últimos 12 meses.",
  bono14:
      "Decreto 42-92: Bonificación anual de un salario mensual. Se paga en julio. Aplica para todos los trabajadores del sector privado.",
  vacaciones:
      "Art. 130 CT: 15 días hábiles por año de servicio. Si el contrato termina antes, se pagan proporcionales al tiempo laborado.",
};

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Tooltip({ text }) {
  const [show, setShow] = useState(false);
  return (
      <span className="relative inline-block ml-1">
      <button
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          className="text-blue-400 hover:text-green-400 transition-colors"
          aria-label="Ver base legal"
      >
        <Info size={14} />
      </button>
        {show && (
            <div className="absolute z-50 bottom-6 left-1/2 -translate-x-1/2 w-64 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-xl border border-blue-800 leading-relaxed">
              {text}
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 border-r border-b border-blue-800" />
            </div>
        )}
    </span>
  );
}

function StarRating({ rating }) {
  return (
      <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
          <Star
              key={i}
              size={13}
              className={i <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-gray-600"}
          />
      ))}
        <span className="ml-1 text-sm font-semibold text-white">{rating.toFixed(1)}</span>
    </span>
  );
}

function BadgePill({ label }) {
  const colors = {
    "Top Rated": "bg-amber-500/20 text-amber-300 border-amber-500/30",
    Verificado: "bg-green-500/20 text-green-300 border-green-500/30",
    Nuevo: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  };
  return (
      <span
          className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
              colors[label] || "bg-gray-700 text-gray-300"
          }`}
      >
      {label}
    </span>
  );
}

// ─── SECTIONS ───────────────────────────────────────────────────────────────

function Hero({ onNav }) {
  return (
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#0A1628]">
        {/* Background geometry */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-900/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-green-500/5 blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/10 blur-2xl" />
          {/* Grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#4B8BF4" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-6">
              <Shield size={14} className="text-green-400" />
              <span className="text-green-400 text-sm font-medium">
              Plataforma 100% gratuita para consultar
            </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Tus derechos
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              laborales
            </span>
              <br />
              al alcance de tu mano
            </h1>
            <p className="text-blue-200/80 text-lg leading-relaxed mb-8 max-w-lg">
              WikiLaboral GT es la primera plataforma guatemalteca que te explica la ley,
              calcula tus prestaciones y te conecta con abogados laboralistas verificados.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                  onClick={() => onNav("calculadora")}
                  className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white font-bold px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5"
              >
                <Calculator size={18} />
                Calcular mis prestaciones
              </button>
              <button
                  onClick={() => onNav("directorio")}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold px-6 py-3 rounded-xl transition-all duration-200"
              >
                <Users size={18} />
                Hablar con un abogado
              </button>
            </div>
            {/* Stats */}
            <div className="flex gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { val: "10,000+", label: "Consultas resueltas" },
                { val: "50+", label: "Abogados verificados" },
                { val: "100%", label: "Basado en ley GT" },
              ].map(({ val, label }) => (
                  <div key={label}>
                    <p className="text-2xl font-extrabold text-white">{val}</p>
                    <p className="text-blue-300/70 text-sm mt-0.5">{label}</p>
                  </div>
              ))}
            </div>
          </div>

          {/* Right — Feature cards */}
          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              {
                icon: <Calculator size={22} className="text-green-400" />,
                title: "Calculadora",
                desc: "Indemnización, Aguinaldo, Bono 14 y Vacaciones",
              },
              {
                icon: <Users size={22} className="text-blue-400" />,
                title: "Directorio",
                desc: "Abogados verificados listos para atenderte",
              },
              {
                icon: <Search size={22} className="text-amber-400" />,
                title: "Preguntas Frecuentes",
                desc: "Respuestas claras a dudas comunes",
              },
              {
                icon: <Scale size={22} className="text-purple-400" />,
                title: "Código de Trabajo",
                desc: "Artículos clave explicados en lenguaje simple",
              },
            ].map(({ icon, title, desc }) => (
                <div
                    key={title}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <div className="mb-3">{icon}</div>
                  <p className="font-semibold text-white mb-1">{title}</p>
                  <p className="text-sm text-blue-200/60 leading-snug">{desc}</p>
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}

function Calculadora() {
  const [form, setForm] = useState({
    salario: "",
    anios: "",
    meses: "",
    diasVacaciones: "",
    tipo: "despido",
  });
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  function calcular() {
    const errs = {};
    if (!form.salario || isNaN(form.salario) || Number(form.salario) <= 0)
      errs.salario = "Ingresa un salario válido";
    if (form.anios === "" || isNaN(form.anios) || Number(form.anios) < 0)
      errs.anios = "Ingresa los años laborados";
    if (Object.keys(errs).length) return setErrors(errs);
    setErrors({});

    const salario = parseFloat(form.salario);
    const anios = parseInt(form.anios) || 0;
    const meses = parseInt(form.meses) || 0;
    const diasVac = parseInt(form.diasVacaciones) || 0;
    const totalMeses = anios * 12 + meses;

    // Indemnización: solo en despido injustificado
    const indem = form.tipo === "despido" ? salario * (totalMeses / 12) : 0;

    // Aguinaldo proporcional (meses del año en curso / 12)
    const aguinaldo = salario * (meses / 12) + (meses === 0 && anios > 0 ? salario : 0);
    const aguinaldoProp = salario * ((meses % 12 || 12) / 12);

    // Bono 14 proporcional
    const bonoProp = salario * ((meses % 12 || 12) / 12);

    // Vacaciones no gozadas: 15 días hábiles = 15/30 de salario por año
    const vacPorAnio = salario * (15 / 30);
    const vacTotal = vacPorAnio * (totalMeses / 12) - diasVac * (salario / 30);
    const vacFinal = Math.max(vacTotal, 0);

    const total = indem + aguinaldoProp + bonoProp + vacFinal;
    setResult({ indem, aguinaldoProp, bonoProp, vacFinal, total, salario, anios, meses });
  }

  const fmt = (n) =>
      n.toLocaleString("es-GT", { style: "currency", currency: "GTQ", minimumFractionDigits: 2 });

  return (
      <section id="calculadora" className="py-20 bg-[#0D1F3C]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-4">
              <Calculator size={14} className="text-green-400" />
              <span className="text-green-400 text-sm font-medium">Herramienta gratuita</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
              Calculadora de Prestaciones
            </h2>
            <p className="text-blue-200/70 max-w-xl mx-auto">
              Ingresa tus datos y calcula en segundos lo que te corresponde según el Código de
              Trabajo de Guatemala.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-[#0A1628] border border-blue-800/40 rounded-2xl p-6">
              <div className="space-y-5">
                {/* Tipo */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-2">
                    Tipo de terminación
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { val: "despido", label: "Despido injustificado" },
                      { val: "renuncia", label: "Renuncia voluntaria" },
                    ].map(({ val, label }) => (
                        <button
                            key={val}
                            onClick={() => set("tipo", val)}
                            className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                                form.tipo === val
                                    ? "bg-blue-600 text-white border border-blue-500"
                                    : "bg-white/5 text-blue-200 border border-white/10 hover:bg-white/10"
                            }`}
                        >
                          {label}
                        </button>
                    ))}
                  </div>
                  {form.tipo === "renuncia" && (
                      <p className="mt-2 text-xs text-amber-400 flex items-center gap-1">
                        <Info size={12} /> La renuncia no genera derecho a indemnización.
                      </p>
                  )}
                </div>

                {/* Salario */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">
                    Salario mensual (Q)
                  </label>
                  <input
                      type="number"
                      placeholder="Ej. 3500"
                      value={form.salario}
                      onChange={(e) => set("salario", e.target.value)}
                      className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-500 transition-colors ${
                          errors.salario ? "border-red-500" : "border-blue-800/50"
                      }`}
                  />
                  {errors.salario && (
                      <p className="text-red-400 text-xs mt-1">{errors.salario}</p>
                  )}
                </div>

                {/* Años */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-1">
                      Años laborados
                    </label>
                    <input
                        type="number"
                        placeholder="0"
                        value={form.anios}
                        onChange={(e) => set("anios", e.target.value)}
                        className={`w-full bg-white/5 border rounded-lg px-4 py-2.5 text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-500 transition-colors ${
                            errors.anios ? "border-red-500" : "border-blue-800/50"
                        }`}
                    />
                    {errors.anios && (
                        <p className="text-red-400 text-xs mt-1">{errors.anios}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-200 mb-1">
                      Meses adicionales
                    </label>
                    <input
                        type="number"
                        placeholder="0"
                        min="0"
                        max="11"
                        value={form.meses}
                        onChange={(e) => set("meses", e.target.value)}
                        className="w-full bg-white/5 border border-blue-800/50 rounded-lg px-4 py-2.5 text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>

                {/* Días vacaciones gozadas */}
                <div>
                  <label className="block text-sm font-medium text-blue-200 mb-1">
                    Días de vacaciones ya gozados (opcional)
                  </label>
                  <input
                      type="number"
                      placeholder="0"
                      value={form.diasVacaciones}
                      onChange={(e) => set("diasVacaciones", e.target.value)}
                      className="w-full bg-white/5 border border-blue-800/50 rounded-lg px-4 py-2.5 text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <button
                    onClick={calcular}
                    className="w-full bg-green-500 hover:bg-green-400 text-white font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-green-500/30 flex items-center justify-center gap-2"
                >
                  <Calculator size={18} />
                  Calcular mis prestaciones
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="flex flex-col">
              {!result ? (
                  <div className="flex-1 bg-[#0A1628] border border-dashed border-blue-800/40 rounded-2xl flex items-center justify-center p-8">
                    <div className="text-center">
                      <Calculator size={48} className="text-blue-800 mx-auto mb-3" />
                      <p className="text-blue-300/50 text-sm">
                        Completa el formulario para ver tus resultados
                      </p>
                    </div>
                  </div>
              ) : (
                  <div className="bg-[#0A1628] border border-blue-800/40 rounded-2xl p-6 flex flex-col gap-4">
                    <h3 className="font-bold text-white text-lg">Resultado del cálculo</h3>

                    {[
                      {
                        label: "Indemnización",
                        val: result.indem,
                        tip: TOOLTIPS.indemnizacion,
                        skip: form.tipo === "renuncia",
                        color: "text-green-400",
                      },
                      {
                        label: "Aguinaldo proporcional",
                        val: result.aguinaldoProp,
                        tip: TOOLTIPS.aguinaldo,
                        color: "text-blue-400",
                      },
                      {
                        label: "Bono 14 proporcional",
                        val: result.bonoProp,
                        tip: TOOLTIPS.bono14,
                        color: "text-blue-400",
                      },
                      {
                        label: "Vacaciones no gozadas",
                        val: result.vacFinal,
                        tip: TOOLTIPS.vacaciones,
                        color: "text-amber-400",
                      },
                    ].map(({ label, val, tip, skip, color }) => (
                        <div
                            key={label}
                            className={`flex items-center justify-between py-3 border-b border-white/5 ${
                                skip ? "opacity-30" : ""
                            }`}
                        >
                    <span className="text-blue-200/80 text-sm flex items-center">
                      {label}
                      {tip && <Tooltip text={tip} />}
                      {skip && (
                          <span className="ml-2 text-xs text-red-400">(No aplica)</span>
                      )}
                    </span>
                          <span className={`font-bold ${color}`}>{fmt(val)}</span>
                        </div>
                    ))}

                    <div className="mt-2 bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-center justify-between">
                      <span className="font-bold text-white">Total estimado</span>
                      <span className="text-2xl font-extrabold text-green-400">
                    {fmt(result.total)}
                  </span>
                    </div>

                    <p className="text-xs text-blue-300/40 leading-relaxed">
                      * Cálculo orientativo basado en el Código de Trabajo de Guatemala. Para un
                      cálculo exacto, consulta con un abogado laboralista.
                    </p>

                    <button className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm">
                      <Users size={16} />
                      Hablar con un abogado para validar
                    </button>
                  </div>
              )}
            </div>
          </div>
        </div>
      </section>
  );
}

function LawyerCard({ lawyer }) {
  const [consulted, setConsulted] = useState(false);
  return (
      <div className="bg-[#0A1628] border border-blue-800/40 rounded-2xl p-5 flex flex-col gap-4 hover:border-blue-600/60 hover:shadow-xl hover:shadow-blue-900/40 transition-all duration-300 group">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center font-bold text-white text-sm border border-blue-600/40">
              {lawyer.avatar}
            </div>
            <div>
              <p className="font-bold text-white text-sm leading-tight">{lawyer.name}</p>
              <p className="text-blue-300/70 text-xs mt-0.5">{lawyer.specialty}</p>
            </div>
          </div>
          <BadgePill label={lawyer.badge} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {lawyer.tags.map((t) => (
              <span
                  key={t}
                  className="bg-blue-900/60 text-blue-300 text-xs px-2 py-0.5 rounded-full border border-blue-700/30"
              >
            {t}
          </span>
          ))}
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-2 text-xs text-blue-300/60">
        <span className="flex items-center gap-1">
          <MapPin size={11} /> {lawyer.location}
        </span>
          <span className="flex items-center gap-1">
          <Award size={11} /> {lawyer.experience} exp.
        </span>
          <span className="flex items-center gap-1">
          <MessageCircle size={11} /> {lawyer.reviews} consultas
        </span>
          <span className="flex items-center gap-1">
          <Clock size={11} /> Resp. en &lt;1 hr
        </span>
        </div>

        {/* Rating */}
        <StarRating rating={lawyer.rating} />

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <div>
            <p className="text-xs text-blue-300/50">Consulta 15 min</p>
            <p className="text-xl font-extrabold text-white">
              Q{lawyer.price}
              <span className="text-sm font-normal text-blue-300/50 ml-1">/ consulta</span>
            </p>
          </div>
          <button
              onClick={() => setConsulted(true)}
              className={`flex items-center gap-1.5 font-semibold px-4 py-2 rounded-xl text-sm transition-all duration-200 ${
                  consulted
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "bg-green-500 hover:bg-green-400 text-white hover:shadow-lg hover:shadow-green-500/30"
              }`}
          >
            {consulted ? (
                <>
                  <CheckCircle size={14} /> Solicitada
                </>
            ) : (
                <>
                  <Phone size={14} /> Consultar ahora
                </>
            )}
          </button>
        </div>
      </div>
  );
}

function Directorio() {
  const [filter, setFilter] = useState("Todos");
  const cats = ["Todos", "Despidos", "Contratos", "IGSS", "Maquila", "Acoso", "Maternidad"];
  const filtered =
      filter === "Todos"
          ? LAWYERS
          : LAWYERS.filter((l) => l.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase())));

  return (
      <section id="directorio" className="py-20 bg-[#0A1628]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-1.5 mb-4">
              <Users size={14} className="text-blue-400" />
              <span className="text-blue-400 text-sm font-medium">
              Abogados verificados & calificados
            </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
              Directorio de Expertos
            </h2>
            <p className="text-blue-200/70 max-w-xl mx-auto">
              Conecta directamente con abogados laboralistas especializados. Todos pasan por
              verificación de credenciales y colegiado activo.
            </p>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {cats.map((c) => (
                <button
                    key={c}
                    onClick={() => setFilter(c)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                        filter === c
                            ? "bg-blue-600 text-white"
                            : "bg-white/5 text-blue-300 border border-white/10 hover:bg-white/10"
                    }`}
                >
                  {c}
                </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((l) => (
                <LawyerCard key={l.id} lawyer={l} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-blue-300/50 text-sm">
              ¿Eres abogado laboralista?{" "}
              <a href="#" className="text-green-400 hover:underline font-medium">
                Solicita tu perfil verificado →
              </a>
            </p>
          </div>
        </div>
      </section>
  );
}

function FAQSection() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(null);
  const [catFilter, setCatFilter] = useState("Todas");
  const cats = ["Todas", "Despidos", "Prestaciones", "Vacaciones", "IGSS", "Salarios", "Legal", "Contratos"];

  const filtered = FAQS.filter((f) => {
    const matchCat = catFilter === "Todas" || f.cat === catFilter;
    const matchQ =
        query === "" ||
        f.q.toLowerCase().includes(query.toLowerCase()) ||
        f.a.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  return (
      <section id="faq" className="py-20 bg-[#0D1F3C]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-4">
              <Search size={14} className="text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">Respuestas basadas en ley</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
              Preguntas Frecuentes
            </h2>
            <p className="text-blue-200/70">
              Busca tu duda o explora por categoría. Todo basado en el Código de Trabajo de
              Guatemala.
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/60" />
            <input
                type="text"
                placeholder="Busca una pregunta... ej: 'despido', 'aguinaldo', 'vacaciones'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-[#0A1628] border border-blue-800/50 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-blue-300/30 focus:outline-none focus:border-blue-500 transition-colors"
            />
            {query && (
                <button
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400/60 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
            )}
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            {cats.map((c) => (
                <button
                    key={c}
                    onClick={() => setCatFilter(c)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                        catFilter === c
                            ? "bg-amber-500 text-white"
                            : "bg-white/5 text-blue-300 border border-white/10 hover:bg-white/10"
                    }`}
                >
                  {c}
                </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="space-y-2">
            {filtered.length === 0 ? (
                <div className="text-center py-12 text-blue-300/40">
                  <Search size={36} className="mx-auto mb-3 opacity-40" />
                  <p>No encontramos resultados para tu búsqueda.</p>
                  <p className="text-sm mt-1">
                    ¿Quieres hablar directamente con un abogado?{" "}
                    <a href="#directorio" className="text-green-400 hover:underline">
                      Ver directorio →
                    </a>
                  </p>
                </div>
            ) : (
                filtered.map((faq, i) => (
                    <div
                        key={i}
                        className="bg-[#0A1628] border border-blue-800/40 rounded-xl overflow-hidden hover:border-blue-700/60 transition-colors"
                    >
                      <button
                          className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                          onClick={() => setOpen(open === i ? null : i)}
                      >
                        <div className="flex items-center gap-3">
                    <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs px-2 py-0.5 rounded-full whitespace-nowrap">
                      {faq.cat}
                    </span>
                          <span className="font-medium text-white text-sm leading-snug">{faq.q}</span>
                        </div>
                        {open === i ? (
                            <ChevronUp size={16} className="text-blue-400 shrink-0" />
                        ) : (
                            <ChevronDown size={16} className="text-blue-400 shrink-0" />
                        )}
                      </button>
                      {open === i && (
                          <div className="px-5 pb-4 border-t border-white/5">
                            <p className="text-blue-200/80 text-sm leading-relaxed pt-3">{faq.a}</p>
                            <div className="mt-3 flex items-center gap-1 text-xs text-green-400">
                              <CheckCircle size={12} />
                              <span>Verificado con el Código de Trabajo de Guatemala</span>
                            </div>
                          </div>
                      )}
                    </div>
                ))
            )}
          </div>
        </div>
      </section>
  );
}

function Navbar({ active, onNav }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { id: "hero", label: "Inicio" },
    { id: "calculadora", label: "Calculadora" },
    { id: "directorio", label: "Directorio" },
    { id: "faq", label: "Preguntas" },
  ];
  return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1628]/95 backdrop-blur-md border-b border-blue-800/30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
              onClick={() => onNav("hero")}
              className="flex items-center gap-2 font-extrabold text-white text-lg"
          >
            <Scale size={22} className="text-green-400" />
            <span>
            Wiki<span className="text-green-400">Laboral</span>{" "}
              <span className="text-blue-400">GT</span>
          </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ id, label }) => (
                <button
                    key={id}
                    onClick={() => onNav(id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        active === id
                            ? "bg-blue-700/40 text-white"
                            : "text-blue-300/70 hover:text-white hover:bg-white/5"
                    }`}
                >
                  {label}
                </button>
            ))}
            <button
                onClick={() => onNav("directorio")}
                className="ml-4 bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Hablar con abogado
            </button>
          </div>

          {/* Mobile menu */}
          <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
            <div className="md:hidden bg-[#0A1628] border-t border-blue-800/30 px-6 py-4 flex flex-col gap-2">
              {links.map(({ id, label }) => (
                  <button
                      key={id}
                      onClick={() => { onNav(id); setMenuOpen(false); }}
                      className="text-left py-2.5 text-blue-200 font-medium hover:text-white transition-colors border-b border-white/5"
                  >
                    {label}
                  </button>
              ))}
              <button
                  onClick={() => { onNav("directorio"); setMenuOpen(false); }}
                  className="mt-2 w-full bg-green-500 text-white font-semibold py-3 rounded-xl text-sm"
              >
                Hablar con un abogado
              </button>
            </div>
        )}
      </nav>
  );
}

function Footer({ onNav }) {
  return (
      <footer className="bg-[#060F1E] border-t border-blue-900/40 py-12 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 font-extrabold text-white text-lg mb-3">
              <Scale size={20} className="text-green-400" />
              <span>
              Wiki<span className="text-green-400">Laboral</span>{" "}
                <span className="text-blue-400">GT</span>
            </span>
            </div>
            <p className="text-blue-300/50 text-sm leading-relaxed">
              Plataforma de información laboral para trabajadores guatemaltecos.
            </p>
          </div>
          {[
            {
              title: "Herramientas",
              links: [
                { label: "Calculadora de prestaciones", id: "calculadora" },
                { label: "Directorio de abogados", id: "directorio" },
                { label: "Preguntas frecuentes", id: "faq" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Código de Trabajo GT", id: null },
                { label: "Derechos del trabajador", id: null },
                { label: "Inspección General de Trabajo", id: null },
              ],
            },
            {
              title: "Contacto",
              links: [
                { label: "info@wikilaboral.gt", id: null },
                { label: "WhatsApp: +502 0000-0000", id: null },
                { label: "Ciudad de Guatemala", id: null },
              ],
            },
          ].map(({ title, links }) => (
              <div key={title}>
                <p className="font-semibold text-white mb-3 text-sm">{title}</p>
                <ul className="space-y-2">
                  {links.map(({ label, id }) => (
                      <li key={label}>
                        <button
                            onClick={() => id && onNav(id)}
                            className="text-blue-300/50 hover:text-white text-sm transition-colors text-left"
                        >
                          {label}
                        </button>
                      </li>
                  ))}
                </ul>
              </div>
          ))}
        </div>
        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-blue-300/30 text-xs">
            © 2025 WikiLaboral GT. Plataforma informativa — no reemplaza asesoría legal.
          </p>
          <p className="text-blue-300/30 text-xs">
            Basado en el Código de Trabajo, Decreto 1441 del Congreso de la República de Guatemala.
          </p>
        </div>
      </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState("hero");
  const refs = {
    hero: useRef(null),
    calculadora: useRef(null),
    directorio: useRef(null),
    faq: useRef(null),
  };

  const onNav = (id) => {
    setActive(id);
    const el = document.getElementById(id) || refs[id]?.current;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
      <div className="min-h-screen bg-[#0A1628] font-sans">
        <Navbar active={active} onNav={onNav} />
        <main className="pt-16">
          <div id="hero">
            <Hero onNav={onNav} />
          </div>
          <Calculadora />
          <Directorio />
          <FAQSection />
        </main>
        <Footer onNav={onNav} />
      </div>
  );
}
