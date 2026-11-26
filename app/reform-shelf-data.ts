// The forty-one reforms as they stand on the home page's shelves (app/components/reform-shelf.tsx).
// Titles, subtitles and the one-sentence summaries are the book's own ("In one sentence" in each chapter);
// page numbers are those of My Vision of India: The Short Edition. Each part of a book is a series of
// volumes sharing one binding: its cloth, its foil and a spine design.
//
// Generated from the approved preview (previews/reforms-shelf-dark.html); edit here from now on.

export type SpineSeries = 'bands' | 'label' | 'block' | 'plain';

export type ShelfReform = {
  n: number;
  title: string;
  subtitle: string;
  sentence: string;
  firstPage: number;
  lastPage: number;
  /** Spine thickness in px, from the chapter's page count. */
  spineWidth: number;
  /** A slight shade so neighbouring volumes of one series are not identical. */
  tint: string;
};

export type ShelfPart = {
  name: string;
  range: string;
  series: SpineSeries;
  /** Pale cloth: lettering is printed in ink rather than stamped in gold. */
  light: boolean;
  /** Height of every volume in the series, in px. */
  height: number;
  cloth: string;
  foil: string;
  foilHi: string;
  foilLo: string;
  /** The band of colour at the foot of a "block" spine, and its lettering. */
  c2: string;
  f2: string;
  reforms: ShelfReform[];
};

export type Shelf = {
  ordinal: 'One' | 'Two' | 'Three';
  count: string;
  title: string;
  tagline: string;
  parts: ShelfPart[];
};

