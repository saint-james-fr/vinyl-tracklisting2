import { sweetAlertOptionsError } from "./sweet_alert";
import swal from "sweetalert";
import { logoUri } from "./logo_uri";
import { truncateString } from "./util";
import { formStore, vinylStore } from "stores";
import { get } from "svelte/store";
import { tracksAreValid } from "./validate";
import { secondsToMinute, formatTime } from "./time";

let actualPage: number;

/* eslint-disable @typescript-eslint/no-explicit-any */
declare const jsPDF: any;

/**
 * Generates a PDF document based on the form and tracklisting data.
 */
export function generatePDF(): void {
  const doc: any = new jsPDF();
  try {
    get(vinylStore).sides.forEach((side) => {
      tracksAreValid(side.tracks);
    });
    validatesFormValues();
    writePDF(doc);
    doc.save(`${get(formStore).catNr.toUpperCase()}-tracklisting.pdf`);
  } catch (error: any) {
    swal(error.message, sweetAlertOptionsError);
    return;
  }
}

// PDF FUNCTIONS

function writePDF(doc: any) {
  const cols = ["POSITION", "TITLE", "LENGTH", "START"];
  let sidePairs: string[][] = [];
  if (get(vinylStore).sides.length === 1) {
    sidePairs = [get(vinylStore).sides[0].prefix];
  } else {
    // Group sides in pairs
    sidePairs = groupSidesInPair(get(vinylStore).sides);
  }
  sidePairs.forEach((pair: string[], index) => {
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

function groupSidesInPair(sides: SideType[]): string[][] {
  const sidePairs: string[][] = [];
  for (let i = 0; i < sides.length; i += 2) {
    const pair = sides.slice(i, i + 2).map((side) => side.prefix);
    sidePairs.push(pair);
  }
  return sidePairs;
}

// Fills a rows array with the data from the ledger
function fillRows(rows: any, pair: string[]): void {
  // We iterate over the pair array to fill the rows array
  pair.forEach((side) => {
    const sideData = get(vinylStore).sides.find(
      (s) => s.prefix === side
    ).tracks;
    let cumulatedMinute = 0;
    let cumulatedSecond = 0;

    const getCumulatedtime = (minute: number, second: number) => {
      cumulatedMinute += minute;
      cumulatedSecond += second;
      if (cumulatedSecond >= 60) {
        cumulatedMinute++;
        cumulatedSecond -= 60;
      }
      return [formatTime(cumulatedMinute), formatTime(cumulatedSecond)];
    };
    const cumulatedTime = ["00:00"];

    // We iterate over the sideData array to fill the rows array
    sideData.forEach((track: TrackType, index: number) => {
      let formattedTitle = truncateString(track.title, 65);
      // removes file extension from title
      formattedTitle = formattedTitle.replace(/\.[^/.]+$/, "");
      if (track.length === undefined)
        throw new Error("Track length is undefined");
      let [minute, second] = secondsToMinute(track.length);

      cumulatedTime.push(getCumulatedtime(minute, second).join(":"));
      const position = `${track.prefix}${index + 1}`;
      const temp = [
        position,
        // Remove accents from title
        formattedTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        `${formatTime(minute)}:${formatTime(second)}`,
        cumulatedTime[index],
      ];
      rows.push(temp);
    });
  });
}

function generateTable(doc: any, col: any, rows: any): void {
  const startY = 90;
  doc.autoTable(col, rows, {
    startY,
    columnStyles: {
      0: {
        fontStyle: "bold",
      },
      1: {
        cellWidth: 150,
      },
      2: {
        cellWidth: 25,
      },
      3: {
        cellWidth: 25,
      },
    },
  });
}

function generatePage(doc: any, index: number, callback: () => void) {
  const calculateNumberOfPages = (sides: SideType[]): number => {
    if (sides.length === 1) return 1;
    const numberOfPages = sides.length / 2;
    return numberOfPages;
  };

  const isNewPage = index > 0;
  if (isNewPage) {
    doc.addPage();
  }
  actualPage = index + 1;
  const pageCount = calculateNumberOfPages(get(vinylStore).sides);

  doc.setPage(pageCount);
  callback();

  const footerText = `Page ${actualPage} of ${pageCount}`;
  generateText(doc, footerText, 10, 290, "regular", 10);
}

function generatePageMeta(doc: any): void {
  generateTracklistingMeta(doc);
  addLogo(doc);
  generateCredit(doc);
}

function generateCredit(doc: any): void {
  const credit = "This document has been generated on vinyl-tracklisting.com";

  generateText(doc, credit, 60, 290, "regular", 10);
}

function generateTracklistingMeta(doc: any): void {
  generateText(doc, "ARTIST:", 10, 15, "bold", 16);
  generateText(doc, get(formStore).artist.toUpperCase(), 50, 15, "bold", 16);

  generateText(doc, "TITLE:", 10, 22, "bold", 16);
  generateText(doc, get(formStore).title.toUpperCase(), 50, 22, "bold", 16);
  doc.setDrawColor(128, 128, 128);
  doc.line(10, 25, doc.internal.pageSize.width - 10, 25);

  generateText(doc, "REF:", 10, 40, "bold");
  generateText(doc, get(formStore).catNr.toUpperCase(), 50, 40, "regular");
  generateText(doc, "FORMAT:", 10, 45, "bold");
  generateText(doc, get(formStore).format, 50, 45, "regular");
  generateText(doc, "SPEED", 10, 50, "bold");
  generateText(doc, get(formStore).speed, 50, 50, "regular");
  generateText(doc, "SAMPLE RATE:", 10, 55, "bold");
  generateText(doc, get(formStore).sampleRate, 50, 55, "regular");
  generateText(doc, "BIT DEPTH:", 10, 60, "bold");
  generateText(doc, get(formStore).bitDepth, 50, 60, "regular");
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
  if (get(formStore).comments === "") return;
  const height = doc.autoTable.previous.finalY + 20;
  generateText(
    doc,
    "COMMENTS:",
    10,
    doc.autoTable.previous.finalY + 20,
    "bold"
  );
  generateText(doc, get(formStore).comments, 10, height + 10, "regular");
}

// HELPERS

function generateTableMeta(sides: string[]): string {
  const formattedSides = sides.map((side: string) => {
    const correctSide = get(vinylStore).sides.find(
      (s) => s.prefix === side
    ) as SideType;
    const [minute, unformattedSecond] = secondsToMinute(correctSide.length);
    let second: string | number = unformattedSecond;
    second = second < 10 ? "0" + second : second;
    return `${side} : ${minute} : ${second}`;
  });
  return formatArray(formattedSides);

  function formatArray(arr: string[]): string {
    const formattedArr = arr.map((item) => {
      let side = item.split(":")[0].trim();
      side = side.replace("side", "SIDE ");
      const time = item.split(":")[1].trim() + ":" + item.split(":")[2].trim();
      return `SIDE ${side} : ${time}`;
    });
    return formattedArr.join(" • ");
  }
}

function validatesFormValues(): void {
  let form = get(formStore);

  for (let key in form) {
    let value = form[key];
    if (value !== undefined && value !== "") continue;
    if (key === "comments") continue;
    if (key === "bitDepth") continue;
    if (key === "catNr") key = "Catalog Number";
    if (key === "sampleRate") key = "Sample Rate";
    throw new Error(`Please fill the ${key} field to generate the PDF.`);
  }
}
