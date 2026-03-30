import type { TextPassage } from '@/types/domain'

// Catalogue of Spanish text passages.
// Each passage has at least 100 words to support longer typing sessions.
// Add more entries freely; the selector picks one at random each session.
const passages: TextPassage[] = [
  {
    id: 'es-01',
    lang: 'es',
    text: 'La tarde caía sobre la estación cuando Lucía bajó del tren con una mochila ligera y una libreta en la mano. Había pasado semanas esperando ese viaje corto, no por turismo, sino por el placer simple de caminar sin prisa por un pueblo nuevo. Cruzó la plaza principal, miró las fachadas antiguas, escuchó el ruido de las tazas en una terraza y notó el olor a pan recién hecho que salía de una esquina. Compró agua, fruta y un bocadillo, se sentó junto a una fuente de piedra y observó a la gente saludarse por su nombre. En pocos minutos sintió que el tiempo iba más lento y que esa calma valía mucho más que cualquier plan apretado.',
  },
  {
    id: 'es-02',
    lang: 'es',
    text: 'El teléfono móvil se ha vuelto una herramienta central en la vida diaria, pero su utilidad real depende del modo en que cada persona decide usarlo. Sirve para leer noticias, pagar una compra, hablar con amigos, revisar un mapa o guardar una idea antes de que se pierda. Sin embargo, esa misma comodidad puede llenar el día de interrupciones pequeñas que desgastan la atención sin que uno lo note enseguida. Por eso cada vez más gente intenta poner límites claros, apagar notificaciones innecesarias y recuperar momentos sin pantalla. No se trata de rechazar la tecnología, sino de usarla con criterio para que aporte valor y no termine ocupando cada minuto libre.',
  },
  {
    id: 'es-03',
    lang: 'es',
    text: 'En el mercado del sábado la actividad empieza antes de que salga bien el sol y, aun así, nadie parece tener prisa. Los puestos de fruta se alinean junto a los de pan, queso, miel y flores, y cada vendedor conoce a buena parte de sus clientes habituales. Una mujer pregunta por tomates de temporada, un hombre compara aceitunas y dos niños insisten en llevar fresas aunque todavía faltan cosas por comprar. Entre conversaciones, bolsas y monedas, también hay tiempo para comentar el tiempo, el partido del fin de semana o la receta que mejor sale con cierto tipo de cebolla. Ir al mercado no es solo hacer una compra; es participar por un rato en la vida compartida del barrio.',
  },
  {
    id: 'es-04',
    lang: 'es',
    text: 'La música tiene una capacidad extraña y poderosa para cambiar el tono completo de un día común. Una melodía tranquila puede bajar la tensión después de una mañana pesada, mientras que un ritmo vivo puede devolver energía cuando el cuerpo pide pausa. No hace falta entender teoría, distinguir instrumentos o conocer autores para sentir ese efecto. Basta con escuchar con un poco de atención y dejar que la pieza ocupe el espacio interior que a veces llenamos con ruido. Hay canciones que acompañan una caminata, otras que ordenan la cabeza mientras se trabaja y algunas que simplemente abren un recuerdo muy preciso. Por eso muchas personas vuelven a ciertas listas una y otra vez, como quien regresa a un lugar conocido.',
  },
  {
    id: 'es-05',
    lang: 'es',
    text: 'Aprender otra lengua rara vez es un proceso rápido, pero casi siempre acaba cambiando la forma en que una persona mira el mundo. Al principio cuesta recordar vocabulario, ordenar frases y entender sonidos que antes parecían iguales. Luego llegan pequeños avances que animan mucho: pedir un café sin dudar, entender un anuncio en la calle o seguir una conversación sencilla sin traducir cada palabra en la cabeza. Con el tiempo, la práctica deja de sentirse como una tarea y empieza a formar parte de la rutina diaria. Leer, escuchar y hablar un poco cada día suele dar mejores resultados que estudiar de golpe una vez por semana. La clave no es hacerlo perfecto, sino mantenerse constante hasta que el idioma deje de parecer ajeno.',
  },
  {
    id: 'es-06',
    lang: 'es',
    text: 'Quien vive cerca del mar aprende pronto que el agua nunca se repite del todo. Hay mañanas en las que la superficie parece quieta, casi lisa, y otras en las que el viento levanta olas cortas que golpean el puerto con fuerza constante. Los pescadores miran el cielo antes de salir, comprueban las cuerdas, revisan el motor y hablan poco porque ya saben leer muchas señales sin nombrarlas. En el muelle se mezclan el olor a sal, el sonido de las gaviotas y el golpear de los cascos contra la madera. Para algunos es solo paisaje, pero para otros el mar es horario, sustento y escuela. Enseña paciencia, respeto y la costumbre de no dar nunca nada por seguro.',
  },
  {
    id: 'es-07',
    lang: 'es',
    text: 'Cocinar en casa no tiene por qué convertirse en una tarea complicada para que el resultado sea bueno y agradable. Muchas veces basta con ingredientes simples, algo de organización y la voluntad de reservar un rato tranquilo antes de comer. Un arroz con verduras, una sopa ligera o una tortilla bien hecha pueden resolver una cena completa sin exigir recetas largas ni técnicas raras. Mientras algo cuece a fuego lento, se puede poner la mesa, cortar pan, comentar el día o simplemente descansar unos minutos lejos del teléfono. Ese tiempo también forma parte de la comida. Al final importa el sabor, claro, pero también el gesto de preparar algo propio y compartirlo sin prisa con quienes están alrededor.',
  },
  {
    id: 'es-08',
    lang: 'es',
    text: 'Leer un libro sigue siendo una de las formas más directas de detener el ruido exterior sin dejar de moverse por dentro. En unas pocas páginas una persona puede entrar en otra época, otra ciudad o la cabeza de alguien muy distinto a ella. Hay historias que entretienen, otras que incomodan y algunas que obligan a pensar durante días enteros después de cerrar la última hoja. No todos los libros funcionan para todos los momentos, y esa es parte de la gracia. A veces uno busca una trama ligera para descansar y otras necesita un ensayo que ordene ideas dispersas. Lo importante es encontrar esa lectura que sostiene la atención con naturalidad y hace que el tiempo pase de una manera más limpia y concentrada.',
  },
  {
    id: 'es-09',
    lang: 'es',
    text: 'La ciudad empuja a moverse rápido incluso cuando no hay una razón clara para hacerlo. Entre semáforos, motos, autobuses, obras y pantallas, cada trayecto parece pedir una velocidad un poco mayor que la anterior. Sin embargo, incluso en los barrios más activos siempre existe algún espacio donde el ritmo baja de golpe. Puede ser un parque pequeño, una calle sin tráfico, una biblioteca o una plaza que queda medio escondida entre edificios altos. Esos lugares sirven como pausa real y no solo como decorado. Sentarse diez minutos, beber agua, mirar alrededor y respirar sin mirar el reloj cambia más de lo que parece. Después cuesta menos retomar tareas, hablar con calma y seguir el día con la cabeza menos saturada.',
  },
  {
    id: 'es-10',
    lang: 'es',
    text: 'Hacer deporte con cierta regularidad suele mejorar mucho más que la condición física. También cambia el humor, el descanso y la forma en que una persona enfrenta el cansancio del día a día. No importa demasiado si la actividad elegida es correr, nadar, montar en bici, bailar o jugar un partido con amigos. Lo que marca la diferencia es la constancia, incluso cuando al principio cuesta mantenerla. Algunos días el cuerpo responde bien y otros parece más pesado, pero ambos tipos de sesión enseñan algo útil. Con las semanas se nota más resistencia, mejor postura y una sensación de energía más estable. Además, hacer ejercicio obliga a salir un rato de la pantalla y volver a prestar atención al propio cuerpo.',
  },
  {
    id: 'es-11',
    lang: 'es',
    text: 'Una fotografía sencilla puede guardar una escena que parecía menor en el momento exacto en que ocurría. Tal vez sea una mesa después de comer, una ventana abierta en invierno o la sombra de una bicicleta sobre una pared clara. Cuando pasan los meses, esa imagen gana valor porque devuelve detalles que la memoria ya había empezado a borrar. No siempre hace falta una cámara especial ni un gran viaje para lograr una foto que permanezca. A veces basta con observar mejor la luz, esperar unos segundos y decidir desde dónde mirar. Hacer fotos también enseña a prestar atención, a detener el paso y a reconocer que lo cotidiano puede tener una belleza precisa si uno se toma el tiempo de verla.',
  },
  {
    id: 'es-12',
    lang: 'es',
    text: 'Cuidar el clima no depende solo de acuerdos enormes ni de decisiones lejanas tomadas por instituciones. También pasa por hábitos pequeños que se repiten cada semana y que, sumados, reducen bastante el desperdicio. Apagar luces que no hacen falta, caminar trayectos cortos, reparar un objeto en lugar de reemplazarlo o separar residuos son acciones discretas, pero concretas. Muchas personas piensan que esos gestos no cambian nada, aunque en realidad forman una cultura distinta de consumo y responsabilidad. Cuando un barrio entero adopta costumbres más sostenibles, la diferencia se nota en la energía usada, en la limpieza de los espacios y en la forma de hablar del futuro. La escala grande empieza casi siempre por prácticas pequeñas y constantes.',
  },
  {
    id: 'es-13',
    lang: 'es',
    text: 'Dormir bien suele parecer un lujo hasta que faltan varias noches seguidas y el cuerpo empieza a reclamarlo con claridad. La falta de descanso vuelve lentas tareas que antes parecían simples, como leer con atención, responder con paciencia o tomar una decisión común sin dudar demasiado. Por eso una rutina mínima antes de acostarse ayuda más de lo que parece. Bajar la intensidad de la luz, dejar el teléfono lejos, cenar con tiempo y evitar conversaciones tensas al final del día prepara a la mente para desacelerar. No siempre se consigue un descanso perfecto, pero la regularidad mejora mucho la calidad del sueño. Cuando eso ocurre, la mañana siguiente se siente menos pesada y el día empieza con otra disposición.',
  },
  {
    id: 'es-14',
    lang: 'es',
    text: 'Cuidar un jardín pequeño obliga a aceptar un ritmo distinto al de casi cualquier otra tarea cotidiana. No sirve tirar de una hoja para hacer crecer la planta antes, ni regar de más para adelantar el resultado. Hay que observar, esperar y corregir poco a poco. Una maceta cambia con la luz, con la temperatura y con el lugar donde se deja durante la semana. Algunas plantas resisten casi todo y otras requieren una atención mucho más fina. Ese aprendizaje tiene algo muy útil porque enseña paciencia sin teorías ni discursos. También devuelve una relación concreta con el paso del tiempo. Ver brotar una hoja nueva después de varios días de cuidado silencioso produce una satisfacción simple, pero muy difícil de reemplazar por otra cosa.',
  },
  {
    id: 'es-15',
    lang: 'es',
    text: 'Viajar no siempre significa recorrer grandes distancias ni acumular fotografías de monumentos famosos. A veces el cambio real aparece al tomar un tren corto hacia una ciudad cercana y pasar un día entero caminando sin itinerario rígido. Mirar escaparates distintos, escuchar otro acento en una cafetería o perderse un poco en calles desconocidas basta para salir de la rutina mental. El viaje breve funciona porque obliga a mirar más y a anticipar menos. Incluso volver esa misma noche puede dejar la sensación de haber ganado espacio interior. Muchas ideas se ordenan mejor cuando el cuerpo cambia de contexto, aunque sea por pocas horas. Por eso tanta gente vuelve de una escapada corta con la cabeza despejada y con ganas renovadas de retomar lo pendiente.',
  },
  {
    id: 'es-16',
    lang: 'es',
    text: 'La inteligencia artificial ya aparece en muchas herramientas comunes, pero su valor depende de la calidad del criterio humano que la acompaña. Puede resumir datos, sugerir rutas, detectar patrones o acelerar tareas repetitivas que consumen tiempo sin aportar demasiado pensamiento. Aun así, confiar en ella sin revisar resultados sigue siendo una mala idea, sobre todo cuando hay contexto sensible o decisiones importantes de por medio. La automatización no sustituye la responsabilidad de quien la usa. Más bien exige formular mejores preguntas, comprobar mejor las respuestas y distinguir entre una ayuda útil y una conclusión apresurada. Si se integra con cuidado, la tecnología ahorra esfuerzo y amplifica capacidades. Si se adopta con pereza, solo multiplica errores más rápido y con una apariencia engañosa de precisión.',
  },
  {
    id: 'es-17',
    lang: 'es',
    text: 'Ir al teatro sigue teniendo una fuerza especial porque todo sucede delante del público sin la red de seguridad que ofrece una pantalla. Cada gesto, cada silencio y cada error forman parte de una experiencia irrepetible que solo existe esa noche y con esas personas presentes en la sala. Los actores sienten la respiración del público y el público percibe la tensión real del escenario. Esa cercanía cambia la atención con la que se recibe la historia. No es posible pausar una escena, retroceder un diálogo o mirar otra cosa mientras ocurre la acción principal. Tal vez por eso una buena obra deja frases resonando durante días. Quien sale del teatro suele llevarse no solo una trama, sino la sensación viva de haber compartido algo frágil y directo.',
  },
  {
    id: 'es-18',
    lang: 'es',
    text: 'Las matemáticas aparecen con mucha más frecuencia en la vida diaria de lo que la mayoría reconoce cuando piensa en la escuela. Están en una compra semanal, en un presupuesto ajustado, en el tiempo que tarda un trayecto y en la proporción de una receta que hay que adaptar para más personas. Entender cantidades, comparar opciones y medir consecuencias ayuda a tomar decisiones menos impulsivas. No se trata de recordar fórmulas complicadas a toda hora, sino de adquirir una forma de pensar ordenada y verificable. La práctica constante vuelve familiares operaciones que antes intimidaban. Cuando eso pasa, también crece la autonomía para resolver problemas sin depender siempre de alguien más. Aprender matemáticas útiles no solo mejora notas; mejora criterio, claridad y capacidad de anticipar resultados.',
  },
  {
    id: 'es-19',
    lang: 'es',
    text: 'La amistad rara vez se sostiene por grandes declaraciones, sino por una serie de gestos pequeños repetidos a lo largo del tiempo. Un mensaje enviado en el momento justo, una llamada después de un día difícil o la costumbre de reservar una hora para verse aunque la agenda esté llena valen mucho más de lo que parece. Los vínculos cambian con los años porque cambian también las ciudades, los trabajos y las prioridades, pero el cuidado sigue reconociéndose en detalles concretos. No hace falta hablar todos los días para conservar una relación importante. Lo que cuenta es la calidad de la presencia cuando realmente hace falta. Tener amigos confiables no elimina los problemas, pero vuelve mucho más habitable cualquier etapa complicada o incierta.',
  },
  {
    id: 'es-20',
    lang: 'es',
    text: 'Ver una película con atención completa se ha vuelto casi un acto deliberado en una época llena de interrupciones. Apagar el teléfono, bajar la luz y seguir una historia de principio a fin sin revisar mensajes cambia por completo la relación con lo que ocurre en pantalla. El cine funciona mejor cuando se acepta su propio ritmo, incluso en escenas lentas que piden paciencia antes de entregar sentido. Algunas películas entretienen y otras incomodan, pero ambas pueden dejar una pregunta abierta que sigue dando vueltas días después. Compartir esa experiencia también tiene valor, porque la conversación posterior revela detalles que uno no había visto solo. Una buena película no termina exactamente cuando aparecen los créditos; a veces empieza de verdad cuando alguien pregunta qué fue lo que más quedó resonando.',
  },
  {
    id: 'es-21',
    lang: 'es',
    text: 'El silencio es cada vez más difícil de encontrar y, precisamente por eso, resulta más valioso cuando aparece de forma real. No se trata solo de ausencia de ruido, sino de la posibilidad de escuchar el propio pensamiento sin la presión constante de mensajes, música, motores o conversaciones de fondo. Muchas personas descubren que unos minutos de calma al día bastan para ordenar mejor prioridades, rebajar la tensión del cuerpo y recuperar foco. Al principio el silencio incomoda porque revela cansancio o ideas postergadas, pero después se vuelve una herramienta muy estable. Buscarlo puede significar caminar sin auriculares, sentarse un rato sin pantalla o abrir la ventana temprano antes de que empiece el movimiento. Esa pausa sencilla suele mejorar el resto del día más de lo esperado.',
  },
  {
    id: 'es-22',
    lang: 'es',
    text: 'Trabajar en equipo parece fácil cuando todo va bien, pero su calidad real se nota en los momentos de duda, desacuerdo o cansancio. Un grupo funciona mejor cuando las responsabilidades están claras y cada persona entiende no solo su parte, sino también el objetivo común que conecta el trabajo de todos. Escuchar con atención evita muchos errores que luego cuestan tiempo extra. También ayuda nombrar los problemas pronto, antes de que se conviertan en molestias silenciosas que frenan el proyecto entero. La colaboración efectiva no exige que todos piensen igual, sino que discutan con respeto y decidan con información suficiente. Cuando eso sucede, el resultado suele ser más sólido que cualquier esfuerzo aislado, y además deja aprendizaje útil para la siguiente tarea compartida.',
  },
  {
    id: 'es-23',
    lang: 'es',
    text: 'El invierno cambia la forma en que se vive la ciudad y también la casa. Los días son más cortos, la luz dura menos y muchos planes se vuelven interiores casi sin pedir permiso. Sin embargo, esa estación no trae solo incomodidad o frío. También invita a reducir velocidad, cocinar algo caliente, leer más y prestar atención a rutinas que en otras épocas pasan desapercibidas. Una manta, una sopa bien hecha o una conversación larga junto a una ventana pueden convertir una tarde gris en un momento amable. Incluso salir a caminar tiene otro tono cuando el aire está frío y las calles suenan distinto. El invierno exige preparación, sí, pero a cambio ofrece una versión más lenta y concentrada del tiempo cotidiano.',
  },
  {
    id: 'es-24',
    lang: 'es',
    text: 'El mar sostiene trabajos, alimenta ecosistemas enteros y regula parte del clima que hace posible la vida tal como la conocemos. Aun así, durante mucho tiempo se trató como un espacio infinito capaz de absorber cualquier residuo sin consecuencias visibles. Esa idea ya no resiste la evidencia. La contaminación, la sobrepesca y el deterioro de las costas muestran que incluso un sistema tan vasto puede perder equilibrio si no se cuida con seriedad. Proteger el mar implica decisiones grandes, pero también hábitos concretos relacionados con el consumo, el turismo y la gestión de residuos. Cada playa limpia, cada red bien regulada y cada río menos contaminado forman parte del mismo esfuerzo. Cuidar el mar no es romanticismo; es una condición práctica para sostener futuro, trabajo y salud común.',
  },
  {
    id: 'es-25',
    lang: 'es',
    text: 'Ser creativo no significa vivir permanentemente rodeado de ideas brillantes ni trabajar solo en actividades artísticas. Muchas veces consiste en mirar un problema corriente desde un ángulo un poco distinto y probar una solución que no era la primera opción obvia. La creatividad aparece al reorganizar un espacio pequeño, al cambiar una rutina que ya no funciona o al mezclar recursos simples para resolver una necesidad concreta. También requiere tolerar intentos fallidos sin interpretar cada error como una señal de incapacidad. Quien prueba, ajusta y vuelve a intentar termina encontrando caminos más interesantes que quien espera la idea perfecta antes de empezar. Por eso conviene entender la creatividad como una práctica cotidiana de observación y ensayo, no como un talento misterioso reservado para unos pocos.',
  },
  {
    id: 'es-26',
    lang: 'es',
    text: 'Las bibliotecas públicas siguen siendo uno de los espacios más útiles y menos valorados de muchas ciudades. No solo ofrecen libros, también proporcionan silencio, acceso a información, refugio para estudiar y un lugar donde pasar tiempo sin la obligación de consumir nada. En una época dominada por servicios de pago y entretenimiento rápido, entrar en una biblioteca produce una sensación distinta de disponibilidad y calma. Cada estante propone recorridos inesperados, y muchas veces un título encontrado por azar termina siendo más interesante que el libro buscado al principio. Además, estos espacios conectan generaciones muy distintas: estudiantes, personas mayores, niños y trabajadores comparten mesa sin necesidad de conocerse. Sostener una buena biblioteca es sostener un tipo de vida urbana más abierta, curiosa y menos excluyente.',
  },
  {
    id: 'es-27',
    lang: 'es',
    text: 'Preparar café puede parecer un gesto mínimo, pero mucha gente lo convierte en una rutina casi ceremonial que ordena el inicio del día. Moler el grano, calentar el agua, medir la cantidad justa y esperar unos segundos mientras sube el aroma ayuda a entrar en un ritmo más atento. No importa tanto el método exacto como la pausa que esa preparación introduce en medio del apuro matinal. Para algunos, el primer café se toma en silencio; para otros, acompaña una conversación breve antes de empezar a trabajar. En ambos casos funciona como una transición entre el descanso y la actividad. Tal vez por eso un café bien hecho no se recuerda solo por su sabor, sino por el momento concreto que ayuda a crear alrededor de cada mañana.',
  },
  {
    id: 'es-28',
    lang: 'es',
    text: 'Caminar por una montaña obliga a aceptar que la velocidad del cuerpo tiene límites razonables y que forzarlos casi nunca da buen resultado. El sendero enseña a medir energía, a observar el terreno y a prestar atención al clima con una seriedad que en la ciudad rara vez aparece. Un cambio de viento, una nube baja o una piedra suelta modifican decisiones muy concretas. Al mismo tiempo, la caminata larga tiene algo liberador porque reduce el mundo a pasos, agua, mochila y horizonte. Muchas preocupaciones pierden tamaño cuando se pasa varias horas avanzando sin otra tarea que seguir el camino. Llegar arriba no siempre es lo más importante. A veces la parte valiosa está en el ritmo sostenido, en la conversación compartida y en el regreso con cansancio limpio.',
  },
  {
    id: 'es-29',
    lang: 'es',
    text: 'Escuchar a una persona mayor contar su historia familiar puede revelar aspectos del pasado que no aparecen en libros ni en documentos oficiales. Los recuerdos traen detalles concretos sobre oficios, costumbres, miedos y formas de relacionarse que ayudan a entender mejor cómo ha cambiado un barrio o una ciudad completa. Aunque a veces la memoria mezcle fechas o confunda nombres, sigue ofreciendo una verdad importante sobre lo vivido y lo sentido. Sentarse a escuchar con paciencia también es una forma de cuidado, porque reconoce valor en experiencias que podrían perderse si nadie las recoge. Muchas familias descubren demasiado tarde que nunca preguntaron por episodios decisivos. Registrar esas voces, aunque sea en una charla informal, construye una continuidad que da sentido al presente y orienta mejor el futuro.',
  },
  {
    id: 'es-30',
    lang: 'es',
    text: 'Ordenar una mesa de trabajo parece una tarea menor hasta que se comprueba la diferencia que produce en la atención cotidiana. Un espacio saturado de papeles, cables y objetos mezclados obliga a tomar decisiones innecesarias a cada momento y añade una fatiga silenciosa que cuesta detectar. En cambio, cuando cada cosa tiene un lugar claro, el inicio de una tarea se vuelve más directo y el cerebro pierde menos energía en buscar lo básico. No hace falta convertir el escritorio en una vitrina perfecta. Basta con mantener lo esencial a mano y retirar aquello que interrumpe sin aportar utilidad. Ese tipo de orden no es manía estética, sino una forma práctica de reducir fricción. Trabajar mejor muchas veces empieza por despejar un poco el espacio donde se piensa.',
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
