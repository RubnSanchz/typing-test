import type { TextPassage } from '@/types/domain'

// Catalogue of Spanish text passages.
// Each passage is ~40-80 words — long enough for a 60 s test at average speed.
// Add more entries freely; the selector picks one at random each session.
const passages: TextPassage[] = [
  {
    id: 'es-01',
    lang: 'es',
    text: 'El sol bajaba y el tren llegó al fin de la ruta. Ana bajó con su bolso y miró la plaza. Vio un bar, una pan tienda y un gato gris en la acera. Pidió pan, café y agua. Luego se sentó en un banco y oyó el ruido de la gente al pasar.',
  },
  {
    id: 'es-02',
    lang: 'es',
    text: 'Hoy el móvil sirve para casi todo. Con él lees, pagas, hablas y ves fotos. Hace poco, gran parte de eso era raro o muy caro. Ahora es normal en casa, en bus y en la calle. Aun así, mucha gente quiere ir con más calma y usar menos pantallas al día.',
  },
  {
    id: 'es-03',
    lang: 'es',
    text: 'En el mercado hay fruta, pan y queso de la zona. Los puestos se abren muy pronto y la plaza huele a café. La gente mira, toca y elige con calma. Un niño pide fresas y su madre compra tomates. Al salir, casi todos se paran a hablar un rato antes de volver a casa.',
  },
  {
    id: 'es-04',
    lang: 'es',
    text: 'La música puede cambiar el tono de un día. Una pieza suave baja la prisa y da paz. Un ritmo vivo te hace mover los pies sin pensar. No hace falta saber de notas para gozarla. Basta con parar un minuto, cerrar los ojos y dejar que el sonido haga su trabajo.',
  },
  {
    id: 'es-05',
    lang: 'es',
    text: 'Aprender otra lengua da muchas puertas. Al inicio cuesta, pero luego todo fluye mejor. Con pocas palabras ya puedes pedir, saludar y dar las gracias. Cada día sumas algo: una frase corta, un verbo útil, un sonido nuevo. Con tiempo y uso, hablar deja de dar miedo y se vuelve natural.',
  },
  {
    id: 'es-06',
    lang: 'es',
    text: 'El mar cambia a cada hora. A veces está liso y azul; otras, gris y con olas altas. En el puerto se oyen cuerdas, aves y motores. Los barcos van y vuelven sin parar. Quien vive cerca del agua aprende a mirar el cielo, sentir el viento y salir solo cuando todo está bien.',
  },
  {
    id: 'es-07',
    lang: 'es',
    text: 'Cocinar en casa no tiene que ser difícil. Con pan, aceite, sal y tomate ya sale algo rico. Si hay arroz, puedes hacer una cena para toda la familia. Mientras cuece, pones la mesa y hablas del día. Al final, comer juntos vale tanto como la receta en sí.',
  },
  {
    id: 'es-08',
    lang: 'es',
    text: 'Leer un libro da aire a la mente. En pocas hojas viajas a otro sitio sin salir del sofá. Hay tramas de risa, de miedo o de amor. Si un texto no te gusta, cambias y sigues. Lo mejor es hallar esa historia que te hace decir: una más y luego duermo.',
  },
  {
    id: 'es-09',
    lang: 'es',
    text: 'La ciudad va rápido casi todo el día. Hay luces, bus, motos y gente en cada cruce. Aun con tanto ruido, siempre hay un parque o una calle sin tráfico. Allí puedes sentarte un rato, beber agua y bajar el pulso. Luego vuelves a la ruta con la cabeza más clara.',
  },
  {
    id: 'es-10',
    lang: 'es',
    text: 'Hacer deporte ayuda al cuerpo y a la mente. No importa si corres, nadas o juegas al balón. Lo clave es ser constante y no parar a la primera. A veces ganas, otras no, y ambas cosas enseñan. Con el tiempo notas más fuerza, mejor sueño y más ganas de empezar el día.',
  },
  {
    id: 'es-11',
    lang: 'es',
    text: 'Una foto guarda un momento en un clic. Puede ser un viaje, una comida o una tarde de lluvia. No hace falta una gran cámara para lograr algo bonito. Con buena luz y calma, el móvil basta. Luego miras esa imagen y vuelves por un segundo al mismo lugar donde la tomaste.',
  },
  {
    id: 'es-12',
    lang: 'es',
    text: 'Cuidar el clima es tarea de todos. No solo de leyes o de grandes marcas. En casa puedes usar menos luz, gastar menos agua y separar bien la basura. También ayuda ir a pie o en bus cuando se pueda. Son pasos pequeños, pero juntos hacen una gran diferencia con los años.',
  },
  {
    id: 'es-13',
    lang: 'es',
    text: 'Dormir bien te cambia el día. Si duermes poco, todo cuesta más: pensar, hablar y decidir. Una rutina simple ayuda mucho. Cena pronto, baja la luz y deja el móvil lejos de la cama. Al cabo de unos días notas más foco, mejor humor y menos cansancio al despertar.',
  },
  {
    id: 'es-14',
    lang: 'es',
    text: 'Un jardín pide tiempo y calma. Riegas, podas y esperas sin prisa. No todo brota el mismo día, y eso está bien. Ver una planta crecer da una paz rara y buena. Con tierra en las manos, la mente baja de ritmo y el cuerpo se siente más presente.',
  },
  {
    id: 'es-15',
    lang: 'es',
    text: 'Viajar no es solo hacer fotos. Es mirar con ojos nuevos lo que pasa cerca y lejos. Pruebas platos, oyes acentos y aprendes otras formas de vivir. A veces no hace falta ir muy lejos; basta un tren corto y ganas de andar. Siempre vuelves con ideas frescas y más preguntas.',
  },
  {
    id: 'es-16',
    lang: 'es',
    text: 'La IA ya está en muchas tareas del día. Te sugiere rutas, ordena fotos y ayuda a buscar datos. Puede ahorrar tiempo, sí, pero no debe decidir todo por ti. Conviene usarla con criterio y revisar cada paso. La meta es que sume valor sin quitar juicio humano.',
  },
  {
    id: 'es-17',
    lang: 'es',
    text: 'Ir al teatro tiene algo especial. Ves a la gente actuar a pocos metros y todo pasa en vivo. Si hay un fallo, sigue la obra, y eso la hace única. No es como ver una serie en casa. Sales con frases en la cabeza y con ganas de hablar de lo que viste.',
  },
  {
    id: 'es-18',
    lang: 'es',
    text: 'Las mates están en casi todo: en el reloj, en una compra o en una receta. Saber sumar, restar y medir bien evita muchos líos. No se trata solo de notas en clase, sino de pensar con orden. Con práctica, lo que antes parecía difícil se vuelve claro y útil.',
  },
  {
    id: 'es-19',
    lang: 'es',
    text: 'La amistad se cuida con gestos simples. Un mensaje corto, una llamada o un café a tiempo valen mucho. No hace falta hablar cada día, pero sí estar cuando hace falta. Con los años, los planes cambian, mas el buen trato queda. Los amigos de verdad hacen la vida más fácil.',
  },
  {
    id: 'es-20',
    lang: 'es',
    text: 'Ver cine es una forma de parar el mundo por dos horas. Te sientas, apagas el móvil y sigues una trama de inicio a fin. A veces ríes, otras lloras o te quedas pensando. Una buena peli no se olvida rápido. Te acompaña días y vuelve en charlas con amigos.',
  },
  {
    id: 'es-21',
    lang: 'es',
    text: 'El silencio ayuda más de lo que parece. Tras un día con mucho ruido, unos minutos de calma hacen bien. Sin música ni voz, la mente se ordena y el cuerpo baja tensión. No es estar solo por pena; es darte un descanso real. Luego vuelves con más foco y mejor tono.',
  },
  {
    id: 'es-22',
    lang: 'es',
    text: 'Trabajar en equipo sale mejor cuando todos escuchan. Si cada uno habla claro y cumple su parte, el plan avanza sin tanto roce. Es normal que haya dudas o choques, pero se resuelven con respeto. Al final, un grupo bien unido logra más que una sola persona por su cuenta.',
  },
  {
    id: 'es-23',
    lang: 'es',
    text: 'El invierno trae días fríos y luz corta. Da ganas de manta, sopa y libro en casa. Fuera hay menos ruido y más aire limpio al andar. Si sale el sol, todo brilla de un modo muy claro. Es una época lenta que invita a parar y tomar las cosas con calma.',
  },
  {
    id: 'es-24',
    lang: 'es',
    text: 'El mar da vida y también trabajo. De él sale comida, ruta y aire limpio para el planeta. Por eso hay que cuidarlo bien. Menos plástico en la playa, menos basura en ríos y más respeto por la pesca. Si lo hacemos hoy, mañana habrá agua sana y costa viva para todos.',
  },
  {
    id: 'es-25',
    lang: 'es',
    text: 'Ser creativo no es solo pintar o cantar. También es hallar una idea útil en un día normal. Cambiar una ruta, ordenar mejor tu mesa o probar una mezcla nueva al cocinar son actos de creación. Si te dejas probar sin miedo al fallo, salen soluciones que no veías antes.',
  },
]

/**
 * Returns a randomly selected passage from the catalogue.
 * Pass a seed-based index if you need reproducibility in tests.
 */
export function getRandomPassage(): TextPassage {
  const index = Math.floor(Math.random() * passages.length)
  return passages[index]
}

export default passages
