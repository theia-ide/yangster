/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify'
import { EditorManager } from '@theia/editor/lib/browser'
import { QuickPickService, WidgetManager } from '@theia/core/lib/browser';
import { YangDiagramLanguageClient } from './yang-diagram-language-client'
import { LSTheiaSprottyConnector, TheiaSprottyConnector, TheiaFileSaver, DiagramManager } from 'sprotty-theia/lib'
import { MonacoWorkspace } from '@theia/monaco/lib/browser/monaco-workspace';
import { ThemeManager } from './theme-manager';

@injectable()
export class YangDiagramManager extends DiagramManager {

    readonly diagramType = 'yang-diagram'
    readonly iconClass = 'fa fa-microchip'

    _diagramConnector: TheiaSprottyConnector

    constructor(@inject(YangDiagramLanguageClient) diagramLanguageClient: YangDiagramLanguageClient,
                @inject(TheiaFileSaver) fileSaver: TheiaFileSaver,
                @inject(WidgetManager) widgetManager: WidgetManager,
                @inject(EditorManager) editorManager: EditorManager,
                @inject(MonacoWorkspace) workspace: MonacoWorkspace,
                @inject(QuickPickService) quickPickService: QuickPickService,
                @inject(ThemeManager) themeManager: ThemeManager) {
        super()
        themeManager.initialize();
        this._diagramConnector = new LSTheiaSprottyConnector(
            { diagramLanguageClient, fileSaver, editorManager, widgetManager, workspace, quickPickService, diagramManager: this }
        )
    }

    get diagramConnector() {
        return this._diagramConnector
    }

    get label() {
        return 'Yang diagram'
    }
}