export const SHELVES: Shelf[] = [
  {
    ordinal: "One",
    count: "Sixteen",
    title: "Governing India",
    tagline: "Democracy, law and clean institutions",
    parts: [
      {
        name: "Citizens and Their Government",
        range: "Reforms 1–5",
        cloth: "#4f0b25",
        foil: "#e2b25e",
        foilHi: "#f7dc98",
        foilLo: "#9c6b27",
        c2: "#4f0b25",
        f2: "#e2b25e",
        reforms: [
          {
            n: 1,
            title: "Knowledge First",
            subtitle: "Civic education and clear public responsibility",
            sentence: "Every citizen learns how government works, every public asset shows who is responsible for it, and every complaint reaches the right office once, with a number, a deadline and a public record.",
            firstPage: 12,
            lastPage: 19,
            spineWidth: 35.6,
            tint: "rgba(255,255,255,0)"
          },
          {
            n: 2,
            title: "My Vote Is Not for Sale",
            subtitle: "The reform that begins with the people",
            sentence: "Buying or selling a vote becomes an offence against the nation, with seven years in prison for the giver and the taker alike and no easy bail, proved only on verified evidence, while the citizen who refuses, returns and reports is protected and rewarded.",
            firstPage: 20,
            lastPage: 26,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.06)"
          },
          {
            n: 3,
            title: "The Nation This Week",
            subtitle: "A weekly briefing that every citizen sees",
            sentence: "Every Sunday at noon, a plain and fair briefing on the week’s decisions, made by both sides of the House with retired judges in the chair, reaches every screen in all 22 languages, forced on no one.",
            firstPage: 27,
            lastPage: 33,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.08)"
          },
          {
            n: 4,
            title: "From Protest to Resolution",
            subtitle: "Departmental Protest Resolution Committees",
            sentence: "Beside every peaceful protest, citizens can open a Resolution track: they state the problem, the evidence and the solution they seek, and the department concerned must meet them, answer in writing with reasons, and track every promise in public until it is kept.",
            firstPage: 34,
            lastPage: 42,
            spineWidth: 38.8,
            tint: "rgba(255,255,255,.1)"
          },
          {
            n: 5,
            title: "Leaders Who Show Up",
            subtitle: "Time, plans and accountability for elected representatives",
            sentence: "Every elected representative gives the constituency at least 160 logged hours a month, publishes a yearly plan, numbers and tracks every complaint in public, keeps hands off local business, and answers to a State law against threats and misuse of public resources.",
            firstPage: 43,
            lastPage: 49,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.04)"
          }
        ],
        series: "bands",
        light: false,
        height: 274
      },
      {
        name: "Parliament, Elections and the Highest Offices",
        range: "Reforms 6–8",
        cloth: "#2a0a16",
        foil: "#e2b25e",
        foilHi: "#f7dc98",
        foilLo: "#9c6b27",
        c2: "#2a0a16",
        f2: "#e2b25e",
        reforms: [
          {
            n: 6,
            title: "Every Vote Accountable",
            subtitle: "The Legislative Accountability Framework",
            sentence: "Every Member entitled to vote on a Bill must vote, in the House or securely from anywhere, must write down the reasons, may first ask the constituency, and every name, vote and reason is published for any citizen to check.",
            firstPage: 50,
            lastPage: 56,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,0)"
          },
          {
            n: 7,
            title: "Every Vote Protected",
            subtitle: "Free, fair and trusted elections",
            sentence: "Every Indian citizen abroad can vote from where he or she lives, counted at home, and no government or single Commissioner can control the Election Commission: every decision is signed, every roll change is public, and bending it carries a heavy price.",
            firstPage: 57,
            lastPage: 64,
            spineWidth: 35.6,
            tint: "rgba(255,255,255,.06)"
          },
          {
            n: 8,
            title: "Guardians of the Republic",
            subtitle: "Elected, qualified and neutral Presidents and Governors",
            sentence: "The President and every Governor are elected directly by the people, from qualified candidates who belong to no party and pass public tests, and serve as neutral guardians who check the elected government but never run it.",
            firstPage: 65,
            lastPage: 71,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.08)"
          }
        ],
        series: "label",
        light: false,
        height: 286
      },
      {
        name: "Law, Justice and Honesty",
        range: "Reforms 9–11",
        cloth: "#1a0910",
        foil: "#e2b25e",
        foilHi: "#f7dc98",
        foilLo: "#9c6b27",
        c2: "#1a0910",
        f2: "#e2b25e",
        reforms: [
          {
            n: 9,
            title: "Justice on Time",
            subtitle: "Faster, cleaner and fairer courts",
            sentence: "Every case runs to a published timetable with enough judges to keep it, lying to a court is punished while losing honestly never is, and honest judges chosen at random examine every complaint of a corrupt or deliberately delayed order.",
            firstPage: 72,
            lastPage: 78,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.1)"
          },
          {
            n: 10,
            title: "The Constitution’s Watch",
            subtitle: "A judicial committee that monitors every government, every day",
            sentence: "A Judicial Oversight Committee of retired judges, in the Union and every State, watches every day whether governments keep the law, and any movement of public money missing from a public portal after 24 hours raises an automatic alert.",
            firstPage: 79,
            lastPage: 85,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.04)"
          },
          {
            n: 11,
            title: "No Room for Bribes",
            subtitle: "Monitored offices, online services and police for the people",
            sentence: "A video complaint booth outside every government office, hospital and police station sends a complaint at once to vigilance and senior officials; every official and police officer wears a camera; services run online and on the clock; and the police are freed from pressure and made answerable.",
            firstPage: 86,
            lastPage: 95,
            spineWidth: 42.0,
            tint: "rgba(255,255,255,0)"
          }
        ],
        series: "bands",
        light: false,
        height: 262
      },
      {
        name: "Truth and Information",
        range: "Reforms 12 and 13",
        cloth: "#eadcbd",
        foil: "#4f0b25",
        foilHi: "#4f0b25",
        foilLo: "#4f0b25",
        c2: "#4f0b25",
        f2: "#e2b25e",
        reforms: [
          {
            n: 12,
            title: "A Free and Honest Press",
            subtitle: "Truth, accountability and freedom for the media",
            sentence: "An independent Media Standards and Integrity Commission holds the media and the government to account with equal force: the press may not lie, the government may not silence it, and only a court may convict or close an outlet.",
            firstPage: 96,
            lastPage: 102,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.06)"
          },
          {
            n: 13,
            title: "Screens That Serve Us",
            subtitle: "Social media with age limits, real accounts and time for what matters",
            sentence: "Every post carries an honest label, every student gets one hour a day of fun reels and unlimited learning, every account has a real verified person behind it, and an independent regulator checks the platforms, never the citizens.",
            firstPage: 103,
            lastPage: 109,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.08)"
          }
        ],
        series: "block",
        light: true,
        height: 250
      },
      {
        name: "An Administration That Delivers",
        range: "Reforms 14–16",
        cloth: "#6a1430",
        foil: "#e2b25e",
        foilHi: "#f7dc98",
        foilLo: "#9c6b27",
        c2: "#6a1430",
        f2: "#e2b25e",
        reforms: [
          {
            n: 14,
            title: "A Civil Service That Works",
            subtitle: "Stable postings, honest officers protected, results measured",
            sentence: "Every key post in government gets a minimum term fixed by law, every instruction is written down, honest officers can safely refuse illegal orders, and every officer is judged by results that citizens can see.",
            firstPage: 110,
            lastPage: 116,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.1)"
          },
          {
            n: 15,
            title: "A National Right to Services",
            subtitle: "Every service on time, or the citizen is compensated",
            sentence: "A National Right to Services Act gives every Union service a legal date, a named officer and a price for being late; when the date is missed, the appeal opens by itself and compensation reaches the citizen unasked.",
            firstPage: 117,
            lastPage: 123,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.04)"
          },
          {
            n: 16,
            title: "Answerable Only to the Law",
            subtitle: "Police, investigators and officers free from political control",
            sentence: "Police, investigators and every officer of the State answer only to the law: independent Boards watch the agencies, no officer is moved without written reasons or removed by one side alone, and citizens can check the police station and the numbers.",
            firstPage: 124,
            lastPage: 131,
            spineWidth: 35.6,
            tint: "rgba(255,255,255,0)"
          }
        ],
        series: "plain",
        light: false,
        height: 270
      }
    ]
  },
  {
    ordinal: "Two",
    count: "Eleven",
    title: "Building Prosperity",
    tagline: "Commerce, trade and money",
    parts: [
      {
        name: "Public Money",
        range: "Reforms 1–3",
        cloth: "#1e4f4b",
        foil: "#e2b25e",
        foilHi: "#f7dc98",
        foilLo: "#9c6b27",
        c2: "#1e4f4b",
        f2: "#e2b25e",
        reforms: [
          {
            n: 1,
            title: "Borrow Only to Build",
            subtitle: "Loans tied to earning projects, and no diversion of public funds",
            sentence: "Every loan must buy something that earns enough to repay it; money given for a purpose stays locked to it; no scheme is announced without its price; whoever diverts money answers for it; and in fifteen years every government repays all it owes.",
            firstPage: 136,
            lastPage: 145,
            spineWidth: 42.0,
            tint: "rgba(255,255,255,0)"
          },
          {
            n: 2,
            title: "Every Rupee Tracked",
            subtitle: "Public money you can follow, project by project",
            sentence: "Every public project above a set size gets one permanent Project ID and one public page, opened by a QR code at the site, showing the contract, every payment beside the work done, every delay with its reason and every audit finding.",
            firstPage: 146,
            lastPage: 152,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.06)"
          },
          {
            n: 3,
            title: "The Honest Taxpayer Charter",
            subtitle: "Simple taxes, refunds on time, and a government that pays its bills",
            sentence: "Tax rules change once a year, every refund, case and appeal runs on a published clock, stamp duty for a failed registration returns in 24 hours, notices open in plain words, and the government pays its bills and contracts on time, or pays interest.",
            firstPage: 153,
            lastPage: 161,
            spineWidth: 38.8,
            tint: "rgba(0,0,0,.08)"
          }
        ],
        series: "bands",
        light: false,
        height: 280
      },
      {
        name: "Business, Industry and Jobs",
        range: "Reforms 4–8",
        cloth: "#12332f",
        foil: "#e2b25e",
        foilHi: "#f7dc98",
        foilLo: "#9c6b27",
        c2: "#12332f",
        f2: "#e2b25e",
        reforms: [
          {
            n: 4,
            title: "One State, One Strength",
            subtitle: "Industrial clusters that make India a manufacturing power",
            sentence: "Every State chooses one or two industries to lead in, the Centre and the States plan one national map, each industry gets a complete hub, scattered units are invited in, and obstructing an approved investor becomes a serious crime.",
            firstPage: 162,
            lastPage: 168,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.1)"
          },
          {
            n: 5,
            title: "Paid on Time, Funded to Grow",
            subtitle: "The government pays first, and banks help businesses survive",
            sentence: "Every public buyer pays every bill on time, with interest added automatically when it is late; the money travels down the chain to every registered supplier below the main contractor; and banks find and treat a small firm’s trouble before its loan turns bad.",
            firstPage: 169,
            lastPage: 175,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.04)"
          },
          {
            n: 6,
            title: "Every Promise on Record",
            subtitle: "One State app for every private agreement",
            sentence: "Every private agreement, from a land deal, a loan or a chit to the monthly milk bill, is signed by both thumbs on one State app, every payment is written into it, and a broken promise ends or becomes a case on its due date.",
            firstPage: 176,
            lastPage: 182,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,0)"
          },
          {
            n: 7,
            title: "Skills That Lead to Jobs",
            subtitle: "Paid apprenticeships in every district, linked to real employers",
            sentence: "Measure skilling by jobs, not by certificates: every district plans its training from what local employers need, brings paid apprenticeships within every young person’s reach, and publishes what happened to every learner, with part of the money following the results.",
            firstPage: 183,
            lastPage: 189,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.06)"
          },
          {
            n: 8,
            title: "Jobs for Everyone",
            subtitle: "An eleven-year national plan for decent, paid work",
            sentence: "An eleven-year national plan with one promise: count, in every district, everyone who wants work and has none or too little, then close a tenth of that gap every year, plus work for every new entrant, until no willing hand is idle.",
            firstPage: 190,
            lastPage: 196,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.08)"
          }
        ],
        series: "label",
        light: false,
        height: 266
      },
      {
        name: "Land and Farms",
        range: "Reforms 9 and 10",
        cloth: "#7a5618",
        foil: "#f3e3c3",
        foilHi: "#fff6e2",
        foilLo: "#bfa77c",
        c2: "#7a5618",
        f2: "#f3e3c3",
        reforms: [
          {
            n: 9,
            title: "One Land, One Clear Title",
            subtitle: "Conclusive, digital land titles to end land disputes",
            sentence: "Every parcel of land gets one number and one record that joins the revenue record, the map and the register of deeds, checked in the village, made conclusive by law and guaranteed by a State fund that pays if the record is wrong.",
            firstPage: 197,
            lastPage: 203,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.1)"
          },
          {
            n: 10,
            title: "Farmers First",
            subtitle: "From the field to the market, fairly and on time",
            sentence: "Every farmer finds storage, irradiation, a fair buyer and advice within reach; every payment and claim runs on a published date with a named office; and each glut becomes a product, not waste.",
            firstPage: 204,
            lastPage: 211,
            spineWidth: 35.6,
            tint: "rgba(0,0,0,.04)"
          }
        ],
        series: "plain",
        light: false,
        height: 254
      },
      {
        name: "Tourism",
        range: "Reform 11",
        cloth: "#e7d8b8",
        foil: "#1e4f4b",
        foilHi: "#1e4f4b",
        foilLo: "#1e4f4b",
        c2: "#1e4f4b",
        f2: "#e2b25e",
        reforms: [
          {
            n: 11,
            title: "Tourism, the Heartbeat of the Nation",
            subtitle: "A five-year plan to welcome the world",
            sentence: "A written five-year national plan, made by the Union and the States together, first educates our people, cleans our destinations and invites the world, then builds, while every guest pays one fair price and is safe from the first day.",
            firstPage: 212,
            lastPage: 218,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,0)"
          }
        ],
        series: "block",
        light: true,
        height: 286
      }
    ]
  },
  {
    ordinal: "Three",
    count: "Fourteen",
    title: "A Safe and Caring Nation",
    tagline: "People and public services",
    parts: [
      {
        name: "Learning and Opportunity",
        range: "Reforms 1–4",
        cloth: "#ede0c3",
        foil: "#3d0a1d",
        foilHi: "#3d0a1d",
        foilLo: "#3d0a1d",
        c2: "#ede0c3",
        f2: "#3d0a1d",
        reforms: [
          {
            n: 1,
            title: "A Good Teacher in Every Classroom",
            subtitle: "Qualified faculty, real facilities and safe campuses",
            sentence: "Every teacher in every school, college and university is checked once and fairly, then trained and watched over for a whole career, and an institution without qualified teachers, real facilities or a safe campus is not allowed to run.",
            firstPage: 223,
            lastPage: 229,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,0)"
          },
          {
            n: 2,
            title: "Schools That Teach",
            subtitle: "Every child reading, writing and doing sums by Class 3",
            sentence: "Every State promises what each child will read, write and count by Class 3, checks every child twice a year, helps those behind at once in a language they understand, shows parents the results every term, and makes sure every egg at the Anganwadi reaches the child.",
            firstPage: 230,
            lastPage: 238,
            spineWidth: 38.8,
            tint: "rgba(255,255,255,.06)"
          },
          {
            n: 3,
            title: "Exams That Cannot Leak",
            subtitle: "Rebuilding India’s examination system",
            sentence: "Every public examination runs to one published security standard, so that no complete paper exists early, every touch of the paper is recorded against a named person, outside experts check the system, and every failure is traced to the exact link that broke.",
            firstPage: 239,
            lastPage: 246,
            spineWidth: 35.6,
            tint: "rgba(0,0,0,.08)"
          },
          {
            n: 4,
            title: "From Reservation to Equal Opportunity",
            subtitle: "A fair, twenty-year path to a society without caste",
            sentence: "Reservation goes first to families still in need and steps back over twenty years only as equality is proven, while every Scheduled Caste, Scheduled Tribe and poor student studies free, and caste finally leaves every record.",
            firstPage: 247,
            lastPage: 253,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.1)"
          }
        ],
        series: "bands",
        light: true,
        height: 268
      },
      {
        name: "Health and Care",
        range: "Reforms 5–7",
        cloth: "#2a6a63",
        foil: "#f3e3c3",
        foilHi: "#fff6e2",
        foilLo: "#bfa77c",
        c2: "#2a6a63",
        f2: "#f3e3c3",
        reforms: [
          {
            n: 5,
            title: "A Doctor for Every Citizen",
            subtitle: "Rebuilding government healthcare",
            sentence: "Doctors study cheaply and give 3 to 5 years of government service in return, are paid fairly and joined by senior volunteers, and every district gets one hospital with specialists day and night, watched in public and answerable within one hour.",
            firstPage: 254,
            lastPage: 260,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.04)"
          },
          {
            n: 6,
            title: "Dignity in Old Age",
            subtitle: "Pensions on time, care at home, no one left alone",
            sentence: "Every older Indian is found at 60 and paid a pension by a fixed date each month, never stopped without a home visit, served at the doorstep, visited if alone, and given day care, geriatric care and protection from abuse close to home.",
            firstPage: 261,
            lastPage: 267,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,0)"
          },
          {
            n: 7,
            title: "Drug-Free Youth",
            subtitle: "Prevention, treatment and tough action on suppliers",
            sentence: "Every young person learns life skills and honest facts about drugs, every district has a confidential treatment centre, a user found with a small quantity goes to treatment instead of court, and every supplier faces a fast trial and loses his property.",
            firstPage: 268,
            lastPage: 274,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.06)"
          }
        ],
        series: "plain",
        light: false,
        height: 258
      },
      {
        name: "Safety",
        range: "Reforms 8–12",
        cloth: "#3d0a1d",
        foil: "#e2b25e",
        foilHi: "#f7dc98",
        foilLo: "#9c6b27",
        c2: "#3d0a1d",
        f2: "#e2b25e",
        reforms: [
          {
            n: 8,
            title: "Safe to Wait, Safe to Walk",
            subtitle: "Safe public spaces and women’s safety",
            sentence: "Every bus shelter, in the city and in the village, is lit and watched by cameras that record sound, carries a board of rules in three languages, is linked to a control room where a person always answers, and is paid for by its own advertising, with places where trouble repeats fixed first.",
            firstPage: 275,
            lastPage: 282,
            spineWidth: 35.6,
            tint: "rgba(0,0,0,.08)"
          },
          {
            n: 9,
            title: "Every Journey Home",
            subtitle: "Traffic discipline, fair enforcement and smarter roads",
            sentence: "Every citizen learns the rules of the road, every road is mended, marked and lit so the rules can be followed, every check is recorded so nobody can buy a way out, and repeated dangerous driving finally costs the licence.",
            firstPage: 283,
            lastPage: 289,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,.1)"
          },
          {
            n: 10,
            title: "No Road Work Without a Safety Plan",
            subtitle: "Safe roads, safe work zones and contractor accountability",
            sentence: "No road work begins until a written safety plan answers seven questions; every site is signed, lit, guarded and named in public; and every serious accident in a work zone starts an independent investigation the same day.",
            firstPage: 290,
            lastPage: 296,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.04)"
          },
          {
            n: 11,
            title: "Ready Before the Disaster",
            subtitle: "Disaster preparedness under one command",
            sentence: "Every State keeps its teams, supplies, routes and a register of the most vulnerable ready under one State Disaster Command, able to handle three or four disasters at once, and has that readiness practised, audited and published every year.",
            firstPage: 297,
            lastPage: 303,
            spineWidth: 32.4,
            tint: "rgba(255,255,255,0)"
          },
          {
            n: 12,
            title: "Eyes We Can Trust",
            subtitle: "Indian-made cameras, a camera plan for every building, and AI that keeps us safe",
            sentence: "Every camera that guards a public place is built in India from trusted parts, placed by a plan approved with the building plan, and linked to a State command centre where artificial intelligence (AI) raises the alert and a trained human decides.",
            firstPage: 304,
            lastPage: 311,
            spineWidth: 35.6,
            tint: "rgba(255,255,255,.06)"
          }
        ],
        series: "label",
        light: false,
        height: 282
      },
      {
        name: "Clean and Liveable",
        range: "Reforms 13 and 14",
        cloth: "#8a6526",
        foil: "#f6ecd7",
        foilHi: "#fffaf0",
        foilLo: "#c4ad84",
        c2: "#8a6526",
        f2: "#f6ecd7",
        reforms: [
          {
            n: 13,
            title: "Clean Streets, Proud Cities",
            subtitle: "Protecting public places, with fines that bite and jobs that last",
            sentence: "Every State passes one Clean Public Places Act with a clear fine for every offence, gives every kind of waste an honest place to go, and enforces the law through uniformed guards on camera, with every ward scored in public each month.",
            firstPage: 312,
            lastPage: 318,
            spineWidth: 32.4,
            tint: "rgba(0,0,0,.08)"
          },
          {
            n: 14,
            title: "Water for Every Home",
            subtitle: "Safe water, saved rain, living lakes",
            sentence: "Every district plans its water for ten years and for a long drought, every tap is held to a published standard and tested in public, and our rain, lakes and groundwater serve our own people first.",
            firstPage: 319,
            lastPage: 324,
            spineWidth: 29.2,
            tint: "rgba(255,255,255,.1)"
          }
        ],
        series: "bands",
        light: false,
        height: 252
      }
    ]
  }
];
