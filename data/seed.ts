
import { Ministry, NewsItem, DiscipleshipTrack, Cell, Event, Sermon } from '../types';

// --- DATA GENERATORS ---

// 1. MINISTRIES (Based on IBA Research)
export const SEED_MINISTRIES: Ministry[] = [
  { 
    id: 'min_kids',
    name: "Atitude Kids", 
    category: "Kids", 
    description: "Ministério infantil para crianças de 0 a 11 anos.",
    fullDescription: "O Atitude Kids é um lugar de amor e aprendizado. Dividido por faixas etárias (Berçário, Maternal e Primário), nosso objetivo é apresentar Jesus de forma lúdica e bíblica. Temos check-in seguro, professores treinados e um ambiente climatizado para que seu filho cresça na graça e no conhecimento.", 
    meetingTime: "Domingos 10h e 19h", 
    leader: "Pra. Aline", 
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=2038" 
  },
  { 
    id: 'min_beone',
    name: "Be One", 
    category: "Jovens", 
    description: "Movimento de jovens apaixonados por Jesus.",
    fullDescription: "O Be One não é apenas um culto, é um movimento. Somos jovens que buscam ser UM com Cristo e UM uns com os outros. Nossos cultos são vibrantes, com louvor intenso e palavra radical. Temos acampamentos, vigílias, Hangouts e células específicas para universitários e jovens adultos.", 
    meetingTime: "Sábados 20h", 
    leader: "Pr. Gabriel", 
    image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070" 
  },
  { 
    id: 'min_worship',
    name: "Atitude Worship", 
    category: "Louvor", 
    description: "Levando a igreja à adoração profunda.",
    fullDescription: "O ministério de louvor tem o propósito de preparar o ambiente para a manifestação do Espírito Santo. Se você toca, canta ou ama artes, este é o seu lugar. Exigimos excelência técnica e, acima de tudo, vida de santidade e compromisso com a Palavra.", 
    meetingTime: "Ensaios Semanais", 
    leader: "Líder de Louvor", 
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070" 
  },
  { 
    id: 'min_media',
    name: "Mídia & Tech", 
    category: "Mídia", 
    description: "Evangelho através das lentes e telas.",
    fullDescription: "Responsável pela transmissão ao vivo, projeção, iluminação, fotografia e gestão das redes sociais. É um ministério estratégico para levar a palavra além das quatro paredes, alcançando milhares de pessoas online.", 
    meetingTime: "Escala por Culto", 
    leader: "Carlos", 
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070" 
  },
  { 
    id: 'min_social',
    name: "Instituto Assistencial", 
    category: "Social", 
    description: "Amor na prática para a comunidade.",
    fullDescription: "O braço social da igreja. Realizamos distribuição de cestas básicas, bazar solidário, atendimento jurídico e psicológico gratuito para a comunidade carente de Duque de Caxias. Nosso lema é: A fé sem obras é morta.", 
    meetingTime: "Segunda a Sexta", 
    leader: "Dra. Sônia", 
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070" 
  },
  { 
    id: 'min_welcome',
    name: "Boas Vindas", 
    category: "Geral", 
    description: "O abraço da igreja.",
    fullDescription: "A equipe de recepção é o primeiro contato do visitante. Nosso papel é sorrir, abraçar e garantir que ninguém se sinta sozinho na Casa de Deus. Servimos café, orientamos sobre as salas e acompanhamos os novos convertidos.", 
    meetingTime: "Todos os Cultos", 
    leader: "Ana Maria", 
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069" 
  },
  { 
    id: 'min_women',
    name: "Mulheres de Atitude", 
    category: "Mulheres", 
    description: "Mulheres curadas para curar.",
    fullDescription: "Um ministério focado no coração da mulher. Realizamos o Chá de Mulheres, congressos e discipulado específico para questões femininas, maternidade, carreira e autoestima à luz da Bíblia.", 
    meetingTime: "Mensal", 
    leader: "Pra. Susana Curti", 
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070" 
  },
  { 
    id: 'min_men',
    name: "Homens de Valor", 
    category: "Homens", 
    description: "Resgatando o sacerdócio.",
    fullDescription: "Homens posicionados em Deus. Tratamos de hombridade, pureza sexual, liderança familiar e finanças. Nos reunimos para churrascos, futebol e, principalmente, oração e palavra direcionada.", 
    meetingTime: "Mensal", 
    leader: "Pr. Joubert Curti", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070" 
  },
  { 
    id: 'min_couples',
    name: "Ministério de Casais", 
    category: "Casais", 
    description: "Famílias fortes, igreja forte.",
    fullDescription: "Através do curso 'Casados para Sempre' e jantares de casais, investimos na restauração de matrimônios. Acreditamos que o divórcio não é opção e que Deus pode restaurar qualquer aliança.", 
    meetingTime: "Sextas Quinzenais", 
    leader: "Liderança Casais", 
    image: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?q=80&w=2070" 
  },
  { 
    id: 'min_incluir',
    name: "Incluir", 
    category: "Social", 
    description: "Acessibilidade e amor.",
    fullDescription: "Ministério dedicado à inclusão de pessoas com deficiência (PCD) nos cultos e na vida da igreja. Temos intérpretes de Libras, monitores para crianças atípicas e estrutura acessível.", 
    meetingTime: "Domingos", 
    leader: "Coord. Inclusão", 
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2069" 
  },
  { 
    id: 'min_prayer',
    name: "Intercessão", 
    category: "Geral", 
    description: "A fornalha da igreja.",
    fullDescription: "Homens e mulheres que sustentam a igreja em oração. Oramos durante os cultos (Torre de Oração), pelos pedidos do site e pelas autoridades. Se você ama orar, junte-se a nós.", 
    meetingTime: "Domingo 9h", 
    leader: "Dona Maria", 
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070" 
  },
  { 
    id: 'min_teens',
    name: "Atitude Teens", 
    category: "Teens", 
    description: "Transição com propósito.",
    fullDescription: "Focado em adolescentes de 12 a 14 anos. Uma linguagem intermediária entre o Kids e o Be One, abordando identidade, pressão social e escola de uma perspectiva cristã.", 
    meetingTime: "Domingos 10h", 
    leader: "Tio Pedro", 
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=2069" 
  },
  { 
    id: 'min_sports',
    name: "Atitude Sports", 
    category: "Geral", 
    description: "Evangelismo através do esporte.",
    fullDescription: "Usamos o Jiu-Jitsu, Futebol e Treinamento Funcional como ferramentas para alcançar vidas e promover saúde. Aulas semanais abertas à comunidade.", 
    meetingTime: "Semanal", 
    leader: "Mestre João", 
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=2070" 
  },
  { 
    id: 'min_arts',
    name: "Atitude Arts", 
    category: "Louvor", 
    description: "Teatro e Dança para a glória de Deus.",
    fullDescription: "Expressamos a mensagem do Evangelho através de peças teatrais, musicais e dança profética. Se você tem talento para atuar ou dançar, venha fazer parte.", 
    meetingTime: "Sábados 14h", 
    leader: "Pra. Carol", 
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069" 
  },
  { 
    id: 'min_business',
    name: "Mentes Brilhantes", 
    category: "Geral", 
    description: "Empreendedores do Reino.",
    fullDescription: "Networking, capacitação e mentoria para empresários e empreendedores cristãos. Aprendemos a gerir negócios segundo princípios bíblicos.", 
    meetingTime: "Mensal", 
    leader: "Pr. Marcos", 
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032" 
  }
];

