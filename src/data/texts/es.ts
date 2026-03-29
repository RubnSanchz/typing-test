import type { TextPassage } from '@/types/domain'

// Catalogue of Spanish text passages.
// Each passage has at least 100 words to support longer typing sessions.
// Add more entries freely; the selector picks one at random each session.
const passages: TextPassage[] = [
  {
    id: 'es-01',
    lang: 'es',
    text: 'La tarde caia sobre la estacion cuando Lucia bajo del tren con una mochila ligera y una libreta en la mano. Habia pasado semanas esperando ese viaje corto, no por turismo, sino por el placer simple de caminar sin prisa por un pueblo nuevo. Cruzó la plaza principal, miró las fachadas antiguas, escuchó el ruido de las tazas en una terraza y notó el olor a pan recien hecho que salia de una esquina. Compró agua, fruta y un bocadillo, se sentó junto a una fuente de piedra y observó a la gente saludarse por su nombre. En pocos minutos sintió que el tiempo iba mas lento y que esa calma valia mucho mas que cualquier plan apretado.',
  },
  {
    id: 'es-02',
    lang: 'es',
    text: 'El telefono movil se ha vuelto una herramienta central en la vida diaria, pero su utilidad real depende del modo en que cada persona decide usarlo. Sirve para leer noticias, pagar una compra, hablar con amigos, revisar un mapa o guardar una idea antes de que se pierda. Sin embargo, esa misma comodidad puede llenar el dia de interrupciones pequeñas que desgastan la atencion sin que uno lo note enseguida. Por eso cada vez mas gente intenta poner limites claros, apagar notificaciones innecesarias y recuperar momentos sin pantalla. No se trata de rechazar la tecnologia, sino de usarla con criterio para que aporte valor y no termine ocupando cada minuto libre.',
  },
  {
    id: 'es-03',
    lang: 'es',
    text: 'En el mercado del sabado la actividad empieza antes de que salga bien el sol y, aun asi, nadie parece tener prisa. Los puestos de fruta se alinean junto a los de pan, queso, miel y flores, y cada vendedor conoce a buena parte de sus clientes habituales. Una mujer pregunta por tomates de temporada, un hombre compara aceitunas y dos niños insisten en llevar fresas aunque todavia faltan cosas por comprar. Entre conversaciones, bolsas y monedas, tambien hay tiempo para comentar el tiempo, el partido del fin de semana o la receta que mejor sale con cierto tipo de cebolla. Ir al mercado no es solo hacer una compra; es participar por un rato en la vida compartida del barrio.',
  },
  {
    id: 'es-04',
    lang: 'es',
    text: 'La musica tiene una capacidad extraña y poderosa para cambiar el tono completo de un dia comun. Una melodia tranquila puede bajar la tension despues de una mañana pesada, mientras que un ritmo vivo puede devolver energia cuando el cuerpo pide pausa. No hace falta entender teoria, distinguir instrumentos o conocer autores para sentir ese efecto. Basta con escuchar con un poco de atencion y dejar que la pieza ocupe el espacio interior que a veces llenamos con ruido. Hay canciones que acompañan una caminata, otras que ordenan la cabeza mientras se trabaja y algunas que simplemente abren un recuerdo muy preciso. Por eso muchas personas vuelven a ciertas listas una y otra vez, como quien regresa a un lugar conocido.',
  },
  {
    id: 'es-05',
    lang: 'es',
    text: 'Aprender otra lengua rara vez es un proceso rapido, pero casi siempre acaba cambiando la forma en que una persona mira el mundo. Al principio cuesta recordar vocabulario, ordenar frases y entender sonidos que antes parecian iguales. Luego llegan pequenos avances que animan mucho: pedir un cafe sin dudar, entender un anuncio en la calle o seguir una conversacion sencilla sin traducir cada palabra en la cabeza. Con el tiempo, la practica deja de sentirse como una tarea y empieza a formar parte de la rutina diaria. Leer, escuchar y hablar un poco cada dia suele dar mejores resultados que estudiar de golpe una vez por semana. La clave no es hacerlo perfecto, sino mantenerse constante hasta que el idioma deje de parecer ajeno.',
  },
  {
    id: 'es-06',
    lang: 'es',
    text: 'Quien vive cerca del mar aprende pronto que el agua nunca se repite del todo. Hay mañanas en las que la superficie parece quieta, casi lisa, y otras en las que el viento levanta olas cortas que golpean el puerto con fuerza constante. Los pescadores miran el cielo antes de salir, comprueban las cuerdas, revisan el motor y hablan poco porque ya saben leer muchas señales sin nombrarlas. En el muelle se mezclan el olor a sal, el sonido de las gaviotas y el golpear de los cascos contra la madera. Para algunos es solo paisaje, pero para otros el mar es horario, sustento y escuela. Enseña paciencia, respeto y la costumbre de no dar nunca nada por seguro.',
  },
  {
    id: 'es-07',
    lang: 'es',
    text: 'Cocinar en casa no tiene por que convertirse en una tarea complicada para que el resultado sea bueno y agradable. Muchas veces basta con ingredientes simples, algo de organizacion y la voluntad de reservar un rato tranquilo antes de comer. Un arroz con verduras, una sopa ligera o una tortilla bien hecha pueden resolver una cena completa sin exigir recetas largas ni tecnicas raras. Mientras algo cuece a fuego lento, se puede poner la mesa, cortar pan, comentar el dia o simplemente descansar unos minutos lejos del telefono. Ese tiempo tambien forma parte de la comida. Al final importa el sabor, claro, pero tambien el gesto de preparar algo propio y compartirlo sin prisa con quienes estan alrededor.',
  },
  {
    id: 'es-08',
    lang: 'es',
    text: 'Leer un libro sigue siendo una de las formas mas directas de detener el ruido exterior sin dejar de moverse por dentro. En unas pocas paginas una persona puede entrar en otra epoca, otra ciudad o la cabeza de alguien muy distinto a ella. Hay historias que entretienen, otras que incomodan y algunas que obligan a pensar durante dias enteros despues de cerrar la ultima hoja. No todos los libros funcionan para todos los momentos, y esa es parte de la gracia. A veces uno busca una trama ligera para descansar y otras necesita un ensayo que ordene ideas dispersas. Lo importante es encontrar esa lectura que sostiene la atencion con naturalidad y hace que el tiempo pase de una manera mas limpia y concentrada.',
  },
  {
    id: 'es-09',
    lang: 'es',
    text: 'La ciudad empuja a moverse rapido incluso cuando no hay una razon clara para hacerlo. Entre semaforos, motos, autobuses, obras y pantallas, cada trayecto parece pedir una velocidad un poco mayor que la anterior. Sin embargo, incluso en los barrios mas activos siempre existe algun espacio donde el ritmo baja de golpe. Puede ser un parque pequeno, una calle sin trafico, una biblioteca o una plaza que queda medio escondida entre edificios altos. Esos lugares sirven como pausa real y no solo como decorado. Sentarse diez minutos, beber agua, mirar alrededor y respirar sin mirar el reloj cambia mas de lo que parece. Despues cuesta menos retomar tareas, hablar con calma y seguir el dia con la cabeza menos saturada.',
  },
  {
    id: 'es-10',
    lang: 'es',
    text: 'Hacer deporte con cierta regularidad suele mejorar mucho mas que la condicion fisica. Tambien cambia el humor, el descanso y la forma en que una persona enfrenta el cansancio del dia a dia. No importa demasiado si la actividad elegida es correr, nadar, montar en bici, bailar o jugar un partido con amigos. Lo que marca la diferencia es la constancia, incluso cuando al principio cuesta mantenerla. Algunos dias el cuerpo responde bien y otros parece mas pesado, pero ambos tipos de sesion enseñan algo util. Con las semanas se nota mas resistencia, mejor postura y una sensacion de energia mas estable. Ademas, hacer ejercicio obliga a salir un rato de la pantalla y volver a prestar atencion al propio cuerpo.',
  },
  {
    id: 'es-11',
    lang: 'es',
    text: 'Una fotografia sencilla puede guardar una escena que parecia menor en el momento exacto en que ocurria. Tal vez sea una mesa despues de comer, una ventana abierta en invierno o la sombra de una bicicleta sobre una pared clara. Cuando pasan los meses, esa imagen gana valor porque devuelve detalles que la memoria ya habia empezado a borrar. No siempre hace falta una camara especial ni un gran viaje para lograr una foto que permanezca. A veces basta con observar mejor la luz, esperar unos segundos y decidir desde donde mirar. Hacer fotos tambien enseña a prestar atencion, a detener el paso y a reconocer que lo cotidiano puede tener una belleza precisa si uno se toma el tiempo de verla.',
  },
  {
    id: 'es-12',
    lang: 'es',
    text: 'Cuidar el clima no depende solo de acuerdos enormes ni de decisiones lejanas tomadas por instituciones. Tambien pasa por habitos pequeños que se repiten cada semana y que, sumados, reducen bastante el desperdicio. Apagar luces que no hacen falta, caminar trayectos cortos, reparar un objeto en lugar de reemplazarlo o separar residuos son acciones discretas, pero concretas. Muchas personas piensan que esos gestos no cambian nada, aunque en realidad forman una cultura distinta de consumo y responsabilidad. Cuando un barrio entero adopta costumbres mas sostenibles, la diferencia se nota en la energia usada, en la limpieza de los espacios y en la forma de hablar del futuro. La escala grande empieza casi siempre por practicas pequeñas y constantes.',
  },
  {
    id: 'es-13',
    lang: 'es',
    text: 'Dormir bien suele parecer un lujo hasta que faltan varias noches seguidas y el cuerpo empieza a reclamarlo con claridad. La falta de descanso vuelve lentas tareas que antes parecian simples, como leer con atencion, responder con paciencia o tomar una decision comun sin dudar demasiado. Por eso una rutina minima antes de acostarse ayuda mas de lo que parece. Bajar la intensidad de la luz, dejar el telefono lejos, cenar con tiempo y evitar conversaciones tensas al final del dia prepara a la mente para desacelerar. No siempre se consigue un descanso perfecto, pero la regularidad mejora mucho la calidad del sueño. Cuando eso ocurre, la mañana siguiente se siente menos pesada y el dia empieza con otra disposicion.',
  },
  {
    id: 'es-14',
    lang: 'es',
    text: 'Cuidar un jardin pequeño obliga a aceptar un ritmo distinto al de casi cualquier otra tarea cotidiana. No sirve tirar de una hoja para hacer crecer la planta antes, ni regar de mas para adelantar el resultado. Hay que observar, esperar y corregir poco a poco. Una maceta cambia con la luz, con la temperatura y con el lugar donde se deja durante la semana. Algunas plantas resisten casi todo y otras requieren una atencion mucho mas fina. Ese aprendizaje tiene algo muy util porque enseña paciencia sin teorias ni discursos. Tambien devuelve una relacion concreta con el paso del tiempo. Ver brotar una hoja nueva despues de varios dias de cuidado silencioso produce una satisfaccion simple, pero muy dificil de reemplazar por otra cosa.',
  },
  {
    id: 'es-15',
    lang: 'es',
    text: 'Viajar no siempre significa recorrer grandes distancias ni acumular fotografias de monumentos famosos. A veces el cambio real aparece al tomar un tren corto hacia una ciudad cercana y pasar un dia entero caminando sin itinerario rigido. Mirar escaparates distintos, escuchar otro acento en una cafeteria o perderse un poco en calles desconocidas basta para salir de la rutina mental. El viaje breve funciona porque obliga a mirar mas y a anticipar menos. Incluso volver esa misma noche puede dejar la sensacion de haber ganado espacio interior. Muchas ideas se ordenan mejor cuando el cuerpo cambia de contexto, aunque sea por pocas horas. Por eso tanta gente vuelve de una escapada corta con la cabeza despejada y con ganas renovadas de retomar lo pendiente.',
  },
  {
    id: 'es-16',
    lang: 'es',
    text: 'La inteligencia artificial ya aparece en muchas herramientas comunes, pero su valor depende de la calidad del criterio humano que la acompaña. Puede resumir datos, sugerir rutas, detectar patrones o acelerar tareas repetitivas que consumen tiempo sin aportar demasiado pensamiento. Aun asi, confiar en ella sin revisar resultados sigue siendo una mala idea, sobre todo cuando hay contexto sensible o decisiones importantes de por medio. La automatizacion no sustituye la responsabilidad de quien la usa. Mas bien exige formular mejores preguntas, comprobar mejor las respuestas y distinguir entre una ayuda util y una conclusion apresurada. Si se integra con cuidado, la tecnologia ahorra esfuerzo y amplifica capacidades. Si se adopta con pereza, solo multiplica errores mas rapido y con una apariencia engañosa de precision.',
  },
  {
    id: 'es-17',
    lang: 'es',
    text: 'Ir al teatro sigue teniendo una fuerza especial porque todo sucede delante del publico sin la red de seguridad que ofrece una pantalla. Cada gesto, cada silencio y cada error forman parte de una experiencia irrepetible que solo existe esa noche y con esas personas presentes en la sala. Los actores sienten la respiracion del publico y el publico percibe la tension real del escenario. Esa cercania cambia la atencion con la que se recibe la historia. No es posible pausar una escena, retroceder un dialogo o mirar otra cosa mientras ocurre la accion principal. Tal vez por eso una buena obra deja frases resonando durante dias. Quien sale del teatro suele llevarse no solo una trama, sino la sensacion viva de haber compartido algo fragil y directo.',
  },
  {
    id: 'es-18',
    lang: 'es',
    text: 'Las matematicas aparecen con mucha mas frecuencia en la vida diaria de lo que la mayoria reconoce cuando piensa en la escuela. Estan en una compra semanal, en un presupuesto ajustado, en el tiempo que tarda un trayecto y en la proporcion de una receta que hay que adaptar para mas personas. Entender cantidades, comparar opciones y medir consecuencias ayuda a tomar decisiones menos impulsivas. No se trata de recordar formulas complicadas a toda hora, sino de adquirir una forma de pensar ordenada y verificable. La practica constante vuelve familiares operaciones que antes intimidaban. Cuando eso pasa, tambien crece la autonomia para resolver problemas sin depender siempre de alguien mas. Aprender matematicas utiles no solo mejora notas; mejora criterio, claridad y capacidad de anticipar resultados.',
  },
  {
    id: 'es-19',
    lang: 'es',
    text: 'La amistad rara vez se sostiene por grandes declaraciones, sino por una serie de gestos pequeños repetidos a lo largo del tiempo. Un mensaje enviado en el momento justo, una llamada despues de un dia dificil o la costumbre de reservar una hora para verse aunque la agenda este llena valen mucho mas de lo que parece. Los vinculos cambian con los años porque cambian tambien las ciudades, los trabajos y las prioridades, pero el cuidado sigue reconociendose en detalles concretos. No hace falta hablar todos los dias para conservar una relacion importante. Lo que cuenta es la calidad de la presencia cuando realmente hace falta. Tener amigos confiables no elimina los problemas, pero vuelve mucho mas habitable cualquier etapa complicada o incierta.',
  },
  {
    id: 'es-20',
    lang: 'es',
    text: 'Ver una pelicula con atencion completa se ha vuelto casi un acto deliberado en una epoca llena de interrupciones. Apagar el telefono, bajar la luz y seguir una historia de principio a fin sin revisar mensajes cambia por completo la relacion con lo que ocurre en pantalla. El cine funciona mejor cuando se acepta su propio ritmo, incluso en escenas lentas que piden paciencia antes de entregar sentido. Algunas peliculas entretienen y otras incomodan, pero ambas pueden dejar una pregunta abierta que sigue dando vueltas dias despues. Compartir esa experiencia tambien tiene valor, porque la conversacion posterior revela detalles que uno no habia visto solo. Una buena pelicula no termina exactamente cuando aparecen los creditos; a veces empieza de verdad cuando alguien pregunta que fue lo que mas quedo resonando.',
  },
  {
    id: 'es-21',
    lang: 'es',
    text: 'El silencio es cada vez mas dificil de encontrar y, precisamente por eso, resulta mas valioso cuando aparece de forma real. No se trata solo de ausencia de ruido, sino de la posibilidad de escuchar el propio pensamiento sin la presion constante de mensajes, musica, motores o conversaciones de fondo. Muchas personas descubren que unos minutos de calma al dia bastan para ordenar mejor prioridades, rebajar la tension del cuerpo y recuperar foco. Al principio el silencio incomoda porque revela cansancio o ideas postergadas, pero despues se vuelve una herramienta muy estable. Buscarlo puede significar caminar sin auriculares, sentarse un rato sin pantalla o abrir la ventana temprano antes de que empiece el movimiento. Esa pausa sencilla suele mejorar el resto del dia mas de lo esperado.',
  },
  {
    id: 'es-22',
    lang: 'es',
    text: 'Trabajar en equipo parece facil cuando todo va bien, pero su calidad real se nota en los momentos de duda, desacuerdo o cansancio. Un grupo funciona mejor cuando las responsabilidades estan claras y cada persona entiende no solo su parte, sino tambien el objetivo comun que conecta el trabajo de todos. Escuchar con atencion evita muchos errores que luego cuestan tiempo extra. Tambien ayuda nombrar los problemas pronto, antes de que se conviertan en molestias silenciosas que frenan el proyecto entero. La colaboracion efectiva no exige que todos piensen igual, sino que discutan con respeto y decidan con informacion suficiente. Cuando eso sucede, el resultado suele ser mas solido que cualquier esfuerzo aislado, y ademas deja aprendizaje util para la siguiente tarea compartida.',
  },
  {
    id: 'es-23',
    lang: 'es',
    text: 'El invierno cambia la forma en que se vive la ciudad y tambien la casa. Los dias son mas cortos, la luz dura menos y muchos planes se vuelven interiores casi sin pedir permiso. Sin embargo, esa estacion no trae solo incomodidad o frio. Tambien invita a reducir velocidad, cocinar algo caliente, leer mas y prestar atencion a rutinas que en otras epocas pasan desapercibidas. Una manta, una sopa bien hecha o una conversacion larga junto a una ventana pueden convertir una tarde gris en un momento amable. Incluso salir a caminar tiene otro tono cuando el aire esta frio y las calles suenan distinto. El invierno exige preparacion, si, pero a cambio ofrece una version mas lenta y concentrada del tiempo cotidiano.',
  },
  {
    id: 'es-24',
    lang: 'es',
    text: 'El mar sostiene trabajos, alimenta ecosistemas enteros y regula parte del clima que hace posible la vida tal como la conocemos. Aun asi, durante mucho tiempo se trato como un espacio infinito capaz de absorber cualquier residuo sin consecuencias visibles. Esa idea ya no resiste la evidencia. La contaminacion, la sobrepesca y el deterioro de las costas muestran que incluso un sistema tan vasto puede perder equilibrio si no se cuida con seriedad. Proteger el mar implica decisiones grandes, pero tambien habitos concretos relacionados con el consumo, el turismo y la gestion de residuos. Cada playa limpia, cada red bien regulada y cada rio menos contaminado forman parte del mismo esfuerzo. Cuidar el mar no es romanticismo; es una condicion practica para sostener futuro, trabajo y salud comun.',
  },
  {
    id: 'es-25',
    lang: 'es',
    text: 'Ser creativo no significa vivir permanentemente rodeado de ideas brillantes ni trabajar solo en actividades artisticas. Muchas veces consiste en mirar un problema corriente desde un angulo un poco distinto y probar una solucion que no era la primera opcion obvia. La creatividad aparece al reorganizar un espacio pequeño, al cambiar una rutina que ya no funciona o al mezclar recursos simples para resolver una necesidad concreta. Tambien requiere tolerar intentos fallidos sin interpretar cada error como una señal de incapacidad. Quien prueba, ajusta y vuelve a intentar termina encontrando caminos mas interesantes que quien espera la idea perfecta antes de empezar. Por eso conviene entender la creatividad como una practica cotidiana de observacion y ensayo, no como un talento misterioso reservado para unos pocos.',
  },
  {
    id: 'es-26',
    lang: 'es',
    text: 'Las bibliotecas publicas siguen siendo uno de los espacios mas utiles y menos valorados de muchas ciudades. No solo ofrecen libros, tambien proporcionan silencio, acceso a informacion, refugio para estudiar y un lugar donde pasar tiempo sin la obligacion de consumir nada. En una epoca dominada por servicios de pago y entretenimiento rapido, entrar en una biblioteca produce una sensacion distinta de disponibilidad y calma. Cada estante propone recorridos inesperados, y muchas veces un titulo encontrado por azar termina siendo mas interesante que el libro buscado al principio. Ademas, estos espacios conectan generaciones muy distintas: estudiantes, personas mayores, niños y trabajadores comparten mesa sin necesidad de conocerse. Sostener una buena biblioteca es sostener un tipo de vida urbana mas abierta, curiosa y menos excluyente.',
  },
  {
    id: 'es-27',
    lang: 'es',
    text: 'Preparar cafe puede parecer un gesto minimo, pero mucha gente lo convierte en una rutina casi ceremonial que ordena el inicio del dia. Moler el grano, calentar el agua, medir la cantidad justa y esperar unos segundos mientras sube el aroma ayuda a entrar en un ritmo mas atento. No importa tanto el metodo exacto como la pausa que esa preparacion introduce en medio del apuro matinal. Para algunos, el primer cafe se toma en silencio; para otros, acompaña una conversacion breve antes de empezar a trabajar. En ambos casos funciona como una transicion entre el descanso y la actividad. Tal vez por eso un cafe bien hecho no se recuerda solo por su sabor, sino por el momento concreto que ayuda a crear alrededor de cada mañana.',
  },
  {
    id: 'es-28',
    lang: 'es',
    text: 'Caminar por una montaña obliga a aceptar que la velocidad del cuerpo tiene limites razonables y que forzarlos casi nunca da buen resultado. El sendero enseña a medir energia, a observar el terreno y a prestar atencion al clima con una seriedad que en la ciudad rara vez aparece. Un cambio de viento, una nube baja o una piedra suelta modifican decisiones muy concretas. Al mismo tiempo, la caminata larga tiene algo liberador porque reduce el mundo a pasos, agua, mochila y horizonte. Muchas preocupaciones pierden tamaño cuando se pasa varias horas avanzando sin otra tarea que seguir el camino. Llegar arriba no siempre es lo mas importante. A veces la parte valiosa esta en el ritmo sostenido, en la conversacion compartida y en el regreso con cansancio limpio.',
  },
  {
    id: 'es-29',
    lang: 'es',
    text: 'Escuchar a una persona mayor contar su historia familiar puede revelar aspectos del pasado que no aparecen en libros ni en documentos oficiales. Los recuerdos traen detalles concretos sobre oficios, costumbres, miedos y formas de relacionarse que ayudan a entender mejor como ha cambiado un barrio o una ciudad completa. Aunque a veces la memoria mezcle fechas o confunda nombres, sigue ofreciendo una verdad importante sobre lo vivido y lo sentido. Sentarse a escuchar con paciencia tambien es una forma de cuidado, porque reconoce valor en experiencias que podrian perderse si nadie las recoge. Muchas familias descubren demasiado tarde que nunca preguntaron por episodios decisivos. Registrar esas voces, aunque sea en una charla informal, construye una continuidad que da sentido al presente y orienta mejor el futuro.',
  },
  {
    id: 'es-30',
    lang: 'es',
    text: 'Ordenar una mesa de trabajo parece una tarea menor hasta que se comprueba la diferencia que produce en la atencion cotidiana. Un espacio saturado de papeles, cables y objetos mezclados obliga a tomar decisiones innecesarias a cada momento y añade una fatiga silenciosa que cuesta detectar. En cambio, cuando cada cosa tiene un lugar claro, el inicio de una tarea se vuelve mas directo y el cerebro pierde menos energia en buscar lo basico. No hace falta convertir el escritorio en una vitrina perfecta. Basta con mantener lo esencial a mano y retirar aquello que interrumpe sin aportar utilidad. Ese tipo de orden no es mania estetica, sino una forma practica de reducir friccion. Trabajar mejor muchas veces empieza por despejar un poco el espacio donde se piensa.',
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
