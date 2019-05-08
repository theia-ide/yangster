import { EditorManager } from "@theia/editor/lib/browser";
import { inject, injectable } from "inversify";
import { DiagramLanguageClient } from "sprotty-theia/lib";
import { YangLanguageClientContribution } from "../language/yang-language-client-contribution";

@injectable()
export class YangDiagramLanguageClient extends DiagramLanguageClient {
    constructor(
        @inject(YangLanguageClientContribution) languageClientContribution: YangLanguageClientContribution,
        @inject(EditorManager) editorManager: EditorManager) {
        super(languageClientContribution, editorManager)
    }
}