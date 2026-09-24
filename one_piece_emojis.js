// Emoji clues, loaded with a <script> tag so the game also works when opened via file://
const EMOJI_DATA = [
  {
    "character": "Monkey D. Luffy",
    "emoji": "🐵👒🍖☠️"
  },
  {
    "character": "Roronoa Zoro",
    "emoji": "🗡️🗡️🗡️🍺"
  },
  {
    "character": "Nami",
    "emoji": "🗺️🌊🍊💰"
  },
  {
    "character": "Usopp",
    "emoji": "🎯🔫🐔😂"
  },
  {
    "character": "Sanji",
    "emoji": "👨‍🍳💘🚬🍽️"
  },
  {
    "character": "Tony Tony Chopper",
    "emoji": "🦌⚕️🍬😊"
  },
  {
    "character": "Nico Robin",
    "emoji": "📚👐🏛️🌸"
  },
  {
    "character": "Franky",
    "emoji": "🔧🤖🍹💪"
  },
  {
    "character": "Brook",
    "emoji": "🎻💀👒😂"
  },
  {
    "character": "Jinbe",
    "emoji": "🦈🌊🥋🧘"
  },
  {
    "character": "Portgas D. Ace",
    "emoji": "🔥🍗😎☠️"
  },
  {
    "character": "Shanks",
    "emoji": "🍷🧔🏴‍☠️👒"
  },
  {
    "character": "Trafalgar Law",
    "emoji": "⚔️🧪🧥💀"
  },
  {
    "character": "Eustass Kid",
    "emoji": "🧲🤬💥🦾"
  },
  {
    "character": "Boa Hancock",
    "emoji": "💘👑🐍💃"
  },
  {
    "character": "Dracule Mihawk",
    "emoji": "🗡️🧛‍♂️🦅🎩"
  },
  {
    "character": "Kaido",
    "emoji": "🐉🍶💪👹"
  },
  {
    "character": "Big Mom",
    "emoji": "🍰👩‍👧‍👦🍭😈"
  },
  {
    "character": "Gol D. Roger",
    "emoji": "🏴‍☠️👑⚓📜"
  },
  {
    "character": "Edward Newgate",
    "emoji": "🦴⚓🍻👴"
  },
  {
    "character": "Sabo",
    "emoji": "🎩🔥📖🧑‍🤝‍🧑"
  },
  {
    "character": "Garp",
    "emoji": "👊🍪🧓⚓"
  },
  {
    "character": "Smoker",
    "emoji": "🚬⚔️🌀🧊"
  },
  {
    "character": "Buggy",
    "emoji": "🤡🎪✂️💥"
  },
  {
    "character": "Crocodile",
    "emoji": "🐊🪨🥃🦾"
  },
  {
    "character": "Donquixote Doflamingo",
    "emoji": "😎🦩🎭🕶️"
  },
  {
    "character": "Katakuri",
    "emoji": "🍩⚔️🧁😠"
  },
  {
    "character": "Enel",
    "emoji": "⚡😈🛕👂"
  },
  {
    "character": "Arlong",
    "emoji": "🦈🌊😡🪸"
  },
  {
    "character": "Kizaru",
    "emoji": "💡😎🚀🌠"
  },
  {
    "character": "Akainu",
    "emoji": "🌋🧱👿🔥"
  },
  {
    "character": "Aokiji",
    "emoji": "❄️😴🚴🧊"
  },
  {
    "character": "Fujitora",
    "emoji": "👨‍🦯🌌⚔️🗻"
  },
  {
    "character": "Rob Lucci",
    "emoji": "🐆👔🕵️‍♂️👊"
  },
  {
    "character": "Vegapunk",
    "emoji": "🧠🔬🤖🧪"
  },
  {
    "character": "Yamato",
    "emoji": "🦊⛓️💥🧔"
  },
  {
    "character": "Oden",
    "emoji": "🍢🔥🏯💪"
  },
  {
    "character": "Ivankov",
    "emoji": "💄👠💥💃"
  },
  {
    "character": "Magellan",
    "emoji": "☠️🧪🧻🚽"
  },
  {
    "character": "Kuma",
    "emoji": "🐻📕🛡️🌀"
  },
  {
    "character": "Reiju",
    "emoji": "💋🧪👠🌸"
  },
  {
    "character": "Caesar Clown",
    "emoji": "🧪👻😈🎈"
  },

  {
    "character": "Blackbeard",
    "emoji": "🏴‍☠️🦷💥🍻"
  },
  {
    "character": "Kozuki Momonosuke",
    "emoji": "🐉👶🏯🍑"
  },
  {
    "character": "Kinemon",
    "emoji": "🗡️👘🔥🦊"
  },
  {
    "character": "Raizo",
    "emoji": "🥷📜💨🐸"
  },
  {
    "character": "Carrot",
    "emoji": "🐰⚡🥕🌙"
  },
  {
    "character": "Pedro",
    "emoji": "🐆🧨💥⏰"
  },
  {
    "character": "Perospero",
    "emoji": "🍭👅🎪🦴"
  },
  {
    "character": "Sengoku",
    "emoji": "🏛️🐐💛⚖️"
  },
  {
    "character": "Koby",
    "emoji": "⚓👦💪🌊"
  },
  {
    "character": "Monkey D. Dragon",
    "emoji": "🐉🌪️⚡🔥"
  },
  {
    "character": "Gecko Moria",
    "emoji": "🦇👻✂️🌙"
  },
  {
    "character": "Vivi",
    "emoji": "👸🏜️🦆💙"
  },
  {
    "character": "Mr. 1",
    "emoji": "🔪⚔️💎🗡️"
  },
  {
    "character": "Mr. 3",
    "emoji": "🕯️🎨3️⃣💀"
  },
  {
    "character": "Wyper",
    "emoji": "🏹⚡🪶💥"
  },
  {
    "character": "Gan Fall",
    "emoji": "👴🪶🛡️☁️"
  },
  {
    "character": "Iceburg",
    "emoji": "🔨🏗️🐭🚢"
  },
  {
    "character": "Spandam",
    "emoji": "📞🐘😠⚖️"
  },
  {
    "character": "Perona",
    "emoji": "👻🎀💖😭"
  },
  {
    "character": "Rayleigh",
    "emoji": "👴⚔️🍺👑"
  },
  {
    "character": "Shirahoshi",
    "emoji": "🧜‍♀️💗🐠👸"
  },
  {
    "character": "Neptune",
    "emoji": "🔱🧜‍♂️👑🌊"
  },
  {
    "character": "Hody Jones",
    "emoji": "🦈💊😡🌊"
  },
  {
    "character": "Rebecca",
    "emoji": "🗡️👸🌹🏟️"
  },
  {
    "character": "Kyros",
    "emoji": "🗡️🦵🏟️👑"
  },
  {
    "character": "Cavendish",
    "emoji": "🗡️🌹💫😴"
  },
  {
    "character": "Bartolomeo",
    "emoji": "🛡️🐓💚😤"
  },
  {
    "character": "Bellamy",
    "emoji": "🏀💥🌸🦘"
  },
  {
    "character": "Senor Pink",
    "emoji": "👶🍼💪🌸"
  },
  {
    "character": "Baby 5",
    "emoji": "🔫💣👰💥"
  },
  {
    "character": "Pudding",
    "emoji": "🧁👁️💕😈"
  },
  {
    "character": "Judge",
    "emoji": "⚡👑🧬💛"
  },
  {
    "character": "Capone Bege",
    "emoji": "🏰🔫👔💰"
  },
  {
    "character": "Kanjuro",
    "emoji": "🖌️🎭📜🐍"
  },
  {
    "character": "Ashura Doji",
    "emoji": "🗡️🍶🐗💪"
  },
  {
    "character": "Inuarashi",
    "emoji": "🐕👑⚔️🌙"
  },
  {
    "character": "Nekomamushi",
    "emoji": "🐱👑🌙⚔️"
  },
  {
    "character": "Pekoms",
    "emoji": "🦁🕶️🥊💎"
  },
  {
    "character": "Tamago",
    "emoji": "🥚🎩☕🐣"
  },
  {
    "character": "Smoothie",
    "emoji": "🍹⚔️👠💜"
  },
  {
    "character": "Cracker",
    "emoji": "🍪⚔️🛡️👑"
  },
  {
    "character": "Oven",
    "emoji": "🔥👨‍🍳🥊💥"
  },
  {
    "character": "Daifuku",
    "emoji": "🧞‍♂️💨⚔️🔮"
  },
  {
    "character": "Tsuru",
    "emoji": "👵⚓🧼🕊️"
  },
  {
    "character": "Helmeppo",
    "emoji": "⚓👱‍♂️🗡️📈"
  },
  {
    "character": "Hina",
    "emoji": "⚓🚬💄🔒"
  },
  {
    "character": "Momonga",
    "emoji": "⚓🗡️🐭💪"
  },
  {
    "character": "Onigumo",
    "emoji": "⚓🕷️🗡️😠"
  },
  {
    "character": "Doberman",
    "emoji": "⚓🐕💪🗡️"
  },
  {
    "character": "Koala",
    "emoji": "🐨👊📚💪"
  },
  {
    "character": "Hack",
    "emoji": "🐟👊🥋💪"
  },
  {
    "character": "Lindbergh",
    "emoji": "🐱✈️🔧💣"
  },
  {
    "character": "Morley",
    "emoji": "👹⛏️🌍💪"
  },
  {
    "character": "Karasu",
    "emoji": "🐦‍⬛📰💨🗞️"
  },
  {
    "character": "Belo Betty",
    "emoji": "🚩👠💄📢"
  },
  {
    "character": "Edward Weevil",
    "emoji": "💪🦈👶🔱"
  },
  {
    "character": "Alvida",
    "emoji": "🔨💄👸⚓"
  },
  {
    "character": "Morgan",
    "emoji": "🪓⚓😠💪"
  },
  {
    "character": "Kuro",
    "emoji": "🐱🗡️👔😼"
  },
  {
    "character": "Don Krieg",
    "emoji": "🛡️💣⚓👑"
  },
  {
    "character": "Gin",
    "emoji": "🔨💪⚓😤"
  },
  {
    "character": "Pearl",
    "emoji": "🛡️💎🔥⚓"
  },
  {
    "character": "Johnny",
    "emoji": "🗡️😎⚓🤝"
  },
  {
    "character": "Yosaku",
    "emoji": "🗡️😄⚓🤝"
  },
  {
    "character": "Igaram",
    "emoji": "🎺👑🏜️🛡️"
  },
  {
    "character": "Pell",
    "emoji": "🦅👑🏜️⚔️"
  },
  {
    "character": "Chaka",
    "emoji": "🐺👑🏜️⚔️"
  },
  {
    "character": "Kohza",
    "emoji": "🏜️⚔️👊💪"
  },
  {
    "character": "Toto",
    "emoji": "🏜️👴💧🌵"
  },
  {
    "character": "Mr. 5",
    "emoji": "💣👓5️⃣💥"
  },
  {
    "character": "Miss Valentine",
    "emoji": "☂️💄💋🎈"
  },
  {
    "character": "Pagaya",
    "emoji": "☁️🔧👴⚡"
  },
  {
    "character": "Conis",
    "emoji": "☁️🎵👩🪶"
  },
  {
    "character": "Satori",
    "emoji": "☁️🔮💨😤"
  },
  {
    "character": "Shura",
    "emoji": "☁️🔥🗡️🐦"
  },
  {
    "character": "Gedatsu",
    "emoji": "☁️💨😵🤪"
  },
  {
    "character": "Ohm",
    "emoji": "☁️🗡️🐕😠"
  },
  {
    "character": "Paulie",
    "emoji": "🔧🚢🚬💪"
  },
  {
    "character": "Tilestone",
    "emoji": "🔧🚢💪📢"
  },
  {
    "character": "Lulu",
    "emoji": "🔧🚢🐦💪"
  },
  {
    "character": "Jabra",
    "emoji": "🐺👔💪🗡️"
  },
  {
    "character": "Kumadori",
    "emoji": "🐻💄🎭💪"
  },
  {
    "character": "Fukurou",
    "emoji": "🦉📢🎪💪"
  },
  {
    "character": "Kalifa",
    "emoji": "🧼👠💄📞"
  },
  {
    "character": "Absalom",
    "emoji": "👻🦁💒🔫"
  },
  {
    "character": "Hogback",
    "emoji": "🧟‍♂️🏥⚗️🦴"
  },
  {
    "character": "Ryuma",
    "emoji": "💀🗡️🎩⚔️"
  },
  {
    "character": "Oars",
    "emoji": "👹🦴💪🏔️"
  },
  {
    "character": "Lola",
    "emoji": "🐷💄👰💕"
  },
  {
    "character": "Cindry",
    "emoji": "🧟‍♀️🍽️👗💀"
  },
  {
    "character": "Shakky",
    "emoji": "🚬🍺🏪💄"
  },
  {
    "character": "Camie",
    "emoji": "🧜‍♀️🐠💕🌊"
  },
  {
    "character": "Pappag",
    "emoji": "⭐👕🌊😄"
  },
  {
    "character": "Hatchan",
    "emoji": "🐙🍜⚔️😊"
  },
  {
    "character": "Duval",
    "emoji": "🐂💄😤🏍️"
  },
  {
    "character": "Marguerite",
    "emoji": "🏹🌺👩🏝️"
  },
  {
    "character": "Sweet Pea",
    "emoji": "🏹🌸👩🏝️"
  },
  {
    "character": "Aphelandra",
    "emoji": "🏹🌺👩💪"
  },
  {
    "character": "Hannyabal",
    "emoji": "🔱👹🏛️⚖️"
  },
  {
    "character": "Domino",
    "emoji": "🔱👠💄🔒"
  },
  {
    "character": "Sadi",
    "emoji": "🔱👠😈💥"
  },
  {
    "character": "Minotaurus",
    "emoji": "🐂💪🔱👹"
  },
  {
    "character": "Fukaboshi",
    "emoji": "🧜‍♂️🔱👑🌊"
  },
  {
    "character": "Ryuboshi",
    "emoji": "🧜‍♂️⚔️👑🌊"
  },
  {
    "character": "Manboshi",
    "emoji": "🧜‍♂️🐟👑🏹"
  },
  {
    "character": "Otohime",
    "emoji": "🧜‍♀️👑💗🕊️"
  },
  {
    "character": "Fisher Tiger",
    "emoji": "🐟👊🔥⚡"
  },
  {
    "character": "Vander Decken IX",
    "emoji": "🐟🎯💕👻"
  },
  {
    "character": "Vergo",
    "emoji": "🥢😠💪🔧"
  },
  {
    "character": "Monet",
    "emoji": "🐦❄️📚💚"
  },
  {
    "character": "Brownbeard",
    "emoji": "🐊🧔💪⚔️"
  },
  {
    "character": "Riku Doldo III",
    "emoji": "👑🏟️⚔️💙"
  },
  {
    "character": "Viola",
    "emoji": "👁️💃🌹👑"
  },
  {
    "character": "Scarlett",
    "emoji": "👸🌹💗👑"
  },
  {
    "character": "Sai",
    "emoji": "👊💪🏛️⚔️"
  },
  {
    "character": "Don Chinjao",
    "emoji": "👴💎👊🏛️"
  },
  {
    "character": "Ideo",
    "emoji": "👊💪🥊🔥"
  },
  {
    "character": "Leo",
    "emoji": "🧚‍♂️🗡️🌱💚"
  },
  {
    "character": "Hajrudin",
    "emoji": "👹⚔️🏔️💪"
  },
  {
    "character": "Orlumbus",
    "emoji": "⚓🚢👑💪"
  },
  {
    "character": "Machvise",
    "emoji": "⚖️💪🔨💥"
  },
  {
    "character": "Dellinger",
    "emoji": "🦵🐟💄💥"
  },
  {
    "character": "Lao G",
    "emoji": "👴💪🥋G"
  },
  {
    "character": "Gladius",
    "emoji": "💣⚙️👓💥"
  },
  {
    "character": "Buffalo",
    "emoji": "🌪️💨🔄💪"
  },
  {
    "character": "Zunisha",
    "emoji": "🐘🏝️🌊👁️"
  },
  {
    "character": "Wanda",
    "emoji": "🐕🪓🌙💪"
  },
  {
    "character": "Sicilian",
    "emoji": "🦁⚔️👑💪"
  },
  {
    "character": "Giovanni",
    "emoji": "🐺🗡️💪🌙"
  },
  {
    "character": "Concelot",
    "emoji": "🐱⚔️🌙💪"
  },
  {
    "character": "Yomo",
    "emoji": "🐺🏹🌙💪"
  },
  {
    "character": "Milky",
    "emoji": "🐰🥕💕🌙"
  },
  {
    "character": "Bariete",
    "emoji": "🐺⚔️🌙💪"
  },
  {
    "character": "Tristan",
    "emoji": "🐿️⚕️💊🌙"
  },
  {
    "character": "Miyagi",
    "emoji": "🐐⚕️💊🌙"
  },
  {
    "character": "Ichiji",
    "emoji": "⚡👑🔴💪"
  },
  {
    "character": "Niji",
    "emoji": "⚡👑🔵💨"
  },
  {
    "character": "Yonji",
    "emoji": "⚡👑🟢💪"
  },
  {
    "character": "Chiffon",
    "emoji": "🧁💕👰🏰"
  },
  {
    "character": "Pez",
    "emoji": "🍬👶🏰💕"
  },
  {
    "character": "Bobbin",
    "emoji": "🎭🔪💀🌀"
  },
  {
    "character": "Amande",
    "emoji": "🗡️👠💄🌸"
  },
  {
    "character": "Opera",
    "emoji": "🎭🍰🎵💜"
  },
  {
    "character": "Counter",
    "emoji": "🔢🍰💪🎭"
  },
  {
    "character": "Cadenza",
    "emoji": "🎼🍰🎤💜"
  },
  {
    "character": "Cabaletta",
    "emoji": "🎻🍰💃💜"
  },
  {
    "character": "King",
    "emoji": "🔥🦅🗡️🎭"
  },
  {
    "character": "Queen",
    "emoji": "🦕🤖🎤🦠"
  },
  {
    "character": "Shiryu",
    "emoji": "🌧️🗡️👻⛓️"
  },
  {
    "character": "Hawkins",
    "emoji": "🃏🔮🌾🪆"
  },
  {
    "character": "X Drake",
    "emoji": "🦖🕵️🏴‍☠️⚓"
  },
  {
    "character": "Urouge",
    "emoji": "🙏😇💪☁️"
  },
  {
    "character": "Tashigi",
    "emoji": "👓🗡️⚓📚"
  },
  {
    "character": "Marco",
    "emoji": "🔥🐦💙🍍"
  },
  {
    "character": "Uta",
    "emoji": "🎤🎶🎀🌐"
  },
  {
    "character": "Jewelry Bonney",
    "emoji": "🍕👶👵🎩"
  },
  {
    "character": "Bepo",
    "emoji": "🐻‍❄️🥋🙇⚓"
  },
  {
    "character": "Killer",
    "emoji": "🎭🌀⚔️😂"
  },
  {
    "character": "Benn Beckman",
    "emoji": "🚬🔫🧠🍶"
  },
  {
    "character": "Kaku",
    "emoji": "🦒📐🗡️🕴️"
  },
  {
    "character": "Rocks D. Xebec",
    "emoji": "🏴‍☠️😈💀🌋"
  },
  {
    "character": "Hiluluk",
    "emoji": "🌸🩺💀🧪"
  },
  {
    "character": "Otama",
    "emoji": "🍡👧🦊🌸"
  },
  {
    "character": "Ulti",
    "emoji": "🦕🤯🐏👧"
  },
  {
    "character": "Okiku",
    "emoji": "👘🗡️❄️🌸"
  },
  {
    "character": "Loki",
    "emoji": "🔨⚡🌳👹"
  },
  {
    "character": "Corazon",
    "emoji": "💄🤫🚬🔥"
  },
  {
    "character": "Mr. 2",
    "emoji": "🦢🩰💋👯"
  },
  {
    "character": "Bellemere",
    "emoji": "🍊🚬⚓💔"
  },
  {
    "character": "Nojiko",
    "emoji": "🍊💙👧🏡"
  },
  {
    "character": "Zeff",
    "emoji": "🦿👨‍🍳🥸🚢"
  },
  {
    "character": "Kuina",
    "emoji": "🗡️👧🥋🪦"
  },
  {
    "character": "Kureha",
    "emoji": "👵🍷🩺❄️"
  },
  {
    "character": "Makino",
    "emoji": "🍺👩🏡⛵"
  },
  {
    "character": "Dadan",
    "emoji": "⛰️🪓👵🚬"
  },
  {
    "character": "Zephyr",
    "emoji": "🦾⚓👨‍🏫💥"
  },
  {
    "character": "Imu",
    "emoji": "👁️🪑🌍🌹"
  },
  {
    "character": "Foxy",
    "emoji": "🐌🎮🏴‍☠️😭"
  },
  {
    "character": "Jango",
    "emoji": "🌀😵🕺🕶️"
  },
  {
    "character": "Izou",
    "emoji": "👘🔫💄🔥"
  },
  {
    "character": "Kawamatsu",
    "emoji": "🐢🍙🗡️🤼"
  },
  {
    "character": "Komurasaki",
    "emoji": "👘💋🌸💰"
  },
  {
    "character": "Black Maria",
    "emoji": "🕷️🕸️👘🔥"
  },
  {
    "character": "Sugar",
    "emoji": "🍇🧸👧🍬"
  },
  {
    "character": "Jaguar D. Saul",
    "emoji": "🧔🏔️📚😆"
  },
  {
    "character": "Montblanc Norland",
    "emoji": "🔔🗺️🌳🤥"
  },
  {
    "character": "Scratchmen Apoo",
    "emoji": "🎹🎵💥🦍"
  },
  {
    "character": "Tom",
    "emoji": "🐟🔨🚢⛓️"
  },
  {
    "character": "Morgans",
    "emoji": "🐦📰🎩💰"
  }
];
