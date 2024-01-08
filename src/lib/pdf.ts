import { LedgerValidation } from "../data/ledger_validation";
import { App } from "../app";
import { sweetAlertOptionsError } from "./sweet_alert";
import swal from "sweetalert";
import { logoUri } from "./logo_uri";
import { truncateString } from "../helpers/helpers";

let catNr: string,
  artist: string,
  title: string,
  format: string,
  speed: string,
  sampleRate: string,
  bitDepth: string,
  comments: string;

const ledger = App.ledger;
let actualPage: number;


/* eslint-disable @typescript-eslint/no-explicit-any */
declare const jsPDF: any;

/**
 * Generates a PDF document based on the form and tracklisting data.
 */
export function generatePDF(): void {
  const doc: any = new jsPDF();
  try {
    getTracklistingData();
    validatesTracklisting();
    getFormValues();
    validatesFormValues();
    writePDF(doc);
    doc.save(`${catNr.toUpperCase()}-tracklisting.pdf`);
  } catch (error) {
    swal(error.message, sweetAlertOptionsError);
    return;
  }
}

// PDF FUNCTIONS

function writePDF(doc: any) {
  const cols = ["POS", "TITLE", "MIN", "SEC", "START"];
  let sidePairs: string[][] = [];
  if (App.sides.length === 1) {
    sidePairs = [App.sides];
  } else {
    // Group sides in pairs
    sidePairs = groupSidesInPair(App.sides, sidePairs);
  }
  sidePairs.forEach((pair, index) => {
    const rows: any[] = [];
    fillRows(rows, pair);
    generatePage(doc, index, () => {
      doc.setDrawColor(128, 128, 128);
      doc.line(10, 73, doc.internal.pageSize.width - 10, 73);
      const sidesText = generateTableMeta(pair);
      generateText(doc, sidesText, 10, 82, "bold");
      generateTable(doc, cols, rows);
      generatePageMeta(doc);
    });
  });
  generateComments(doc);
}

function groupSidesInPair(sides, sidePairs): string[][] {
  for (let i = 0; i < sides.length; i += 2) {
    const pair = sides.slice(i, i + 2);
    sidePairs.push(pair);
  }
  return sidePairs;
}

// Fills a rows array with the data from the ledger
function fillRows(rows, pair): void {
  const formatSecond = (second: number): string | number => {
    return second < 10 ? "0" + second : second;
  };
  // We iterate over the pair array to fill the rows array
  pair.forEach((side) => {
    const sideData = ledger[`${side}Data`] as TrackType[];
    let cumulatedMinute = 0;
    let cumulatedSecond = 0;
    const getCumulatedtime = (minute, second) => {
      cumulatedMinute += minute;
      cumulatedSecond += second;
      if (cumulatedSecond >= 60) {
        cumulatedMinute++;
        cumulatedSecond -= 60;
      }
      return [cumulatedMinute, formatSecond(cumulatedSecond)];
    };
    const cumulatedTime = ["00:00"];

    // We iterate over the sideData array to fill the rows array
    sideData.forEach((element, index) => {
      const formattedTitle = truncateString(element.title, 70);

      cumulatedTime.push(
        getCumulatedtime(element.minute, element.second).join(":")
      );
      const temp = [
        element.position,
        // Remove accents from title
        formattedTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        element.minute,
        formatSecond(element.second),
        cumulatedTime[index],
      ];
      rows.push(temp);
    });
  });
}

function generateTable(doc, col, rows): void {
  const startY = 90;
  doc.autoTable(col, rows, {
    startY,
    columnStyles: {
      0: {
        fontStyle: "bold",
      },
      1: {
        cellWidth: 160,
      },
      2: {
        cellWidth: 10,
      },
      3: {
        cellWidth: 10,
      },
      4: {
        cellWidth: 25,
      },
    },
  });
}

function generatePage(doc: any, index: number, callback: () => void) {
  const calculateNumberOfPages = (sides: string[]): number => {
    if (sides.length === 1) return 1;
    const numberOfPages = sides.length / 2;
    return numberOfPages;
  };

  const isNewPage = index > 0;
  if (isNewPage) {
    doc.addPage();
  }
  actualPage = index + 1;
  const pageCount = calculateNumberOfPages(App.sides);

  doc.setPage(pageCount);
  callback();

  const footerText = `Page ${actualPage} of ${pageCount}`;
  generateText(doc, footerText, 10, 290, "regular", 10);
}

function generatePageMeta(doc): void {
  generateTracklistingMeta(doc);
  addLogo(doc);
  generateCredit(doc);
}

