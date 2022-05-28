import { Content, DynamicContent } from 'pdfmake/interfaces';
export interface PdfMakingStrategy {
    getContent(): Content;
    getHeader(currPage?: number, pageCount?: number): Content;
    getFooter(currPage?: number, pageCount?: number): Content;
}