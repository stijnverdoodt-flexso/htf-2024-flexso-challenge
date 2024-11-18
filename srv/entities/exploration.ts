import * as cds from "@sap/cds";
const { Galaxies, AlienCivilisations } = cds.entities;

export const sendCommunicationRequest = async (req: cds.Request) => {
  const galaxyGuid = req.data?.galaxy_ID;

  if (galaxyGuid === undefined) {
    throw {
      code: 400,
      message: "Our explorers need a destination to travel to!",
    };
  }

  const url = `${process.env.explorationTeamService}exploreGalaxy(galaxy_ID='${galaxyGuid}')`;

  try {
    const explorationMission = await fetch(url);

    if (!explorationMission.ok) {
      return explorationMission.json().then((response) => {
        throw response.error;
      });
    }

    const explorationReport = await explorationMission.json();

    if (explorationReport.explorationReport != undefined) {
      await UPDATE.entity(Galaxies, galaxyGuid).set({
        explorationReport: explorationReport.explorationReport,
      });
    }

    if (explorationReport.alienCivilisation !== null) {
      const contactedAlienCivilisation = explorationReport.alienCivilisation;

      const alienCivilisation = await SELECT.from(AlienCivilisations).byKey(
        contactedAlienCivilisation.ID
      );
      if (alienCivilisation === undefined) {
        await INSERT.into(AlienCivilisations).entries({
          ID: contactedAlienCivilisation.ID,
          name: contactedAlienCivilisation.name,
          alienType_ID: contactedAlienCivilisation.alienType_ID,
          homeGalaxy_ID: galaxyGuid,
          status_ID: contactedAlienCivilisation.alienStatus_ID,
          contacted: true,
          message: contactedAlienCivilisation.message,
        });
        return { code: 200, message: "We have found sentient life!" };
      } else {
        return {
          code: 200,
          message:
            "We have already met this civilisation, no need to explore their systems once more!",
        };
      }
    } else {
      return {
        code: 200,
        message: "Despite a thorough search, we have not met any alien life!",
      };
    }
  } catch (error) {
    throw error;
  }
};

export const decipherMessage = async (req: cds.Request) => {
  /**
   * Types of deciphering:
   * Ceasar
   * Binair
   * Morse coding
   */

  const message = await SELECT(AlienCivilisations)
    .where({
      homeGalaxy: req.params[0],
    })
    .columns("message");

  console.log(req.data.type);
  let decodedMessage = "";
  switch (req.data.type) {
    case "Ceasar":
      decodedMessage = ceasarDecipher(message[0].message);

      break;
    case "Binary":
      decodedMessage = binaryDecipher(message[0].message);
      break;

    case "Morse code":
      decodedMessage = morseDecipher(message[0].message);
      break;

    default:
      break;
  }

  await UPDATE(AlienCivilisations)
    .set({ decodedMessage: decodedMessage })
    .where({ homeGalaxy: req.params[0] });
};

const ceasarDecipher = (str: string) => {
  const shift = 7;
  const s = (26 - shift) % 26;
  return [...str]
    .map((l, i) => {
      const c = str.charCodeAt(i);
      if (c >= 65 && c <= 90)
        return String.fromCharCode(((c - 65 + s) % 26) + 65);
      if (c >= 97 && c <= 122)
        return String.fromCharCode(((c - 97 + s) % 26) + 97);
      return l;
    })
    .join("");
};
function binaryDecipher(binary: string): string {
  // Step 1
  // Split the binary into an array of strings using the .split() method
  let binaryArr: any[] = binary.split(" ");

  // Step 2
  // Iterate over the elements of the new array create to change each element to a decimal
  binaryArr = binaryArr.map((elem) => parseInt(elem, 2));

  // Step 3
  // Use String.fromCharCode with .map() to change each element of the array to text
  binaryArr = binaryArr.map((elem) => String.fromCharCode(elem));

  // Step 4
  // Add the element of the new array together to create a string. Save it to a new Variable.
  let newText = binaryArr.join("").toLowerCase();

  // Step 5
  // The new string is returned
  return newText;
}
function morseDecipher(message: string): string {
  const ref = {
    ".-": "a",
    "-...": "b",
    "-.-.": "c",
    "-..": "d",
    ".": "e",
    "..-.": "f",
    "--.": "g",
    "....": "h",
    "..": "i",
    ".---": "j",
    "-.-": "k",
    ".-..": "l",
    "--": "m",
    "-.": "n",
    "---": "o",
    ".--.": "p",
    "--.-": "q",
    ".-.": "r",
    "...": "s",
    "-": "t",
    "..-": "u",
    "...-": "v",
    ".--": "w",
    "-..-": "x",
    "-.--": "y",
    "--..": "z",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
    "-----": "0",
    ".-.-.-": ".",
    "-.-.--": "!",
    "--..--": ",",
  };

  const value = message
    .split("/")
    .map((a: string) =>
      a
        .split(" ")
        //@ts-ignore
        .map((b: string) => ref[b])
        .join("")
    )
    .join(" ");

  return value;
}