function generateCredit(doc: any): void {
  const credit = "This document has been generated on vinyl-tracklisting.com";

  generateText(doc, credit, 60, 290, "regular", 10);
}

function generateTracklistingMeta(doc): void {
  generateText(doc, "ARTIST:", 10, 15, "bold", 16);
  generateText(doc, artist.toUpperCase(), 50, 15, "bold", 16);

  generateText(doc, "TITLE:", 10, 22, "bold", 16);
  generateText(doc, title.toUpperCase(), 50, 22, "bold", 16);
  doc.setDrawColor(128, 128, 128);
  doc.line(10, 25, doc.internal.pageSize.width - 10, 25);

  generateText(doc, "REF:", 10, 40, "bold");
  generateText(doc, catNr.toUpperCase(), 50, 40, "regular");
  generateText(doc, "FORMAT:", 10, 45, "bold");
  generateText(doc, format, 50, 45, "regular");
  generateText(doc, "SPEED", 10, 50, "bold");
  generateText(doc, speed, 50, 50, "regular");
  generateText(doc, "SAMPLE RATE:", 10, 55, "bold");
  generateText(doc, sampleRate, 50, 55, "regular");
  generateText(doc, "BIT DEPTH:", 10, 60, "bold");
  generateText(doc, bitDepth, 50, 60, "regular");
}

function generateText(
  doc: any,
  text: string,
  x: number,
  y: number,
  fontStyle: string,
  fontSize = 12
) {
  doc.setFontSize(fontSize);
  doc.setFontType(fontStyle).setFont("Helvetica");
  doc.text(text, x, y);
}

function addLogo(doc: any): void {
  const pageWidth = doc.internal.pageSize.width;
  const pageHeight = doc.internal.pageSize.height;
  const width = 15;
  const height = 15;
  const y = pageHeight - height;
  const x = pageWidth - width * 1.5;
  doc.addImage(logoUri, x, y, width, height);
}

function generateComments(doc: any): void {
  if (comments === "") return;
  const height = doc.autoTable.previous.finalY + 20;
  generateText(
    doc,
    "COMMENTS:",
    10,
    doc.autoTable.previous.finalY + 20,
    "bold"
  );
  generateText(doc, comments, 10, height + 10, "regular");
}

// HELPERS

function generateTableMeta(sides: string[]): string {
  const formattedSides = sides.map((side) => {
    const minute = ledger[`${side}Time`][0];
    let second = ledger[`${side}Time`][1];
    second = second < 10 ? "0" + second : second;
    return `${side} : ${minute} : ${second}`;
  });
  return formatArray(formattedSides);

  function formatArray(arr: string[]): string {
    const formattedArr = arr.map((item) => {
      let side = item.split(":")[0].trim();
      side = side.replace("side", "SIDE ");
      const time = item.split(":")[1].trim() + ":" + item.split(":")[2].trim();
      return `${side} : ${time}`;
    });
    return formattedArr.join(" • ");
  }
}

// DATA & DATA VALIDATION

function getTracklistingData(): void {
  App.sides.forEach((side) => {
    dataManipulator.resetAndFillData(side, ledger);
  });
}

function validatesTracklisting(): void {
  if (LedgerValidation.isNotValidated(ledger)) {
    throw new Error("Some data are missing in the tracklisting.");
  }
}

function getFormValues(): void {
  catNr = (document.getElementById("catnumber") as HTMLInputElement).value;
  artist = (document.getElementById("artist") as HTMLInputElement).value;
  title = (document.getElementById("title") as HTMLInputElement).value;
  comments = (document.getElementById("comments") as HTMLInputElement).value;
  format = getCheckedValue("format") || "";
  speed = getCheckedValue("speed") || "";
  sampleRate = getCheckedValue("sample_rate") || "";
  bitDepth = getCheckedValue("bit_depth") || "";
}

function getCheckedValue(name: string): string | null {
  const elements = document.getElementsByName(
    name
  ) as NodeListOf<HTMLInputElement>;
  const checkedElement = Array.from(elements).find(
    (element) => element.checked
  );
  return checkedElement ? checkedElement.value : null;
}

function validatesFormValues(): void {
  const fields = {
    catNr,
    artist,
    title,
    format,
    speed,
    sampleRate,
  };

  for (let field in fields) {
    if (fields[field] === "") {
      if (field === "catNr") field = "Catalog Number";
      if (field === "sampleRate") field = "Sample Rate";
      throw new Error(`Please fill the ${field} field to generate the PDF.`);
    }
  }
}
