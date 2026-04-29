import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import TextPressure from "./components/TextPressure";

type Modelo = {
  id: string;
  nombre: string;
  precio: string;
  descripcion: string;
  imagen: string;
};

const modelos: Modelo[] = [
  {
    id: "brisa",
    nombre: "Brisa 01",
    precio: "$229.900 COP",
    descripcion: "Ligero, transpirable y perfecto para caminar todo el dia sin cansancio.",
    imagen: "/images/modelo-brisa.png",
  },
  {
    id: "norte",
    nombre: "Norte City",
    precio: "$249.900 COP",
    descripcion: "Diseno urbano con suela flexible para oficina, estudio y fines de semana.",
    imagen: "/images/modelo-norte.png",
  },
  {
    id: "aura",
    nombre: "Aura Soft",
    precio: "$239.900 COP",
    descripcion: "Amortiguacion envolvente para una pisada suave desde la manana hasta la noche.",
    imagen: "/images/modelo-aura.png",
  },
];

const preguntas = [
  {
    pregunta: "Cuanto tarda el envio en Colombia?",
    respuesta:
      "En ciudades principales entregamos entre 24 y 72 horas. Si estas en zona rural, puede tardar de 3 a 5 dias habiles.",
  },
  {
    pregunta: "Puedo cambiar de talla si no me queda?",
    respuesta:
      "Si. Tienes 30 dias para cambio de talla sin costo adicional y te guiamos por WhatsApp en todo el proceso.",
  },
  {
    pregunta: "Los tennis sirven para uso diario prolongado?",
    respuesta:
      "Totalmente. Estan hechos con espuma de retorno suave y plantilla ergonomica para uso diario intensivo.",
  },
];

