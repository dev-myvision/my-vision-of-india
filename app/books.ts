// The three books, in the words of "My Vision of India".
// Each book page (app/[book]/page.tsx) is built from this file.

export type Reform = { n: number; title: string; line: string };
export type ReformGroup = { name: string; range: string; text: string; reforms: Reform[] };

export type Book = {
  slug: string;
  ordinal: 'One' | 'Two' | 'Three';
  title: string;
  tagline: string;
  /** For the <meta name="description"> and the share card. */
  description: string;
  epigraph: string;
  why: string[];
  quote: string;
  countWord: string;
  groups: ReformGroup[];
  afterword: { heading: string; paragraphs: string[] };
};

export const BOOKS: Book[] = [
  {
    slug: 'governing-india',
    ordinal: 'One',
    title: 'Governing India',
    tagline: 'Democracy, law and clean institutions',
    description:
      'Book One of My Vision of India: sixteen reforms for democracy, law and clean institutions, from clean elections to courts on time and police answerable to the law.',
    epigraph:
      'I ask one question about our government: when power is given to someone in our name, can we see what they do with it, and can we make them answer for it?',
    why: [
      'Like millions of Indians, I have stood at a counter waiting for a certificate that should have come in a week. I have watched a pothole outside a home stay open for months, and seen people shout at the wrong office about it. I have seen honest officers moved overnight and dishonest ones protected. I have read about elections, courts and news that people no longer fully trust.',
      'Most of these failures do not happen because Indians are bad people. They happen because our systems let responsibility disappear. Nobody can say who decided, nobody wrote down why, and nobody measures what happened afterwards. When responsibility cannot be seen, the honest are not rewarded and the careless are never asked.',
    ],
    quote:
      'In every office, from the panchayat to Parliament, three things must be true. Responsibility can be identified: we know who is in charge. Decisions are written down: we can read what was decided and why. Results are measured: we can see whether the promise was kept. Every one of the sixteen reforms in this book applies these three rules to one part of our government.',
    countWord: 'sixteen',
    groups: [
      {
        name: 'The citizen comes first',
        range: 'Reforms 1 to 5',
        text: 'Democracy begins with a citizen who knows how government works and whom to ask, who refuses to sell his or her vote and reports anyone who tries to buy it, who is told every week, in plain words, what was decided in their name, whose protest leads to a written answer instead of a closed gate, and whose elected representative is visibly at work in the constituency.',
        reforms: [
          { n: 1, title: 'Knowledge First', line: 'Civic education and clear public responsibility' },
          { n: 2, title: 'My Vote Is Not for Sale', line: 'The reform that begins with the people' },
          { n: 3, title: 'The Nation This Week', line: 'A weekly briefing that every citizen sees' },
          { n: 4, title: 'From Protest to Resolution', line: 'Departmental Protest Resolution Committees' },
          { n: 5, title: 'Leaders Who Show Up', line: 'Time, plans and accountability for elected representatives' },
        ],
      },
      {
        name: 'Power is given fairly',
        range: 'Reforms 6 to 8',
        text: 'Every Member must vote on every Bill, in the House or securely from anywhere, and must write down why; a Member who is unsure can ask the constituency first, and every vote is published. Every Indian citizen abroad can vote from where he or she lives, and the referee of our elections is made independent by its design, so that neither a government nor a single Commissioner can control it. The President and the Governors are chosen directly by the people, from candidates who belong to no party, and serve as neutral guardians of the nation.',
        reforms: [
          { n: 6, title: 'Every Vote Accountable', line: 'The Legislative Accountability Framework' },
          { n: 7, title: 'Every Vote Protected', line: 'Free, fair and trusted elections' },
          { n: 8, title: 'Guardians of the Republic', line: 'Elected, qualified and neutral Presidents and Governors' },
        ],
      },
      {
        name: 'Power is checked by law',
        range: 'Reforms 9 to 11',
        text: 'Courts work to a published timetable, so that justice arrives in time to matter. A Judicial Oversight Committee of retired judges watches every day whether governments keep the law, and it is the guardian of all three books. Petty corruption is designed out of every counter, with no contact, no cash and no delay; a video complaint booth stands outside every office, hospital and police station, every official wears a camera, and the police station becomes the safest room in town.',
        reforms: [
          { n: 9, title: 'Justice on Time', line: 'Faster, cleaner and fairer courts' },
          { n: 10, title: 'The Constitution’s Watch', line: 'A judicial committee that monitors every government, every day' },
          { n: 11, title: 'No Room for Bribes', line: 'Monitored offices, online services and police for the people' },
        ],
      },
      {
        name: 'Citizens can trust what they are told',
        range: 'Reforms 12 and 13',
        text: 'The press may not lie and the government may not silence it. Social media keeps its good and loses its harm: every post carries an honest label, a real person stands behind every account, and young people get their time back.',
        reforms: [
          { n: 12, title: 'A Free and Honest Press', line: 'Truth, accountability and freedom for the media' },
          { n: 13, title: 'Screens That Serve Us', line: 'Social media with age limits, real accounts and time for what matters' },
        ],
      },
      {
        name: 'The administration delivers',
        range: 'Reforms 14 to 16',
        text: 'Officers get a fixed term, written instructions and protection for refusing illegal orders. Every service gets a legal date, and the citizen is paid when the date is missed. The police, the investigators and every officer answer only to the law, never to whoever holds power.',
        reforms: [
          { n: 14, title: 'A Civil Service That Works', line: 'Stable postings, honest officers protected, results measured' },
          { n: 15, title: 'A National Right to Services', line: 'Every service on time, or the citizen is compensated' },
          { n: 16, title: 'Answerable Only to the Law', line: 'Police, investigators and officers free from political control, and equal justice for every citizen' },
        ],
      },
    ],
    afterword: {
      heading: 'So I begin here',
      paragraphs: [
        'This book is not written against any party or government; every rule in it binds the ruling side and the opposition alike. None of these reforms gives the State more power. They ask that the power it already has be used in the open, recorded and answered for.',
        'Book Two, on money, and Book Three, on the services citizens feel every day, cannot succeed unless the people who make, enforce and judge the law are chosen fairly, act openly and answer for what they do. So I begin here.',
      ],
    },
  },
  {
    slug: 'building-prosperity',
    ordinal: 'Two',
    title: 'Building Prosperity',
    tagline: 'Commerce, trade and money',
    description:
      'Book Two of My Vision of India: eleven reforms for public money, business, jobs, land, farms and tourism, so that India earns more and wastes less.',
    epigraph:
      'I want India to earn more and waste less, so that every family has work and every rupee of public money does the job it was raised for.',
    why: [
      'A nation pays for its schools, hospitals and roads from what it earns. Yet I saw governments borrow to pay salaries and old interest instead of building, and money raised for one purpose quietly spent on another. I saw small firms close while waiting for money the government owed them, families lose land and savings over promises that one side simply denied, and honest taxpayers chased while their own refunds sat for months. I saw farmers throw away harvests for want of a cold store, young people hold certificates but no job, and families unable to prove they own the land they have farmed for generations.',
      'None of this comes from a lack of talent or hard work. Indians are among the most enterprising people on earth. It comes from rules that let money disappear, let the State break the promises it enforces on citizens, and measure activity instead of results.',
    ],
    quote:
      'Public money is the people’s savings, held in trust. It must be borrowed only to build, tracked from the budget to the brick, and paid on time to those who earned it. And the government must go first: before it asks citizens to be honest, punctual and open, it must be honest, punctual and open itself.',
    countWord: 'eleven',
    groups: [
      {
        name: 'Public money',
        range: 'Reforms 1 to 3',
        text: 'A government may borrow only for projects that earn, employ and repay, and money given for a purpose stays locked to it. Every public project gets one ID and one public page that anyone can open with a QR code at the site. The tax system runs on one clock for both sides: what the citizen owes is paid on time, and so is what the government owes.',
        reforms: [
          { n: 1, title: 'Borrow Only to Build', line: 'Loans tied to earning projects, and no diversion of public funds' },
          { n: 2, title: 'Every Rupee Tracked', line: 'Public money you can follow, project by project' },
          { n: 3, title: 'The Honest Taxpayer Charter', line: 'Simple taxes, refunds on time, and a government that pays its bills' },
        ],
      },
      {
        name: 'Business, industry and jobs',
        range: 'Reforms 4 to 8',
        text: 'Every State chooses the industries it will lead in, and each gets a complete hub, ready before the factories arrive, on one national cluster map. The government pays its own bills first, and the money reaches every small supplier down the chain. Every private promise, from a land deal or a chit to the monthly milk bill, is signed with the thumbs of both sides on one State app, and a broken promise ends or becomes a case on its due date. Training is judged by verified jobs, not certificates, and part of each payment waits for the result. In an eleven-year national plan, every Indian who wants work is counted, district by district, and a tenth of the gap is closed every year, with work for every new entrant, until no willing hand is idle.',
        reforms: [
          { n: 4, title: 'One State, One Strength', line: 'Industrial clusters that make India a manufacturing power' },
          { n: 5, title: 'Paid on Time, Funded to Grow', line: 'The government pays first, and banks help businesses survive' },
          { n: 6, title: 'Every Promise on Record', line: 'One State app for every private agreement, from a field to the monthly milk bill' },
          { n: 7, title: 'Skills That Lead to Jobs', line: 'Paid apprenticeships in every district, linked to real employers' },
          { n: 8, title: 'Jobs for Everyone', line: 'An eleven-year national plan to give decent, paid work to every Indian who wants it' },
        ],
      },
      {
        name: 'Land and farms',
        range: 'Reforms 9 and 10',
        text: 'Every parcel of land gets one number and one title record that the State guarantees. Storage, a buyer and advice come close to the village, and every payment and claim has a published date and a named office.',
        reforms: [
          { n: 9, title: 'One Land, One Clear Title', line: 'Conclusive, digital land titles to end land disputes' },
          { n: 10, title: 'Farmers First', line: 'From the field to the market, fairly and on time' },
        ],
      },
      {
        name: 'Tourism',
        range: 'Reform 11',
        text: 'A written national plan, followed in order: educate our people, clean our destinations, invite the world, then build. Fair prices and safety for every guest come from the first day.',
        reforms: [{ n: 11, title: 'Tourism, the Heartbeat of the Nation', line: 'A five-year plan to welcome the world' }],
      },
    ],
    afterword: {
      heading: 'What joins them',
      paragraphs: [
        'Each reform turns a promise into a date, a record and a result that anyone can check. A loan is tied to a project; the project has a public page; the contractor is paid on time; the small supplier is paid in turn; every private deal is on record; the worker was trained for that very job; and every district counts, every month, how many of its people still need work. When money moves in the open and on time, trust grows, and trust is what brings investment, widens the tax base and creates jobs. Much of the money already exists in today’s budgets; what is missing is the discipline to spend it in the open, on time and for results.',
        'My first book makes power answerable. This one uses that honest government to build an economy where enterprise is rewarded and waste is seen. The third then spends what we earn on the services citizens feel every day. Good government earns trust; trust builds prosperity; prosperity pays for care.',
      ],
    },
  },
  {
    slug: 'a-safe-and-caring-nation',
    ordinal: 'Three',
    title: 'A Safe and Caring Nation',
    tagline: 'People and public services',
    description:
      'Book Three of My Vision of India: fourteen reforms for schools, hospitals, pensions, roads, streets and water, each judged by what reaches the citizen.',
    epigraph:
      'Most of us meet our government in a few ordinary places: the classroom, the hospital, the bus stop, the road, the street and the tap.',
    why: [
      'Most citizens never meet a Minister. They meet the teacher who does or does not come, the hospital that is or is not open at night, the pension that does or does not arrive, the road that is dug up without a warning sign, the water that may or may not be safe. That is where a citizen decides whether the country cares for them.',
      'For years we have measured these services by what goes in: buildings opened, pipes laid, money spent. So a tap that gives no safe water has been counted as a connection, and a school whose children cannot read has been counted as a school. I want to measure them by what comes out: whether the child can read, whether the patient was seen, whether the old woman was paid on time, whether the family came home safely.',
    ],
    quote:
      'The State must come to the citizen, not the citizen to the State. Every service gets a written standard, a named owner, a clock and a public record, and it is judged by what reaches the person: the child who reads, the patient seen at two o’clock in the morning, the pension that arrives by the 7th, the water that is safe at the tap.',
    countWord: 'fourteen',
    groups: [
      {
        name: 'Learning and opportunity',
        range: 'Reforms 1 to 4',
        text: 'Every teacher is checked once, fairly, and supported for a whole career. Every child reads, writes and counts by the end of Class 3, and parents see the result. No complete paper exists early, so no exam can leak. Reservation is a bridge, not a home: it is reduced in planned stages over twenty years, each only after an independent review and a vote of Parliament, while every poor child gets free education at every level.',
        reforms: [
          { n: 1, title: 'A Good Teacher in Every Classroom', line: 'Qualified faculty, real facilities and safe campuses' },
          { n: 2, title: 'Schools That Teach', line: 'Every child reading, writing and doing sums by Class 3' },
          { n: 3, title: 'Exams That Cannot Leak', line: 'Rebuilding India’s examination system' },
          { n: 4, title: 'From Reservation to Equal Opportunity', line: 'A fair, twenty-year path to a society without caste' },
        ],
      },
      {
        name: 'Health and care',
        range: 'Reforms 5 to 7',
        text: 'Medical education costs less in return for years of public service, and every district gets a hospital with specialists day and night. The pension comes to the person, not the person to the pension. The person who uses drugs is treated as a patient and the person who sells them as a criminal.',
        reforms: [
          { n: 5, title: 'A Doctor for Every Citizen', line: 'Rebuilding government healthcare' },
          { n: 6, title: 'Dignity in Old Age', line: 'Pensions on time, care at home, no one left alone' },
          { n: 7, title: 'Drug-Free Youth', line: 'Prevention, treatment and tough action on suppliers' },
        ],
      },
      {
        name: 'Safety',
        range: 'Reforms 8 to 12',
        text: 'Every bus stop meets a written safety standard and is linked to a control room where a person always answers. The rules of the road are taught, the roads are mended, and dangerous driving costs the licence. No road work starts without a safety plan. Teams and supplies are ready months before a flood or cyclone. Public cameras are planned and trusted, and private spaces are never filmed.',
        reforms: [
          { n: 8, title: 'Safe to Wait, Safe to Walk', line: 'Safe public spaces and women’s safety' },
          { n: 9, title: 'Every Journey Home', line: 'Traffic discipline, fair enforcement and smarter roads' },
          { n: 10, title: 'No Road Work Without a Safety Plan', line: 'Safe roads, safe work zones and contractor accountability' },
          { n: 11, title: 'Ready Before the Disaster', line: 'Disaster preparedness under one command' },
          { n: 12, title: 'Eyes We Can Trust', line: 'Indian-made cameras, a camera plan for every building, and AI that keeps us safe' },
        ],
      },
      {
        name: 'Clean and liveable',
        range: 'Reforms 13 and 14',
        text: 'One law in every State makes the right thing easy and the wrong thing expensive. We count homes that drink safely, not pipes laid, and our own people come first for water.',
        reforms: [
          { n: 13, title: 'Clean Streets, Proud Cities', line: 'Protecting public places, with fines that bite and jobs that last' },
          { n: 14, title: 'Water for Every Home', line: 'Safe water, saved rain, living lakes' },
        ],
      },
    ],
    afterword: {
      heading: 'Who does the work',
      paragraphs: [
        'Most of these services are run by the States and by local bodies, with the Union setting standards and sharing the cost. So most of what I propose can begin with a State order or a State law, and very little needs a constitutional amendment. Each reform names exactly who acts.',
        'Book One makes power answerable. Book Two earns and protects the money. Book Three spends it where citizens can feel it. When a child is taught well, a patient is treated in time, a family is safe on the road and water runs clean from the tap, a citizen knows that the nation cares. That is the India I hope for.',
      ],
    },
  },
];

export const bookBySlug = (slug: string) => BOOKS.find((b) => b.slug === slug);