// 2. NEWS (10+ Items)
export const SEED_NEWS: NewsItem[] = [
  { id: 'n1', title: "Inauguração do Novo Espaço Kids", date: "20 OUT", category: "Kids", author: "Comunicação", image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368", excerpt: "Nossas crianças ganharam salas novas e equipadas.", content: "Um ambiente totalmente reformado para receber os pequeninos com mais segurança e conforto. As novas salas contam com isolamento acústico, piso emborrachado e temática bíblica." },
  { id: 'n2', title: "Batismo nas Águas: 50 Vidas!", date: "15 OUT", category: "Igreja", author: "Pr. Joubert", image: "https://images.unsplash.com/photo-1519817914152-22d216bb9170", excerpt: "Uma festa no céu e na terra.", content: "Neste domingo tivemos a alegria de descer às águas com 50 novos irmãos que decidiram publicamente seguir a Cristo. Foi uma manhã de muita unção e celebração." },
  { id: 'n3', title: "Ação Social no Bairro Vila São Luis", date: "10 OUT", category: "Social", author: "Inst. Assistencial", image: "https://images.unsplash.com/photo-1593113598332-cd288d649433", excerpt: "Distribuímos 200 cestas básicas.", content: "O amor de Deus em ação prática. Levamos alimento físico e espiritual para 200 famílias cadastradas em nosso programa social." },
  { id: 'n4', title: "Conferência Be One 2025", date: "05 OUT", category: "Igreja", author: "Be One", image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d", excerpt: "Prepare-se para o sobrenatural.", content: "As inscrições já estão abertas para a conferência jovem que vai abalar Duque de Caxias. Preletores internacionais e bandas convidadas." },
  { id: 'n5', title: "Volta às Aulas na Escola de Líderes", date: "01 OUT", category: "Ensino", author: "Secretaria", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b", excerpt: "Formando a próxima geração.", content: "O novo módulo de Liderança Cristã começa nesta terça. Se você deseja liderar uma célula, este é o primeiro passo." },
  { id: 'n6', title: "Campanha de 40 Dias de Jejum e Oração", date: "28 SET", category: "Igreja", author: "Pastoral", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40", excerpt: "Um tempo de consagração.", content: "Vamos juntos buscar a face do Senhor por 40 dias. O tema deste ano é 'Rompendo Limites'. Participe dos cultos matinais às 6h." },
  { id: 'n7', title: "Congresso de Mulheres: Identidade Real", date: "20 SET", category: "Igreja", author: "Mulheres", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e", excerpt: "Restaurando a feminilidade bíblica.", content: "Preletoras confirmadas: Pra. Susana Curti e convidadas. Serão dois dias de cura interior e empoderamento bíblico." },
  { id: 'n8', title: "Melhorias no Estacionamento da Igreja", date: "15 SET", category: "Social", author: "Adm", image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a", excerpt: "Mais segurança para você.", content: "Finalizamos a obra de iluminação e pavimentação do estacionamento anexo. Mais conforto e segurança para os membros." },
  { id: 'n9', title: "Culto da Virada: Prepare-se", date: "10 SET", category: "Igreja", author: "Eventos", image: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9", excerpt: "Comece o ano na presença de Deus.", content: "Traga sua família para romper o ano adorando ao Senhor. Teremos ceia especial e uma palavra profética para o novo ano." },
  { id: 'n10', title: "Parceria com Psicólogos Cristãos", date: "05 SET", category: "Social", author: "Incluir", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2", excerpt: "Saúde emocional é prioridade.", content: "Agora oferecemos triagem psicológica gratuita às quintas-feiras com profissionais cristãos voluntários." }
];

// 3. DISCIPLESHIP TRACKS (30+ Courses with Logic)
const createSteps = (courseTitle: string, topic: string[]) => {
  return topic.map((t, i) => ({
    title: `Módulo ${i + 1}: ${t}`,
    content: `
# ${t}

Bem-vindo ao **Módulo ${i + 1}** do curso **${courseTitle}**.

## 1. Introdução e Contexto
O tema "**${t}**" é fundamental para sua caminhada cristã. Não se trata apenas de conhecimento intelectual, mas de revelação espiritual que gera transformação prática.

> "E conhecereis a verdade, e a verdade vos libertará." (João 8:32)

## 2. Base Bíblica (NVI)
Vamos analisar o que a Bíblia diz sobre isso:
* **Princípio Chave:** Deus deseja que entendamos ${t} para vivermos em plenitude e não sermos levados por ventos de doutrina.
* **Texto de Apoio:** Sugerimos a leitura de Romanos 12 e Efésios 4 durante esta semana para complementar o estudo.

## 3. Aprofundamento Teológico
${t} não é um conceito isolado. Ele se conecta com a Graça, a Santidade e o Propósito Eterno de Deus.
1. **O que é:** Uma definição bíblica clara e objetiva.
2. **O que não é:** Quebrando mitos culturais e religiosos.
3. **Por que importa:** O impacto disso na sua salvação e no seu dia a dia.

## 4. Aplicação Prática
Como viver isso na segunda-feira de manhã?
* **No trabalho:** Seja exemplo de excelência.
* **Em casa:** Sirva sua família com amor.
* **Na igreja:** Exerça seus dons para edificar o corpo.

## 5. Desafio da Semana
Durante os próximos 7 dias, separe 15 minutos para orar especificamente sobre **${t}**. Anote em um caderno o que Deus falar ao seu coração.

## 6. Oração Final
"Senhor, grava esta palavra no meu coração. Que eu não seja apenas um ouvinte esquecido, mas um praticante fiel da Tua Palavra. Em nome de Jesus, Amém."
    `
  }));
};

// Reliable Image List to avoid broken links
const STOCK_IMAGES = [
  "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?q=80&w=2070", // Bible
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073", // Study
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070", // Worship
  "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2069", // Cross
  "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=2070", // Group
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070", // Friendship
  "https://images.unsplash.com/photo-1544928147-79a2dbc1f389?q=80&w=2070", // Hands
  "https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070", // Sky
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073", // Ocean
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070"  // Mountains
];

const TRACK_TEMPLATES = [
  { title: "Fundamentos da Fé", cat: "Fundamentos", img: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65", topics: ["Salvação", "Bíblia", "Trindade", "Oração", "Batismo", "Igreja", "Dízimo", "Santidade"] },
  { title: "Maturidade Cristã", cat: "Vida Cristã", img: "https://images.unsplash.com/photo-1519681393784-d120267933ba", topics: ["Caráter", "Perdão", "Orgulho", "Humildade", "Língua", "Pensamentos", "Obediência", "Fruto do Espírito"] },
  { title: "Vida de Oração", cat: "Vida Cristã", img: "https://images.unsplash.com/photo-1544928147-79a2dbc1f389", topics: ["O que é orar", "Ouvindo Deus", "Jejum", "Intercessão", "Guerra Espiritual", "Adoração", "Sala do Trono", "Persistência"] },
  { title: "Família Blindada", cat: "Família", img: "https://images.unsplash.com/photo-1511895426328-dc8714191300", topics: ["Papel do Marido", "Papel da Esposa", "Filhos", "Finanças", "Comunicação", "Sexualidade", "Sogra/Parentes", "Legado"] },
  { title: "Liderança de Excelência", cat: "Liderança", img: "https://images.unsplash.com/photo-1552664730-d307ca884978", topics: ["Chamado", "Visão", "Serviço", "Equipe", "Mentoria", "Gestão de Tempo", "Resolução de Conflitos", "Multiplicação"] },
  { title: "Teologia Sistemática I", cat: "Teologia", img: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6", topics: ["Bibliologia", "Teologia Própria", "Cristologia", "Pneumatologia", "Antropologia", "Hamartiologia", "Soteriologia", "Eclesiologia"] },
  { title: "Apocalipse Desvendado", cat: "Teologia", img: "https://images.unsplash.com/photo-1531384441138-2736e62e0919", topics: ["7 Igrejas", "7 Selos", "7 Trombetas", "7 Taças", "Anticristo", "Milênio", "Juízo Final", "Nova Jerusalém"] },
  { title: "Cura Interior", cat: "Vida Cristã", img: "https://images.unsplash.com/photo-1470790376778-a9fcd48d50e9", topics: ["Rejeição", "Paternidade", "Abuso", "Traição", "Culpa", "Medo", "Autoimagem", "Liberdade"] },
  { title: "Batalha Espiritual", cat: "Teologia", img: "https://images.unsplash.com/photo-1518288774672-b94e808873ff", topics: ["Origem do Mal", "Satanás", "Demônios", "Armadura de Deus", "Autoridade", "Maldições", "Bênçãos", "Vitória"] },
  { title: "Evangelismo Eficaz", cat: "Liderança", img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df", topics: ["Paixão", "Abordagem", "Plano de Salvação", "Testemunho", "Objeções", "Consolidação", "Discipulado", "Ide"] },
  { title: "História da Igreja", cat: "Teologia", img: "https://images.unsplash.com/photo-1461360370896-922624d12aa1", topics: ["Atos", "Pais da Igreja", "Constantino", "Idade Média", "Reforma", "Avivamentos", "Missões Modernas", "Igreja Hoje"] },
  { title: "Dons do Espírito", cat: "Fundamentos", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e", topics: ["Dons de Poder", "Dons de Saber", "Dons de Falar", "Profecia", "Cura", "Línguas", "Discernimento", "Ordem no Culto"] },
  { title: "Finanças Bíblicas", cat: "Vida Cristã", img: "https://images.unsplash.com/photo-1565514020176-db79238b6d87", topics: ["Mordomia", "Generosidade", "Dívidas", "Investimento", "Trabalho", "Contentamento", "Oferta", "Prosperidade"] },
  { title: "Mulheres da Bíblia", cat: "Família", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e", topics: ["Eva", "Sara", "Rute", "Ester", "Maria", "Marta", "Maria Madalena", "Priscila"] },
  { title: "Homens de Fé", cat: "Família", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", topics: ["Abraão", "Moisés", "Davi", "Elias", "Pedro", "Paulo", "Daniel", "Neemias"] },
];

// Generate tracks
export const SEED_TRACKS: DiscipleshipTrack[] = [];
// Duplicate template logic to ensure unique IDs and slight title variations
[...TRACK_TEMPLATES, ...TRACK_TEMPLATES].forEach((tpl, i) => {
  const isCopy = i >= TRACK_TEMPLATES.length;
  const title = isCopy ? `${tpl.title} (Avançado)` : tpl.title;
  SEED_TRACKS.push({
    id: `track_${i}`,
    title,
    category: tpl.cat as any,
    image: tpl.img, // Use specific image from template or fallback
    description: `Curso completo sobre ${title}. Siga a trilha de aprendizado passo a passo para crescimento espiritual.`,
    steps: createSteps(title, tpl.topics)
  });
});

export const SEED_CELLS: Cell[] = [
    { id: 'c1', network: "Amarela", leader: "Carlos e Bia", district: "Vila São Luis", address: "Rua das Flores, 123", day: "Terça", time: "20h" },
    { id: 'c2', network: "Azul", leader: "Pedro e João", district: "25 de Agosto", address: "Av. Brigadeiro Lima e Silva, 500", day: "Quarta", time: "19h30" },
    { id: 'c3', network: "Verde", leader: "Família Silva", district: "Centro", address: "Rua Nunes Alves, 50", day: "Quinta", time: "20h" },
    { id: 'c4', network: "Laranja", leader: "Lucas", district: "Jardim 25", address: "Rua A, 10", day: "Sexta", time: "20h" },
    { id: 'c5', network: "Amarela", leader: "Pra. Denise", district: "Parque Beira Mar", address: "Rua B, 20", day: "Terça", time: "19h30" }
];

export const SEED_EVENTS: Event[] = [
    { id: 'e1', title: "Conferência Profética 2025", date: "15 AGO", time: "19:30", location: "Templo Maior", price: 50, image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070", category: "Geral", description: "Três dias de imersão profética." },
    { id: 'e2', title: "Acampamento de Jovens", date: "07 SET", time: "08:00", location: "Sítio do Sossego", price: 350, image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=2070", category: "Jovens", description: "O melhor acampamento da história." }
];

export const SEED_SERMONS: Sermon[] = [
    { id: 's1', title: "Vencendo Gigantes", preacher: "Pr. Josué Valandro Jr.", date: "Domingo 19h", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", description: "Uma mensagem poderosa sobre fé." },
    { id: 's2', title: "O Poder da Oração", preacher: "Pr. Joubert Curti", date: "Quarta 20h", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", description: "Como a oração muda tudo." }
];