export default function App() {
  const [modeloActivo, setModeloActivo] = useState(modelos[0]);
  const [faqActiva, setFaqActiva] = useState<number | null>(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const modelosRef = useRef<HTMLElement | null>(null);
  const comodidadRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: modelosProgress } = useScroll({
    target: modelosRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: comodidadProgress } = useScroll({
    target: comodidadRef,
    offset: ["start end", "end start"],
  });

  const heroImageY = useSpring(useTransform(heroProgress, [0, 1], [0, 180]), {
    stiffness: 90,
    damping: 22,
  });
  const heroImageScale = useTransform(heroProgress, [0, 1], [1.05, 1.15]);
  const heroOverlayOpacity = useTransform(heroProgress, [0, 1], [0.55, 0.8]);

  const modelosListY = useSpring(useTransform(modelosProgress, [0, 1], [80, -40]), {
    stiffness: 110,
    damping: 24,
  });
  const modelosPanelY = useSpring(useTransform(modelosProgress, [0, 1], [110, -65]), {
    stiffness: 110,
    damping: 24,
  });
  const modelosPanelRotate = useTransform(modelosProgress, [0, 0.5, 1], [6, 0, -4]);

  const comodidadImageY = useSpring(useTransform(comodidadProgress, [0, 1], [120, -60]), {
    stiffness: 100,
    damping: 26,
  });

  const mensajeCompra = useMemo(
    () =>
      encodeURIComponent(
        `Hola, quiero comprar el modelo ${modeloActivo.nombre} por ${modeloActivo.precio}. Necesito asesoria de talla.`
      ),
    [modeloActivo]
  );

  return (
    <div className="bg-neutral-950 text-white">
      <header ref={heroRef} className="relative min-h-screen overflow-hidden" id="inicio">
        <motion.img
          src="/images/hero-tennis.png"
          alt="Tennis comodos en un ambiente acogedor"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ y: heroImageY, scale: heroImageScale }}
          initial={{ opacity: 0.45 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1.3, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35"
          style={{ opacity: heroOverlayOpacity }}
        />

        <nav className="relative z-20 mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 backdrop-blur-[2px] lg:px-8">
          <a href="#inicio" className="text-xl font-semibold tracking-wide">
            LUMIQ TENNIS
          </a>
          <div className="hidden items-center gap-7 text-sm text-white/85 md:flex">
            <a href="#modelos" className="transition hover:text-white">
              Modelos
            </a>
            <a href="#comodidad" className="transition hover:text-white">
              Comodidad
            </a>
            <a href="#faq" className="transition hover:text-white">
              Preguntas
            </a>
            <a
              href={`https://wa.me/573001112233?text=${mensajeCompra}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-4 py-2 font-medium text-neutral-900 transition hover:bg-neutral-200"
            >
              Comprar ahora
            </a>
          </div>
        </nav>

        <motion.div
          className="relative z-10 mx-auto flex min-h-[78vh] w-full max-w-6xl items-center px-6 pb-20 pt-10 lg:px-8"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="max-w-3xl space-y-8">
            <p className="text-xs uppercase tracking-[0.28em] text-white/70">Emprendimiento colombiano en lanzamiento</p>
            <div className="relative h-[120px] w-full sm:h-[150px] md:h-[180px] lg:h-[210px]">
              <TextPressure
                text="LUMIQ TENNIS"
                flex
                alpha={false}
                stroke={false}
                width
                weight={false}
                italic
                textColor="#ffffff"
                strokeColor="#5227FF"
                minFontSize={36}
              />
            </div>
            <h1 className="-mt-3 text-3xl font-normal leading-tight text-white/90 md:text-4xl">
              comodidad real para vender, caminar y vivir mejor
            </h1>
            <p className="max-w-xl text-lg text-white/85">
              Estamos empezando este sueno con una meta clara: convertir cada paso en bienestar. Sitio conceptual desarrollado junto a LUMIQ studios para impulsar ventas desde el primer dia.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#modelos"
                className="rounded-full bg-white px-7 py-3 font-medium text-neutral-950 transition hover:bg-neutral-200"
              >
                Ver coleccion
              </a>
              <a
                href={`https://wa.me/573001112233?text=${mensajeCompra}`}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/70 px-7 py-3 font-medium text-white transition hover:border-white hover:bg-white/10"
              >
                Asesoria por WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 z-10 h-14 w-9 -translate-x-1/2 rounded-full border border-white/40"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          <motion.div
            className="mx-auto mt-2 h-2.5 w-2.5 rounded-full bg-white"
            animate={{ y: [0, 20, 0], opacity: [1, 0.45, 1] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
        </motion.div>
      </header>

      <section className="border-y border-white/10 bg-neutral-900 py-4">
        <div className="mx-auto max-w-6xl overflow-hidden whitespace-nowrap px-6 lg:px-8">
          <motion.div
            className="inline-flex gap-12 text-sm tracking-wide text-white/70"
            animate={{ x: [0, -520] }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
          >
            <span>Lanzamiento con envio gratis en compras hoy</span>
            <span>Plantilla ergonomica de memoria suave</span>
            <span>Pago contraentrega en ciudades principales</span>
            <span>Cambios de talla sin costo en 30 dias</span>
            <span>Lanzamiento con envio gratis en compras hoy</span>
            <span>Plantilla ergonomica de memoria suave</span>
          </motion.div>
        </div>
      </section>

      <section
        ref={modelosRef}
        id="modelos"
        className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 [perspective:1200px] lg:grid-cols-[1fr_1.1fr] lg:px-8"
      >
        <motion.div className="space-y-6" style={{ y: modelosListY }}>
          <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Modelos que impulsan ventas</p>
          <h2 className="text-4xl font-semibold leading-tight">Coleccion inicial pensada para uso diario</h2>
          <p className="max-w-xl text-white/70">
            Cada referencia fue creada para clientes que buscan estilo minimal, confort y durabilidad. Selecciona un modelo para ver detalles y comprar en un clic.
          </p>
          <div className="space-y-3">
            {modelos.map((modelo) => {
              const activo = modeloActivo.id === modelo.id;
              return (
                <button
                  type="button"
                  key={modelo.id}
                  onClick={() => setModeloActivo(modelo)}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                    activo
                      ? "border-orange-300 bg-orange-100/10"
                      : "border-white/15 bg-white/[0.02] hover:border-white/35"
                  }`}
                >
                  <p className="text-lg font-medium">{modelo.nombre}</p>
                  <p className="text-sm text-white/65">{modelo.descripcion}</p>
                </button>
              );
            })}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.article
            key={modeloActivo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45 }}
            style={{ y: modelosPanelY, rotateX: modelosPanelRotate, transformStyle: "preserve-3d" }}
            className="scroll-ui-panel rounded-3xl border border-white/15 bg-white/5 p-6"
          >
            <img
              src={modeloActivo.imagen}
              alt={`Modelo ${modeloActivo.nombre}`}
              className="h-[320px] w-full rounded-2xl object-cover object-center"
            />
            <div className="mt-5 space-y-3">
              <h3 className="text-2xl font-semibold">{modeloActivo.nombre}</h3>
              <p className="text-white/75">{modeloActivo.descripcion}</p>
              <p className="text-3xl font-semibold text-orange-200">{modeloActivo.precio}</p>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`https://wa.me/573001112233?text=${mensajeCompra}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-6 py-2.5 font-medium text-neutral-900 transition hover:bg-neutral-200"
                >
                  Comprar este modelo
                </a>
                <a
                  href="#faq"
                  className="rounded-full border border-white/60 px-6 py-2.5 font-medium text-white transition hover:bg-white/10"
                >
                  Ver guia de talla
                </a>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>
      </section>

      <section ref={comodidadRef} id="comodidad" className="bg-neutral-900 py-20">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-8">
          <motion.img
            src="/images/hero-tennis.png"
            alt="Experiencia acogedora con tennis comodos"
            className="h-[460px] w-full rounded-3xl object-cover"
            style={{ y: comodidadImageY }}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Hechos para durar y enamorar</p>
            <h2 className="text-4xl font-semibold">La comodidad como propuesta principal de marca</h2>
            <div className="space-y-6 text-white/80">
              <p>
                Espuma de retorno suave, capellada respirable y suela adherente para mantener estabilidad en cada paso. Disenamos tennis para personas que caminan mucho y quieren verse bien.
              </p>
              <p>
                El resultado: clientes que vuelven a comprar porque sienten el cambio desde el primer uso. Una experiencia acogedora en producto, atencion y postventa.
              </p>
            </div>
            <a
              href="mailto:ventas@lumiqtennis.co"
              className="inline-block rounded-full border border-orange-200 px-6 py-3 font-medium text-orange-100 transition hover:bg-orange-200/10"
            >
              Hablar con el equipo de ventas
            </a>
          </motion.div>
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-4xl px-6 py-20 lg:px-8">
        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Preguntas frecuentes</p>
        <h2 className="mt-4 text-4xl font-semibold">Todo listo para comprar con confianza</h2>
        <div className="mt-10 space-y-3">
          {preguntas.map((item, index) => {
            const abierta = faqActiva === index;
            return (
              <div key={item.pregunta} className="rounded-2xl border border-white/15 bg-white/[0.02]">
                <button
                  type="button"
                  onClick={() => setFaqActiva(abierta ? null : index)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="font-medium">{item.pregunta}</span>
                  <span className="text-white/60">{abierta ? "-" : "+"}</span>
                </button>
                <AnimatePresence>
                  {abierta ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden px-5 pb-4 text-white/70"
                    >
                      {item.respuesta}
                    </motion.p>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-black px-6 py-14 lg:px-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <p className="text-2xl font-semibold">LUMIQ TENNIS</p>
            <p className="max-w-md text-sm text-white/70">
              Emprendimiento en crecimiento con foco en tennis comodos y ventas digitales de alto impacto.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`https://wa.me/573001112233?text=${mensajeCompra}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-neutral-200"
            >
              Comprar por WhatsApp
            </a>
            <a
              href="#inicio"
              className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-medium transition hover:bg-white/10"
            >
              Volver arriba
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
