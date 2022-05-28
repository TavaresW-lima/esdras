import { Inject, Injectable } from "@angular/core";
import { TCreatedPdf } from "pdfmake/build/pdfmake";
import { IPdfMake } from './ipdf-make';
import { DynamicContent, TDocumentDefinitions } from 'pdfmake/interfaces';
import { PdfMakingStrategy } from './pdf-making-strategy';
import * as pdffonts from 'pdfmake/build/vfs_fonts';

@Injectable()
export class PDFUtilService {
 
    private pdfMakingStrategy: PdfMakingStrategy;

    constructor(
        @Inject('PDF_MAKE') private pdfMake: IPdfMake
    ) {
        this.pdfMake.vfs = pdffonts.pdfMake.vfs;
    }

    public setStrategy(strategy: PdfMakingStrategy) {
        this.pdfMakingStrategy = strategy;
    }

    private getDocDef(): TDocumentDefinitions {
        
        return {
            header: this.pdfMakingStrategy.getHeader,
            footer: this.pdfMakingStrategy.getFooter,
            pageSize: 'A4',
            pageOrientation: 'portrait',
            pageMargins: [20, 40, 20, 24],
            content: this.pdfMakingStrategy.getContent()
        }
    }

    public geraPDF(): TCreatedPdf {
        return this.pdfMake.createPdf(this.getDocDef());
    }
}