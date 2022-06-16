export class ExportAction {
    action: ExportActionType;
    content: any;
}

export type ExportActionType = 'PDF' | 'TXT';