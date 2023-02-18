const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const events = [
  {
    shortTitle: "HBTQ-filmvisning",
    longTitle: "Filmvisning med Project Pride och QN",
    description: `### Gör er redo för popcorn och bio-stämning, för det har blivit dags för filmvisning!! 
    
Project Pride ska tillsammans med QN ha filmvisning med HBTQ-tema den 26e april i META. Insläpp börjar kl. 17:30 och filmen börjar kl. 18:00. Det kommer att bli härlig stämning så detta vill ni inte missa!
Men vad blir det för film? Det kan du vara med och bestämma genom att rösta i det här [formuläret](https://forms.gle/bksEpotnq7R5eVso7)
Hoppas att vi ses där!!`,
    startTime: new Date("2022-06-21 22:00:00"),
    eventPictureLink:
      "https://biljettsystem.salamon.xyz/serve-static/images/film.jpg",
    location: {
      lat: 59.3480103,
      lng: 18.0714542,
      title: "META",
      address: "Osquars backe 21, Stockholm",
    },
    ticketTypes: [
      {
        title: "Biobiljett",
        description: "Läsk och popcorn ingår",
        price: 20,
        numTickets: 50,
        standard: true,
      },
    ],
  },
  {
    shortTitle: "Kulturnatt Sthlm",
    longTitle: "Kulturnatt Sthlm: Vandra i nya världar ",
    description: `### Vandra i nya världar under Stockholms Kulturnatt
    
Det är dags igen, den natten på året när Stockholms museer, teatrar och kulturliv slår upp portarna och bjuder in till event och en titt på annars stängda skrymslen och vår. Sf-bokhandeln i Gamla stan är såklart med hela natten!

### Rymdkonst i de medeltida källarvalven

Anders Muammar, konstnär och SFX-makare, ställer ut sina drömska verk i våra ”katakomber”, det vill säga de medeltida källarvalven som ligger under butiken. 
Med bilder som rör sig i rymdens och det omedvetnas outforskade områden, tar han oss till platser bortom vår egen fantasi. 
Pågår hela kvällen 18.00-24.00. Se ett smakprov på hans webbsite [Le flic dangeresque](https://www.andersmuammar.com/).

### Drag-opera med TvivelDiva

Strålande sång och sprudlande underhållning bjuds det på från TvivelDiva, en duo bestående av drag-artisten Inga Tvivel och operasångaren Sofia Flodin! 
Med musikalisk inspiration från Tolkien, Lovecraft och annat ur fantastikens värld, bjuder de in till konsert under kristallkronan kl. 22.00

Nyfiken på vad annat som händer under [Kulturnatten](https://kulturnattstockholm.se/)? Hemsidan listar flera hundra programpunkter, alla gratis och öppna hela kvälen. 
Bara i Gamla stan finns så skilda aktiviteter som föreställningar kring yttrandefrihet på Nobelmuseet, kriminalhistorisk vandring med Deckarbokhandeln, en helkväll med dans på Mäster Olofsgården och både cosplay och rustningsfinissage på Livrustkammaren.`,
    startTime: new Date("2022-05-23 18:00:00"),
    eventPictureLink:
      "https://biljettsystem.salamon.xyz/serve-static/images/kultur.jpg",
    location: {
      lat: 59.32404995364403,
      lng: 18.070529078709843,
      title: "Sci-fi bokhandeln",
      address: "Västerlånggatan 48, 111 29 Stockholm",
    },
    ticketTypes: [
      {
        title: "Rymdkonst-utställningen",
        description:
          'Biljett för att få se - Rymdkonst i de medeltida källarvalven',
        price: 50,
        numTickets: 200,
        standard: true,
      },
      {
        title: "Drag-opera",
        description: "Drag-opera med Sofia Flodin kl. 22.00",
        price: 100,
        numTickets: 200,
      },
    ],
  },
  {
    shortTitle: "METAspexet 2022",
    longTitle: "På västfronten intet spex",
    description: `
    
### METAspexet är i vår återigen tillbaka!

Årets föreställning är: *"På västfronten intet spex - eller andra sidan, är ni klara?"* som tar oss tillbaka till första världskriget, där två fronter möts!


METAspexet är ett samarbete mellan Konglig Datasektionen och Sektionen för Medieteknik på KTH. Vi sätter varje år upp en interaktiv studentteater med musikinslag.
Se till att boka in datumen 21-22:a maj i era kalendrar, för detta vill ni inte missa!
Biljetter släpps den 28:e april. Mer information kommer!

Årets föreställningar:

Lördag den 21:a maj klockan 18:00-21:00\\
Söndag den 22:a maj klockan 13:00-16:00\\
Söndag den 22:a maj klockan 18:00-21:30 (Slasqueföreställning)\\
Sluttiderna är ungefärliga!`,
    startTime: new Date("2022-05-21 18:00:00"),
    eventPictureLink:
      "https://biljettsystem.salamon.xyz/serve-static/images/spex.jpg",
    location: {
      lat: 59.3359961,
      lng: 18.0592714,
      title: "Playhouse",
      address: "Västerlånggatan 48",
    },
    ticketTypes: [
      {
        title: "Standard",
        description: "Vanlig biljett till föreställningen",
        price: 120,
        numTickets: 200,
        standard: true,
      },
      {
        title: "Slasquebiljett",
        description: "Biljett till slasqueföreställningen",
        price: 140,
        numTickets: 200,
      },
    ],
  },
  {
    shortTitle: "TokTok-gasquen",
    longTitle: "TikTok-gasque - METAspexets externsittning",
    description: `### Heeej alla dataloger och medianer, spexare och icke-spexare! 🤩
    
Har du den där där dansen du alltid velat visa upp? Är du trött på alla boomers som inte förstår dina TikTok-referenser? Eller är du en boomer som febrilt försöker förstå den yngre generationen?
SpexM har lösningen för dig! Det är nämligen dags för TikTok-gasque! 🥳 Alla dataloger och medianer, spexare som icke-spexare, är varmt välkomna på en sittning utöver det vanliga!
Biljetter släpps i eventet vid 18.00 fredagen den 29e april!

💃 Var? META\\
💃 När? Fredagen den 13 maj, 19.00\\
💃 Efterkör? JAAAA!\\
💃 Pris? TBA\\
💃 Klädkod? Ovve, B-frack och dylikt\\
💃 Snyggt märke? Såklart

Bilder kan kommas att tas under eventet, Skriv till oss direkt på Facebook om ni inte vill fotas eller vill att vi tar bort en bild!

[ENGLISH]

### All students of the computer science and media chapters, look here! 🤩
  
Have you choreographed your own dance but never gotten the chance to show it? Tired of all the boomers that don't understand your TikTok references? Or are you a boomer that is desperately trying to understand the younger generation?
SpexM has the solution! The TikTok-gasque! All members of the computer science and media technology chapters are welcome to a gasque beyond your wildest dreams!
Tickets will be released in this event at 18.00 on Friday the 29th of April!

💃 Where? META\\
💃 When? Friday the 13th of May at 19.00\\
💃 After-party? HELL YES!\\
💃 Price? TBA\\
💃 Dresscode? Ovve, B-frack or similar\\
💃 Nice patch? OFC
    
Photographs will be taken during this event, contact us on Facebook if you don't want to be photographed or if you want us to delete a photo! `,
    startTime: new Date("2022-05-13 19:00:00"),
    releaseTime: new Date("2022-04-29 18:00:00"),
    eventPictureLink:
      "https://biljettsystem.salamon.xyz/serve-static/images/tiktok.jpg",
    location: {
      lat: 59.3480103,
      lng: 18.0714542,
      title: "META",
      address: "Osquars backe 21, Stockholm",
    },
    ticketTypes: [
      {
        title: "Alkfull",
        description: "Inkluderar två enheter + punsch 18+",
        price: 140,
        numTickets: 60,
        standard: true,
      },
      {
        title: "Alkfri",
        description: "Inkluderar 2 alkfria enheter + alkfri punsch",
        price: 90,
        numTickets: 40,
      },
    ],
  },
  {
    shortTitle: "GEEK-sittning",
    longTitle: "Gäris- och ickebinäris vårsittning",
    description: `Det är dags igen gott folk! 🥂 Kände du att du förade för lite? Sjöng för lågt? Kanske inte hade möjlighet att vara med? Då får du en till chans nu!! Det enda som möjligen kan vara bättre än GEEKsittningen i höstas är ju rimligtvis en till, ännu bättre, GEEKsittning nu i vår!!😍
    Biljettsläpp: 13/4 19:00

📍Plats: META\\
✨Hur: med dina finaste gäris och ickebinäris ❤\\
📆När: 22a April, 19:00\\
🎁Märken: 100%\\
🍸Efterkör: ÖPPET FÖR ALLA\\
🥵Hotel: Trivago\\

[ENGLISH]

The time has come again people! Soon we'll host another gasque for women and non-binaries 😍

Ticket realese: 13/4 19:00!!
📍Where: META\\
✨How: with your friends\\
📆När: 22nd April, 19:00\\
🎁Patches: 100%\\
🍸Afterparty: ÖPPET FÖR ALLA\\
🥵Hotel: Trivago`,
    startTime: new Date("2022-04-22 19:00:00"),
    releaseTime: new Date("2022-04-13 19:00:00"),
    eventPictureLink:
      "https://biljettsystem.salamon.xyz/serve-static/images/geek.jpg",
    location: {
      lat: 59.3480103,
      lng: 18.0714542,
      title: "META",
      address: "Osquars backe 21, Stockholm",
    },
    ticketTypes: [
      {
        title: "Alkfull",
        description: "Inkluderar två enheter + punsch 18+",
        price: 140,
        numTickets: 60,
        standard: true,
      },
      {
        title: "Alkfri",
        description: "Inkluderar 2 alkfria enheter + alkfri punsch",
        price: 90,
        numTickets: 40,
      },
    ],
  }
];

const users = [
  { name: "Lisa A", email: "lisa01@gmail.com" },
  { name: "Lisa B", email: "lisa02@gmail.com" },
  { name: "Lisa C", email: "lisa03@gmail.com" },
];

async function main() {
  await prisma.$transaction(
    events.map((event) =>
      prisma.event.create({
        data: {
          shortTitle: event.shortTitle,
          longTitle: event.longTitle,
          description: event.description,
          startTime: event.startTime,
          releaseTime: event.releaseTime,
          eventPictureLink: event.eventPictureLink,
          location: {
            create: event.location,
          },
          ticketTypes: {
            createMany: { data: event.ticketTypes },
          },
        },
        include: {
          ticketTypes: true,
        },
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
