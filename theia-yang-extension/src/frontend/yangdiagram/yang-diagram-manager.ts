/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from 'inversify'
import { LanguageClientContribution } from '@theia/languages/lib/browser'
import { EditorManager } from '@theia/editor/lib/browser'
import { YangLanguageClientContribution } from '../language/yang-language-client-contribution'
import { TheiaSprottyConnector, TheiaFileSaver, DiagramManagerImpl, DiagramWidgetRegistry } from 'theia-sprotty/lib'
import { ThemeManager } from './theme-manager';

@injectable()
export class YangDiagramManager extends DiagramManagerImpl {

    readonly diagramType = 'yang-diagram'
    readonly iconClass = 'fa fa-microchip'

    _diagramConnector: TheiaSprottyConnector

    constructor(@inject(YangLanguageClientContribution) languageClientContribution: LanguageClientContribution,
                @inject(TheiaFileSaver) theiaFileSaver: TheiaFileSaver,
                @inject(EditorManager) editorManager: EditorManager,
                @inject(DiagramWidgetRegistry) diagramWidgetRegistry: DiagramWidgetRegistry,
                @inject(ThemeManager) themeManager: ThemeManager) {
        super()
        themeManager.initialize()
        this._diagramConnector = new TheiaSprottyConnector(languageClientContribution, theiaFileSaver, editorManager, diagramWidgetRegistry)
    }

    get diagramConnector() {
        return this._diagramConnector
    }

    get label() {
        return 'Yang diagram'
    }
}