import { TCreatedPdf } from "pdfmake/build/pdfmake";
import { CustomTableLayout, TDocumentDefinitions, TFontDictionary } from "pdfmake/interfaces";

export interface IPdfMake {
    vfs: { [file: string]: string };
    fonts: TFontDictionary;
    tableLayouts: { [name: string]: CustomTableLayout };

    createPdf(
        documentDefinitions: TDocumentDefinitions,
        tableLayouts?: { [name: string]: CustomTableLayout },
        fonts?: TFontDictionary,
        vfs?: { [file: string]: string },
    ): TCreatedPdf;
}